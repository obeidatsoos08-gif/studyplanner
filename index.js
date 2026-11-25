
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from
"https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyCYNhohNvlRoC6HQe8TWxOtHOYMsqkqsDI",
    authDomain: "study-planner-23ad7.firebaseapp.com",
    projectId: "study-planner-23ad7",
    storageBucket: "study-planner-23ad7.firebasestorage.app",
    messagingSenderId: "602533318344",
    appId: "1:602533318344:web:f0d6c31d10f20e34159ffd",
    measurementId: "G-QEPKQ8CNX6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let currentLanguage = "ar";


// تغيير اللغة

window.changeLanguage = function () {

    currentLanguage =
        currentLanguage === "ar" ? "en" : "ar";

    const ar = currentLanguage === "ar";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = ar ? "rtl" : "ltr";

    const words = {
        sideTitle: ["منظّم دراستي", "Study Planner"],

        sideText: [
            "نظّم وقتك، وحقق أهدافك!<br>ابدأ رحلتك نحو النجاح معنا.",
            "Organize your time and achieve your goals!<br>Start your journey to success with us."
        ],

        quote: [
            "كل مجهود تبذله اليوم هو استثمار في مستقبلك.",
            "Every effort you make today is an investment in your future."
        ],

        loginTitle: ["مرحباً بعودتك!", "Welcome Back!"],

        loginSubtitle: [
            "سجّل دخولك للبدء بتنظيم دراستك.",
            "Log in to start organizing your studies."
        ],

        loginTab: ["تسجيل الدخول", "Login"],
        signupTab: ["إنشاء حساب", "Sign Up"],

        emailLabel: ["البريد الإلكتروني", "Email Address"],
        passwordLabel: ["كلمة المرور", "Password"],

        loginBtn: ["تسجيل الدخول", "Login"],

        signupTitle: ["إنشاء حساب جديد", "Create a New Account"],

        signupSubtitle: [
            "أنشئ حسابك وابدأ بتنظيم وقتك.",
            "Create your account and organize your time."
        ],

        nameLabel: ["الاسم الكامل", "Full Name"],
        signupEmailLabel: ["البريد الإلكتروني", "Email Address"],
        signupPasswordLabel: ["كلمة المرور", "Password"],

        signupBtn: ["إنشاء حساب", "Create Account"],

        googleLoginText: [
            "المتابعة باستخدام Google",
            "Continue with Google"
        ],

        googleSignupText: [
            "التسجيل باستخدام Google",
            "Sign up with Google"
        ],

        footer: [
            "© 2026 منظّم دراستي - جميع الحقوق محفوظة",
            "© 2026 Study Planner - All Rights Reserved"
        ]
    };

    for (const id in words) {
        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = words[id][ar ? 0 : 1];
        }
    }

    document.getElementById("langBtn").textContent =
        ar ? "English 🌐" : "العربية 🌐";

    document.getElementById("fullName").placeholder =
        ar ? "أدخل اسمك" : "Enter your name";
};


// عرض تسجيل الدخول

window.showLogin = function () {

    document.getElementById("loginBox").classList.remove("hidden");
    document.getElementById("signupBox").classList.add("hidden");

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");
};


// عرض إنشاء حساب

window.showSignup = function () {

    document.getElementById("signupBox").classList.remove("hidden");
    document.getElementById("loginBox").classList.add("hidden");

    document.getElementById("signupTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
};


// رسائل الأخطاء

function errorMessage(error) {

    const ar = currentLanguage === "ar";

    const messages = {
        "auth/email-already-in-use":
            ar ? "هذا البريد الإلكتروني مسجل مسبقاً."
               : "This email is already registered.",

        "auth/invalid-email":
            ar ? "البريد الإلكتروني غير صحيح."
               : "Invalid email address.",

        "auth/weak-password":
            ar ? "كلمة المرور ضعيفة."
               : "Password is too weak.",

        "auth/invalid-credential":
            ar ? "البريد الإلكتروني أو كلمة المرور غير صحيحة."
               : "Incorrect email or password.",

        "auth/user-not-found":
            ar ? "لا يوجد حساب بهذا البريد الإلكتروني."
               : "No account found with this email.",

        "auth/wrong-password":
            ar ? "كلمة المرور غير صحيحة."
               : "Incorrect password.",

        "auth/popup-closed-by-user":
            ar ? "تم إغلاق نافذة Google."
               : "Google sign-in was cancelled.",

        "auth/unauthorized-domain":
            ar ? "الموقع غير مضاف إلى النطاقات المسموحة في Firebase."
               : "This domain is not authorized.",

        "auth/popup-blocked":
            ar ? "المتصفح منع نافذة Google."
               : "The browser blocked the Google popup.",

        "auth/network-request-failed":
            ar ? "تحققي من اتصال الإنترنت."
               : "Check your internet connection."
    };

    return messages[error.code] ||
        (ar ? "حدث خطأ: " + error.code
            : "An error occurred: " + error.code);
}


// إنشاء حساب

document.getElementById("signupForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const name =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const message =
            document.getElementById("signupMessage");

        message.textContent =
            currentLanguage === "ar"
            ? "جارٍ إنشاء الحساب..."
            : "Creating account...";

        try {

            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await updateProfile(result.user, {
                displayName: name
            });

            localStorage.setItem("studentName", name);

            window.location.href = "dashboard.html";

        } catch (error) {

            message.textContent = errorMessage(error);

        }
    });


// تسجيل الدخول

document.getElementById("loginForm")
    .addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");

        message.textContent =
            currentLanguage === "ar"
            ? "جارٍ تسجيل الدخول..."
            : "Signing in...";

        try {

            const result =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            localStorage.setItem(
                "studentName",
                result.user.displayName || result.user.email
            );

            window.location.href = "dashboard.html";

        } catch (error) {

            message.textContent = errorMessage(error);

        }
    });


// تسجيل الدخول باستخدام Google

window.googleLogin = async function () {

    const isSignup =
        document.getElementById("loginBox")
        .classList.contains("hidden");

    const message = document.getElementById(
        isSignup ? "signupMessage" : "loginMessage"
    );

    message.textContent =
        currentLanguage === "ar"
        ? "جارٍ فتح Google..."
        : "Opening Google...";

    try {

        const result =
            await signInWithPopup(auth, googleProvider);

        const name =
            result.user.displayName || result.user.email;

        localStorage.setItem("studentName", name);

        window.location.href = "dashboard.html";

    } catch (error) {

        message.textContent = errorMessage(error);

    }
};
