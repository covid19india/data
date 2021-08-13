const fs = require('fs')
const rawDistData = require('../tmp/district_wise.json')

const StateDistrictWiseData = rawDistData.districts.reduce((acc, row) => {
  if (row.district === 'Unknown' && +row.confirmed === 0 && +row.recovered === 0 && +row.deceased === 0) {
    return acc
  }
  const stateName = row.state
  if (!acc[stateName]) {
    acc[stateName] = {
      districtData: {},
      statecode: row.statecode
    }
  }
  const districtName = row.district
  if (!acc[stateName].districtData[districtName]) {
    acc[stateName].districtData[districtName] = {
      notes: '',
      active: 0,
      confirmed: 0,
      migratedother: 0,
      deceased: 0,
      recovered: 0,
      delta: {
        confirmed: 0,
        deceased: 0,
        recovered: 0
      }
    }
  }
  const currentDistrict = acc[stateName].districtData[districtName]
  currentDistrict.notes = row.districtnotes
  currentDistrict.active = +row.active
  currentDistrict.confirmed = +row.confirmed
  currentDistrict.migratedother = +row.migratedother
  currentDistrict.recovered = +row.recovered
  currentDistrict.deceased = +row.deceased
  currentDistrict.delta.confirmed = +row.deltaconfirmed
  currentDistrict.delta.deceased = +row.deltadeceased
  currentDistrict.delta.recovered = +row.deltarecovered
  return acc
}, {})

const stateDistrictWiseDataV2 = Object.keys(StateDistrictWiseData).map(state => {
  const districtData = StateDistrictWiseData[state].districtData
  return {
    state,
    statecode: StateDistrictWiseData[state].statecode,
    districtData: Object.keys(districtData).map(district => {
      return { district, ...districtData[district] }
    })
  }
})
var mainData = JSON.stringify(StateDistrictWiseData, null, 2)
fs.writeFileSync('./tmp/state_district_wise.json', mainData)
fs.writeFileSync('./tmp/v2/state_district_wise.json', JSON.stringify(stateDistrictWiseDataV2, null, 2))
