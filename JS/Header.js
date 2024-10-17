// Theme Toggle Logic
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("bg-dark");
  document.body.classList.toggle("text-white");
  themeToggle.textContent = document.body.classList.contains("bg-dark")
    ? "🌙"
    : "🌞";
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
