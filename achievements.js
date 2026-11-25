
function updateAchievements() {

    const tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];
    const sessions = Number(localStorage.getItem("studySessions")) || 0;
    const exams = JSON.parse(localStorage.getItem("studyExams")) || [];

    const completed = tasks.filter(task => task.completed).length;

    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("studySessions").textContent = sessions;
    document.getElementById("totalExams").textContent = exams.length;

    const percentage = tasks.length === 0
        ? 0
        : Math.round((completed / tasks.length) * 100);

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% من المهام مكتملة";

    const achievements = [
        { id: "badge1", condition: completed >= 1 },
        { id: "badge2", condition: completed >= 5 },
        { id: "badge3", condition: completed >= 10 },
        { id: "badge4", condition: sessions >= 5 },
        { id: "badge5", condition: completed >= 20 }
    ];

    achievements.forEach(item => {

        const badge = document.getElementById(item.id);
        const message = badge.querySelector("small");

        if (item.condition) {
            badge.classList.add("earned");
            message.textContent = "تم الحصول عليها ✓";
        } else {
            badge.classList.remove("earned");
            message.textContent = "غير مكتسبة بعد";
        }

    });
}

updateAchievements();
