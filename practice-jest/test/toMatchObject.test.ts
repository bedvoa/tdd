import { obj } from "../src/toMatchObject";

// toMatchObject는 객체를 반환하는 함수를 테스트
// 클래스 비교는 toMatchObject를 사용
describe("toMatchObject", () => {
  it("obj", () => {
    expect(obj()).not.toStrictEqual({});
    expect(obj()).toMatchObject({});
  });
});
