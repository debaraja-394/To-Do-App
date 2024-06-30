document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("new-task");
  const taskList = document.getElementById("task-list");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const task = {
        text: taskText,
        completed: false,
      };
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      addTaskToList(task);
      taskInput.value = "";
    }
  });

  function addTaskToList(task) {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.completed ? "completed" : "";

    li.addEventListener("click", () => {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      li.classList.toggle("completed");
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskList.removeChild(li);
    });

    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }
});
