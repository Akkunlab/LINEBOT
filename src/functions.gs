/* テキスト PostData生成 */
function generateText(message) {
  const result = [{
    'type': 'text',
    'text': message,
  }];

  return result;
}

/* 画像 PostData生成 */
function generateImage(image) {
  const result = [{
    'type': 'image',
    'originalContentUrl': image,
    'previewImageUrl': image
  }];

  return result;
}

/* 課題 PostData生成 */
function generateKadai() {
  let item;
  let message = `    　  [ 課題 ]    　  `;
  const quickReplyItemList = [];
  const sheetKadai = spreadSheet.getSheetByName('課題'); // 課題シート取得
  const lastRow = sheetKadai.getRange('A:A').getValues().filter(String).length; // 最終行を取得

  if (lastRow) { // 課題があるとき

    // 課題の数だけmessageに追加
    for (let i = 1; i <= lastRow; i++) {
      message += `\n（${i}）${sheetKadai.getRange(`A${i}`).getValue()}`;
    }

  } else { // 課題がないとき
    message = '課題はありません';
  }

  // quickReplyを10個追加
  for (let i = 1; i <= 10; i++) {
    item = {
      'type': 'action',
      'imageUrl': '',
      'action': {
        'type': 'message',
        'label': i,
        'text': `課題${i}`
      }
    };
    quickReplyItemList.push(item);
  }

  const result = [{
    'type': 'text',
    'text': message,
    'quickReply': { 'items': quickReplyItemList }
  }];

  return result;
}

/* 課題番号 PostData生成 */
function generateKadaiNumber(userMessage) {
  let item;
  const number = Number(userMessage.replace('課題', '')); // 課題番号
  const quickReplyItemList = [];
  const sheetKadai = spreadSheet.getSheetByName('課題'); // 課題シート取得
  const kadai = sheetKadai.getRange(`A${number}`).getValue(); // 番号の課題取得

  if (kadai) { // 課題があるとき
    message = `${kadai}\n${sheetKadai.getRange(`B${number}`).getValue()}`; // 課題の詳細を取得
  } else { // 課題がないとき
    message = '課題はありません';
  }

  // quickReplyを10個追加
  for (let i = 1; i <= 10; i++) {
    item = {
      'type': 'action',
      'imageUrl': '',
      'action': {
        'type': 'message',
        'label': i,
        'text': `課題${i}`
      }
    };
    quickReplyItemList.push(item);
  }

  const result = [{
    'type': 'text',
    'text': message,
    'quickReply': { 'items': quickReplyItemList }
  }];

  // ログ出力
  const sheetLog = spreadSheet.getSheetByName('ログ'); // ログシート取得
  sheetLog.appendRow([JSON.stringify([result])]);

  return result;
}

/* 連絡 PostData生成 */
function generateRenraku() {
  let message = `    　  [ 連絡 ]    　  `;
  const sheetRenraku = spreadSheet.getSheetByName('連絡'); // 連絡シート取得
  const lastRow = sheetRenraku.getRange('A:A').getValues().filter(String).length; // 最終行を取得

  if (lastRow) { // 連絡があるとき
    let title, des;

    // 連絡の数だけmessageに追加
    for (let i = 1; i <= lastRow; i++) {
      title = sheetRenraku.getRange(`A${i}`).getValue();
      des = sheetRenraku.getRange(`B${i}`).getValue();
      message += `\n（${i}）${title}\n　　　${des}`;
    }

  } else { // 連絡がないとき
    message = '連絡はありません';
  }

  const result = [{
    'type': 'text',
    'text': message,
  }];

  return result;
}
