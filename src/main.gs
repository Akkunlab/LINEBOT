// メッセージ受信
function doPost(e) {
  const json = JSON.parse(e.postData.contents).events[0];
  const postData = createPostData(json); // PostData作成

  fetchData(postData); // メッセージ送信
}

// PostData作成
function createPostData(json) {
  const postData = {
    'replyToken': json.replyToken,
    'messages': [{
      'type':'text',
      'text':'Hello World!',
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
