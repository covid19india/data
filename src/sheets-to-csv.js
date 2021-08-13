const fetch = require('node-fetch')
var fs = require('fs')

var dir = './tmp/csv/'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

var latestDir = dir + 'latest'

if (!fs.existsSync(latestDir)) {
  fs.mkdirSync(latestDir)
}

// Published sheets
const PUBLISHED_SHEET_ID_1 = '2PACX-1vSz8Qs1gE_IYpzlkFkCXGcL_BqR8hZieWVi-rphN1gfrO3H4lDtVZs4kd0C3P8Y9lhsT1rhoB-Q_cP4'
const PUBLISHED_SHEET_ID_2 = '2PACX-1vRodtoTyQwXckfuvuQllkMhGC_gruigaaizVc8I6-BZWeetYpmRyexnO75ep7rnSxFICd8c9dfpwU8I'
const PUBLISHED_SHEET_ID_3 = '2PACX-1vR_17UovavD4X7m_pqzmXjA_kCjGxIapemdWpRhDELHR1LbLJ-EVbxjKgeQat489BFRZ9bqMf-ILe_H'
const PUBLISHED_SHEET_ID_4 = '2PACX-1vSeAoAk_iMv7cQ0tldZC7aivJmGKM5Wpc5VVr37Nzv-geTmtr6pDMb-oDK59RS21Om80-SYR3jRp6qq'
const PUBLISHED_SHEET_ID_5 = '2PACX-1vSEikAgjAB9x7yhx4zNOUGLIx8Zfy2mAzRv0K1tbw08g73MO88-bbWCsgmhJ0uXa0gtuUlLMOnE9h26'
const PUBLISHED_SHEET_ID_6 = '2PACX-1vQQmgjCktQknnTPy-s4OFycu-imtoMCrWY5M2Lqig3nhGyy6W5E27xbCyaaKV9lGaDWmTzGWVzPH9-S'
const PUBLISHED_SHEET_ID_7 = '2PACX-1vR6blqV85tiBO-9u4MCW72qXALS3f7yQD0iV47MbsmIcKrvBDTorIVrUJ96QrxUj7iwAviYiecjp8VU'
const PUBLISHED_SHEET_ID_8 = '2PACX-1vR1zl3JStozuCgPsPol19f9k_io1ABmHS_mOl9gzWxiDd2_WvWhdfhePXBFZIUFjpW-gPfPwE9m7AA_'
const PUBLISHED_SHEET_ID_9 = '2PACX-1vRb4AsEPrV4b0S4j2vQku-J5XHnh8c_8fzmIhD2S2aMc2if7g6bLwJNYOPV8UmrrNR-Bv0C0yjcUnU3'
const PUBLISHED_SHEET_ID_10 = '2PACX-1vQyBRow24Pc7Wm_mSjU3JDy_Ua5mFByz6zE7-vFguBvUOdcr-90PgNcTBOCL-nTa40WrghiAN-kSFVX'
const PUBLISHED_SHEET_ID_11 = '2PACX-1vTd_tTI33CBI4obGaKTo0dfw1cNu5dUz4OIIhdbWJVmZJlEVslMyWzky1ifb9uRmV0siVxneBW4iBwi'
const PUBLISHED_SHEET_ID_12 = '2PACX-1vRCvn9X8LdOLYpiq_8U8Ihw8m_q0Lrl0Gkx4kJ22dhxX9Biy-Bhc0KWWxFQ9Fk2oS5pjgPNEd4I4XHD'
const PUBLISHED_SHEET_ID_13 = '2PACX-1vT6RKqvY0VzMaN7pKyYPyVXvUYR5cu3L5Z0sTeayDRE72xCXqVU-rhgyAucjGMJDDG5rXRKInPChqrJ'
const PUBLISHED_SHEET_ID_14 = '2PACX-1vQujsobkf1XNHg60LutKI8SXXITPGEtSx7F2sR0rBIm_FnFqXKfhz1MnZ1hIAyVAyhbPXbaf5NLXG-Q'
const PUBLISHED_SHEET_ID_15 = '2PACX-1vTsiPxkxMFJWmQQegSkpZgf3dNLqY7gc4msrnCbARgdNrr0wa9dbEDmtW9OzCrGeAmLDL1idbxU_gUk'
const PUBLISHED_SHEET_ID_16 = '2PACX-1vTDdjG51mUgQXFlBigDAF5QTpA9YL9XbhVZzjKSMqcsrD3dx9LeJfGdyBabsReECgyazhCNd3YOHQOa'
const PUBLISHED_SHEET_ID_17 = '2PACX-1vTWUT8wCTjJvROykckn6C30jNt2YVqS6zWyxKs4t0YtKfNAzJ7hxh7OggnZ3RjRokxYqSgvYEON9icz'
const PUBLISHED_SHEET_ID_18 = '2PACX-1vSDMdBWod4Db0eiA052qK1mtgzAAT7JnUeend__jvvPVKeo9Bhp8ur1Z4D41yiq8aGiAZkjsWn1KnZe'
const PUBLISHED_SHEET_ID_19 = '2PACX-1vQRxJ4zOl__ylTmlS5AnGKELJINLUElsRvJQp8YQBK7iPsjRzl1ApUwtgZJWeRYeQvlP2CCCeDuuFV2'
const PUBLISHED_SHEET_ID_20 = '2PACX-1vSeQYg9K6w1B9sfUAMfviYLh8r6n6uk9Bf4g7miDotpeV9j8bC_mZvco0Xr3J-zgv3aj7Xm8mc7GMAJ'
const PUBLISHED_SHEET_ID_21 = '2PACX-1vQT9ukpSK16ubwCFSSsZQHVlggAElw9999Rbtdsg9Opk_LyOCUDbMsAW5oiWxLjG4s0IudlLmhCVZuv'
const PUBLISHED_SHEET_ID_22 = '2PACX-1vTwNTdGXrAa-RHrvb-bE51qE2UMEVO9tb45o_W_djHESofOI5purP0hq4VlBl6Qr1u3F4uR8N7a0nmE'
const PUBLISHED_SHEET_ID_23 = '2PACX-1vRtezerCCxfVaYMerTEyPITsoDO_dx5UpTNcsU6YE8tTsmCflpHmx_0NZDKgPu47wB0_2vfIuxXopnF'
const PUBLISHED_SHEET_ID_24 = '2PACX-1vTVvDzqqG3GF1hyvQ9AAq7SXFr0FizVordgnL9kVAionTzwrgIM3pvMY6o1K8EoMnU1oiIJYZ2Ju6V_'
const PUBLISHED_SHEET_ID_25 = '2PACX-1vSJL0LHDI8dBKtTM3Q3mozy4AW3GUfunNSkkrdrftX3CgjQ3JyrxkqBU_6sr44T2wkZR6NMq2vp1UAf'
const PUBLISHED_SHEET_ID_26 = '2PACX-1vQGs1RLLszaHsZa59xaA-z-de1dZR0mBEX2K3GcJ_OSlE0zI05oTw22-nFcIUypcxpSKhEJaFG0I9SJ'
const PUBLISHED_SHEET_ID_27 = '2PACX-1vT5IUH2r83DCLWxBkfuiQOmYTi0Re41KYh2H7tq4_J-FPm82S7eDOeAmfY3rSfTyNysHMNL88EctL-N'
const PUBLISHED_SHEET_ID_28 = '2PACX-1vT2QMw9OyjcazyGXuHMj-jQ81oMnDDITU3q7fOLpcZ2-W81sNilWB0GdC5v2yv-0e0aMZnr-ZJAFowz'
const PUBLISHED_SHEET_ID_29 = '2PACX-1vTu2gcDkpfLS6g2_eYUtLBtQ3AaqC2UaSEHA20eCkgM41np7BZn0tE-mQ1ojcpr6t9R33WlTV4YHfve'
const PUBLISHED_SHEET_ID_30 = '2PACX-1vSH9k7EkLLVbnIk-whp4A9mx6WDoTQRVDVZGsHU812eHn65Uj08oL7i4kCaE2Mv01SLa1FuaHD35Nf4'
const PUBLISHED_SHEET_ID_31 = '2PACX-1vRboZ3VJ6RTk0md4CI9cwk-K2QwCkCTsnvMEa4rnK1uSd0WubZgo5hnfReaD2EZ0ZpQHzkRuckJrsHk'
const PUBLISHED_SHEET_ID_32 = '2PACX-1vTt1y5sQRZfLp0OjGSnDL59oNjDPsEKnrEIlSfpN491LM-f1dtoQGHfNwHFZSkW0-WShT6nWfGpdQzn'


