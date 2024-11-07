const dayElements = Array.from(document.querySelectorAll(".day"));
const daysToShow = 7;
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
let showDate = null;
let selectedMovie = null;
let selectedTime = null;

// Thiết lập sự kiện click cho từng ngày
dayElements.forEach((day) => {
  day.addEventListener("click", () => {
    const dayNum = parseInt(day.getAttribute("data-day"));
    const dateNum = day.getAttribute("data-show-date");
    dayElements.forEach((d) => d.classList.remove("active"));
    day.classList.add("active");
    selectedDay = dayNum;
    showDate = dateNum;
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

  // Xóa lựa chọn ghế
  selectedSeats.forEach((seat) => seat.classList.remove("selected"));
  selectedSeats = []; // Đặt lại danh sách ghế đã chọn
  updateSelectedSeatsDisplay(); // Cập nhật hiển thị ghế đã chọn và tổng tiền
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

    selectedSeats.forEach((seat) => seat.classList.remove("selected"));
    selectedSeats = []; // Đặt lại danh sách ghế đã chọn
    updateSelectedSeatsDisplay(); // Cập nhật hiển thị ghế đã chọn và tổng tiền
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

// Hàm xác định loại thời gian trong ngày dựa trên giờ
function getTimeType(selectedTime) {
  if (!selectedTime) return "beforeNoon"; // Giá trị mặc định nếu selectedTime không tồn tại
  const hour = parseInt(selectedTime.split(":")[0]);

  if (hour < 12) {
    return "beforeNoon";
  } else if (hour < 17) {
    return "afternoon";
  } else if (hour < 23) {
    return "evening";
  } else {
    return "lateNight";
  }
}

// Hàm lấy loại ngày dựa trên ID của ngày đã chọn trong HTML
function getDayType() {
  const selectedDayElement = document.querySelector(".day.active");
  if (!selectedDayElement) return "weekdays"; // Giá trị mặc định nếu không có ngày nào được chọn
  const dayId = parseInt(selectedDayElement.dataset.day);
  return dayId >= 1 && dayId <= 5 ? "weekdays" : "weekends";
}

let selectedSeats = []; // Mảng lưu trữ ghế đã chọn
let totalAmount = 0; // Tổng tiền

// Cập nhật hiển thị các ghế đã chọn và tổng tiền
function updateSelectedSeatsDisplay() {
  const selectedSeatsElement = document.getElementById("selected-seats");
  const totalSeatsElement = document.getElementById("total-seats");
  const totalAmountElement = document.getElementById("total-amount");

  totalSeatsElement.textContent = selectedSeats.length;
  selectedSeatsElement.textContent = selectedSeats
    .map((seat) => seat.textContent.trim())
    .join(", ");

  totalAmount = calculateTotalAmount(selectedTime);
  totalAmountElement.textContent = `${totalAmount}đ`;
}

// Cập nhật giá tiền cho từng ghế đã chọn
function calculateTotalAmount(selectedTime) {
  let amount = 0;
  const timeType = getTimeType(selectedTime); // Xác định loại thời gian
  const dayType = getDayType(); // Xác định loại ngày dựa trên ID của ngày

  selectedSeats.forEach((seat) => {
    const seatType = seat.dataset.seatType;

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

let selectedPaymentMethod = null;
let ticketHistory = [];

function toggleSeatSelection(seat) {
  const seatType = seat.classList.contains("vip")
    ? "vip"
    : seat.classList.contains("double-seat")
    ? "double"
    : "regular";

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter((s) => s !== seat);
  } else if (!seat.classList.contains("booked")) {
    seat.classList.add("selected");
    seat.dataset.seatType = seatType;
    selectedSeats.push(seat);
  }

  updateSelectedSeatsDisplay(); // Cập nhật hiển thị ghế đã chọn
  updateQRCodeButtonVisibility(); // Cập nhật hiển thị nút tạo mã QR
}

// Thiết lập sự kiện click cho các nút phương thức thanh toán
const paymentButtons = document.querySelectorAll(".payment-button");
paymentButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Xóa trạng thái 'active' của tất cả nút
    paymentButtons.forEach((btn) => btn.classList.remove("active"));
    // Đặt trạng thái 'active' cho nút được chọn
    button.classList.add("active");
    selectedPaymentMethod = button.getAttribute("data-method"); // Lưu phương thức thanh toán đã chọn

    // Xóa mã QR hiện tại khi thay đổi phương thức thanh toán
    const qrCodeContainer = document.getElementById("qr-code");
    qrCodeContainer.innerHTML = ""; // Xóa mã QR hiện tại

    updateQRCodeButtonVisibility(); // Cập nhật hiển thị nút tạo mã QR
  });
});

// Hàm cập nhật hiển thị nút tạo mã QR
function updateQRCodeButtonVisibility() {
  const createQRCodeButton = document.getElementById("create-qr-button");
  if (selectedSeats.length > 0 && selectedPaymentMethod) {
    createQRCodeButton.style.display = "block"; // Hiển thị nút tạo mã QR
  } else {
    createQRCodeButton.style.display = "none"; // Ẩn nút tạo mã QR
  }
}

let createdQR = false; // Biến kiểm tra mã QR đã được tạo hay chưa

// Lắng nghe sự kiện click vào nút tạo mã QR
document.getElementById("create-qr-button").addEventListener("click", () => {
  // Kiểm tra xem đã chọn ghế và phương thức thanh toán chưa
  if (selectedSeats.length === 0 || selectedPaymentMethod === null) {
    alert("Vui lòng chọn ghế và phương thức thanh toán trước khi tạo mã QR.");
    return;
  }

  // Tạo một chuỗi ngẫu nhiên
  const randomString = Math.random().toString(36).substring(2, 15); // Chuỗi ngẫu nhiên

  const qrCodeContainer = document.getElementById("qr-code");

  // Xóa mã QR cũ nếu có
  qrCodeContainer.innerHTML = "";

  // Tạo mã QR mới
  const qrCode = new QRCode(qrCodeContainer, {
    text: randomString, // Sử dụng chuỗi ngẫu nhiên làm nội dung mã QR
    width: 180,
    height: 180,
  });

  createdQR = true; // Cập nhật biến để xác nhận rằng mã QR đã được tạo

  // Ẩn nút tạo mã QR sau khi tạo mã
  document.getElementById("create-qr-button").style.display = "none";
});

// Lắng nghe sự kiện click vào nút thanh toán
document.getElementById("pay-button").addEventListener("click", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
    alert("Vui lòng đăng nhập để tiếp tục thanh toán.");
    window.location.href = "Register_Login.html";
    return;
  }

  const currentUserEmail = JSON.parse(localStorage.getItem("currentUser"));
  const today = new Date();
  const purchaseDate = today.toISOString().split("T")[0]; // Trả về định dạng YYYY-MM-DD

  const ticketDetails = {
    movieName: selectedMovie,
    purchaseDate: purchaseDate,
    showDate: showDate,
    seatNumbers: selectedSeats.map((seat) => seat.textContent).join(", "),
    totalAmount: calculateTotalAmount(),
  };

  // Lấy dữ liệu lịch sử hiện có từ LocalStorage
  let ticketHistory =
    JSON.parse(localStorage.getItem(`${currentUserEmail}_ticketHistory`)) || [];

  // Thêm thông tin vé mới vào lịch sử
  ticketHistory.push(ticketDetails);

  // Lưu lại vào LocalStorage
  localStorage.setItem(
    `${currentUserEmail}_ticketHistory`,
    JSON.stringify(ticketHistory)
  );

  // Hiển thị thông báo thanh toán thành công
  alert("Thanh toán thành công!");
});

// Lắng nghe sự kiện thay đổi ghế
const seatMap = document.getElementById("seat-map");
seatMap.addEventListener("click", () => {
  // Khi có thay đổi ghế, xóa mã QR hiện tại và hiển thị lại nút tạo mã QR
  const qrCodeContainer = document.getElementById("qr-code");
  qrCodeContainer.innerHTML = ""; // Xóa mã QR hiện tại
  document.getElementById("create-qr-button").style.display = "block"; // Hiển thị lại nút tạo mã QR
  updateSelectedSeatsDisplay(); // Cập nhật hiển thị ghế đã chọn
});
