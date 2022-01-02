// メッセージ受信
function doPost(e) {
  const json = JSON.parse(e.postData.contents).events[0];
  const postData = createPostData(json); // PostData作成

  fetchData(postData); // メッセージ送信
}

// PostData作成
function createPostData(json) {
  let message = '';
  const userMessage = json.message.text; // 受信したメッセージ

  switch (true) {
    case /課題/.test(userMessage):
      message = '課題です';
      break;
    default:
      message = '登録されていません';
      break;
  }

  const postData = {
    'replyToken': json.replyToken,
    'messages': [{
      'type':'text',
      'text': message,
    }]
  };

  return postData;
}

// メッセージ送信
function fetchData(postData) {
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
