describe("JUnit annotation을 Jest로 변환", () => {
  // JUnit: ParameterizedTest
  it.each([
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
  ])("ParameterizedTest(%i, %i, %i)", (a, b, expected) => {
    expect(a + b).toBe(expected);
  });
});
