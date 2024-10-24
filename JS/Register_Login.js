const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");
  const confirmPasswordInput = document.getElementById(
    "signup-confirm-password"
  );
  const phoneInput = document.getElementById("signup-phone"); // Thêm biến cho ô nhập số điện thoại

  // Hàm xóa thông tin nhập và thông báo
  function clearForm() {
    // Xóa thông tin trong các ô nhập liệu
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";

    // Xóa thông báo lỗi và thành công
    document.getElementById("signup-name-error").textContent = "";
    document.getElementById("signup-name-success").textContent = "";
    document.getElementById("signup-email-error").textContent = "";
    document.getElementById("signup-email-success").textContent = "";
    document.getElementById("signup-phone-error").textContent = "";
    document.getElementById("signup-phone-success").textContent = "";
    document.getElementById("signup-password-error").textContent = "";
    document.getElementById("signup-password-success").textContent = "";
    document.getElementById("signup-confirm-password-error").textContent = "";
    document.getElementById("signup-confirm-password-success").textContent = "";
  }

  // Thêm sự kiện chuyển đổi giữa Đăng Nhập và Đăng Ký
  document.getElementById("register").addEventListener("click", function () {
    clearForm(); // Gọi hàm xóa thông tin khi chuyển sang Đăng Ký
    document
      .querySelector(".auth-form-container.auth-sign-up")
      .classList.remove("d-none");
    document
      .querySelector(".auth-form-container.auth-sign-in")
      .classList.add("d-none");
  });

  document.getElementById("login").addEventListener("click", function () {
    clearForm(); // Gọi hàm xóa thông tin khi chuyển sang Đăng Nhập
    document
      .querySelector(".auth-form-container.auth-sign-in")
      .classList.remove("d-none");
    document
      .querySelector(".auth-form-container.auth-sign-up")
      .classList.add("d-none");
  });

  // Kiểm tra tên ngay khi người dùng nhập
  nameInput.addEventListener("input", function () {
    const errorMessage = document.getElementById("signup-name-error");
    const successMessage = document.getElementById("signup-name-success");
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÊÌÍÒÓÔÕÙÚĐàáạảãèẹẻẽìíòóọỏõùúụủũ\s]+$/;

    if (!nameRegex.test(nameInput.value)) {
      errorMessage.textContent =
        "Họ và tên chỉ được chứa chữ cái, không chứa ký tự đặc biệt và số.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else {
      errorMessage.textContent = ""; // Xóa thông báo lỗi nếu hợp lệ
      successMessage.textContent = "Thông tin hợp lệ!"; // Hiển thị thông báo thành công
    }
  });

  // Kiểm tra email ngay khi người dùng nhập
  emailInput.addEventListener("input", function () {
    const errorMessage = document.getElementById("signup-email-error");
    const successMessage = document.getElementById("signup-email-success");
    if (!validateEmail(emailInput.value)) {
      errorMessage.textContent = "Email không hợp lệ.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else {
      errorMessage.textContent = ""; // Xóa thông báo lỗi nếu hợp lệ
      successMessage.textContent = "Thông tin hợp lệ!"; // Hiển thị thông báo thành công
    }
  });

  // Kiểm tra số điện thoại ngay khi người dùng nhập
  phoneInput.addEventListener("input", function () {
    const errorMessage = document.getElementById("signup-phone-error");
    const successMessage = document.getElementById("signup-phone-success");
    const phoneRegex = /^(0[1-9]{1}[0-9]{8})$/; // Biểu thức chính quy cho số điện thoại Việt Nam

    if (!phoneRegex.test(phoneInput.value)) {
      errorMessage.textContent = "Số điện thoại không hợp lệ.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else {
      errorMessage.textContent = ""; // Xóa thông báo lỗi nếu hợp lệ
      successMessage.textContent = "Thông tin hợp lệ!"; // Hiển thị thông báo thành công
    }
  });

  // Kiểm tra mật khẩu ngay khi người dùng nhập
  passwordInput.addEventListener("input", function () {
    const errorMessage = document.getElementById("signup-password-error");
    const successMessage = document.getElementById("signup-password-success");
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\W).{6,}$/; // Tối thiểu 6 ký tự, ít nhất một chữ cái và một ký tự đặc biệt

    if (!passwordRegex.test(passwordInput.value)) {
      errorMessage.textContent =
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm một chữ cái và một ký tự đặc biệt.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else {
      errorMessage.textContent = ""; // Xóa thông báo lỗi nếu hợp lệ
      successMessage.textContent = "Thông tin hợp lệ!"; // Hiển thị thông báo thành công
    }
  });

  // Kiểm tra xác nhận mật khẩu ngay khi người dùng nhập
  confirmPasswordInput.addEventListener("input", function () {
    const errorMessage = document.getElementById(
      "signup-confirm-password-error"
    );
    const successMessage = document.getElementById(
      "signup-confirm-password-success"
    );

    if (confirmPasswordInput.value !== passwordInput.value) {
      errorMessage.textContent = "Mật khẩu và xác nhận mật khẩu không khớp.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else {
      errorMessage.textContent = ""; // Xóa thông báo lỗi nếu hợp lệ
      successMessage.textContent = "Thông tin hợp lệ!"; // Hiển thị thông báo thành công
    }
  });
});

