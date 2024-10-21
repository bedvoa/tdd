import { after3days } from "../src/date";

describe("날짜 함수 테스트", () => {
  it("after3days", () => {
    jest.useFakeTimers().setSystemTime(new Date(2024, 10, 14));
    expect(after3days()).toEqual(new Date(2024, 10, 17));
    jest.useRealTimers();
  });
});
