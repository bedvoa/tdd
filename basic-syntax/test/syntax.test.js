// TODO: throw, toThrow, toThrowError, expect().toThrowError() 차이점
// TODO: 관련해서 일반 코드와 테스트 코드를 작성해보기
class Syntax {
  upperCase(str) {
    try {
      if (str === undefined || str === null) throw new Error("Error");
      if (str === "") throw new Error("Error");
      return str.toUpperCase();
    } catch (error) {
      throw new Error("Error");
    }
  }
}

describe("기본 문법 테스트", () => {
  test("기본 테스트", () => {
    const actual = 2;
    const expected = 2;
    expect(actual).toBe(expected);
  });

  test("toThrow 테스트", () => {
    const syntax = new Syntax();

    expect(() => syntax.upperCase()).toThrow("Error");
    expect(() => syntax.upperCase("hello")).not.toThrow();
    expect(syntax.upperCase("hello")).toBe("HELLO");
  });

  test("throw 테스트", () => {
    try {
      const syntax = new Syntax();
      syntax.upperCase("");
    } catch (error) {
      expect(error.message).toBe("Error");
    }
  });
});
