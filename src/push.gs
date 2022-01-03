/* Pushメッセージ送信 */
function sendPushMessage(userList, message) {
  const postData = {
    'to': userList,
    'messages': [{
      'type': 'text',
      'text': message
    }]
  };

  fetchData(postData, MULTICAST_URL); // メッセージ送信
}
