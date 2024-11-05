// Theme Toggle Logic
const themeToggle = document.getElementById("themeToggle");

// Kiểm tra và áp dụng theme đã lưu trong localStorage khi tải trang
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("bg-dark", "text-white");
  themeToggle.textContent = "🌙";
} else {
  document.body.classList.remove("bg-dark", "text-white");
  themeToggle.textContent = "🌞";
}

// Lắng nghe sự kiện click để thay đổi theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("bg-dark");
  document.body.classList.toggle("text-white");

  // Cập nhật biểu tượng và lưu theme mới vào localStorage
  if (document.body.classList.contains("bg-dark")) {
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.textContent = "🌞";
    localStorage.setItem("theme", "light");
  }
});

// Language Switch Logic
const languageSwitch = document.getElementById("languageSwitch");
languageSwitch.addEventListener("click", () => {
  const currentLang = languageSwitch.textContent;

  // Chuyển đổi giữa tiếng Anh và tiếng Việt
  if (currentLang === "EN") {
    languageSwitch.textContent = "VI"; // Đổi sang tiếng Việt
    // Thêm logic để thay đổi nội dung trang nếu cần
  } else {
    languageSwitch.textContent = "EN"; // Đổi về tiếng Anh
    // Thêm logic để thay đổi nội dung trang nếu cần
  }
});

// Gán class active cho liên kết hiện tại
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const currentPath = window.location.pathname.split("/").pop(); // Lấy tên file hiện tại

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active"); // Gán class active cho liên kết hiện tại
  }
});

// Lấy phần tử nút
const scrollToTopBtn = document.getElementById("scrollToTop");

// Lắng nghe sự kiện click
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên trên cùng
});

// Hiện nút khi cuộn xuống
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopBtn.style.display = "flex"; // Hiện nút
  } else {
    scrollToTopBtn.style.display = "none"; // Ẩn nút
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const headerLoginButton = document.getElementById("headerLogin");

  // Kiểm tra trạng thái đăng nhập từ localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // Nếu người dùng đã đăng nhập, đổi nút thành "Tài Khoản"
    headerLoginButton.textContent = "Tài Khoản";
    headerLoginButton.onclick = function () {
      location.href = "../Account.html"; // Dẫn đến trang tài khoản
    };
  } else {
    // Nếu chưa đăng nhập, giữ nguyên nút "Đăng Nhập"
    headerLoginButton.onclick = function () {
      location.href = "../Register_Login.html"; // Dẫn đến trang đăng nhập
    };
  }
});
