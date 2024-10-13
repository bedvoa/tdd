import { obj } from "../src/mockFunction";

describe("mockFunction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("obj.minus 함수는 호출 됐는지 확인", () => {
    jest.spyOn(obj, "minus");
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(-1);
  });

  it("obj.minus에 스파이를 심고 실행도 안되게 -> mockImplementation", () => {
    jest.spyOn(obj, "minus").mockImplementation(() => 0);
    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(0);
    // 원래는 -1이 나와야 하는데 0이 나오도록 변경했기 때문에 0이 나옴
    // 이런 식으로 데이터베이스에 접근하는 함수를 테스트할 때 사용
  });

  it("obj.minus에 스파이를 심고 리턴값이 서로 다르게 나오게 -> mockImplementationOnce", () => {
    jest
      .spyOn(obj, "minus")
      .mockImplementationOnce((a: number, b: number) => a + b) // 처음 호출 시
      .mockImplementationOnce((a: number, b: number) => a - b) // 두번째 호출 시
      .mockImplementation((a: number, b: number) => a * b); // 세번째 호출부터 계속

    const result1 = obj.minus(1, 2);
    const result2 = obj.minus(1, 2);
    const result3 = obj.minus(11, 3);
    const result4 = obj.minus(41, 7);
    expect(obj.minus).toHaveBeenCalledTimes(4);
    expect(result1).toBe(3);
    expect(result2).toBe(-1);
    expect(result3).toBe(33);
    expect(result4).toBe(287);
  });

  it("obj.minus에 스파이를 심고 리턴값만 다르게 -> mockReturnValue", () => {
    // mockImplementation이나 mockImplementationOnce는 함수를 재정의함으로써 리턴값을 변경
    // mockReturnValue은 리턴값만 변경
    jest.spyOn(obj, "minus").mockReturnValue(34);

    const result = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(1);
    expect(result).toBe(34);
  });

  it("obj.minus에 스파이를 심고 리턴값만 다르게 -> mockReturnValueOnce", () => {
    jest
      .spyOn(obj, "minus")
      .mockReturnValueOnce(34)
      .mockReturnValueOnce(56)
      .mockReturnValue(78);

    const result1 = obj.minus(1, 2);
    const result2 = obj.minus(1, 2);
    const result3 = obj.minus(1, 2);
    expect(obj.minus).toHaveBeenCalledTimes(3);
    expect(result1).toBe(34);
    expect(result2).toBe(56);
    expect(result3).toBe(78);
  });
});
