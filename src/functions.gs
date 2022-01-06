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