const SHEETS_V1 = [
  ['raw_data1', '0'],
  ['death_and_recovered1', '200733542']
]

const SHEETS_V2 = [
  ['raw_data2', '0'],
  ['death_and_recovered2', '200733542']
]

const SHEETS_V3 = [
  ['raw_data3', '0'],
  ['districts_26apr_gospel', '1964493192']
]

const SHEETS_V4 = [
  ['raw_data4', '0']
]

const SHEETS_V5 = [
  ['raw_data5', '0']
]

const SHEETS_V6 = [
  ['raw_data6', '0']
]

const SHEETS_V7 = [
  ['raw_data7', '0']
]

const SHEETS_V8 = [
  ['raw_data8', '0']
]

const SHEETS_V9 = [
  ['raw_data9', '0']
]

const SHEETS_V10 = [
  ['raw_data10', '0']
]

const SHEETS_V11 = [
  ['raw_data11', '0']
]

const SHEETS_V12 = [
  ['raw_data12', '0']
]

const SHEETS_V13 = [
  ['raw_data13', '0']
]

const SHEETS_V14 = [
  ['raw_data14', '0']
]

const SHEETS_V15 = [
  ['raw_data15', '0']
]

const SHEETS_V16 = [
  ['raw_data16', '0']
]

const SHEETS_V17 = [
  ['raw_data17', '0']
]

