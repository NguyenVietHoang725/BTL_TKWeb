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
    disableOnInteraction: false,
  },
  breakpoints: {
    576: { slidesPerView: 2, spaceBetween: 20 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    992: { slidesPerView: 4, spaceBetween: 30 },
    1200: { slidesPerView: 5, spaceBetween: 30 },
  },
});

// Hàm cập nhật hiển thị thông tin cho slide đầu tiên
function updateInfoDisplay() {
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide) => {
    const info = slide.querySelector(".info");
    if (info) info.style.display = "none"; // Ẩn tất cả thông tin
  });

  const activeSlide = swiper.slides[swiper.activeIndex];
  const activeInfo = activeSlide.querySelector(".info");
  if (activeInfo) activeInfo.style.display = "block"; // Hiển thị thông tin cho slide đầu tiên
}

// Xử lý click vào slide để di chuyển đến đầu tiên
swiper.slides.forEach((slide) => {
  slide.addEventListener("click", () => {
    const clickedIndex = slide.getAttribute("data-swiper-slide-index");
    swiper.slideToLoop(parseInt(clickedIndex), 500); // Di chuyển slide được click

    setTimeout(updateInfoDisplay, 500); // Cập nhật thông tin sau khi chuyển
  });
});

// Cập nhật hiển thị khi slide thay đổi tự động hoặc do người dùng tương tác
swiper.on("slideChange", updateInfoDisplay);

// Gọi lần đầu để hiển thị thông tin cho slide đầu tiên
updateInfoDisplay();
