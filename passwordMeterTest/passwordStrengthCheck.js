const PasswordStrenth = {
  STRONG: "STRONG",
};

class PasswordStrenthCheck {
  meter(password) {
    return PasswordStrenth.STRONG;
  }
}

module.exports = { PasswordStrenthCheck };
