const swiper = new Swiper(".swiper-container", {
  slidesPerView: 1,
  spaceBetween: 15,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false, // Tiếp tục autoplay ngay cả khi có tương tác
  },
  breakpoints: {
    576: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    992: { slidesPerView: 4, spaceBetween: 30 },
    1200: { slidesPerView: 5, spaceBetween: 30 },
  },
});

// Hàm hiển thị thông tin khi hover
function setupHoverEffect() {
  const slides = document.querySelectorAll(".swiper-slide");

  slides.forEach((slide) => {
    const info = slide.querySelector(".info");

    // Hover vào slide: hiển thị thông tin
    slide.addEventListener("mouseenter", () => {
      if (info) info.style.display = "block"; // Hiển thị thông tin
    });

    // Rời khỏi slide: ẩn thông tin
    slide.addEventListener("mouseleave", () => {
      if (info) info.style.display = "none"; // Ẩn thông tin
    });
  });
}

// Cập nhật khi khởi động và khi slide thay đổi
setupHoverEffect();

// Lắng nghe sự kiện khi slide thay đổi để đảm bảo hover hoạt động trên slide mới
swiper.on("slideChange", setupHoverEffect);

function toggleDropdown(button) {
  const dropdownRow = button.parentElement.parentElement.nextElementSibling;

  // Tìm tất cả các hàng dropdown và đóng lại nếu không phải hàng hiện tại
  const allDropdowns = document.querySelectorAll(".dropdown-content");
  allDropdowns.forEach((row) => {
    if (row !== dropdownRow) {
      row.style.display = "none"; // Đóng tất cả
      const associatedButton = row.previousElementSibling.querySelector(
        ".dropdown-button svg"
      );
      associatedButton.classList.remove("up-icon"); // Đặt lại biểu tượng thành mũi tên xuống
      associatedButton.classList.add("down-icon"); // Đặt lại biểu tượng thành mũi tên xuống
    }
  });

  // Kiểm tra trạng thái của hàng hiện tại
  if (dropdownRow.style.display === "table-row") {
    dropdownRow.style.display = "none"; // Đóng hàng
    const icon = button.querySelector("svg");
    icon.classList.remove("up-icon"); // Đổi thành mũi tên xuống
    icon.classList.add("down-icon"); // Đổi thành mũi tên xuống
  } else {
    dropdownRow.style.display = "table-row"; // Hiển thị hàng
    const icon = button.querySelector("svg");
    icon.classList.remove("down-icon"); // Đổi thành mũi tên lên
    icon.classList.add("up-icon"); // Đổi thành mũi tên lên
  }
}
