describe("beforeEach", () => {
  let counter = 1;

  beforeEach(() => {
    counter++;
  });

  test("카운터 1 증가 -> 2", () => {
    expect(counter).toBe(2);
  });

  test("카운터 1 증가 -> 3", () => {
    expect(counter).toBe(3);
  });
});

describe("afterEach", () => {
  let counter = 1;

  afterEach(() => {
    counter++;
  });

  test("카운터 1 증가 -> 2", () => {
    expect(counter).toBe(1);
  });

  test("카운터 1 증가 -> 2", () => {
    expect(counter).toBe(2);
  });
});

describe("beforeAll", () => {
  let counter = 1;

  beforeAll(() => {
    counter++;
  });

  test("카운터 1 증가 -> 2", () => {
    expect(counter).toBe(2);
  });

  test("카운터 1 증가 -> 2", () => {
    expect(counter).toBe(2);
  });
});

describe("afterAll", () => {
  let counter = 1;

  afterAll(() => {
    counter++;
  });

  test("카운터 1 증가 -> 2", () => {
    expect(counter).toBe(1);
  });

  test("카운터 1 증가 -> 2", () => {
    expect(counter).toBe(1);
  });
});
