const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

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

document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");
  const confirmPasswordInput = document.getElementById(
    "signup-confirm-password"
  );
  const phoneInput = document.getElementById("signup-phone");

  // Hàm xóa thông tin nhập và thông báo
  function clearForm() {
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

  // Chuyển đổi giữa Đăng Nhập và Đăng Ký
  registerBtn.addEventListener("click", function () {
    clearForm();
    document
      .querySelector(".auth-form-container.auth-sign-up")
      .classList.remove("d-none");
    document
      .querySelector(".auth-form-container.auth-sign-in")
      .classList.add("d-none");
  });

  loginBtn.addEventListener("click", function () {
    clearForm();
    document
      .querySelector(".auth-form-container.auth-sign-in")
      .classList.remove("d-none");
    document
      .querySelector(".auth-form-container.auth-sign-up")
      .classList.add("d-none");
  });

  // Thêm sự kiện cho nút Đăng Ký
  document
    .getElementById("signup-submit")
    .addEventListener("click", function (event) {
      if (validateSignUpForm(event)) {
        showSuccessBox("Đăng ký thành công!"); // Hiển thị thông báo thành công
      }
    });

  // Kiểm tra tên ngay khi người dùng nhập
  nameInput.addEventListener("input", function () {
    const errorMessage = document.getElementById("signup-name-error");
    const successMessage = document.getElementById("signup-name-success");
    const nameRegex = /^[a-zA-ZÀÁÂÃÈÊÌÍÒÓÔÕÙÚĐàáạảãèẹẻẽìíòóọỏõùúụủũ\s]+$/;

    if (!nameRegex.test(nameInput.value)) {
      errorMessage.textContent =
        "Họ và tên không được chứa ký tự đặc biệt và số.";
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

    // Kiểm tra nếu mật khẩu chính chưa được nhập nhưng người dùng đã nhập xác nhận mật khẩu
    if (passwordInput.value === "") {
      errorMessage.textContent = "Bạn phải nhập mật khẩu trước khi xác nhận.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      errorMessage.textContent = "Mật khẩu và xác nhận mật khẩu không khớp.";
      successMessage.textContent = ""; // Xóa thông báo thành công nếu có lỗi
    } else {
      errorMessage.textContent = ""; // Xóa thông báo lỗi nếu hợp lệ
      successMessage.textContent = "Thông tin hợp lệ!"; // Hiển thị thông báo thành công
    }
  });
});

function validateSignUpForm(event) {
  let valid = true;

  // Lấy giá trị từ các ô nhập liệu
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
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
  const phoneRegex = /^(0[1-9]{1}[0-9]{8})$/;
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
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\W).{6,}$/;
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

  // Nếu không hợp lệ, ngăn việc gửi form và hiển thị thông báo
  if (!valid) {
    event.preventDefault(); // Ngăn gửi form
  } else {
    // Lưu thông tin người dùng vào localStorage
    const userData = {
      name: name,
      email: email,
      phone: phone,
      password: password, // Lưu mật khẩu, nhưng không nên làm trong thực tế
    };

    // Lấy danh sách người dùng hiện tại
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData); // Thêm người dùng mới vào danh sách

    // Lưu danh sách người dùng vào localStorage
    localStorage.setItem("users", JSON.stringify(users));
    showSuccessBox();
  }

  return valid; // Trả về true nếu tất cả các trường hợp đều hợp lệ
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Hàm hiển thị thông báo thành công
function showSuccessBox(message) {
  const successBox = document.querySelector(".success-box");
  const successContent = document.querySelector(".success-content");

  // Cập nhật nội dung
  successContent.querySelector("p").textContent = message;

  // Thay đổi display thành flex
  successBox.style.display = "flex";

  // Tự động ẩn sau 3 giây
  setTimeout(() => {
    successBox.style.display = "none";
  }, 3000);
}

function closeSuccessBox() {
  const successBox = document.getElementById("success-box");
  successBox.style.display = "none";
  // Chuyển hướng sang phần đăng nhập sau khi tắt thông báo
  window.location.href = "Register_Login.html";
}

function validateSignInForm() {
  // Lấy giá trị từ các input
  const identifier = document.getElementById("signin-identifier").value.trim();
  const password = document.getElementById("signin-password").value.trim();

  // Biến để lưu thông báo lỗi
  let errorMessage = "";

  // Kiểm tra nếu trường email/số điện thoại rỗng
  if (!identifier) {
    errorMessage += "Vui lòng nhập email hoặc số điện thoại.\n";
  }

  // Kiểm tra nếu trường mật khẩu rỗng
  if (!password) {
    errorMessage += "Vui lòng nhập mật khẩu.\n";
  }

  // Nếu có thông báo lỗi, hiển thị nó
  if (errorMessage) {
    alert(errorMessage);
    return; // Ngừng thực hiện nếu có lỗi
  }

  // Lấy danh sách người dùng từ localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Kiểm tra xem người dùng có tồn tại không và mật khẩu có đúng không
  const foundUser = users.find(
    (user) =>
      (user.email === identifier || user.phone === identifier) &&
      user.password === password
  );

  if (foundUser) {
    localStorage.setItem("isLoggedIn", "true"); // Lưu trạng thái đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(foundUser.email));
    alert("Đăng nhập thành công!");
    window.location.href = "Account.html"; // Chuyển hướng đến trang Account.html
  } else {
    alert("Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại.");
  }
}
