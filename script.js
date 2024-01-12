// VARIABLES
const passwordInput = document.getElementById("passwordInput");
const copy = document.getElementById("copy");
const regenerate = document.getElementById("regenerate");
const form = document.getElementById("form");
const lengthValue = document.getElementById("lengthValue");
const minNum = document.getElementById("minNum");
const minSymb = document.getElementById("minSymb");

// PASSWORD VARIABLES
const letters = "ABCDEFGHIJJKLMNOPQRSTUVWXYZ";
const num = "0123456789";
const symb = "!$%&/()?¿^*@#~[]{}-_.,<>";

// GENERATE PASSWORD WHEN THE PAGE LOADS
window.addEventListener("DOMContentLoaded", () => {
  lengthValue.textContent = form.length.value;
  minNum.textContent = form.minNum.value;
  minSymb.textContent = form.minSymb.value;
  passwordInput.style.height = `65px`;
  generatePassword();
});

// UPDATE THE LENGTH OF THE PASSWORD
form.length.addEventListener("input", () => {
  lengthValue.textContent = form.length.value;
});

// UPDATE THE LENGTH OF THE MINIMUM NUMBERS
form.minNum.addEventListener("input", () => {
  minNum.textContent = form.minNum.value;
});

// UPDATE THE LENGTH OF THE MINIMUM SYMBOLS
form.minSymb.addEventListener("input", () => {
  minSymb.textContent = form.minSymb.value;
});

// GENERATE PASSWORD
const generatePassword = () => {
  // CREATES A PASSWORD WITH THE PASSWORD VARIALBES
  let password = letters + letters.toLowerCase() + num + symb;

  // CHANGES THE PASSWORD DEPENDING ON WHICH CHECKBOX IS CHECKED
  if (!form.uppercase.checked) {
    password = password.replace(letters, "");
  }

  if (!form.lowercase.checked) {
    password = password.replace(letters.toLowerCase(), "");
  }

  // HIDES OR SHOWS THE MINIMUM NUMBERS CHECKBOX
  if (!form.numbers.checked) {
    password = password.replace(num, "");
    form.minNum.style.visibility = "hidden";
    minNum.style.visibility = "hidden";
  } else {
    form.minNum.style.visibility = "visible";
    minNum.style.visibility = "visible";
  }

    // HIDES OR SHOWS THE MINIMUM SYMBOLS CHECKBOX
  if (!form.symbols.checked) {
    password = password.replace(symb, "");
    form.minSymb.style.visibility = "hidden";
    minSymb.style.visibility = "hidden";
  } else {
    form.minSymb.style.visibility = "visible";
    minSymb.style.visibility = "visible";
  }

  let generatedPassword = "";

  // GENERATES A RANDOM PASSWORD TAKING INTO ACCOUNT THE CHECKBOX VALUES
  for (let indexLengthPass = 0; indexLengthPass < form.length.value; indexLengthPass++) {
    generatedPassword += password[Math.floor(Math.random() * password.length)];
  }

  // ADDS A MINIMUM NUMBER OF NUMBERS DEPENDING ON WHAT THE USER STATED
  if (form.minNum.style.visibility === "visible") {
    generatedPassword = generatedPassword
      .split("")
      .slice(form.minNum.value)
      .join("");

    for (let indexMinNum = 0; indexMinNum < form.minNum.value; indexMinNum++) {
      let arrMinNum = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      generatedPassword +=
        arrMinNum[Math.floor(Math.random() * arrMinNum.length)];
    }
  }

  // ADDS A MINIMUM NUMBER OF SYMBOLS DEPENDING ON WHAT THE USER STATED
  if (form.minSymb.style.visibility === "visible") {
    generatedPassword = generatedPassword
      .split("")
      .slice(form.minSymb.value)
      .join("");

    for (
      let indexMinSymb = 0;
      indexMinSymb < form.minSymb.value;
      indexMinSymb++
    ) {
      let arrMinSymb = "!$%&/()?¿^*@#~[]{}-_.,<>";
      generatedPassword +=
        arrMinSymb.split("")[Math.floor(Math.random() * arrMinSymb.length)];
    }
  }

  // SHUFFLES THE PASSWORD TO MIX IT WITH NUMBERS LETTERS AND SYMBOLS
  let shuffled = generatedPassword
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  // SHOWS THE PASSWORD OR RESETS THE PASSWORD TO NONE IF EVERY CHECKBOX IS NOT CHECKED
  if (
    !form.uppercase.checked &&
    !form.lowercase.checked &&
    !form.numbers.checked &&
    !form.symbols.checked
  ) {
    passwordInput.value = "";
  } else {
    passwordInput.value = shuffled;
  }
};

// UPDATE PASSWORD EVERYTIME INPUT IS CHANGED
form.addEventListener("input", () => {
  // UPDATE THE HEIGHT OF THE TEXT AREA WHERE THE PASSWORD IS SHOWN
    passwordInput.style.height = 'auto';
    let textAreaHeight = passwordInput.scrollHeight;
    passwordInput.style.height = `${textAreaHeight+15}px`;
  generatePassword();
  // LIMITS THE MINIMUM NUMBERS AND SYMBOLS DEPENDING ON THE LENGTH OF THE PASSWORD
  if (form.length.value <= 10) {
    form.minNum.max = form.length.value;
    minNum.textContent = form.minNum.value;
    form.minSymb.max = form.length.value -1;
    minSymb.textContent = form.minSymb.value;
    generatePassword();
  } else {
    form.minNum.max = 10;
    form.minSymb.max = 10;
    generatePassword();
  }
});

// COPY PASSWORD
copy.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value);
});

// REGENERATE RANDOM PASSWORD
regenerate.addEventListener("click", () => {
  generatePassword();
});
