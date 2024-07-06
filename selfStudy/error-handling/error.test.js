const { throwError, Database } = require("./throwError");

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

  describe("try-catch", () => {
    const database = new Database();

    beforeEach(() => {
      database.close = jest
        .spyOn(Database.prototype, "close")
        .mockImplementation();
    });

    it("try", () => {
      expect(() => throwError(true)).not.toThrow();
      expect(() => throwError(true)).toBeTruthy();
    });

    it("catch", () => {
      expect(() => throwError(false)).toThrow("Error: bool is false");
    });
  });
});
