describe("error-handling test", () => {
  describe("synchronous", () => {
    it("mockReturnValue", () => {
      const somethingSyncFn = jest.fn();
      somethingSyncFn.mockReturnValue(42);

      expect(somethingSyncFn()).toBe(42);
    });
  });

  describe("asynchronous", () => {
    let somethingAsyncFn;

    beforeEach(() => {
      somethingAsyncFn = jest.fn();
    });

    it("mockResolvedValue", async () => {
      somethingAsyncFn.mockResolvedValue(42);
      await expect(somethingAsyncFn()).resolves.toBe(42);
    });

    it("mockRejectedValue", async () => {
      somethingAsyncFn.mockRejectedValue(new Error("error"));
      await expect(somethingAsyncFn()).rejects.toThrow("error");
    });
  });
});
