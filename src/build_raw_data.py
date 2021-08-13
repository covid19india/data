import pandas as pd # pylint: disable=import-error
import re
from pathlib import Path
import logging
import sys
import os
from urllib.error import HTTPError
# Set logging level
logging.basicConfig(stream=sys.stdout,
                    format="%(message)s",
                    level=logging.INFO)

def fetch_raw_data_from_api():
    '''
    Read all raw data and death and recovery files
    Pass the latest version of raw data
    '''
    i = 1
    raw_d = []
    while True:
        try:
            url = f"https://api.covid19india.org/csv/latest/raw_data{i}.csv"
            df = pd.read_csv(url)
            df.to_csv(f'./tmp/csv/latest/raw_data{i}.csv',index=False)
            raw_d.append(df)
            logging.info(f"Fetched raw_data{i} ")
            i = i+1
        except HTTPError:
            current_ver = i-1
            break

    death_rec = []
    logging.info(f"Fetching deaths_and_recoveries")
    url = f"https://api.covid19india.org/csv/latest/death_and_recovered"
    df = pd.read_csv(f"{url}1.csv")
    death_rec.append(df)
    df.to_csv('./tmp/csv/latest/death_and_recovered1.csv',index=False)
    df = pd.read_csv(f"{url}2.csv")
    death_rec.append(df)
    df.to_csv('./tmp/csv/latest/death_and_recovered2.csv',index=False)
    
    return raw_d,death_rec,current_ver

def fetch_raw_data():
    '''
    Read all raw data and death and recovery files
    Return the latest number of raw data files
    '''
    raw_d = []
    death_rec = []
    fpath = Path('tmp/csv/latest')
    
    i = 1
    while True:
        try:
            df = pd.read_csv(fpath / f"raw_data{i}.csv")
            raw_d.append(df)
            logging.info(f"Fetched raw_data{i} ")
            i = i+1
        except FileNotFoundError:
            current_ver = i-1
            break
    
    i = 1
    while True:
        try:
            df = pd.read_csv(fpath / f"death_and_recovered{i}.csv")
            death_rec.append(df)
            logging.info(f"Fetched death_and_recovered{i} ")
            i = i+1
        except FileNotFoundError:
            break

    logging.info(f"Data read complete")

    return raw_d,death_rec,current_ver

def fix_rawdata1and2(raw,rec,col_list,sheet_version):
    '''
    Raw Data 1 and 2 had different format
    Select necessary columns and change data types
    Add death and recovery data to raw_data
    '''
    print(f"V{sheet_version} Shape \t: {raw.shape}")
    
    # Only choose the valid current statuses
    raw = raw[raw['Current Status'].isin( ['Hospitalized','Recovered','Deceased','Migrated','Migrated_Other'])].copy()
    
    #Prepare neceassary columns
    raw['Num Cases'] = 1
    raw['Entry_ID'] = 0
    raw['Current Status'] = "Hospitalized"
    raw = raw.fillna('')
    raw = raw[col_list]
    
    # If Detected State is not available, entry is invalid
    raw = raw[raw['Detected State'] != ''].copy()
    
    # Convert Date Announced string to datetime
    raw['Date Announced'] = pd.to_datetime(raw['Date Announced'],format='%d/%m/%Y')
    

    # Add Sheet Version Column
    raw['Sheet_Version'] = sheet_version

    # Only choose the valid current statuses
    rec = rec[rec['Patient_Status'].isin(['Hospitalized','Recovered','Deceased','Migrated','Migrated_Other'])].copy()
    
    # Prepare necessary columns
    rec['Num Cases'] = 1
    rec['Entry_ID'] = 0
    rec['Current Status'] = rec['Patient_Status']
    rec['Date Announced'] = rec['Date']
    rec['State code'] = rec['Statecode']
    rec['Detected City'] = rec['City']
    rec['Status Change Date'] = ''
    rec['Contracted from which Patient (Suspected)'] = ''
    rec['Detected State'] = rec['State']
    rec['Detected District'] = rec['District']
    rec['Patient Number'] = rec['Patient_Number (Could be mapped later)']
    rec['State Patient Number'] = ''
    rec['Type of transmission'] = ''
    
    rec = rec.fillna('')
    rec = rec[col_list]
    
    # If Detected State is not available, entry is invalid
    rec = rec[rec['Detected State'] != ''].copy()
    
    # Convert Date column from string to date
    rec['Date Announced'] = pd.to_datetime(rec['Date Announced'],format='%d/%m/%Y')
    
    # Add sheet version
    rec['Sheet_Version'] = sheet_version
    
    # Add deaths and recoveries to raw data
    raw = pd.concat([raw,rec],sort=True)
    
    return raw
    

