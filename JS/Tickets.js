const dayElements = Array.from(document.querySelectorAll(".day"));
const daysToShow = 7; // Số ngày hiển thị mỗi lần
let currentStartIndex = 0;

// Cập nhật hiển thị các ngày
const updateDaysDisplay = () => {
  dayElements.forEach((day, index) => {
    day.style.display =
      index >= currentStartIndex && index < currentStartIndex + daysToShow
        ? "block"
        : "none";
  });
};

// Sự kiện cho các nút chuyển đổi ngày
document.querySelector(".prev-btn").addEventListener("click", () => {
  currentStartIndex = Math.max(0, currentStartIndex - daysToShow);
  updateDaysDisplay();
});

document.querySelector(".next-btn").addEventListener("click", () => {
  currentStartIndex = Math.min(
    dayElements.length - daysToShow,
    currentStartIndex + daysToShow
  );
  updateDaysDisplay(); // Cần gọi hàm này để cập nhật hiển thị
});

// Hiển thị nhóm đầu tiên khi trang được tải
updateDaysDisplay();

const timeSlots = document.querySelectorAll(".time-slot");
const hiddenSection = document.getElementById("hidden");
const iframe = document.getElementById("hiddenPage");
const movieElements = Array.from(document.querySelectorAll(".movie-item"));
const movieSelectSection = document.getElementById("movie-select");

let selectedDay = null;
let selectedMovie = null;

// Thiết lập sự kiện click cho từng ngày
dayElements.forEach((day) => {
  day.addEventListener("click", () => {
    const dayNum = parseInt(day.getAttribute("data-day"));

    // Xóa trạng thái active của tất cả các ngày
    dayElements.forEach((d) => d.classList.remove("active"));
    day.classList.add("active");

    // Ghi lại ngày đã chọn
    selectedDay = dayNum;

    // Hiển thị phim để chọn
    movieSelectSection.classList.remove("hidden");

    // Reset phim và khung giờ
    resetMoviesAndTimeSlots();
    hiddenSection.classList.remove("active");
  });
});

// Hàm reset phim và khung giờ
const resetMoviesAndTimeSlots = () => {
  selectedMovie = null; // Đặt lại selectedMovie về null
  movieElements.forEach((movie) => {
    movie.classList.remove("selected"); // Bỏ chọn tất cả phim
  });

  resetTimeSlots(); // Reset khung giờ
};

// Hàm reset khung giờ
const resetTimeSlots = () => {
  timeSlots.forEach((slot) => {
    slot.classList.remove("active");
    slot.classList.remove("selected");
  });
};

// Thiết lập sự kiện click cho từng phim
movieElements.forEach((movie) => {
  movie.addEventListener("click", () => {
    // Nếu phim đã được chọn, bỏ chọn
    if (selectedMovie === movie.getAttribute("data-movie")) {
      selectedMovie = null; // Bỏ chọn phim
      movie.classList.remove("selected"); // Bỏ chọn màu cho phim
      resetTimeSlots(); // Reset khung giờ
      hiddenSection.classList.remove("active"); // Ẩn thông tin ẩn
      return; // Thoát khỏi hàm
    }

    // Ghi lại phim đã chọn
    selectedMovie = movie.getAttribute("data-movie");
    const movieTimes = JSON.parse(movie.getAttribute("data-times")); // Lấy khung giờ của phim

    // Xóa màu 'selected' cho tất cả các phim
    movieElements.forEach((m) => m.classList.remove("selected"));
    // Thêm màu cho phim được chọn
    movie.classList.add("selected");

    // Ẩn tất cả các khung giờ trước đó
    resetTimeSlots(); // Gọi hàm reset để ẩn tất cả khung giờ

    // Hiển thị khung giờ phù hợp cho từng ngày
    timeSlots.forEach((slot) => {
      const time = slot.getAttribute("data-time");

      // Hiển thị khung giờ chỉ khi đã chọn ngày và phim
      if (selectedDay) {
        // Hiển thị khung giờ nếu có trong danh sách của phim
        if (movieTimes.includes(time)) {
          slot.classList.add("active");
        }
      }
    });

    // Cập nhật thông tin ẩn
    updateHiddenSection(); // Cập nhật thông tin nếu có phim đã chọn
  });
});

