const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

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

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li span").forEach(span => {
    tasks.push(span.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task));
}

function startListening() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech recognition not supported");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    addTask(transcript);
  };
  recognition.start();
}

window.onload = loadTasks;
