
const profileForm = document.getElementById("profileForm");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userGrade = document.getElementById("userGrade");
const userGoal = document.getElementById("userGoal");

function loadProfile() {

    const profile = JSON.parse(localStorage.getItem("studentProfile")) || {};

    userName.value = profile.name || "";
    userEmail.value = profile.email || "";
    userGrade.value = profile.grade || "الصف الثاني عشر";
    userGoal.value = profile.goal || "";

    document.getElementById("displayName").textContent =
        profile.name || "اسم الطالبة";
}

profileForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const profile = {
        name: userName.value.trim(),
        email: userEmail.value.trim(),
        grade: userGrade.value,
        goal: userGoal.value.trim()
    };

    localStorage.setItem("studentProfile", JSON.stringify(profile));

    document.getElementById("displayName").textContent = profile.name;

    document.getElementById("saveMessage").textContent =
        "تم حفظ معلوماتك بنجاح ✓";

});

loadProfile();
// تغيير الصورة الشخصية

const profileImageInput =
    document.getElementById("profileImageInput");

const profileImage =
    document.getElementById("profileImage");

const avatarPlaceholder =
    document.getElementById("avatarPlaceholder");


function loadProfileImage() {

    const profile = JSON.parse(
        localStorage.getItem("studentProfile")
    ) || {};

    if (profile.image) {
        profileImage.src = profile.image;
        profileImage.style.display = "block";
        avatarPlaceholder.style.display = "none";
    }
}


profileImageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        alert("اختاري ملف صورة فقط.");
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert("حجم الصورة كبير، اختاري صورة أقل من 2 ميجابايت.");
        this.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        const profile = JSON.parse(
            localStorage.getItem("studentProfile")
        ) || {};

        profile.image = event.target.result;

        localStorage.setItem(
            "studentProfile",
            JSON.stringify(profile)
        );

        loadProfileImage();
    };

    reader.readAsDataURL(file);

});

loadProfileImage();