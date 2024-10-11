import { sum } from "../src/toBe";

describe("toBe", () => {
  it("sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
