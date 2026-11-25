
let currentLanguage = "ar";

// حساب المهام ونسبة الإنجاز

function updateProgress() {

    const tasks = document.querySelectorAll(".task-check");

    const completed = document.querySelectorAll(".task-check:checked").length;

    const total = tasks.length;

    const percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("progressPercent").textContent =
        percent + "%";

    document.getElementById("progressFill").style.width =
        percent + "%";

    document.getElementById("taskCount").textContent =
        total - completed;
}

// متابعة تغيير المهام

document.querySelectorAll(".task-check").forEach(task => {

    task.addEventListener("change", updateProgress);

});

// تشغيل الحساب عند فتح الصفحة

updateProgress();


// تغيير اللغة

function changeLanguage() {

    currentLanguage =
        currentLanguage === "ar" ? "en" : "ar";

    const ar = currentLanguage === "ar";

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir = ar ? "rtl" : "ltr";

    const words = {

        brandName: ["منظّم دراستي", "Study Planner"],

        navHome: ["🏠 الرئيسية", "🏠 Home"],
        navSchedule: ["📅 الجدول الدراسي", "📅 Study Schedule"],
        navTasks: ["📝 المهام", "📝 Tasks"],
        navExams: ["📖 الامتحانات", "📖 Exams"],
        navTimer: ["⏱ مؤقت الدراسة", "⏱ Study Timer"],
        navProgress: ["📊 إنجازاتي", "📊 My Progress"],
        navProfile: ["👤 الملف الشخصي", "👤 My Profile"],
        navSettings: ["⚙ الإعدادات", "⚙ Settings"],
        navLogout: ["🚪 تسجيل الخروج", "🚪 Log Out"],

        welcome: ["مرحباً بك في منظّم دراستي 🌸", "Welcome to Study Planner 🌸"],

        welcomeText: [
            "هيا نبدأ يوماً مليئاً بالإنجاز!",
            "Let's start a productive day!"
        ],

        subjectsTitle: ["المواد الدراسية", "Subjects"],
        subjectsText: ["المواد المسجلة", "Registered subjects"],

        tasksTitle: ["المهام المتبقية", "Remaining Tasks"],
        tasksText: ["مهام تحتاج إلى إنجاز", "Tasks to complete"],

        examsTitle: ["الامتحانات القادمة", "Upcoming Exams"],
        examsText: ["امتحانات قادمة", "Upcoming exams"],

        hoursTitle: ["ساعات الدراسة", "Study Hours"],
        hoursText: ["ساعات هذا الأسبوع", "Hours this week"],

        todayTasks: ["مهامي اليومية", "My Daily Tasks"],

        task1: ["مراجعة اللغة العربية", "Review Arabic"],
        task2: ["حل أسئلة الرياضيات", "Solve Math Questions"],
        task3: ["دراسة الوحدة الإنجليزية", "Study English Unit"],

        progressTitle: ["نسبة الإنجاز", "Completion Rate"],

        scheduleTitle: ["الجدول الدراسي", "Study Schedule"],

        subject1: ["اللغة العربية", "Arabic"],
        subject2: ["اللغة الإنجليزية", "English"],
        subject3: ["التاريخ", "History"],

        lesson1: ["مراجعة الدرس الأول", "Review Lesson One"],
        lesson2: ["دراسة الوحدة الثانية", "Study Unit Two"],
        lesson3: ["مراجعة الدرس", "Review the Lesson"],

        motivationTitle: [
            "استمر، فأنت تقترب من هدفك!",
            "Keep Going, You're Getting Closer!"
        ],

        motivationText: [
            "كل خطوة صغيرة في دراستك تقربك من النجاح.",
            "Every small step brings you closer to success."
        ],

        footer: [
            "© 2026 منظّم دراستي - جميع الحقوق محفوظة",
            "© 2026 Study Planner - All Rights Reserved"
        ]

    };

    // تغيير جميع النصوص

    for (let id in words) {

        document.getElementById(id).textContent =
            words[id][ar ? 0 : 1];

    }

    // زر تغيير اللغة

    document.getElementById("languageBtn").textContent =
        ar ? "English 🌐" : "العربية 🌐";

}
