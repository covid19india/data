var fs = require('fs')
const fetch = require('node-fetch')
// CHAT_ID = "-1001363035222"; // Core
const CHAT_ID = '-1001450930419' // Mods
const BOT_TOKEN = process.env.STUCK_BOT
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const GITHUB_WORKFLOW_URL = 'https://github.com/' + process.env.GITHUB_REPOSITORY + '/actions/runs/' + process.env.GITHUB_RUN_ID
var e = process.argv[2]
if (e === 'success') {
  if (fs.existsSync('/tmp/apidata_iumessage')) {
    var apiDataIUmessage = fs.readFileSync('/tmp/apidata_iumessage', 'utf8')
    var apidataiutable = fs.readFileSync('/tmp/apidata_iutable', 'utf8')
    var url = encodeURI('https://api.telegram.org/bot' + BOT_TOKEN + '/editMessageText?message_id=929&chat_id=@covid19indiaorg_updates&parse_mode=Markdown&text=' +
      apidataiutable)
    const settings = { method: 'Get' }
    fetch(url, settings).then(res => res.json())
      .then(json => console.log(json))
    url = encodeURI('https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage?chat_id=-1001478052719&parse_mode=Markdown&text=' +
      apidataiutable)
    fetch(url, settings).then(res => res.json())
      .then(json => console.log(json))
    url = encodeURI('https://api.telegram.org/bot' + BOT_TOKEN + '/sendmessage?' +
      'disable_web_page_preview=true&disable_notification=true&parse_mode=Markdown&chat_id=-1001449683810&text=' + apiDataIUmessage)
    fetch(url, settings).then(res => res.json()).then(json => console.log(json))
  }
} else {
  var err = fs.readFileSync('/tmp/apidata_err', 'utf8')
  console.log('Sending the following to core')
  console.log(err)
  err = err.replace(new RegExp(BOT_TOKEN, 'g'), '****')
  err = err.replace(new RegExp(GITHUB_TOKEN, 'g'), '****')
  console.log(err)
  var tempUrl = 'https://api.telegram.org/bot' + BOT_TOKEN +
    '/sendmessage?disable_web_page_preview=true&chat_id=' + CHAT_ID + '&text=GitHub Action Status: ' + e + '\n' + GITHUB_WORKFLOW_URL + '\n\n' + err
  url = encodeURI(tempUrl)
  const settings = { method: 'Get' }
  fetch(url, settings).then(res => res.json())
    .then(json => { console.log(json) })
}
