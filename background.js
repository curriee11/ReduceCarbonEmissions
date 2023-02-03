// Use the Gmail API to access the user's email data
var request = gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'labelIds': ['SPAM']
  });
  
  request.execute(function(response) {
    var messages = response.messages;
    if (messages && messages.length > 0) {
      // Delete all spam emails
      messages.forEach(function(message) {
        gapi.client.gmail.users.messages.delete({
          'userId': 'me',
          'id': message.id
        });
      });
    }
  });
  