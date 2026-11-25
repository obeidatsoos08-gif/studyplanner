
let exams = JSON.parse(localStorage.getItem("studyExams")) || [];

const form = document.getElementById("examForm");
const examsList = document.getElementById("examsList");

function saveExams() {
    localStorage.setItem("studyExams", JSON.stringify(exams));
    displayExams();
}

function displayExams() {

    examsList.innerHTML = "";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    exams.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });

    exams.forEach((exam, index) => {

        const examDate = new Date(exam.date + "T00:00:00");
        const finished = examDate < today;

        const card = document.createElement("div");
        card.className = "exam-card";

        const info = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = exam.name;

        const subject = document.createElement("p");
        subject.textContent = "المادة: " + exam.subject;

        const date = document.createElement("p");
        date.textContent = "التاريخ: " + exam.date;

        const time = document.createElement("p");
        time.textContent = "الوقت: " + exam.time;

        const type = document.createElement("p");
        type.textContent = "النوع: " + exam.type;

        const status = document.createElement("p");
        status.textContent = finished ? "انتهى موعد الامتحان" : "امتحان قادم";

        info.append(title, subject, date, time, type, status);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "حذف";

        deleteBtn.addEventListener("click", () => {
            exams.splice(index, 1);
            saveExams();
        });

        card.append(info, deleteBtn);
        examsList.appendChild(card);
    });

    if (exams.length === 0) {
        examsList.innerHTML =
            '<p class="empty-message">لم تضيفي أي امتحان حتى الآن 🌸</p>';
    }

    updateStats();
}

function updateStats() {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = exams.filter(exam =>
        new Date(exam.date + "T00:00:00") >= today
    ).length;

    const finished = exams.length - upcoming;

    document.getElementById("totalExams").textContent = exams.length;
    document.getElementById("upcomingExams").textContent = upcoming;
    document.getElementById("finishedExams").textContent = finished;
}

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("examName").value.trim();
    const subject = document.getElementById("examSubject").value;
    const date = document.getElementById("examDate").value;
    const time = document.getElementById("examTime").value;
    const type = document.getElementById("examType").value;

    if (!name || !subject || !date || !time) return;

    exams.push({
        name,
        subject,
        date,
        time,
        type
    });

    form.reset();
    saveExams();
});

displayExams();
