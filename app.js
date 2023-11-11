document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${taskText}</span>
                <div>
                    <button onclick="completeTask(this)">Complete</button>
                    <button class="delete" onclick="deleteTask(this)">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
            taskInput.value = "";
        }
    }

    function completeTask(button) {
        const taskItem = button.parentElement.parentElement; 
        const taskText = taskItem.querySelector("span");
        taskItem.classList.add("completed");
        button.textContent = "Completed";
        button.classList.add("completed");
        button.disabled = true;
    }

    function deleteTask(button) {
        const taskItem = button.parentElement.parentElement;
        taskList.removeChild(taskItem);
    }

    document.getElementById("app").addEventListener("click", function (e) {
        if (e.target.tagName === "BUTTON" && e.target.textContent === "Add") {
            addTask();
        }
        if (e.target.tagName === "BUTTON" && e.target.textContent === "Complete") {
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
});
