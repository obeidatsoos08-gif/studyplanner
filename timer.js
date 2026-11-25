
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let timerInterval = null;
let isRunning = false;
let sessions = Number(localStorage.getItem("studySessions")) || 0;

const timerDisplay = document.getElementById("timer");
const timerLabel = document.getElementById("timerLabel");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionsCount = document.getElementById("sessionsCount");
const progressCircle = document.querySelector(".progress-circle");

const circumference = 2 * Math.PI * 125;

progressCircle.style.strokeDasharray = circumference;

function updateDisplay() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const progress = timeLeft / totalTime;

    progressCircle.style.strokeDashoffset =
        circumference * (1 - progress);
}

function startTimer() {

    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = "استمرار";
        return;
    }

    isRunning = true;
    startBtn.textContent = "إيقاف مؤقت";

    timerInterval = setInterval(() => {

        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {

            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = "ابدئي";

            if (totalTime === 1500) {
                sessions++;
                localStorage.setItem("studySessions", sessions);
                sessionsCount.textContent = sessions;
            }

            alert("انتهى الوقت! أحسنتِ 🌸");
        }

    }, 1000);
}

function resetTimer() {

    clearInterval(timerInterval);
    isRunning = false;

    timeLeft = totalTime;

    startBtn.textContent = "ابدئي";

    updateDisplay();
}

startBtn.addEventListener("click", startTimer);

resetBtn.addEventListener("click", resetTimer);

document.querySelectorAll(".mode").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".mode").forEach(mode => {
            mode.classList.remove("active");
        });

        button.classList.add("active");

        totalTime = Number(button.dataset.time);
        timeLeft = totalTime;

        timerLabel.textContent = button.textContent;

        resetTimer();
    });
});

sessionsCount.textContent = sessions;

updateDisplay();
