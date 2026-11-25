
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

let currentFilter = "all";

const form = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks() {

    tasksList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        tasksList.innerHTML =
            '<p class="empty-message">لا توجد مهام هنا حالياً 🌸</p>';
    }

    filteredTasks.forEach(task => {

        const index = tasks.indexOf(task);

        const div = document.createElement("div");

        div.className = "task-item";

        if (task.completed) {
            div.classList.add("completed");
        }

        const info = document.createElement("div");
        info.className = "task-info";

        const name = document.createElement("h3");
        name.className = "task-name";
        name.textContent = task.name;

        const details = document.createElement("p");
        details.textContent =
            `${task.subject} | موعد الإنجاز: ${task.date}`;

        const priority = document.createElement("p");
        priority.className = "priority";
        priority.textContent = `الأولوية: ${task.priority}`;

        info.append(name, details, priority);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "حذف";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
        });

        actions.append(checkbox, deleteBtn);
        div.append(info, actions);

        tasksList.appendChild(div);
    });

    updateStats();
}

function updateStats() {

    const completed = tasks.filter(task => task.completed).length;
    const remaining = tasks.length - completed;

    document.getElementById("totalTasks").textContent = tasks.length;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("remainingTasks").textContent = remaining;
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("taskName").value.trim();
    const subject = document.getElementById("taskSubject").value;
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("taskPriority").value;

    if (!name || !subject || !date) return;

    tasks.push({
        name,
        subject,
        date,
        priority,
        completed: false
    });

    form.reset();
    saveTasks();
});

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".filter").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();
    });
});

displayTasks();
