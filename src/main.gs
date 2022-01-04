/* メッセージ受信 */
function doPost(e) {
  const sheetLog = spreadSheet.getSheetByName('ログ'); // ログシート取得
  const json = JSON.parse(e.postData.contents).events[0];
  const postData = createPostData(json); // PostData作成

  fetchData(postData, REPLY_URL); // メッセージ送信

  // ログ出力
  sheetLog.appendRow([
    new Date(), // 日付
    json.message.text, // 受信したメッセージ
    json.source.userId, // ユーザID
    json.source.groupId // グループID
  ]);
}

/* PostData作成 */
function createPostData(json) {
  let message = '';
  const userMessage = json.message.text; // 受信したメッセージ

  switch (true) {
    case /課題/.test(userMessage):
      message = '課題です';
      break;
    case /連絡/.test(userMessage):
      message = '連絡です';
      break;
    case /リマインダー/.test(userMessage):
      message = 'リマインダーです';
      break;
    case /設定/.test(userMessage):
      message = '設定です';
      break;
    case /時間割/.test(userMessage):
      message = '時間割です';
      break;
    case /バス/.test(userMessage):
      message = 'バスです';
      break;
    case /ツール/.test(userMessage):
      message = 'ツールです';
      break;
    case /その他/.test(userMessage):
      message = 'その他です';
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

/* メッセージ送信 */
function fetchData(postData, url) {
  const options = {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + ACCESS_TOKEN
    },
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}
