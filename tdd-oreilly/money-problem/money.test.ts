import { Money } from "./money";

describe("Money Problem", () => {
  describe("돈 산술 계산", () => {
    it("5 USD * 2 = 10 USD", () => {
      const five = new Money(5, "USD");
      const ten = new Money(10, "USD");
      expect(ten.amount).toBe(10);
      expect(five.times(2)).toStrictEqual(ten);
    });

    it("10 EUR x 2 = 20 EUR", () => {
      const ten = new Money(10, "EUR");
      const twenty = new Money(20, "EUR");
      expect(ten.times(2)).toStrictEqual(twenty);
    });

    it("4002 KRW / 4 = 1000.5 KRW", () => {
      const fourThousandTwo = new Money(4002, "KRW");
      const oneThousand = new Money(1000.5, "KRW");
      expect(fourThousandTwo.divide(4)).toStrictEqual(oneThousand);
    });
  });

  // describe("환전 계산", () => {
  //   it("5 USD + 10 EUR = 17 USD", () => {});
  //   it("1 USD + 1100KRW = 2200KRW", () => {});
  // });
});
