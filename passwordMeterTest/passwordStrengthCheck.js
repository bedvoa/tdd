const PasswordStrength = {
  STRONG: "STRONG",
  NORMAL: "NORMAL",
  WEAK: "WEAK",
  FAIL: "FAIL",
};

class PasswordStrengthCheck {
  meter(password) {
    // Test Case 2: 글자 길이가 8자 미만이고 모두 충족하는 경우
    if (
      password.length < 8 &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return PasswordStrength.NORMAL;
    }

    // Test Case 3: 글자 길이가 8자 이상이고, 나머지 항목은 모두 충족하지 않는 경우
    if (
      !/[A-Z]/.test(password) &&
      !/[0-9]/.test(password) &&
      password.length >= 8
    ) {
      return PasswordStrength.WEAK;
    }

    // Test Case 4: 숫자는 없고, 나머지 항목은 모두 충족하는 경우
    if (
      !/[0-9]/.test(password) &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      password.length >= 8
    ) {
      return PasswordStrength.NORMAL;
    }

    // Test Case 5: 숫자는 있고, 나머지 항목은 모두 충족하지 않는 경우
    if (
      /[0-9]/.test(password) &&
      password.length < 8 &&
      !/[a-z]/.test(password)
    ) {
      return PasswordStrength.WEAK;
    }

    // Test Case 6: 대문자가 없고 나머지 항목은 충족하는 경우
    if (
      !/[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[a-z]/.test(password) &&
      password.length >= 8
    ) {
      return PasswordStrength.NORMAL;
    }

    // Test Case 7: 대문자가 있고 나머지 항목은 충족하지 않는 경우
    if (
      /[A-Z]/.test(password) &&
      password.length < 8 &&
      !/[0-9]/.test(password)
    ) {
      return PasswordStrength.WEAK;
    }

    // Test Case 8: 모든 조건을 충족하지 않는 경우
    if (
      !/[A-Z]/.test(password) &&
      !/[0-9]/.test(password) &&
      !/[a-z]/.test(password) &&
      password.length < 8
    ) {
      return PasswordStrength.FAIL;
    }

    // Test Case 1: 모든 조건을 충족하는 경우
    return PasswordStrength.STRONG;
  }
}

module.exports = { PasswordStrengthCheck };