// Sự kiện click vào khung giờ để đổi màu khi chọn
timeSlots.forEach((slot) => {
  slot.addEventListener("click", () => {
    // Chỉ cho phép chọn các khung giờ đã được hiển thị (active)
    if (slot.classList.contains("active")) {
      // Nếu khung giờ đã được chọn, bỏ chọn
      if (slot.classList.contains("selected")) {
        slot.classList.remove("selected"); // Bỏ chọn khung giờ
        iframe.style.display = "none"; // Ẩn iframe
        hiddenSection.classList.remove("active"); // Ẩn thông tin ẩn
        return; // Thoát khỏi hàm
      }

      // Xóa màu 'selected' cho tất cả các khung giờ
      timeSlots.forEach((s) => s.classList.remove("selected"));
      // Thêm màu cho khung giờ được chọn
      slot.classList.add("selected");

      // Hiển thị trang ẩn trong iframe khi chọn giờ chiếu
      iframe.style.display = "block";

      // Cập nhật thông tin ẩn
      updateHiddenSection();
    }
  });
});

// Mặc định chọn ngày đầu tiên khi load trang
document.querySelector('.day[data-day="1"]').click();

// Lưu thông tin ngày giờ vào localStorage để sử dụng khi thanh toán
function updateHiddenSection() {
  if (selectedDay && selectedMovie) {
    hiddenSection.classList.add("active");
    // Lưu thông tin ngày và phim vào localStorage
    localStorage.setItem("selectedDay", selectedDay);
    localStorage.setItem("selectedMovie", selectedMovie);
  } else {
    hiddenSection.classList.remove("active"); // Ẩn thông tin nếu không có ngày hoặc phim đã chọn
  }
}

// Constants for pricing
const PRICE_THUONG = 50000;
const PRICE_VIP = 70000;

// Số lượng hàng và cột
const numRows = 8; // Số hàng từ A đến H
const numCols = 15; // Số cột ghế đơn
const doubleSeatCols = 8; // Số cặp ghế đôi ở hàng H

// Danh sách ghế đã đặt (ví dụ)
const bookedSeats = ["F10", "G10", "F14", "H13-14"]; // Ghế đã đặt

// Tạo ghế và hàng động
function createSeats() {
  const seatMap = document.getElementById("seat-map");
  const alphabet = "ABCDEFGH".split(""); // Hàng ghế từ A đến H

  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    // Nếu là hàng H, tạo ghế đôi
    if (alphabet[i] === "H") {
      for (let j = 1; j <= doubleSeatCols; j++) {
        const seat = document.createElement("div");
        seat.classList.add("seat", "double-seat");

        const seatId = `H${2 * j - 1}-${2 * j}`;
        seat.dataset.seatId = seatId;
        seat.innerText = seatId;

        if (bookedSeats.includes(seatId)) {
          seat.classList.add("booked");
        } else {
          seat.classList.add("available");
        }

        // Gán sự kiện cho ghế
        seat.addEventListener("click", () => {
          if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            handleSeatSelection(seat, "unselect");
          } else if (!seat.classList.contains("booked")) {
            seat.classList.add("selected");
            handleSeatSelection(seat, "select");
          }
        });

        row.appendChild(seat);
      }
    } else {
      // Tạo ghế đơn cho các hàng A - G
      for (let j = 1; j <= numCols; j++) {
        const seat = document.createElement("div");
        seat.classList.add("seat", "single-seat");

        const seatId = `${alphabet[i]}${j}`;
        seat.dataset.seatId = seatId;
        seat.innerText = seatId;

        // Kiểm tra xem ghế có phải là ghế VIP hay không
        if (
          (alphabet[i] === "D" && j >= 5 && j <= 11) || // Ghế VIP từ D5 đến D11
          (alphabet[i] === "E" && j >= 5 && j <= 11) || // Ghế VIP từ E5 đến E11
          (alphabet[i] === "F" && j >= 5 && j <= 11) // Ghế VIP từ F5 đến F11
        ) {
          seat.classList.add("vip"); // Gán lớp VIP cho ghế
        }

        if (bookedSeats.includes(seatId)) {
          seat.classList.add("booked");
        } else {
          seat.classList.add("available");
        }

        // Gán sự kiện cho ghế
        seat.addEventListener("click", () => {
          if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            handleSeatSelection(seat, "unselect");
          } else if (!seat.classList.contains("booked")) {
            seat.classList.add("selected");
            handleSeatSelection(seat, "select");
          }
        });

        row.appendChild(seat);
      }
    }
    seatMap.appendChild(row);
  }
}

// Tạo giao diện ghế ngồi
createSeats();
