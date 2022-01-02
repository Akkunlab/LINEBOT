// グローバル変数
const scriptProperties = PropertiesService.getScriptProperties(); // スクリプトプロパティを取得
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN'); // LINE Messaging APIのアクセストークン
const CALENDAR_ID = scriptProperties.getProperty('CALENDAR_ID'); // GoogleカレンダーID
const CALENDAR_REM_ID = scriptProperties.getProperty('CALENDAR_REM_ID'); // GoogleカレンダーID（リマインダー用）
const spreadSheet = SpreadsheetApp.getActiveSpreadsheet(); // アクティブなスプレッドシートを取得
