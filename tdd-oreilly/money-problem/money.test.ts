import assert from "assert";

class Dollar {
  amount: number;

  constructor(amount: number) {
    this.amount = amount;
  }

  times(multiplier: number) {
    return new Dollar(this.amount * multiplier);
  }
}

describe("first", () => {
  it("5 USD * 2 = 10 USD", () => {
    let fiver = new Dollar(5);
    let tenner = fiver.times(2);
    assert.strictEqual(tenner.amount, 10);
  });
});
