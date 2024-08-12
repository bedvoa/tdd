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

  describe("다양한 통화로 돈 계산", () => {
    it("EUR; '10 EUR'를 나타내는 개체에 2를 곱하면 '20 EUR'가 되는지 검증", () => {
      const tenEuros = new Money(10, "EUR");
      const twentyEuros = tenEuros.times(2);
      expect(twentyEuros.amount).toBe(20);
      expect(twentyEuros.currency).toBe("EUR");
      expect(twentyEuros).toStrictEqual(new Money(20, "EUR"));
    });

    it("KRW; '4002 KRW'를 나타내는 개체를 4로 나누면 '1000.5 KRW'가 되는지 검증", () => {
      const originalMoney = new Money(4002, "KRW");
      const actualMoneyAfterDivision = originalMoney.divide(4);
      const expectedMoneyAfterDivision = new Money(1000.5, "KRW");
      expect(actualMoneyAfterDivision).toStrictEqual(
        expectedMoneyAfterDivision
      );
    });
  });
});
