import { first, second, third } from "../src/order";

describe("first -> second -> third", () => {
  it("함수가 순서대로 호출이 됐는지 검증", () => {
    const spy1 = jest.fn(first);
    const spy2 = jest.fn(second);
    const spy3 = jest.fn(third);

    spy1();
    spy2();
    spy3();

    expect(spy1.mock.invocationCallOrder[0]).toBeLessThan(
      spy2.mock.invocationCallOrder[0]
    );
    expect(spy2.mock.invocationCallOrder[0]).toBeLessThan(
      spy3.mock.invocationCallOrder[0]
    );
    expect(spy3.mock.invocationCallOrder[0]).toBeGreaterThan(
      spy2.mock.invocationCallOrder[0]
    );
  });

  // it("함수가 순서대로 호출이 됐는지 검증 by jest-extended", () => {
  //   const spy1 = jest.fn(first);
  //   const spy2 = jest.fn(second);
  //   const spy3 = jest.fn(third);

  //   spy1();
  //   spy2();
  //   spy3();

  //   expect(spy1).toHaveBeenCalledBefore(spy2);
  //   expect(spy2).toHaveBeenCalledBefore(spy3);
  //   expect(spy3).toHaveBeenCalledAfter(spy2);
  // });
});
