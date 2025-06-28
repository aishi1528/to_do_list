const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Adding a task to the list
function addTask(text = null) {
  const taskText = text || taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;
  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

// Deleting a task
function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

// Saving tasks to local storage
function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll("li span")).map(span => span.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Loading tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task));
}

// Using speech recognition to add a task
function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    addTask(transcript);
  };
  recognition.onerror = function () {
    alert("Error during speech recognition. Try again.");
  };
  recognition.start();
}

// Loading tasks on page load
window.onload = loadTasks;

