document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((task) => {
            const li = createTaskElement(task.text, task.completed);
            taskList.appendChild(li);
        });
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map((li) => {
            return {
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed"),
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Helper function to create a task element
    function createTaskElement(taskText, completed) {
        const li = document.createElement("li");
        if (completed) {
            li.classList.add("completed");
        }
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="completeTask(this)">Complete</button>
                <button class="delete" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        return li;
    }

    // Add task to the list
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = createTaskElement(taskText, false);
            taskList.appendChild(li);
            saveTasks();
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Mark task as completed
    function completeTask(button) {
        const taskItem = button.parentElement.parentElement;
        const taskText = taskItem.querySelector("span");
        taskItem.classList.toggle("completed");
        button.textContent = taskItem.classList.contains("completed") ? "Completed" : "Complete";
        saveTasks();
    }

    // Delete task
    function deleteTask(button) {
        const taskItem = button.parentElement.parentElement;
        taskList.removeChild(taskItem);
        saveTasks();
    }

    // Event listeners
    document.getElementById("app").addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON" && e.target.textContent === "Add") {
            addTask();
        }
        if (e.target.tagName === "BUTTON" && (e.target.textContent === "Complete" || e.target.textContent === "Completed")) {
            completeTask(e.target);
        }
        if (e.target.classList.contains("delete")) {
            deleteTask(e.target);
        }
    });

    taskInput.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // Demonstration of throwing and handling exceptions
    function demonstrateException() {
        throw new Error("This is a demonstration of throwing an exception.");
    }

    try {
        demonstrateException();
    } catch (error) {
        console.error("Caught an exception:", error.message);
    }

    loadTasks();
});
