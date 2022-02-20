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

/* Usage */
// const userList = ['userID1', 'userID2'];
// const message = 'Hello World!';

// sendPushMessage(userList, message);
