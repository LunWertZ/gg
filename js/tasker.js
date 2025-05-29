document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.querySelector(".task-list");
    const form = document.getElementById("form-create-task");
    const newTaskInput = document.getElementById("new-task");
    const sortAscBtn = document.getElementById("sort-asc");
    const sortDescBtn = document.getElementById("sort-desc");
    const filterUrgentBtn = document.getElementById("filter-urgent");
    const resetBtn = document.getElementById("reset");
    const taskSearch = document.getElementById("task-search");
    
    // Сохраняем исходный порядок задач
    let originalTasksOrder = Array.from(document.querySelectorAll(".task"));

    // Функция для получения текущего списка задач
    function getTasks() {
        return document.querySelectorAll(".task");
    }

    // Добавление новой задачи
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
            // Обновляем исходный порядок
            originalTasksOrder = Array.from(getTasks());
        }
    });

    // ... (функции compareAsc и compareDesc остаются без изменений)

    // Сортировка по алфавиту (А-Я)
    sortAscBtn.addEventListener("click", function() {
        const tasks = getTasks();
        const sortedTasks = Array.from(tasks).sort(compareAsc);
        renderTasks(sortedTasks);
    });

    // Сортировка по алфавиту (Я-А)
    sortDescBtn.addEventListener("click", function() {
        const tasks = getTasks();
        const sortedTasks = Array.from(tasks).sort(compareDesc);
        renderTasks(sortedTasks);
    });

    // Фильтрация срочных задач
    filterUrgentBtn.addEventListener("click", function() {
        const tasks = getTasks();
        const urgentTasks = Array.from(tasks).filter(task => 
            task.classList.contains('immediate')
        );
        renderTasks(urgentTasks);
    });

    // Поиск задач
    taskSearch.addEventListener("input", function() {
        const searchText = this.value.toLowerCase();
        const tasks = getTasks();
        const filteredTasks = Array.from(tasks).filter(task => 
            task.querySelector("span").textContent.toLowerCase().includes(searchText)
        );
        renderTasks(filteredTasks);
    });

    // Сброс фильтров (исправлено)
    resetBtn.addEventListener("click", function() {
        renderTasks(originalTasksOrder);
        taskSearch.value = '';
    });

    // Функция для отображения задач
    function renderTasks(tasksArray) {
        taskList.innerHTML = '';
        tasksArray.forEach(task => taskList.appendChild(task.cloneNode(true)));
        
        // Обновляем обработчики клика
        initTaskClickHandlers();
    }

    // Инициализация обработчиков клика
    function initTaskClickHandlers() {
        const tasks = getTasks();
        tasks.forEach(task => {
            task.addEventListener('click', function() {
                this.classList.toggle('immediate');
            });
        });
    }

    // Первоначальная инициализация
    initTaskClickHandlers();
});