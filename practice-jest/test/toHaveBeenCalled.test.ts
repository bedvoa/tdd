import { sum, obj } from "../src/toHaveBeenCalled";

/**
 * toHaveBeenCalled
 *  - 함수가 호출 됐는지 안 됐는지 확인
 *   1. it 함수 안에서 jest.fn() 함수를 사용하여 함수를 jest 함수로 변경
 *   2. jest 함수를 호출
 *   3. expect(jest 함수).toHaveBeenCalled() 함수를 사용하여 함수가 호출 됐는지 확인
 */

/**
 * toHaveBeenCalled 대체
 * 1. 함수가 몇 번 호출 됐는지 확인
 * 2. 함수가 어떤 인자로 호출 됐는지 확인
 *
 * - jest.fn 함수를 사용하여 함수를 jest 함수로 변경: spy 함수 생성
 * - jest.spyOn 함수를 사용하여 객체의 메서드를 jest 함수로 변경: spy 삽입
 */

describe("toHaveBeenCalled 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sum 함수는 호출 됐는지 확인", () => {
    // toHaveBeenCalled 테스트를 하기 위해서는 미리 함수를 호출해야 함
    const sumMock = jest.fn(sum); // sum 함수를 jest 함수로 변경
    sumMock(1, 2); // sum 함수 호출
    expect(sumMock).toHaveBeenCalled();
  });

  it("sum 함수는 1번 호출 됐는지 확인", () => {
    const sumMock = jest.fn(sum);
    sumMock(1, 2);
    expect(sumMock).toHaveBeenCalledTimes(1);
  });

  it("sum 함수가 (1, 2) 인자로 호출이 됐는지 확인", () => {
    const sumMock = jest.fn(sum);
    sumMock(1, 2);
    expect(sumMock).toHaveBeenCalledWith(1, 2);
  });

  it("obj.minus 함수는 호출 됐는지 확인", () => {
    const minusMock = jest.spyOn(obj, "minus");
    obj.minus(1, 2);
    expect(minusMock).toHaveBeenCalled();
  });

  it("obj.minus 함수는 1번 호출 됐는지 확인", () => {
    const minusMock = jest.spyOn(obj, "minus");
    obj.minus(1, 2);
    expect(minusMock).toHaveBeenCalledTimes(1);
  });

  it("obj.minus 함수가 (1, 2) 인자로 호출이 됐는지 확인", () => {
    const minusMock = jest.spyOn(obj, "minus");
    obj.minus(1, 2);
    expect(minusMock).toHaveBeenCalledWith(1, 2);
  });
});
