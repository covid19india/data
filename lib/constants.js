const SHEET_V1 = process.env.SHEET_ID_v1
const SHEET_V2 = process.env.SHEET_ID_v2
const SHEET_V3 = process.env.SHEET_ID_v3
const SHEET_V4 = process.env.SHEET_ID_v4
const SHEET_V5 = process.env.SHEET_ID_v5
const SHEET_V6 = process.env.SHEET_ID_v6
const SHEET_V7 = process.env.SHEET_ID_v7
const SHEET_V8 = process.env.SHEET_ID_v8
const SHEET_V9 = process.env.SHEET_ID_v9
const SHEET_V10 = process.env.SHEET_ID_v10
const SHEET_V11 = process.env.SHEET_ID_v11
const SHEET_V12 = process.env.SHEET_ID_v12
const SHEET_V13 = process.env.SHEET_ID_v13
const SHEET_V14 = process.env.SHEET_ID_v14
const SHEET_V15 = process.env.SHEET_ID_v15
const SHEET_V16 = process.env.SHEET_ID_v16
const SHEET_V17 = process.env.SHEET_ID_v17
const SHEET_V18 = process.env.SHEET_ID_v18
const SHEET_V19 = process.env.SHEET_ID_v19
const SHEET_V20 = process.env.SHEET_ID_v20
const SHEET_V21 = process.env.SHEET_ID_v21
const SHEET_V22 = process.env.SHEET_ID_v22
const SHEET_V23 = process.env.SHEET_ID_v23
const SHEET_V24 = process.env.SHEET_ID_v24
const SHEET_V25 = process.env.SHEET_ID_v25
const SHEET_V26 = process.env.SHEET_ID_v26
const SHEET_V27 = process.env.SHEET_ID_v27
const SHEET_V28 = process.env.SHEET_ID_v28
const SHEET_V29 = process.env.SHEET_ID_v29
const SHEET_V30 = process.env.SHEET_ID_v30
const SHEET_V31 = process.env.SHEET_ID_v31
const SHEET_V32 = process.env.SHEET_ID_v32

const SHEET = process.env.SHEET_ID_v32

const SHEET_RESOURCES = process.env.RESOURCES_SHEET_ID
const SHEET_LOCALE = process.env.SHEET_LOCALE

// Sheet IDs can be obtained here: https://spreadsheets.google.com/feeds/worksheets/<HIDDEN>/private/full
const SHEET_RESOURCES_SHEET = 'otcvog0'
const SHEET_RAW_DATA = 'od6'
const SHEET_STATEWISE_TAB = 'ovd0hzm'
const SHEET_CASES_TIME_SERIES_TAB = 'o6emnqt'
const SHEET_KEY_VALUES_TAB = 'owlnkho'
const SHEET_TESTED_NUMBERS_ICMR_DATA = 'ozg9iqq'
const SHEET_STATEWISE_TESTED_NUMBERS_DATA = 'o81fdow'
const SHEET_FAQ = 'oknbjsw'
const SHEET_NAME_FACTOIDS = 'ooka3he'
const SHEET_TRAVEL_HISTORY = 'opc5w4v'
const SHEET_DATE_WISE_DELTA = 'on2tlaw'
const SHEET_DEATHS_AND_RECOVERIES = 'o3biev0'
const SHEET_SOURCES_LIST = 'obndi9r'
const SHEET_DISTRICT_WISE = 'o3rdj1v'
const SHEET_ZONES = 'oo4bpj4'
const SHEET_STATES_META_DATA = 'o3t26de'
const SHEET_DISTRICTS_META_DATA = 'ocicunx'
const SHEET_DISTRICT_TESTING_DATA = 'o7l1lwr'
const SHEET_TWITTER_QUERIES = 'oidib2z'
const SHEET_COWIN_VACCINE_DATA_STATEWISE = 'ota7ffy'
const SHEET_CROWDSOURCED_RESOURCES_LINKS = 'o3uhpw1'

const DIR = './tmp/'