const SHEETS_V18 = [
  ['raw_data18', '0']
]

const SHEETS_V19 = [
  ['raw_data19', '0']
]

const SHEETS_V20 = [
  ['raw_data20', '0']
]

const SHEETS_V21 = [
  ['raw_data21', '0']
]

const SHEETS_V22 = [
  ['raw_data22', '0']
]

const SHEETS_V23 = [
  ['raw_data23', '0']
]

const SHEETS_V24 = [
  ['raw_data24', '0']
]

const SHEETS_V25 = [
  ['raw_data25', '0']
]

const SHEETS_V26 = [
  ['raw_data26', '0']
]

const SHEETS_V27 = [
  ['raw_data27', '0']
]

const SHEETS_V28 = [
  ['raw_data28', '0']
]

const SHEETS_V29 = [
  ['raw_data29', '0']
]

const SHEETS_V30 = [
  ['raw_data30', '0']
]

const SHEETS_V31 = [
  ['raw_data31', '0']
]

const SHEETS_V32 = [
  ['raw_data32', '0'],
  ['state_wise', '1896310216'],
  ['state_wise_daily', '1395461826'],
  ['sources_list', '704389477'],
  ['district_wise', '227379561'],
  ['statewise_tested_numbers_data', '486127050'],
  ['case_time_series', '387368559'],
  ['tested_numbers_icmr_data', '2143634168'],
  // ["travel_history", "1532084277"],
  ['district_list', '1207378023'],
  // ['district_testing', '458610673'],
  // ['icmr_labs_statewise','847799380'],
  // ['icmr_rtpcr_tests_daily','1032515506'],
  // ['vaccine_doses_statewise','1601004575'],
  ['cowin_vaccine_data_statewise','1770661428'],
  ['cowin_vaccine_data_districtwise','382746758'],
  ['vaccine_doses_statewise_v2','1097927328']
]

