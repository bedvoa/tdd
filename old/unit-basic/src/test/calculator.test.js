const Calculator = require("../calculator");

describe("Calculator", () => {
  let calculator;
  beforeEach(() => {
    calculator = new Calculator();
  });

  it("init test", () => {
    expect(calculator.value).toBe(0);
  });

  it("set test", () => {
    calculator.set(4);
    expect(calculator.value).toBe(4);
  });

  it("add test", () => {
    calculator.add(4);
    calculator.add(4);
    expect(calculator.value).toBe(8);
  });

  it("add should throw an error if value is greater than 100", () => {
    expect(() => {
      calculator.add(101);
    }).toThrow("Value can not be greater than 100");
  });

  it("sub test", () => {
    calculator.set(5);
    calculator.subtract(3);
    expect(calculator.value).toBe(2);
  });

  it("mul test", () => {
    calculator.set(34);
    calculator.multiply(2);
    expect(calculator.value).toBe(68);
  });

  it("divide test", () => {
    calculator.set(10);
    calculator.divide(2);
    expect(calculator.value).toBe(5);
  });
});
