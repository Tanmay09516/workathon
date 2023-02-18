// Create button
const addToTodoistButton = document.createElement("button");
addToTodoistButton.innerText = "Add to Todoist";
addToTodoistButton.style.display = "none";
addToTodoistButton.onclick = () => {
  // Get email subject and sender
  const subject = document.querySelector("h2.hP").innerText;
  const sender = document.querySelector("span.gD").innerText;

  // Send message to background script to add email to Todoist
  chrome.runtime.sendMessage(
    {
      type: "ADD_TO_TODOIST",
      subject,
      projectId: localStorage.getItem("project_id"),
      labelId: localStorage.getItem("label_id"),
      priority: localStorage.getItem("priority"),
    },
    (response) => {
      // Show success message if response is successful
      if (response && response.success) {
        alert("Email added to Todoist successfully!");
      }
    }
  );
};

// Insert button above email
const emailToolbar = document.querySelector(".Tm.aeJ");
emailToolbar.insertBefore(addToTodoistButton, emailToolbar.firstChild);

// Show button when email is opened
const observer = new MutationObserver(() => {
  const emailToolbar = document.querySelector(".Tm.aeJ");
  if (emailToolbar && !emailToolbar.contains(addToTodoistButton)) {
    emailToolbar.insertBefore(addToTodoistButton, emailToolbar.firstChild);
  }
  addToTodoistButton.style.display = "block";
});
observer.observe(document, { subtree: true, childList: true });
