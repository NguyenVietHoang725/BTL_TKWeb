document.addEventListener("DOMContentLoaded", function () {
  const currentUserEmail = JSON.parse(localStorage.getItem("currentUser"));
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Tìm người dùng hiện tại
  const currentUser = users.find((user) => user.email === currentUserEmail);

  if (currentUser) {
    // Hiển thị thông tin người dùng
    document.getElementById("fullname").value = currentUser.name;
    document.getElementById("email").value = currentUser.email;
    document.getElementById("phone").value = currentUser.phone;
    document.getElementById("sex").value = currentUser.sex || "Nam";
    document.getElementById("id-card").value = currentUser.idCard || "";
    document.getElementById("address").value = currentUser.address || "";
    document.getElementById("membership").value =
      currentUser.membership || "Bạc";

    // Xử lý ngày sinh từ dữ liệu hiện có
    if (currentUser.dob) {
      const [year, month, day] = currentUser.dob.split("-");
      document.getElementById("year").value = year;
      document.getElementById("month").value = parseInt(month);
      updateDays(); // Cập nhật số ngày
      document.getElementById("day").value = parseInt(day);
    }
  } else {
    alert("Không tìm thấy thông tin người dùng.");
    window.location.href = "Register_Login.html";
  }

  // Xử lý khi nhấn nút Chỉnh sửa
  document.getElementById("edit-button").addEventListener("click", function () {
    // Bật các trường chỉnh sửa và hiển thị nút Lưu lại
    toggleEditMode(true);
  });

  // Xử lý khi nhấn nút Lưu lại
  document.getElementById("save-button").addEventListener("click", function () {
    // Cập nhật thông tin trong đối tượng currentUser
    currentUser.name = document.getElementById("fullname").value;
    currentUser.sex = document.getElementById("sex").value; // Cập nhật giới tính
    currentUser.idCard = document.getElementById("id-card").value;
    currentUser.address = document.getElementById("address").value;

    // Lưu ngày sinh
    const year = document.getElementById("year").value;
    const month = String(document.getElementById("month").value).padStart(
      2,
      "0"
    );
    const day = String(document.getElementById("day").value).padStart(2, "0");
    currentUser.dob = `${year}-${month}-${day}`;

    // Lưu lại danh sách người dùng vào localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Thông tin đã được cập nhật thành công!");
    // Tắt chế độ chỉnh sửa
    toggleEditMode(false);
  });

  function toggleEditMode(enable) {
    const editableFields = [
      "fullname",
      "sex",
      "id-card",
      "address",
      "month",
      "day",
      "year",
    ];
    editableFields.forEach((fieldId) => {
      document.getElementById(fieldId).disabled = !enable;
    });
    document.getElementById("edit-button").classList.toggle("d-none", enable);
    document.getElementById("save-button").classList.toggle("d-none", !enable);
  }

  populateYearSelect(); // Gọi hàm để hiển thị danh sách năm khi trang tải
});

// Hàm để cập nhật số ngày trong tháng
function updateDays() {
  const month = document.getElementById("month").value;
  const daySelect = document.getElementById("day");
  const yearSelect = document.getElementById("year");

  daySelect.innerHTML =
    '<option value="" disabled selected hidden>Ngày</option>';
  let daysInMonth;
  const year = yearSelect.value;

  if (month === "2") {
    daysInMonth =
      year && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
        ? 29
        : 28;
  } else if (["4", "6", "9", "11"].includes(month)) {
    daysInMonth = 30;
  } else {
    daysInMonth = 31;
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

// Tạo danh sách năm từ 1900 đến năm hiện tại
function populateYearSelect() {
  const yearSelect = document.getElementById("year");
  const currentYear = new Date().getFullYear();

  for (let i = 1900; i <= currentYear; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

function logout() {
  // Xóa trạng thái đăng nhập và thông tin người dùng khỏi localStorage
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser"); // Nếu bạn lưu thông tin người dùng khi đăng nhập

  alert("Đăng xuất thành công!");

  // Chuyển hướng về trang đăng nhập
  window.location.href = "Register_Login.html";
}