def merge_alldata(current_ver):
    '''
    Merge it all together
    '''
    col_list = ['Entry_ID', 'State Patient Number', 'Date Announced', 'Age Bracket',
       'Gender', 'Detected City', 'Detected District', 'Detected State',
       'State code', 'Num Cases', 'Current Status',
       'Contracted from which Patient (Suspected)', 'Notes', 'Source_1',
       'Source_2', 'Source_3', 'Nationality', 'Type of transmission',
       'Status Change Date', 'Patient Number']
    
    allraw = fix_rawdata1and2(raw_d[0],death_rec[0],col_list,sheet_version=1)
    tmp = fix_rawdata1and2(raw_d[1],death_rec[1],col_list,sheet_version=2)
    allraw = pd.concat([allraw,tmp],sort=True)

    for i in range(2,current_ver):
        print(f"V{i+1} Shape \t: {tmp.shape}")
        
        tmp = raw_d[i]
        tmp = tmp.fillna('')
        
        # Remove rows that doesn't have
        # any State mentioned.
        # This handles the situation at
        # the tail of most recent sheet
        tmp = tmp[tmp['Detected State'] != ''].copy()
        
        # Select only necessary columns
        tmp = tmp[col_list]
        # Convert date string to datetime
        tmp['Date Announced'] = pd.to_datetime(tmp['Date Announced'],format='%d/%m/%Y')
        # Add sheet version
        tmp['Sheet_Version'] = i+1
        
        allraw = pd.concat([allraw,tmp],sort=True)
    
    # Try to fix age to float
    allraw['Age Bracket'] = allraw['Age Bracket'].map(lambda x : fix_age(x))
    # Try to fix gender column
    allraw['Gender'] = allraw['Gender'].map(lambda x : fix_gender(x))
    
    print(f"Raw Data Shape \t: {allraw.shape}")
    return allraw

def fix_age(age):
    '''
    Age entries are sometimes entered in months.
    Change them to fraction
    '''
    rgx_month = re.compile(r"([0-9]*)( month?.)")
    rgx_day = re.compile(r"([0-9]*)( day?.)")
    res_month = rgx_month.search(str(age).lower())
    res_day = rgx_day.search(str(age).lower())
    if res_month:
        age_corr = float(res_month.group(1))/12
        return round(age_corr,2)
    elif res_day:
        age_corr = float(res_day.group(1))/365.25
        return round(age_corr,2)
        return float(age)

def fix_gender(g):
    '''
    Fix any invalid entries in gender column
    '''
    rgx_F = re.compile(r"[w,W]|[f,F]emale")
    rgx_M = re.compile(r"[m,M]ale")
    g = str(g)
    g = re.sub(rgx_F,"F",g)
    g = re.sub(rgx_M,"M",g)

    return g

def compare_with_gospel():
    '''
    Till April 26th, the districtwise sheet was managed
    separately. i.e, Raw Data till then do not truly represent 
    the district values till then.
    This function compares the entries in Raw Data with gospel
    Note that this function ignores the blank districts.
    '''
    # Read merged data
    df = pd.read_csv('./tmp/csv/latest/raw_data.csv',low_memory=False)
    df.head()

    df['Date Announced'] = pd.to_datetime(df['Date Announced'])
    df = df[df['Date Announced'] <= '2020-04-26']
    df['District_Key'] = df['State code'] + "_" + df['Detected District']
    df['Num Cases'] = pd.to_numeric(df['Num Cases'], errors='coerce')

    dis_counts = pd.pivot_table(df,values = 'Num Cases',
                               index = 'District_Key',
                               columns='Current Status',
                               aggfunc = sum).reset_index()

    dis_counts.rename(columns={'Hospitalized':'Confirmed'},inplace=True)

    # Read gospel
    url = "https://raw.githubusercontent.com/covid19india/api/gh-pages/csv/latest/districts_26apr_gospel.csv"
    gospel = pd.read_csv(url)

    compare = pd.merge(gospel,dis_counts,on='District_Key', suffixes=("_gospel","_v1v2"))

    compare.fillna(0,inplace=True)

    compare['Conf_Diff'] = compare['Confirmed_gospel'] - compare['Confirmed_v1v2']
    compare['Reco_Diff'] = compare['Recovered_gospel'] - compare['Recovered_v1v2']
    compare['Dece_Diff'] = compare['Deceased_gospel'] - compare['Deceased_v1v2']

    compare.to_csv("./tmp/csv/compare_gospel_v1v2.csv",index=False)
    logging.info('Comparison file saved as ./tmp/csv/compare_gospel_v1v2.csv')
    
    return compare

if __name__ == "__main__":
    logging.info('''----------------------------------------------------------------------''')
    logging.info('''Build one true raw data''')
    logging.info('''----------------------------------------------------------------------''')
    
    os.makedirs('./tmp/csv/latest/',exist_ok=True)
    
    try:
        # raw_d,death_rec,current_ver = fetch_raw_data()
        # If remote fetch is required
        raw_d,death_rec,current_ver = fetch_raw_data_from_api()
    except Exception as e:
        logging.error(f"Error while reading the files")
        raise
    logging.info('''----------------------------------------------------------------------''')

    allraw = merge_alldata(current_ver)
    allraw.to_csv('./tmp/csv/latest/raw_data.csv',index=False)
    logging.info('''----------------------------------------------------------------------''')
    logging.info('''Raw Data saved''')
    logging.info('''----------------------------------------------------------------------''')
    logging.info('''Comparing with Gospel''')
    _ = compare_with_gospel()
    logging.info('''----------------------------------------------------------------------''')
