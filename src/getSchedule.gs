/* Googleカレンダーから予定を取得 */
function getSchedule() {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID); // Googleカレンダー
  const calendarRem = CalendarApp.getCalendarById(CALENDAR_REM_ID); // Googleカレンダー（リマインダー用）

  const sheetKadai = spreadSheet.getSheetByName('課題'); // 課題シート取得
  const sheetRenraku = spreadSheet.getSheetByName('連絡'); // 連絡シート取得
  const sheetRem = spreadSheet.getSheetByName('リマインダー'); // リマインダーシート取得

  const start = new Date(); // 開始日
  const end = new Date(); // 終了日

  end.setMonth(end.getMonth() + 2); // 2ヵ月先までの予定を取得

  // イベント分類
  let title, des, time;
  const events = calendar.getEvents(start, end); // イベント取得
  const eventsRem = calendarRem.getEvents(start, end); // イベント取得（リマインダー用）

  // シート初期化（20行目まで）
  sheetKadai.getRange(1,1,20,10).clearContent();
  sheetRenraku.getRange(1,1,20,10).clearContent();
  sheetRem.getRange(1,1,20,10).clearContent();

  // Googleカレンダー
  for (let i = 0; i < events.length; i++) {
    title = events[i].getTitle(); // イベントのタイトル
    des = events[i].getDescription(); // イベントの説明
    time = Utilities.formatDate(events[i].getEndTime(), 'JST', 'MM/dd'); // イベントの時間
    
    if (/課題/.test(title)) { // '課題'が含まれる場合
      sheetKadai.appendRow([`${time}${title.replace('[課題]','')}`, des]); // 出力
    } else if (/連絡/.test(title)) { // '連絡'が含まれる場合
      sheetRenraku.appendRow([`${time}${title.replace('[連絡]','')}`, des]); // 出力
    }
  }

  // Googleカレンダー (リマインダー用)
  for (let i = 0; i < eventsRem.length; i++) {
    title = eventsRem[i].getTitle(); // イベントのタイトル
    des = eventsRem[i].getDescription(); // イベントの説明
    time = Utilities.formatDate(eventsRem[i].getEndTime(),'JST','MM/dd'); // イベントの時間
    sheetRem.appendRow([`${time}${title}`, des]); // 出力
  }
}

/* トリガーセット */
function setTrigger() {
  const time = new Date();
  time.setHours(20);
  time.setMinutes(00); 
  ScriptApp.newTrigger('sendPushMessage').timeBased().at(time).create();
}
