// Add email to Todoist
function addToTodoist(subject, projectId, labelId, priority, sender, callback) {
  // Authenticate with Todoist API
  gapi.auth.authorize(
    {
      client_id: "<YOUR_CLIENT_ID>",
      scope: "https://www.googleapis.com/auth/tasks",
      immediate: true,
    },
    (authResult) => {
      if (authResult && !authResult.error) {
        // Get access token
        const accessToken = authResult.access_token;

        // Get Todoist project ID
        gapi.client.tasks.tasklists
          .list({
            maxResults: 10,
          })
          .execute((response) => {
            const tasklists = response.items;
            let projectId = null;
            for (let i = 0; i < tasklists.length; i++) {
              if (tasklists[i].title === "My Project") {
                projectId = tasklists[i].id;
                break;
              }
            }

            if (projectId) {
              // Create task
              gapi.client.tasks.tasks
                .insert({
                  tasklist: projectId,
                  title: subject,
                  notes: `From: ${sender}`,
                  due: new Date(),
                  status: "needsAction",
                })
                .execute((response) => {
                  if (response && response.id) {
                    // Add label to task
                    gapi.client.tasks.tasks
                      .patch({
                        tasklist: projectId,
                        task: response.id,
                        id: response.id,
                        title: subject,
                        notes: `From: ${sender}`,
                        due: new Date(),
                        status: "needsAction",
                        hidden: false,
                        links: [],
                        deleted: false,
                        completed: false,
                        completedDate: null,
                        parent: null,
                        position: 0,
                        priority: priority || "P2",
                        selfLink: null,
                        updated: null,
                        etag: null,
                        labels: [labelId || ""],
                      })
                      .execute((response) => {
                        if (callback) {
                          callback(response);
                        }
                      });
                  }
                });
            }
          });
      }
    }
  );
}

export { addToTodoist };
