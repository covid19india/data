const fs = require('fs')
const moment = require('moment-timezone')
const data = require('../tmp/data.json')
const dataPrev = require('../tmp/data_prev.json')

const updateLogFile = './tmp/updatelog/log.json'
var updateLog = require('.' + updateLogFile)

var statewiseNew = data.statewise.reduce((arr, row) => {
  arr[row.state] = row
  return arr
}, {})

var confirmedText
var recoveredText
var deathText
var fullText = ''
var tgFullText = ''
var isChanged = false

var relStates = {}

function initRelStates (state) {
  if (!relStates[state]) {
    relStates[state] = {}
  }
}

dataPrev.statewise.forEach(element => {
  if (element.state === 'Total') {
    return
  }
  isChanged = false
  confirmedText = null
  recoveredText = null
  deathText = null
  var text = null
  if (parseInt(element.confirmed) < parseInt(statewiseNew[element.state].confirmed)) {
    var confirmedDiff = statewiseNew[element.state].confirmed - element.confirmed
    confirmedText = confirmedDiff + ' new case' + (confirmedDiff === 1 ? '' : 's')
    isChanged = true
  }
  if (parseInt(element.recovered) < parseInt(statewiseNew[element.state].recovered)) {
    var recoveredDiff = statewiseNew[element.state].recovered - element.recovered
    recoveredText = recoveredDiff + ' recover' + (recoveredDiff === 1 ? 'y' : 'ies')
    isChanged = true
  }
  if (parseInt(element.deaths) < parseInt(statewiseNew[element.state].deaths)) {
    var deathDiff = statewiseNew[element.state].deaths - element.deaths
    deathText = deathDiff + ' death' + (deathDiff === 1 ? '' : 's')
    isChanged = true
  }

  if (isChanged) {
    text = (confirmedText ? confirmedText + ', ' : '') + (recoveredText ? recoveredText + ', ' : '') + (deathText ? deathText + ', ' : '')
    var arr = text.split(', ')
    if (arr.length > 2) {
      arr = text.split(', ')
      arr = arr.slice(0, -1)
      var arrLast = arr[arr.length - 1]
      arr = arr.slice(0, -1)
      text = arr.join(', ')
      text = text + ' and ' + arrLast
    } else {
      arr = arr.slice(0, -1)
      text = arr.join()
    }
    text = text + ' in ' + element.state
    fullText = fullText + text + '\n'
  }
})
function fillSpace (str, width) {
  var empt = Array(width - str.length).join(' ')
  return empt + str
}

const widthState = 2
const widthConfirmed = 15
const widthRecovered = 15
const widthDeceased = 14

function editMessage (lastUpdated) {
  data.statewise.forEach(element => {
    var stateCode = element.statecode
    if (stateCode === 'TT' || statewiseNew[element.state].confirmed === 0) {
      return
    }
    initRelStates(stateCode)
    relStates[stateCode].C = +statewiseNew[element.state].confirmed
    relStates[stateCode].Cd = +statewiseNew[element.state].deltaconfirmed
    relStates[stateCode].R = +statewiseNew[element.state].recovered
    relStates[stateCode].Rd = +statewiseNew[element.state].deltarecovered
    relStates[stateCode].D = +statewiseNew[element.state].deaths
    relStates[stateCode].Dd = +statewiseNew[element.state].deltadeaths
  })
  var words = fillSpace('St', widthState) +
        fillSpace('Cnfrmd', widthConfirmed) +
        fillSpace('Rcvrd', widthRecovered) +
        fillSpace('Dcsd', widthDeceased) + '\n'

  const lengthOfLine = widthState + widthConfirmed + widthRecovered + widthDeceased
  words += Array(lengthOfLine).join('-') + '\n'
  for (var element in relStates) {
    var c = '(' + relStates[element].Cd + ') ' + relStates[element].C
    var r = '(' + relStates[element].Rd + ') ' + relStates[element].R
    var d = '(' + relStates[element].Dd + ') ' + relStates[element].D

    words += fillSpace(element, widthState) +
            fillSpace(c, widthConfirmed) +
            fillSpace(r, widthRecovered) +
            fillSpace(d, widthDeceased) + '\n'
    // console.log(rel_states[element]);
  }
  var indiaTotal = '*Covid-19 India*\n'
  indiaTotal += 'Last updated: _' + lastUpdated + '_\n\n'

  var total = statewiseNew.Total
  indiaTotal += '```    Total cases: (↑' + total.deltaconfirmed + ') ' + total.confirmed +
        '\n' + '    Recovered  : (↑' + total.deltarecovered + ') ' + total.recovered +
        '\n' + '    Deaths     : (↑' + total.deltadeaths + ') ' + total.deaths + '```'

  // console.log(india_total);

  words = indiaTotal + '\n\n```\n' + words + '```\n\n*www.covid19india.org*'

  console.log(words)
  fs.writeFileSync('/tmp/apidata_iutable', words)
}

if (fullText !== '') {
  var total = statewiseNew.Total
  tgFullText = fullText + '\n' +
        '``` Total cases: (↑' + total.deltaconfirmed + ') ' + total.confirmed +
        '\n' + ' Recovered  : (↑' + total.deltarecovered + ') ' + total.recovered +
        '\n' + ' Deaths     : (↑' + total.deltadeaths + ') ' + total.deaths + '```'

  const now = moment().unix()
  var entry = {}
  entry.update = fullText
  entry.timestamp = now
  updateLog.push(entry)
  updateLog = updateLog.slice(-50)

  fs.writeFileSync(updateLogFile, JSON.stringify(updateLog, null, 2))

  var date = moment.unix(now)
  var formatedTime = date.tz('Asia/Kolkata').format('MMMM DD, hh:mm A') + ' IST'
  editMessage(formatedTime)

  // console.log(formated_time)
  var finalText = '_' +
        formatedTime + '_\n\n' +
        tgFullText +
        '\n\n*www.covid19india.org*'
  console.log(finalText)

  fs.writeFileSync('/tmp/apidata_iumessage', finalText)
} else {
  console.log('No updates this time!')
}
