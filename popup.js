// Load the Gmail API client library
gapi.load('client', function() {
    gapi.client.load('gmail', 'v1', function() {
      // Handle the delete spam button click
      document.getElementById('delete-spam').addEventListener('click', function() {
        // Get the current user's Gmail label IDs
        gapi.client.gmail.users.labels.list({
          userId: 'me'
        }).then(function(response) {
          // Find the spam label ID
          var spamLabelId;
          for (var i = 0; i < response.result.labels.length; i++) {
            if (response.result.labels[i].name === 'SPAM') {
              spamLabelId = response.result.labels[i].id;
              break;
            }
          }
  
          // If the spam label was found
          if (spamLabelId) {
            // Get the current user's Gmail messages
            gapi.client.gmail.users.messages.list({
              userId: 'me',
              labelIds: [spamLabelId]
            }).then(function(response) {
              // Delete each spam message
              for (var i = 0; i < response.result.messages.length; i++) {
                gapi.client.gmail.users.messages.delete({
                  userId: 'me',
                  id: response.result.messages[i].id
                });
              }
            });
          }
        });
      });
    });
  });
  