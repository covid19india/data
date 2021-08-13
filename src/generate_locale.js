const fs = require('fs')
const locales = require('../tmp/locales.json')

var dir = './tmp/locales/'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

console.log(locales.locales[0])
var allFiles = {}

for (var key in locales.locales[0]) {
  allFiles[key] = {}
}

locales.locales.forEach(element => {
  for (var key in element) {
    allFiles[key][element.english] = element[key]
  }
})

for (key in allFiles) {
  fs.writeFileSync('./tmp/locales/locale_' + key + '.json', JSON.stringify(allFiles[key], null, 2))
}
