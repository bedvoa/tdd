describe("JUnit annotation을 Jest로 변환", () => {
  // JUnit: ParameterizedTest
  it.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
  ])(
    "ParameterizedTest(%i, %i, %i)",
    (firstElement, secondElement, expected) => {
      expect(firstElement + secondElement).toBe(expected);
    }
  );

  // JUnit: DisplayName
  it("DisplayName", () => {
    expect(true).toBe(true);
  });

  // JUnit: Disabled
  it.skip("Disabled", () => {
    expect(true).toBe(true);
  });

  // JUnit: Timeout
  it("Timeout", () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }, 2000);

  // JUnit: Nested
  describe("Nested", () => {
    it("Nested", () => {
      expect(true).toBe(true);
    });
  });

  // JUnit: RepeatedTest
  for (let i = 0; i < 3; i++) {
    it("RepeatedTest", () => {
      expect(true).toBe(true);
    });
  }

  // JUnit: TestFactory
  const testFactory = (firstElement, secondElement, expected) => {
    it(`TestFactory(${firstElement}, ${secondElement}, ${expected})`, () => {
      expect(firstElement + secondElement).toBe(expected);
    });
  };
  testFactory(1, 1, 2);

  // JUnit: RepeatedTest + TestFactory
  for (let i = 0; i < 3; i++) {
    testFactory(1, 1, 2);
  }

  const tests = [
    { name: "Test 1", fn: () => expect(Math.random()).toBeLessThan(1) },
    { name: "Test 2", fn: () => expect(Math.random()).toBeLessThan(1) },
    { name: "Test 3", fn: () => expect(Math.random()).toBeLessThan(1) },
  ];

  tests.forEach(({ name, fn }) => {
    it(name, fn);
  });
});
