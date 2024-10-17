// Khởi tạo Swiper
const swiper = new Swiper(".swiper-container", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Hàm để ẩn tất cả thông tin và chỉ hiển thị thông tin của slide hiện tại
function updateInfoDisplay(index) {
  const slides = document.querySelectorAll(".swiper-slide");

  // Ẩn tất cả thông tin
  slides.forEach((slide) => {
    const info = slide.querySelector(".info");
    if (info) {
      info.style.display = "none"; // Ẩn thông tin
    }
  });

  // Hiển thị thông tin cho slide hiện tại
  const currentSlide = slides[index];
  if (currentSlide) {
    const info = currentSlide.querySelector(".info");
    if (info) {
      info.style.display = "block"; // Hiển thị thông tin của slide hiện tại
    }
  }
}

// Lắng nghe sự kiện slideChange của Swiper
swiper.on("slideChange", function () {
  updateInfoDisplay(swiper.activeIndex);
});

// Gọi hàm để hiển thị thông tin cho ưu đãi đầu tiên khi khởi tạo
updateInfoDisplay(0);
