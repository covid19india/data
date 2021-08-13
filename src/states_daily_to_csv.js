const daily = require('../tmp/states_daily.json')
const fs = require('fs')

var CONFIRMED_CSV = 'date,TT,'
var RECOVERED_CSV
var DECEASED_CSV

var headers = ['date', 'tt']
for (var key in daily.states_daily[0]) {
  if (key !== 'date' && key !== 'status' && key !== 'tt') {
    headers.push(key)
    CONFIRMED_CSV += key.toUpperCase() + ','
  }
}
RECOVERED_CSV = CONFIRMED_CSV
DECEASED_CSV = CONFIRMED_CSV

console.log(headers)
console.log(CONFIRMED_CSV)

daily.states_daily.forEach(element => {
  switch (element.status) {
    case 'Confirmed':
      CONFIRMED_CSV += '\n'
      headers.forEach(header => {
        CONFIRMED_CSV += element[header] + ','
      })
      break
    case 'Recovered':
      RECOVERED_CSV += '\n'
      headers.forEach(header => {
        RECOVERED_CSV += element[header] + ','
      })
      break
    case 'Deceased':
      DECEASED_CSV += '\n'
      headers.forEach(header => {
        DECEASED_CSV += element[header] + ','
      })
      break
  }
})

const CSV_PATH = 'tmp/states_daily_csv/'
if (!fs.existsSync(CSV_PATH)) {
  fs.mkdirSync(CSV_PATH, { recursive: true })
}

fs.writeFileSync(CSV_PATH + 'confirmed.csv', CONFIRMED_CSV)
fs.writeFileSync(CSV_PATH + 'recovered.csv', RECOVERED_CSV)
fs.writeFileSync(CSV_PATH + 'deceased.csv', DECEASED_CSV)
