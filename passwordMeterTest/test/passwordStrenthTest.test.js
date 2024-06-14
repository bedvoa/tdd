const { PasswordStrenthCheck } = require("../passwordStrengthCheck");

describe("암호 검사기 - Test Code", () => {
  it("Test Case: 모든 조건을 충족하는 경우", () => {
    const meter = new PasswordStrenthCheck();
    const result = meter.meter("aA1!aaaa"); // Expected: STRONG

    expect(result).toBe("STRONG");
  });
});
