// グローバル変数
const scriptProperties = PropertiesService.getScriptProperties(); // スクリプトプロパティを取得
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN'); // LINE Messaging APIのアクセストークン
