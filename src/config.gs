/* グローバル変数 */
const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // アクティブなスプレッドシートを取得
const scriptProperties = PropertiesService.getScriptProperties(); // スクリプトプロパティを取得
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN'); // LINE Messaging APIのアクセストークン
const CALENDAR_ID = scriptProperties.getProperty('CALENDAR_ID'); // GoogleカレンダーID
const CALENDAR_REM_ID = scriptProperties.getProperty('CALENDAR_REM_ID'); // GoogleカレンダーID（リマインダー用）
const IMG_UNREGISTERED = scriptProperties.getProperty('IMG_UNREGISTERED'); // 未登録時に表示される画像
const IMG_TIMETABLE = scriptProperties.getProperty('IMG_TIMETABLE'); // 時間割
const BUS_DATA = scriptProperties.getProperty('BUS_DATA'); // バスのFlex Messageデータ
const WEBSITE_URL = scriptProperties.getProperty('WEBSITE_URL'); // WebサイトURL
const REPLY_URL = 'https://api.line.me/v2/bot/message/reply'; // リプライURL
const MULTICAST_URL = 'https://api.line.me/v2/bot/message/multicast'; // マルチキャストURL（Push）

const userData = {
  number: 0, // 個人番号
  type: 'normal', // キャラタイプ
};