function validateSignUpForm() {
  let valid = true;

  // Lấy giá trị từ các ô nhập liệu
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value; // Lấy giá trị số điện thoại
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;

  // Reset thông báo lỗi
  document.getElementById("signup-name-error").textContent = "";
  document.getElementById("signup-email-error").textContent = "";
  document.getElementById("signup-phone-error").textContent = ""; // Reset thông báo lỗi số điện thoại
  document.getElementById("signup-password-error").textContent = "";
  document.getElementById("signup-confirm-password-error").textContent = "";

  // Kiểm tra tên
  if (name === "") {
    document.getElementById("signup-name-error").textContent =
      "Họ và tên không được để trống.";
    valid = false;
  } else if (!/^[A-Za-zÀÁÂÃÈÊÌÍÒÓÔÕÙÚÀÁÀĂĨŨƠĐ\s]+$/.test(name)) {
    document.getElementById("signup-name-error").textContent =
      "Họ và tên chỉ được chứa chữ cái, không chứa ký tự đặc biệt và số.";
    valid = false;
  }

  // Kiểm tra email
  if (email === "") {
    document.getElementById("signup-email-error").textContent =
      "Email không được để trống.";
    valid = false;
  } else if (!validateEmail(email)) {
    document.getElementById("signup-email-error").textContent =
      "Email không hợp lệ.";
    valid = false;
  }

  // Kiểm tra số điện thoại
  const phoneRegex = /^(0[1-9]{1}[0-9]{8})$/; // Biểu thức chính quy cho số điện thoại Việt Nam
  if (phone === "") {
    document.getElementById("signup-phone-error").textContent =
      "Số điện thoại không được để trống.";
    valid = false;
  } else if (!phoneRegex.test(phone)) {
    document.getElementById("signup-phone-error").textContent =
      "Số điện thoại không hợp lệ.";
    valid = false;
  }

  // Kiểm tra mật khẩu
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\W).{6,}$/; // Biểu thức chính quy để kiểm tra mật khẩu
  if (password === "") {
    document.getElementById("signup-password-error").textContent =
      "Mật khẩu không được để trống.";
    valid = false;
  } else if (!passwordRegex.test(password)) {
    document.getElementById("signup-password-error").textContent =
      "Mật khẩu phải có ít nhất 6 ký tự, bao gồm một chữ cái và một ký tự đặc biệt.";
    valid = false;
  }

  // Kiểm tra xác nhận mật khẩu
  if (confirmPassword === "") {
    document.getElementById("signup-confirm-password-error").textContent =
      "Xác nhận mật khẩu không được để trống.";
    valid = false;
  } else if (password !== confirmPassword) {
    document.getElementById("signup-confirm-password-error").textContent =
      "Mật khẩu và xác nhận mật khẩu không khớp.";
    valid = false;
  }

  return valid; // Trả về true nếu tất cả các trường hợp đều hợp lệ
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy để kiểm tra định dạng email
  return re.test(String(email).toLowerCase());
}

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector(
    ".auth-form-container .btn-primary"
  );

  loginButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy giá trị từ các ô nhập liệu
    const identifierInput = document.getElementById("signin-identifier");
    const passwordInput = document.getElementById("signin-password");

    const identifier = identifierInput.value; // Có thể là email hoặc số điện thoại
    const password = passwordInput.value;

    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Xóa thông báo lỗi cũ
    document.getElementById("signin-identifier-error").textContent = "";
    document.getElementById("signin-password-error").textContent = "";

    // Kiểm tra thông tin đăng nhập
    if (user) {
      // Kiểm tra xem email có khớp không
      if (
        (user.email === identifier || user.phone === identifier) &&
        user.password === password
      ) {
        // Đăng nhập thành công
        alert("Đăng nhập thành công!"); // Bạn có thể chuyển hướng hoặc làm gì khác ở đây
        // window.location.href = "home.html"; // Chuyển hướng đến trang khác nếu cần
      } else {
        // Thông báo lỗi nếu không khớp
        document.getElementById("signin-identifier-error").textContent =
          "Email hoặc Số điện thoại không đúng.";
        document.getElementById("signin-password-error").textContent =
          "Mật khẩu không đúng.";
      }
    } else {
      // Thông báo nếu không tìm thấy người dùng
      document.getElementById("signin-identifier-error").textContent =
        "Không tìm thấy người dùng.";
    }
  });
});
