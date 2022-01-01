// グローバル変数
const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

// メッセージ受信
function doPost(e) {
  const json = JSON.parse(e.postData.contents).events[0];

  fetchData(json);
}

// メッセージ送信
function fetchData(json) {
  const postData = {
    'replyToken': json.replyToken,
    'messages': [{
      'type':'text',
      'text':'Hello World!',
    }]
  };

  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN
    },
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', options);
}
