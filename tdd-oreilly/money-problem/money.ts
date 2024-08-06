export class Money {
  amount: number;
  currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier: number) {
    return new Money(this.amount * multiplier, this.currency);
  }

  divide(divisor: number) {
    return new Money(this.amount / divisor, this.currency);
  }
}
