// Initialize the extension
chrome.runtime.onInstalled.addListener(() => {
  // Open the options page on install
  chrome.runtime.openOptionsPage();
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ADD_TO_TODOIST") {
    // Send message to Todoist
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.todoist.com/rest/v1/tasks", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // Send response back to content script
        sendResponse({ success: true });
      }
    };
    xhr.send(
      JSON.stringify({
        content: message.subject,
        project_id: message.projectId,
        label_ids: [message.labelId],
        priority: message.priority,
      })
    );
    // Return true to indicate that a response will be sent asynchronously
    return true;
  }
});

// Listen for changes to storage
chrome.storage.onChanged.addListener((changes, namespace) => {
  // If access token has been updated, reload the extension
  if (changes.access_token && changes.access_token.newValue) {
    chrome.runtime.reload();
  }
});
