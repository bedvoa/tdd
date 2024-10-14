import { error, customError } from "../src/throwFunction";

describe("throw 함수 테스트", () => {
  it("throwError", () => {
    expect(() => error()).toThrow(Error);
  });

  it("customError: try/catch", () => {
    try {
      error();
    } catch (error) {
      expect(error).toStrictEqual(new Error());
    }
  });
});
