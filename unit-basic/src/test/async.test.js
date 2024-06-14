const fetchProduct = require("../async");

describe("async", () => {
  // done 방식
  it("async - done", (done) => {
    fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
      done(); // test code가 실패했을 때 너무 느림
    });
  });

  // then 방식
  it("async - return", () => {
    return fetchProduct().then((item) => {
      expect(item).toEqual({ item: "Milk", price: 200 });
    });
  });

  // async/await 방식
  it("async - await", async () => {
    const product = await fetchProduct();
    expect(product).toEqual({ item: "Milk", price: 200 });
  });

  // async - resolves 방식
  it("async - resolves", () => {
    return expect(fetchProduct()).resolves.toEqual({
      item: "Milk",
      price: 200,
    });
  });

  // async - reject 방식
  it("async - reject", () => {
    return expect(fetchProduct("error")).rejects.toBe("network error");
  });
});
