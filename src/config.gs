/* グローバル変数 */
const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // アクティブなスプレッドシートを取得
const scriptProperties = PropertiesService.getScriptProperties(); // スクリプトプロパティを取得
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN'); // LINE Messaging APIのアクセストークン
const CALENDAR_ID = scriptProperties.getProperty('CALENDAR_ID'); // GoogleカレンダーID
const CALENDAR_REM_ID = scriptProperties.getProperty('CALENDAR_REM_ID'); // GoogleカレンダーID（リマインダー用）
const REPLY_URL = 'https://api.line.me/v2/bot/message/reply'; // リプライURL
const MULTICAST_URL = 'https://api.line.me/v2/bot/message/multicast'; // マルチキャストURL（Push）
