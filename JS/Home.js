const swiper = new Swiper(".swiper-container", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

let autoplayEnabled = true;

// Thêm sự kiện cho nút
document
  .getElementById("toggle-autoplay")
  .addEventListener("click", function () {
    if (autoplayEnabled) {
      swiper.autoplay.stop(); // Dừng autoplay
      this.querySelector(".play-icon").style.display = "none"; // Ẩn biểu tượng phát
      this.querySelector(".pause-icon").classList.remove("hidden"); // Hiện biểu tượng dừng
    } else {
      swiper.autoplay.start(); // Bắt đầu autoplay
      this.querySelector(".play-icon").style.display = "block"; // Hiện biểu tượng phát
      this.querySelector(".pause-icon").classList.add("hidden"); // Ẩn biểu tượng dừng
    }
    autoplayEnabled = !autoplayEnabled; // Chuyển đổi trạng thái
  });