const FILE_RAW_DATA_1 = '/raw_data1.json'
const FILE_RAW_DATA_2 = '/raw_data2.json'
const FILE_RAW_DATA_3 = '/raw_data3.json'
const FILE_RAW_DATA_4 = '/raw_data4.json'
const FILE_RAW_DATA_5 = '/raw_data5.json'
const FILE_RAW_DATA_6 = '/raw_data6.json'
const FILE_RAW_DATA_7 = '/raw_data7.json'
const FILE_RAW_DATA_8 = '/raw_data8.json'
const FILE_RAW_DATA_9 = '/raw_data9.json'
const FILE_RAW_DATA_10 = '/raw_data10.json'
const FILE_RAW_DATA_11 = '/raw_data11.json'
const FILE_RAW_DATA_12 = '/raw_data12.json'
const FILE_RAW_DATA_13 = '/raw_data13.json'
const FILE_RAW_DATA_14 = '/raw_data14.json'
const FILE_RAW_DATA_15 = '/raw_data15.json'
const FILE_RAW_DATA_16 = '/raw_data16.json'
const FILE_RAW_DATA_17 = '/raw_data17.json'
const FILE_RAW_DATA_18 = '/raw_data18.json'
const FILE_RAW_DATA_19 = '/raw_data19.json'
const FILE_RAW_DATA_20 = '/raw_data20.json'
const FILE_RAW_DATA_21 = '/raw_data21.json'
const FILE_RAW_DATA_22 = '/raw_data22.json'
const FILE_RAW_DATA_23 = '/raw_data23.json'
const FILE_RAW_DATA_24 = '/raw_data24.json'
const FILE_RAW_DATA_25 = '/raw_data25.json'
const FILE_RAW_DATA_26 = '/raw_data26.json'
const FILE_RAW_DATA_27 = '/raw_data27.json'
const FILE_RAW_DATA_28 = '/raw_data28.json'
const FILE_RAW_DATA_29 = '/raw_data29.json'
const FILE_RAW_DATA_30 = '/raw_data30.json'
const FILE_RAW_DATA_31 = '/raw_data31.json'
const FILE_RAW_DATA_32 = '/raw_data32.json'
const FILE_DEATHS_RECOVERIES_1 = '/deaths_recoveries1.json'
const FILE_DEATHS_RECOVERIES_2 = '/deaths_recoveries2.json'
const FILE_DISTRICTS = '/district_wise.json'
const FILE_DISTRICT_TESTING_DATA = '/district_testing_data.json'
const FILE_TWITTER_QUERIES = '/twitter_queries.json'
const FILE_DATA = '/data.json'
const FILE_FAQ = '/faq.json'
const FILE_WEBSITE_DATA = '/website_data.json'
const FILE_TRAVEL_HISTORY = '/travel_history.json'
const FILE_DATE_WISE_DELTA = '/states_daily.json'
const FILE_STATEWISE_TESTED_DATA = '/state_test_data.json'
const FILE_RESOURCES_ESSENTIALS = '/resources/resources.json'
const FILE_ZONES = '/zones.json'
const FILE_MISC = '/misc.json'
const FILE_COWIN_VACCINE_DATA_STATEWISE = '/cowin_vaccine_data_statewise.json'
const FILE_SOURCES_LIST = '/sources_list.json'
const FILE_CROWDSOURCED_RESOURCES_LINKS = '/crowdsourced_resources_links.json'

