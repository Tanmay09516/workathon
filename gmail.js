// Load the Gmail API
function loadGmailApi(callback) {
  gapi.client.load("gmail", "v1", callback);
}

// Retrieve a list of emails from the user's inbox
function listEmails(query, callback) {
  var request = gapi.client.gmail.users.messages.list({
    userId: "me",
    q: query,
  });

  request.execute(function (response) {
    callback(response.messages);
  });
}

// Retrieve the full email message using the message ID
function getEmail(messageId, callback) {
  var request = gapi.client.gmail.users.messages.get({
    userId: "me",
    id: messageId,
  });

  request.execute(callback);
}
