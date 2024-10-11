import { sum, subtract } from "../src/toBe";

describe("toBe", () => {
  it("sum", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(1, 2)).not.toBe(4);
  });

  it("subtract", () => {
    expect(subtract(2, 1)).toBe(1);
    expect(subtract(2, 1)).not.toBe(2);
  });
});
