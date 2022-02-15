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
  let messages;
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
      messages = generateTemplate(2, [{
        'title': 'リマインダー設定',
        'text': '以下から選択して下さい',
      },{
        'type': 'uri',
        'label': '登録',
        'value': `https://www.youtube.com/`
      },{
        'type': 'uri',
        'label': '削除',
        'value': `https://www.youtube.com/`
      }]);
      break;
    case /^時間割$/.test(userMessage):
      messages = generateImage(IMG_TIMETABLE);
      break;
    case /^バス$/.test(userMessage):
      messages = JSON.parse(BUS_DATA); // BUS_DATAを返信
      break;
    case /^ツール$/.test(userMessage):
      messages = generateTemplate(3, [{
        'title': 'ツール',
        'text': '以下から選択して下さい',
      },{
        'type': 'uri',
        'label': '説明',
        'value': `https://www.youtube.com/`
      },{
        'type': 'uri',
        'label': '設定',
        'value': `https://www.youtube.com/`
      },{
        'type': 'uri',
        'label': '統計',
        'value': `https://www.youtube.com/`
      }]);
      break;
    case /^その他$/.test(userMessage):
      messages = generateTemplate(2, [{
        'title': 'その他',
        'text': '以下から選択して下さい',
      },{
        'type': 'message',
        'label': '時間割',
        'value': '時間割'
      },{
        'type': 'message',
        'label': 'グループ送信',
        'value': 'グループ送信'
      }]);
      break;
    case /^ブロック$/.test(userMessage):
      messages = generateText('現在あなたはブロックされているためRABOTを使用できません');
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
