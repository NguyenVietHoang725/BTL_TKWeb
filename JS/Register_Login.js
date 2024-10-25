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

    // Điều kiện thêm vào: Nếu mật khẩu chưa được nhập mà người dùng nhập xác nhận mật khẩu
    if (passwordInput.value === "" && confirmPasswordInput.value !== "") {
      errorMessage.textContent = "Bạn phải nhập mật khẩu trước khi xác nhận.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      errorMessage.textContent = "Mật khẩu và xác nhận mật khẩu không khớp.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else if (
      confirmPasswordInput.value !== "" &&
      confirmPasswordInput.value !== passwordInput.value
    ) {
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
  document.getElementById("signup-phone-error").textContent = "";
  document.getElementById("signup-password-error").textContent = "";
  document.getElementById("signup-confirm-password-error").textContent = "";

  // Kiểm tra tên
  if (name === "") {
    document.getElementById("signup-name-error").textContent =
      "Họ và tên không được để trống.";
    valid = false;
  } else if (!/^[a-zA-ZÀÁÂÃÈÊÌÍÒÓÔÕÙÚĐàáạảãèẹẻẽìíòóọỏõùúụủũ\s]+$/.test(name)) {
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
  } else if (password === "" && confirmPassword !== "") {
    document.getElementById("signup-confirm-password-error").textContent =
      "Vui lòng nhập mật khẩu trước khi xác nhận.";
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

// Chức năng ẩn hiện mật khẩu
const togglePasswordVisibility = (toggleElementId, passwordFieldId) => {
  const toggleElement = document.getElementById(toggleElementId);
  const passwordField = document.getElementById(passwordFieldId);

  toggleElement.addEventListener("click", () => {
    const type =
      passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    toggleElement.innerHTML =
      type === "password"
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" /></svg>`;
  });
};

// Gọi hàm cho phần đăng ký và đăng nhập
togglePasswordVisibility(
  "toggle-signup-password-visibility",
  "signup-password"
);
togglePasswordVisibility(
  "toggle-signin-password-visibility",
  "signin-password"
);
togglePasswordVisibility(
  "toggle-confirm-password-visibility",
  "signup-confirm-password"
);

// Gọi hàm cho phần đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  togglePasswordVisibility("toggle-password-visibility", "signin-password");
});

// Gọi hàm cho các trường mật khẩu
togglePasswordVisibility("toggle-password-visibility", "signup-password");
togglePasswordVisibility(
  "toggle-confirm-password-visibility",
  "signup-confirm-password"
);

document.addEventListener("DOMContentLoaded", function () {
  // Thêm sự kiện cho nút đăng ký
  const signUpButton = document.querySelector(
    ".auth-form-container.auth-sign-up .btn-primary"
  );

  signUpButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    if (validateSignUpForm()) {
      // Lưu tài khoản vào localStorage
      const user = {
        name: document.getElementById("signup-name").value,
        email: document.getElementById("signup-email").value,
        phone: document.getElementById("signup-phone").value,
        password: document.getElementById("signup-password").value,
      };
      localStorage.setItem("user", JSON.stringify(user));

      // Hiển thị thông báo tạo tài khoản thành công
      showNotification("Tạo tài khoản thành công!", function () {
        // Chuyển sang trang đăng nhập sau khi thông báo biến mất
        document.getElementById("login").click();
      });
    }
  });

  // Hiển thị thông báo với nội dung message và callback để chuyển hướng hoặc làm gì đó sau khi thông báo biến mất
  function showNotification(message, callback) {
    const notificationBox = document.getElementById("notification-box");
    const notificationMessage = document.getElementById("notification-message");

    notificationMessage.textContent = message;
    notificationBox.classList.remove("d-none");

    // Sau 2 giây, ẩn thông báo và thực hiện callback
    setTimeout(function () {
      notificationBox.classList.add("d-none");
      if (callback) callback();
    }, 2000);
  }

  // Thêm sự kiện cho nút đăng nhập
  const loginButton = document.querySelector(
    ".auth-form-container.auth-sign-in .btn-primary"
  );

  loginButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    // Lấy giá trị từ các ô nhập liệu
    const identifier = document.getElementById("signin-identifier").value; // Email hoặc số điện thoại
    const password = document.getElementById("signin-password").value;

    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // Kiểm tra email hoặc số điện thoại và mật khẩu
      if (
        (user.email === identifier || user.phone === identifier) &&
        user.password === password
      ) {
        // Đăng nhập thành công
        showNotification("Đăng nhập thành công!", function () {
          // Chuyển hướng sau khi thông báo biến mất
          window.location.href = "home.html"; // Chuyển đến trang chính
        });
      } else {
        // Thông báo lỗi nếu thông tin không khớp
        document.getElementById("signin-identifier-error").textContent =
          "Email hoặc Số điện thoại không đúng.";
        document.getElementById("signin-password-error").textContent =
          "Mật khẩu không đúng.";
      }
    } else {
      // Thông báo lỗi nếu không tìm thấy tài khoản
      document.getElementById("signin-identifier-error").textContent =
        "Không tìm thấy người dùng.";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const signupSubmitBtn = document.getElementById("signup-submit");

  signupSubmitBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form

    if (validateSignUpForm()) {
      // Nếu form hợp lệ, xử lý đăng ký (có thể lưu vào localStorage hoặc gửi dữ liệu đi)
      alert("Đăng ký thành công!");
      // window.location.href = "home.html"; // Chuyển hướng nếu cần thiết
    } else {
      // Nếu form không hợp lệ, thông báo lỗi sẽ tự động hiển thị qua hàm validateSignUpForm()
      console.log("Form không hợp lệ, hãy kiểm tra lại thông tin.");
    }
  });
});
