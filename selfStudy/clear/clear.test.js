describe("mockClear, mockReset, mockRestore test", () => {
  it("mockClear test", () => {
    const mockFn = jest.fn();
    mockFn("hello world!");
    console.log(`call length: ${mockFn.mock.calls.length}`); // 1

    mockFn.mockClear();
    console.log(`call length: ${mockFn.mock.calls.length}`); // 0
  });

  it("mockReset test", () => {
    const mockFn = jest.fn().mockReturnValue("hello world!");
    console.log(mockFn()); // hello world!

    mockFn.mockReset();
    console.log(mockFn()); // undefined
    console.log(mockFn() === undefined);
  });

  it("mockRestore test", () => {
    const obj = {
      method: () => "real method",
    };
    jest.spyOn(obj, "method").mockReturnValue("mocked method");
    console.log(obj.method()); // mocked method

    obj.method.mockRestore();
    console.log(obj.method()); // real method
  });
});
