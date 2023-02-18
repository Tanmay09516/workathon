// Include API file
import { addToTodoist } from "./api.js";

// Create button
const addToTodoistButton = document.createElement("button");
addToTodoistButton.innerText = "Add to Todoist";
addToTodoistButton.style.display = "none";
addToTodoistButton.onclick = () => {
  // Get email subject and sender
  const subject = document.querySelector("h2.hP").innerText;
  const sender = document.querySelector("span.gD").innerText;

  // Add email to Todoist
  addToTodoist(
    subject,
    localStorage.getItem("project_id"),
    localStorage.getItem("label_id"),
    localStorage.getItem("priority"),
    sender,
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
  if (emailToolbar && emailToolbar.children.length > 0) {
    addToTodoistButton.style.display = "block";
  } else {
    addToTodoistButton.style.display = "none";
  }
});
observer.observe(document.querySelector("body"), {
  childList: true,
  subtree: true,
});
