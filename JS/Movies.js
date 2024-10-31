function showPosters(type) {
  const tabs = document.querySelectorAll(".tab");
  const nowShowingContainer = document.getElementById("now-showing");
  const comingSoonContainer = document.getElementById("coming-soon");

  tabs.forEach((tab) => tab.classList.remove("active"));

  if (type === "now-showing") {
    nowShowingContainer.style.display = "flex";
    comingSoonContainer.style.display = "none";
    document
      .querySelector(".tab[onclick=\"showPosters('now-showing')\"]")
      .classList.add("active");
  } else if (type === "coming-soon") {
    comingSoonContainer.style.display = "flex";
    nowShowingContainer.style.display = "none";
    document
      .querySelector(".tab[onclick=\"showPosters('coming-soon')\"]")
      .classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  showPosters("now-showing");
});

function adjustPosters() {
  const posterContainers = document.querySelectorAll(".poster-container");
  posterContainers.forEach((container) => {
    const posters = container.querySelectorAll(".poster");
    const screenWidth = window.innerWidth;
    let maxVisiblePosters;

    if (screenWidth < 768) {
      maxVisiblePosters = 4;
    } else if (screenWidth < 992) {
      maxVisiblePosters = 6;
    } else if (screenWidth < 1400) {
      maxVisiblePosters = 8;
    } else {
      maxVisiblePosters = 10;
    }

    const showMoreButton = container.querySelector(".show-more");
    let isExpanded = false; // Trạng thái ban đầu là ẩn thêm poster
    showMoreButton.textContent = "Xem thêm";
    showMoreButton.style.display =
      posters.length > maxVisiblePosters ? "block" : "none";

    // Cập nhật hiển thị các poster dựa vào trạng thái "isExpanded"
    function updatePosterVisibility() {
      posters.forEach((poster, index) => {
        if (index < maxVisiblePosters || isExpanded) {
          poster.style.display = "block";
        } else {
          poster.style.display = "none";
        }
      });
    }

    // Thêm sự kiện cho nút "Xem thêm" để mở rộng và thu gọn
    showMoreButton.onclick = () => {
      isExpanded = !isExpanded; // Đổi trạng thái
      showMoreButton.textContent = isExpanded ? "Rút gọn" : "Xem thêm";
      updatePosterVisibility(); // Cập nhật hiển thị poster
    };

    // Hiển thị poster ban đầu khi load trang hoặc thay đổi kích thước màn hình
    updatePosterVisibility();
  });
}

// Gọi hàm khi tải trang và khi thay đổi kích thước cửa sổ
window.addEventListener("load", adjustPosters);
window.addEventListener("resize", adjustPosters);
