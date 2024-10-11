import { obj } from "../src/toStrictEqual";

describe("toStrictEqual", () => {
  it("obj", () => {
    expect(obj()).toStrictEqual({ a: "hello" });
    expect([1, 2, 3]).toStrictEqual([1, 2, 3]);
    expect([1, 2, 3]).not.toBe([1, 2, 3]);
  });
});
