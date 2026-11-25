
const form = document.getElementById("scheduleForm");
const daysContainer = document.getElementById("daysContainer");

let lessons = JSON.parse(localStorage.getItem("lessons")) || [];

function displayLessons() {
    document.querySelectorAll(".lessons").forEach(box => {
        box.innerHTML = "";
    });

    lessons.forEach((lesson, index) => {
        const dayCard = [...document.querySelectorAll(".day-card")]
            .find(card => card.querySelector("h3").textContent === lesson.day);

        if (!dayCard) return;

        const lessonBox = dayCard.querySelector(".lessons");

        const div = document.createElement("div");
        div.className = "lesson";

        const info = document.createElement("p");
        info.textContent = `${lesson.subject} | ${lesson.start} - ${lesson.end}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "حذف";

        deleteBtn.addEventListener("click", () => {
            lessons.splice(index, 1);
            saveLessons();
        });

        div.append(info, deleteBtn);
        lessonBox.appendChild(div);
    });
}

function saveLessons() {
    localStorage.setItem("lessons", JSON.stringify(lessons));
    displayLessons();
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const day = document.getElementById("day").value;
    const subject = document.getElementById("subject").value.trim();
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;

    if (start >= end) {
        alert("وقت النهاية يجب أن يكون بعد وقت البداية");
        return;
    }

    lessons.push({ day, subject, start, end });

    saveLessons();
    form.reset();
});

function changeLanguage() {
    const isArabic = document.documentElement.lang === "ar";

    document.documentElement.lang = isArabic ? "en" : "ar";
    document.documentElement.dir = isArabic ? "ltr" : "rtl";

    const words = isArabic ? {
        page: "Study Schedule",
        description: "Organize your time throughout the week",
        title: "My Weekly Schedule",
        add: "Add a Study Lesson",
        day: "Day",
        subject: "Subject",
        start: "Start Time",
        end: "End Time",
        button: "Add Lesson +",
        language: "العربية"
    } : {
        page: "الجدول الدراسي",
        description: "نظّمي وقتك ووزّعي موادك خلال الأسبوع",
        title: "جدولي الأسبوعي",
        add: "إضافة حصة دراسية",
        day: "اليوم",
        subject: "المادة",
        start: "وقت البداية",
        end: "وقت النهاية",
        button: "إضافة الحصة +",
        language: "English"
    };

    document.getElementById("pageTitle").textContent = words.page;
    document.querySelector("header p").textContent = words.description;
    document.getElementById("scheduleTitle").textContent = words.title;
    document.getElementById("addTitle").textContent = words.add;
    document.getElementById("dayLabel").textContent = words.day;
    document.getElementById("subjectLabel").textContent = words.subject;
    document.getElementById("startLabel").textContent = words.start;
    document.getElementById("endLabel").textContent = words.end;
    document.getElementById("addBtn").textContent = words.button;
    document.getElementById("languageBtn").textContent = words.language;
}

displayLessons();