async function sheetsToCSV (sheets, pubId) {
  for (var element of sheets) {
    console.log('Reading: ' + element[0])
    var tempUrl = 'https://docs.google.com/spreadsheets/d/e/' + pubId + '/pub?gid=' + element[1] + '&single=false&output=csv'
    console.log(tempUrl)
    var url = encodeURI(tempUrl)
    const settings = { method: 'Get' }
    await fetch(url, settings).then(res => res.text())
      .then(csv => {
        if (csv.includes('</html>')) {
          console.error('probably not csv!')
          process.exit(1)
        } else {
          // fs.writeFileSync(today_dir + "/" + element[0] + ".csv", csv);
          fs.writeFileSync(latestDir + '/' + element[0] + '.csv', csv)
          console.log('Write completed: ' + element[0])
        }
      })
  };
}

(async function main () {
  // uncomment below and run when changes in v1 sheet
  // await sheetsToCSV(SHEETS_V1, PUBLISHED_SHEET_ID_1)
  // await sheetsToCSV(SHEETS_V2, PUBLISHED_SHEET_ID_2)
  // await sheetsToCSV(SHEETS_V3, PUBLISHED_SHEET_ID_3)
  // await sheetsToCSV(SHEETS_V4, PUBLISHED_SHEET_ID_4)
  // await sheetsToCSV(SHEETS_V5, PUBLISHED_SHEET_ID_5)
  // await sheetsToCSV(SHEETS_V6, PUBLISHED_SHEET_ID_6)
  // await sheetsToCSV(SHEETS_V7, PUBLISHED_SHEET_ID_7)
  // await sheetsToCSV(SHEETS_V8, PUBLISHED_SHEET_ID_8)
  // await sheetsToCSV(SHEETS_V9, PUBLISHED_SHEET_ID_9)
  // await sheetsToCSV(SHEETS_V10, PUBLISHED_SHEET_ID_10)
  // await sheetsToCSV(SHEETS_V11, PUBLISHED_SHEET_ID_11)
  // await sheetsToCSV(SHEETS_V12, PUBLISHED_SHEET_ID_12)
  // await sheetsToCSV(SHEETS_V13, PUBLISHED_SHEET_ID_13)
  // await sheetsToCSV(SHEETS_V14, PUBLISHED_SHEET_ID_14)
  // await sheetsToCSV(SHEETS_V15, PUBLISHED_SHEET_ID_15)
  // await sheetsToCSV(SHEETS_V16, PUBLISHED_SHEET_ID_16)
  // await sheetsToCSV(SHEETS_V17, PUBLISHED_SHEET_ID_17)
  // await sheetsToCSV(SHEETS_V18, PUBLISHED_SHEET_ID_18)
  // await sheetsToCSV(SHEETS_V19, PUBLISHED_SHEET_ID_19)
  // await sheetsToCSV(SHEETS_V20, PUBLISHED_SHEET_ID_20)
  // await sheetsToCSV(SHEETS_V21, PUBLISHED_SHEET_ID_21)
  // await sheetsToCSV(SHEETS_V22, PUBLISHED_SHEET_ID_22)
  // await sheetsToCSV(SHEETS_V23, PUBLISHED_SHEET_ID_23)
  // await sheetsToCSV(SHEETS_V24, PUBLISHED_SHEET_ID_24)
  // await sheetsToCSV(SHEETS_V25, PUBLISHED_SHEET_ID_25)
  // await sheetsToCSV(SHEETS_V26, PUBLISHED_SHEET_ID_26)
  // await sheetsToCSV(SHEETS_V27, PUBLISHED_SHEET_ID_27)
  // await sheetsToCSV(SHEETS_V28, PUBLISHED_SHEET_ID_28)
  // await sheetsToCSV(SHEETS_V29, PUBLISHED_SHEET_ID_29)
  // await sheetsToCSV(SHEETS_V30, PUBLISHED_SHEET_ID_30)
  await sheetsToCSV(SHEETS_V31, PUBLISHED_SHEET_ID_31)
  await sheetsToCSV(SHEETS_V32, PUBLISHED_SHEET_ID_32)
})()
