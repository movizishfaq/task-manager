document.addEventListener("DOMContentLoaded", () => {
  const addTaskButton = document.getElementById("addTaskButton");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const noTaskMessage = document.getElementById("noTaskMessage");
  const toast = document.getElementById("toast");
  const editModal = document.getElementById("editModal");
  const editTaskInput = document.getElementById("editTaskInput");
  const saveEditButton = document.getElementById("saveEditButton");
  const cancelEditButton = document.getElementById("cancelEditButton");

  let currentTaskItem;

  addTaskButton.addEventListener("click", addTask);

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    noTaskMessage.style.display = "none";

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const taskItem = document.createElement("li");
    taskItem.classList.add(
      "bg-gray-50",
      "p-3",
      "rounded-lg",
      "shadow-md",
      "flex",
      "justify-between",
      "items-center"
    );
    taskItem.innerHTML = `
      <div>
        <p class="text-gray-800">${taskText}</p>
        <p class="text-gray-400 text-sm">${formattedDate} ${formattedTime}</p>
      </div>
      <div class="flex space-x-2">
        <button class="text-yellow-500 hover:text-yellow-600 font-semibold" onclick="editTask(this)">Edit</button>
        <button class="text-red-500 hover:text-red-600 font-semibold" onclick="removeTask(this)">Delete</button>
      </div>
    `;

    taskList.appendChild(taskItem);
    taskInput.value = "";

    showToast("Task added successfully!");
  }

  window.removeTask = function (button) {
    const taskItem = button.parentElement.parentElement;
    taskList.removeChild(taskItem);

    if (taskList.children.length === 0) {
      noTaskMessage.style.display = "block";
    }
  };

  window.editTask = function (button) {
    currentTaskItem = button.parentElement.parentElement;
    const taskTextElement = currentTaskItem.querySelector("p.text-gray-800");
    editTaskInput.value = taskTextElement.textContent;

    editModal.classList.remove("hidden");

    saveEditButton.onclick = function () {
      const updatedTaskText = editTaskInput.value.trim();
      if (updatedTaskText === "") return;

      taskTextElement.textContent = updatedTaskText;
      editModal.classList.add("hidden");
      showToast("Task updated successfully!");
    };

    cancelEditButton.onclick = function () {
      editModal.classList.add("hidden");
    };
  };

  function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";
    toast.style.opacity = 1;
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => {
        toast.style.display = "none";
      }, 300);
    }, 3000);
  }
});
