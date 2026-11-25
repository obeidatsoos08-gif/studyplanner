
const darkMode = document.getElementById("darkMode");
const language = document.getElementById("language");
const saveSettings = document.getElementById("saveSettings");
const message = document.getElementById("message");
const clearData = document.getElementById("clearData");

// تحميل الإعدادات المحفوظة
darkMode.checked = localStorage.getItem("siteTheme") === "dark";
language.value = localStorage.getItem("siteLanguage") || "ar";

// تطبيق الوضع الداكن
function applyTheme() {
    document.body.classList.toggle("dark", darkMode.checked);
}

applyTheme();

darkMode.addEventListener("change", applyTheme);

// حفظ الإعدادات
saveSettings.addEventListener("click", function () {
    localStorage.setItem(
        "siteTheme",
        darkMode.checked ? "dark" : "light"
    );

    localStorage.setItem("siteLanguage", language.value);

    message.textContent = "تم حفظ الإعدادات بنجاح ✓";
});

const confirmModal = document.getElementById("confirmModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

// إظهار نافذة التأكيد
clearData.addEventListener("click", function () {
    confirmModal.classList.add("show");
});

// إلغاء المسح
cancelDelete.addEventListener("click", function () {
    confirmModal.classList.remove("show");
});

// تأكيد المسح
confirmDelete.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
}); 

