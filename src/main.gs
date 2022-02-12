/* メッセージ受信 */
function doPost(e) {
  const json = JSON.parse(e.postData.contents).events[0];
  const postData = createPostData(json); // PostData作成

  fetchData(postData, REPLY_URL); // メッセージ送信

  // ログ出力
  const sheetLog = spreadSheet.getSheetByName('ログ'); // ログシート取得

  sheetLog.appendRow([
    new Date(), // 日付
    json.message.text, // 受信したメッセージ
    json.source.userId, // ユーザID
    json.source.groupId // グループID
  ]);
}

/* PostData作成 */
function createPostData(json) {
  let messages = '';
  const userMessage = json.message.text; // 受信したメッセージ

  switch (true) {
    case /^課題$/.test(userMessage):
      messages = generateKadai(); // 課題 PostData生成
      break;
    case /^課題\d*$/.test(userMessage):
      messages = generateKadaiNumber(userMessage); // 課題番号 PostData生成
      break;
    case /^連絡$/.test(userMessage):
      messages = generateRenraku(); // 連絡 PostData生成
      break;
    case /^リマインダー$/.test(userMessage):
      messages = generateText('リマインダーです');
      break;
    case /^設定$/.test(userMessage):
      messages = generateText('設定です');
      break;
    case /^時間割$/.test(userMessage):
      messages = generateImage(IMG_TIMETABLE);
      break;
    case /^バス$/.test(userMessage):
      messages = generateText('バスです');
      break;
    case /^ツール$/.test(userMessage):
      messages = generateText('ツールです');
      break;
    case /^その他$/.test(userMessage):
      messages = generateText('その他です');
      break;
    case /^ブロック$/.test(userMessage):
      messages = generateText('ブロックです');
      break;
    default:
      messages = generateImage(IMG_UNREGISTERED);
      break;
  }

  const postData = {
    'replyToken': json.replyToken,
    'messages': messages
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
