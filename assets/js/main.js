const Commonjs = {
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [],
  registerFormItem: {
    ad: document.getElementById("ad"),
    soyad: document.getElementById("soyad"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    repassword: document.getElementById("repassword"),
  },
  loginFormItem: {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  },
  handleRegisterForm: function () {
    event.preventDefault();

    let alreadyUser = this.handleAlreadyUser();
    if (alreadyUser) return false;

    this.users.push({
      ad: this.registerFormItem.ad.value,
      soyad: this.registerFormItem.soyad.value,
      email: this.registerFormItem.email.value,
      password: this.registerFormItem.password.value,
      repassword: this.registerFormItem.repassword.value,
    });
    //if bloğunun koşulu eğer false ise if bloğu çalışmaz!
    if (this.confirmPassword()) {
      return false;
    }

    localStorage.setItem("users", JSON.stringify(this.users));

    this.registerFormCleaner();

    this.successMessage(
      `${this.registerFormItem.ad.value} Başarıyla kayıt oldunuz!`
    );

    console.log(this.users);

    setTimeout(() => {
      this.GoToPage("../pages/index.html");
    }, 3000);
  },
  handleLoginForm: function () {
    console.log(this.users);

    event.preventDefault();
    //filter = Dizideki öğeleri filtreler. Filtrenen öğe varsa geriye döndürür yoksa boş dizi döner
    // users dizisinin içindeki email ve password filtreledik. Loginformitem ile eşleşirse değer döndürecek
    let user = this.users.filter((item) => {
      return (
        item.email == this.loginFormItem.email.value &&
        item.password == this.loginFormItem.password.value
      );
    });

    console.log(user);

    if (user.length > 0) {
      this.successMessage("Sayfaya Yönlendiriliyorsunuz..");
      setTimeout(() => {
        this.GoToPage("../pages/indexApp.html");
      }, 2000);
    } else {
      this.failEntryMessage("Kullanıcı bulunamadı!");
    }

    this.loginFormCleaner();
  },
  handleAlreadyUser: function () {
    let alreadyUser = false;

    this.users.forEach((item, i) => {
      if (this.registerFormItem.email.value == item.email) {
        alreadyUser = true;
      }
    });
    if (alreadyUser) {
      this.warningMessage("Bu email ile daha önceden kayıt olunmuştur !");
      this.registerFormCleaner();
      return true;
    }
    return false;
  },
  confirmPassword: function () {
    const password = this.registerFormItem.password.value;
    const repassword = this.registerFormItem.repassword.value;

    if (password !== repassword) {
      this.warningMessage("Şifreniz Doğrulanmadı!");
      return true;
    }
    return false;
  },
  successMessage: function (message) {
    Swal.fire("Kayıt Başarılı!", message, "success");
  },
  warningMessage: function (message) {
    Swal.fire("Uyarı !", message, "warning");
  },
  entryMessage: function (message) {
    Swal.fire("Giriş Başarılı !", message, "success");
  },
  failEntryMessage: function (message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
      footer: '<a href="../pages/register.html">Kayıt olmak için tıklayın.</a>',
    });
  },
  registerFormCleaner: function () {
    (this.registerFormItem.ad.value = ""),
      (this.registerFormItem.soyad.value = "");
    this.registerFormItem.email.value = "";
    this.registerFormItem.password.value = "";
    this.registerFormItem.repassword.value = "";
  },
  loginFormCleaner: function () {
    (this.loginFormItem.email.value = ""),
      (this.loginFormItem.password.value = "");
  },
  GoToPage: function (page) {
    location.href = page;
  },
};