module.exports = {
  SHEET_STATES_META_DATA,
  SHEET_DISTRICTS_META_DATA,
  SHEET,
  SHEET_v1: SHEET_V1,
  SHEET_v2: SHEET_V2,
  SHEET_v3: SHEET_V3,
  SHEET_v4: SHEET_V4,
  SHEET_v5: SHEET_V5,
  SHEET_v6: SHEET_V6,
  SHEET_v7: SHEET_V7,
  SHEET_v8: SHEET_V8,
  SHEET_v9: SHEET_V9,
  SHEET_v10: SHEET_V10,
  SHEET_v11: SHEET_V11,
  SHEET_v12: SHEET_V12,
  SHEET_v13: SHEET_V13,
  SHEET_v14: SHEET_V14,
  SHEET_v15: SHEET_V15,
  SHEET_v16: SHEET_V16,
  SHEET_v17: SHEET_V17,
  SHEET_v18: SHEET_V18,
  SHEET_v19: SHEET_V19,
  SHEET_v20: SHEET_V20,
  SHEET_v21: SHEET_V21,
  SHEET_v22: SHEET_V22,
  SHEET_v23: SHEET_V23,
  SHEET_v24: SHEET_V24,
  SHEET_v25: SHEET_V25,
  SHEET_v26: SHEET_V26,
  SHEET_v27: SHEET_V27,
  SHEET_v28: SHEET_V28,
  SHEET_v29: SHEET_V29,
  SHEET_v30: SHEET_V30,
  SHEET_v31: SHEET_V31,
  SHEET_v32: SHEET_V32,
  SHEET_RESOURCES,
  SHEET_LOCALE,
  SHEET_RAW_DATA,
  SHEET_STATEWISE_TAB,
  SHEET_CASES_TIME_SERIES_TAB,
  SHEET_KEY_VALUES_TAB,
  SHEET_Tested_Numbers_ICMR_Data: SHEET_TESTED_NUMBERS_ICMR_DATA,
  SHEET_FAQ,
  SHEET_NAME_FACTOIDS,
  SHEET_TRAVEL_HISTORY,
  SHEET_DATE_WISE_DELTA,
  SHEET_StateWise_Tested_Numbers_Data: SHEET_STATEWISE_TESTED_NUMBERS_DATA,
  SHEET_DEATHS_AND_RECOVERIES,
  SHEET_SOURCES_LIST,
  SHEET_DISTRICT_WISE,
  SHEET_ZONES,
  SHEET_DISTRICT_TESTING_DATA,
  SHEET_TWITTER_QUERIES,
  SHEET_COWIN_VACCINE_DATA_STATEWISE,
  SHEET_CROWDSOURCED_RESOURCES_LINKS,
  DIR,
  // FILE_RAW_DATA,
  FILE_RAW_DATA_1,
  FILE_RAW_DATA_2,
  FILE_RAW_DATA_3,
  FILE_RAW_DATA_4,
  FILE_RAW_DATA_5,
  FILE_RAW_DATA_6,
  FILE_RAW_DATA_7,
  FILE_RAW_DATA_8,
  FILE_RAW_DATA_9,
  FILE_RAW_DATA_10,
  FILE_RAW_DATA_11,
  FILE_RAW_DATA_12,
  FILE_RAW_DATA_13,
  FILE_RAW_DATA_14,
  FILE_RAW_DATA_15,
  FILE_RAW_DATA_16,
  FILE_RAW_DATA_17,
  FILE_RAW_DATA_18,
  FILE_RAW_DATA_19,
  FILE_RAW_DATA_20,
  FILE_RAW_DATA_21,
  FILE_RAW_DATA_22,
  FILE_RAW_DATA_23,
  FILE_RAW_DATA_24,
  FILE_RAW_DATA_25,
  FILE_RAW_DATA_26,
  FILE_RAW_DATA_27,
  FILE_RAW_DATA_28,
  FILE_RAW_DATA_29,
  FILE_RAW_DATA_30,
  FILE_RAW_DATA_31,
  FILE_RAW_DATA_32,
  // FILE_DEATHS_RECOVERIES,
  FILE_DEATHS_RECOVERIES_1,
  FILE_DEATHS_RECOVERIES_2,
  SHEET_RESOURCES_SHEET,
  FILE_DATA,
  FILE_FAQ,
  FILE_WEBSITE_DATA,
  FILE_TRAVEL_HISTORY,
  FILE_DATE_WISE_DELTA,
  FILE_STATEWISE_TESTED_DATA,
  FILE_RESOURCES_ESSENTIALS,
  FILE_SOURCES_LIST,
  FILE_DISTRICTS,
  FILE_ZONES,
  FILE_MISC,
  FILE_DISTRICT_TESTING_DATA,
  FILE_TWITTER_QUERIES,
  FILE_COWIN_VACCINE_DATA_STATEWISE,
  FILE_CROWDSOURCED_RESOURCES_LINKS
}
