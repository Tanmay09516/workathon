// Load the Todoist API
function loadTodoistApi(token, callback) {
  var script = document.createElement("script");
  script.onload = callback;
  script.src = "https://api.todoist.com/sync/v8/js/sdk.js";
  document.head.appendChild(script);

  todoist = window.todoist;

  todoist.init(token);
}

// Add a task to a Todoist project with a label
function addTask(task, project_id, label_name) {
  var label_id;

  // Get the ID of the label with the specified name
  todoist.labels.get_all(function (labels) {
    labels.forEach(function (label) {
      if (label.name === label_name) {
        label_id = label.id;
      }
    });

    // Create the task with the label ID
    todoist.items.add({
      content: task,
      project_id: project_id,
      labels: [label_id],
    });
  });
}
