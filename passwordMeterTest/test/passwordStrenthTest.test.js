const { PasswordStrengthCheck } = require("../passwordStrengthCheck");

describe("암호 검사기 - Test Code", () => {
  it("Test Case 1: 모든 조건을 충족하는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter("aA1!aaaa"); // Expected: STRONG

    expect(result).toBe("STRONG");
  });

  it("Test Case 2: 길이가 8자 미만이고 모두 충족하는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter("aA1!aa"); // Expected: NORMAL

    expect(result).toBe("NORMAL");
  });

  it("Test Case 3: 길이가 8자 글자 이상이고, 나머지 항목은 모두 충족하지 않는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter("aaaaaaaa"); // Expected: WEAK

    expect(result).toBe("WEAK");
  });

  it("Test Case 4: 숫자는 없고, 나머지 항목은 모두 충족하는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter("aA!aaaafdd"); // Expected: NORMAL

    expect(result).toBe("NORMAL");
  });

  it("Test Case 5: 숫자는 있고, 나머지 항목은 모두 충족하지 않는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter("12345"); // Expected: WEAK

    expect(result).toBe("WEAK");
  });

  it("Test Case 6: 대문자가 없고 나머지 항목은 충족하는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter("a1!aaaa"); // Expected: NORMAL

    expect(result).toBe("NORMAL");
  });

  it("Test Case 7: 대문자가 있고 나머지 항목은 충족하지 않는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter("AZasd"); // Expected: WEAK

    expect(result).toBe("WEAK");
  });

  it("Test Case 8: 모든 조건을 충족하지 않는 경우", () => {
    const meter = new PasswordStrengthCheck();
    const result = meter.meter(""); // Expected: FAIL

    expect(result).toBe("FAIL");
  });
});
