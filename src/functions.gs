/* 課題 PostData生成 */
function generateKadai() {
  let message = `    　  [ 課題 ]    　  `;
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

  return message;
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

  return message;
}
