const STORAGE_KEY = "mini_project_tasks_v1";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskTemplate = document.getElementById("taskTemplate");
const countTotal = document.getElementById("countTotal");
const countActive = document.getElementById("countActive");
const countDone = document.getElementById("countDone");
const filterButtons = Array.from(document.querySelectorAll(".filter"));
const clearCompletedBtn = document.getElementById("clearCompleted");

let tasks = [];
let activeFilter = "all";

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  tasks = saved ? JSON.parse(saved) : [];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateCounts() {
  const total = tasks.length;
  const done = tasks.filter(task => task.completed).length;
  const active = total - done;

  countTotal.textContent = total;
  countActive.textContent = active;
  countDone.textContent = done;
}

function applyFilter(task) {
  if (activeFilter === "active") return !task.completed;
  if (activeFilter === "completed") return task.completed;
  return true;
}

function renderTasks() {
  taskList.innerHTML = "";

  const visibleTasks = tasks.filter(applyFilter);

  visibleTasks.forEach(task => {
    const node = taskTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.id = task.id;

    const checkbox = node.querySelector(".task__check");
    const text = node.querySelector(".task__text");

    checkbox.checked = task.completed;
    text.textContent = task.title;

    if (task.completed) {
      node.classList.add("completed");
    }

    taskList.appendChild(node);
  });

  emptyState.style.display = visibleTasks.length === 0 ? "block" : "none";
  updateCounts();
}

function addTask(title) {
  tasks.unshift({
    id: crypto.randomUUID(),
    title,
    completed: false,
  });
  saveTasks();
  renderTasks();
}

function updateTask(id, updates) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  Object.assign(task, updates);
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function setActiveFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.filter === filter);
  });
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function startEditTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;

  const newTitle = prompt("Edit task", task.title);
  if (newTitle === null) return;

  const trimmed = newTitle.trim();
  if (!trimmed) {
    alert("Task name cannot be empty.");
    return;
  }

  updateTask(id, { title: trimmed });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (!title) {
    taskInput.focus();
    return;
  }
  addTask(title);
  taskInput.value = "";
}

function handleTaskListClick(event) {
  const item = event.target.closest(".task");
  if (!item) return;

  const id = item.dataset.id;

  if (event.target.classList.contains("task__delete")) {
    deleteTask(id);
  }

  if (event.target.classList.contains("task__edit")) {
    startEditTask(id);
  }
}

function handleTaskListChange(event) {
  if (!event.target.classList.contains("task__check")) return;
  const item = event.target.closest(".task");
  if (!item) return;
  updateTask(item.dataset.id, { completed: event.target.checked });
}

function handleFilterClick(event) {
  const button = event.target.closest(".filter");
  if (!button || !button.dataset.filter) return;
  setActiveFilter(button.dataset.filter);
}

function init() {
  loadTasks();
  renderTasks();

  taskForm.addEventListener("submit", handleFormSubmit);
  taskList.addEventListener("click", handleTaskListClick);
  taskList.addEventListener("change", handleTaskListChange);
  document.querySelector(".filters").addEventListener("click", handleFilterClick);
  clearCompletedBtn.addEventListener("click", clearCompleted);
}

init();
