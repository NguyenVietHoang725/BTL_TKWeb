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
  updateDaysDisplay();
});

// Hiển thị nhóm đầu tiên khi trang được tải
updateDaysDisplay();

const timeSlots = document.querySelectorAll(".time-slot");
const hiddenSection = document.getElementById("hidden"); // Phần chọn ghế
const movieElements = Array.from(document.querySelectorAll(".movie-item"));
const movieSelectSection = document.getElementById("movie-select");

let selectedDay = null;
let selectedMovie = null;
let selectedTime = null;

// Thiết lập sự kiện click cho từng ngày
dayElements.forEach((day) => {
  day.addEventListener("click", () => {
    const dayNum = parseInt(day.getAttribute("data-day"));
    dayElements.forEach((d) => d.classList.remove("active"));
    day.classList.add("active");
    selectedDay = dayNum;
    movieSelectSection.classList.remove("hidden");
    resetMoviesAndTimeSlots();
    hiddenSection.style.display = "none"; // Ẩn phần chọn ghế khi chưa có lựa chọn
  });
});

const resetMoviesAndTimeSlots = () => {
  selectedMovie = null;
  movieElements.forEach((movie) => {
    movie.classList.remove("selected");
  });
  resetTimeSlots();
};

const resetTimeSlots = () => {
  selectedTime = null;
  timeSlots.forEach((slot) => {
    slot.classList.remove("active");
    slot.classList.remove("selected");
  });
};

// Khi chọn phim
movieElements.forEach((movie) => {
  movie.addEventListener("click", () => {
    if (selectedMovie === movie.getAttribute("data-movie")) {
      selectedMovie = null;
      movie.classList.remove("selected");
      resetTimeSlots();
      updateHiddenSection();
      return;
    }

    selectedMovie = movie.getAttribute("data-movie");
    const movieTimes = JSON.parse(movie.getAttribute("data-times"));
    movieElements.forEach((m) => m.classList.remove("selected"));
    movie.classList.add("selected");
    resetTimeSlots();

    timeSlots.forEach((slot) => {
      const time = slot.getAttribute("data-time");
      if (selectedDay && movieTimes.includes(time)) {
        slot.classList.add("active");
      }
    });

    updateHiddenSection(); // Gọi lại hàm sau khi chọn phim
  });
});

// Khi chọn giờ chiếu
timeSlots.forEach((slot) => {
  slot.addEventListener("click", () => {
    if (slot.classList.contains("active")) {
      if (slot.classList.contains("selected")) {
        slot.classList.remove("selected");
        selectedTime = null;
        updateHiddenSection();
        return;
      }
      timeSlots.forEach((s) => s.classList.remove("selected"));
      slot.classList.add("selected");
      selectedTime = slot.getAttribute("data-time");
      updateHiddenSection(); // Gọi lại hàm sau khi chọn giờ
    }
  });
});

// Thực hiện click vào ngày đầu tiên khi trang tải
document.querySelector('.day[data-day="1"]').click();

function updateHiddenSection() {
  const seatSelection = document.getElementById("hidden");

  if (selectedDay && selectedMovie && selectedTime) {
    seatSelection.style.display = "block"; // Hiển thị phần chọn ghế
    localStorage.setItem("selectedDay", selectedDay);
    localStorage.setItem("selectedMovie", selectedMovie);
    localStorage.setItem("selectedTime", selectedTime);
  } else {
    seatSelection.style.display = "none"; // Ẩn phần chọn ghế nếu thiếu thông tin
  }
}

// Constants for pricing
const numRows = 8;
const numCols = 15;
const doubleSeatCols = 8;
const bookedSeats = ["F10", "G10", "F14", "H13-14"];

function createSeats() {
  const seatMap = document.getElementById("seat-map");
  const alphabet = "ABCDEFGH".split("");

  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

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

        seat.addEventListener("click", () => toggleSeatSelection(seat));
        row.appendChild(seat);
      }
    } else {
      for (let j = 1; j <= numCols; j++) {
        const seat = document.createElement("div");
        seat.classList.add("seat", "single-seat");
        const seatId = `${alphabet[i]}${j}`;
        seat.dataset.seatId = seatId;
        seat.innerText = seatId;

        if (
          (alphabet[i] === "D" && j >= 5 && j <= 11) ||
          (alphabet[i] === "E" && j >= 5 && j <= 11) ||
          (alphabet[i] === "F" && j >= 5 && j <= 11)
        ) {
          seat.classList.add("vip");
        }

        if (bookedSeats.includes(seatId)) {
          seat.classList.add("booked");
        } else {
          seat.classList.add("available");
        }

        seat.addEventListener("click", () => toggleSeatSelection(seat));
        row.appendChild(seat);
      }
    }
    seatMap.appendChild(row);
  }
}

