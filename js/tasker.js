document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.querySelector(".task-list");
    const form = document.getElementById("form-create-task");
    const newTaskInput = document.getElementById("new-task");
    const sortAscBtn = document.getElementById("sort-asc");
    const sortDescBtn = document.getElementById("sort-desc");
    const filterUrgentBtn = document.getElementById("filter-urgent");
    const resetBtn = document.getElementById("reset");
    const taskSearch = document.getElementById("task-search");

    let originalTasksOrder = Array.from(document.querySelectorAll(".task"));

    function getTasks() {
        return document.querySelectorAll(".task");
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let text = newTaskInput.value.trim();

        if (text) {
            const task = document.createElement("li");
            task.classList.add("task");
            task.innerHTML = `<span>${text}</span>`;
            task.addEventListener('click', function() {
                this.classList.toggle('immediate');
            });
            taskList.appendChild(task);
            newTaskInput.value = "";
            originalTasksOrder = Array.from(getTasks());
        }
    });

    function compareAsc(a, b) {
        return a.textContent.localeCompare(b.textContent);
    }

    function compareDesc(a, b) {
        return b.textContent.localeCompare(a.textContent);
    }

    sortAscBtn.addEventListener("click", function() {
        const tasks = getTasks();
        const sortedTasks = Array.from(tasks).sort(compareAsc);
        renderTasks(sortedTasks);
    });

    sortDescBtn.addEventListener("click", function() {
        const tasks = getTasks();
        const sortedTasks = Array.from(tasks).sort(compareDesc);
        renderTasks(sortedTasks);
    });

    filterUrgentBtn.addEventListener("click", function() {
        const urgentTasks = Array.from(getTasks()).filter(task =>
            task.classList.contains('immediate')
        );
        renderTasks(urgentTasks);
    });

    taskSearch.addEventListener("input", function() {
        const searchText = this.value.toLowerCase();

        if (searchText === "") {
            renderTasks(originalTasksOrder);
            return;
        }

        const filteredTasks = originalTasksOrder.filter(task =>
            task.querySelector("span").textContent.toLowerCase().includes(searchText)
        );
        renderTasks(filteredTasks);
    });

    resetBtn.addEventListener("click", function() {
        renderTasks(originalTasksOrder);
        taskSearch.value = '';
    });

    function renderTasks(tasksArray) {
        taskList.innerHTML = '';
        tasksArray.forEach(task => taskList.appendChild(task));
        initTaskClickHandlers();
    }

    function initTaskClickHandlers() {
        const tasks = getTasks();
        tasks.forEach(task => {
            task.addEventListener('click', function() {
                this.classList.toggle('immediate');
            });
        });
    }

    initTaskClickHandlers();
});