function toggleSeatSelection(seat) {
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
  } else if (!seat.classList.contains("booked")) {
    seat.classList.add("selected");
  }
}

createSeats();

// Định nghĩa giá vé cho từng loại ghế
const TICKET_PRICES = {
  regular: {
    weekdays: {
      beforeNoon: 55000,
      afternoon: 70000,
      evening: 80000,
      lateNight: 65000,
    },
    weekends: {
      beforeNoon: 70000,
      afternoon: 80000,
      evening: 90000,
      lateNight: 75000,
    },
  },
  vip: {
    weekdays: {
      beforeNoon: 65000,
      afternoon: 75000,
      evening: 85000,
      lateNight: 70000,
    },
    weekends: {
      beforeNoon: 80000,
      afternoon: 85000,
      evening: 95000,
      lateNight: 80000,
    },
  },
  double: {
    weekdays: {
      beforeNoon: 140000,
      afternoon: 160000,
      evening: 180000,
      lateNight: 150000,
    },
    weekends: {
      beforeNoon: 170000,
      afternoon: 180000,
      evening: 200000,
      lateNight: 170000,
    },
  },
};

// Lấy loại thời gian cụ thể (cần được xác định theo yêu cầu của bạn)
function getTimeType() {
  // Giả sử bạn có một cách nào đó để xác định thời gian cụ thể, ví dụ từ input hoặc chọn giờ
  // Đây là ví dụ:
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "beforeNoon";
  } else if (currentHour < 17) {
    return "afternoon";
  } else if (currentHour < 23) {
    return "evening";
  } else {
    return "lateNight";
  }
}

function getDayType() {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7
  // Giả định rằng thứ 2 đến thứ 5 là ngày trong tuần, còn thứ 6, thứ 7, chủ nhật là cuối tuần
  return day >= 1 && day <= 5 ? "weekdays" : "weekends";
}

let selectedSeats = []; // Mảng lưu trữ ghế đã chọn
let totalAmount = 0; // Tổng tiền

function updateSelectedSeatsDisplay() {
  const selectedSeatsElement = document.getElementById("selected-seats");
  const totalSeatsElement = document.getElementById("total-seats");
  const totalAmountElement = document.getElementById("total-amount");

  // Cập nhật số ghế đã chọn
  totalSeatsElement.textContent = selectedSeats.length;

  // Hiển thị danh sách ghế đã chọn với dấu phẩy
  const seatNumbers = selectedSeats.map((seat) => seat.textContent.trim());
  selectedSeatsElement.textContent = seatNumbers.join(", "); // Nối các ghế với dấu phẩy

  // Tính tổng tiền
  totalAmount = calculateTotalAmount();
  totalAmountElement.textContent = `${totalAmount}đ`;
}

// Hàm tính tổng tiền
function calculateTotalAmount() {
  let amount = 0;
  const timeType = getTimeType(); // Lấy loại thời gian
  const dayType = getDayType(); // Xác định ngày trong tuần (thứ 2 - thứ 5 hay cuối tuần)

  selectedSeats.forEach((seat) => {
    const seatType = seat.dataset.seatType; // Lấy loại ghế từ dữ liệu ghế

    // Tính giá vé dựa trên loại ghế và thời gian
    if (seatType === "vip") {
      amount += TICKET_PRICES.vip[dayType][timeType];
    } else if (seatType === "double") {
      amount += TICKET_PRICES.double[dayType][timeType];
    } else {
      amount += TICKET_PRICES.regular[dayType][timeType];
    }
  });
  return amount;
}

function toggleSeatSelection(seat) {
  const seatType = seat.classList.contains("vip")
    ? "vip"
    : seat.classList.contains("double-seat")
    ? "double"
    : "regular";

  // Kiểm tra ghế đã được chọn hay chưa
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter((s) => s !== seat); // Xoá ghế đã chọn
  } else if (!seat.classList.contains("booked")) {
    seat.classList.add("selected");
    seat.dataset.seatType = seatType; // Lưu loại ghế
    selectedSeats.push(seat); // Thêm ghế vào danh sách đã chọn
  }

  updateSelectedSeatsDisplay(); // Cập nhật danh sách ghế đã chọn
}
