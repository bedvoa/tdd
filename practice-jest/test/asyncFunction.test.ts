import * as fns from "../src/asyncFunction";

describe("비동기 함수 테스트", () => {
  it("okPromise: Test 1", () => {
    const okSpy = jest.fn(fns.okPromise);
    // expect(okSpy()).resolves.toBe("no"); // 'ok'가 아닌 'no'를 검증하고 있는데 테스트가 통과함
    return expect(okSpy()).resolves.toBe("ok"); // return을 해주어야 함수가 끝날 때까지 기다려줌
  });

  it("okPromise: Test 2", () => {
    const okSpy = jest.fn(fns.okPromise);
    return okSpy().then((result) => {
      expect(result).toBe("ok");
    });
  });

  it("okPromise: Test 3", () => {
    jest.spyOn(fns, "okPromise").mockResolvedValue("ok");
    expect(fns.okPromise()).resolves.toBe("ok");
  });

  it("noPromise: Test 1", () => {
    const noSpy = jest.fn(fns.noPromise);
    return expect(noSpy()).rejects.toBe("no");
  });

  it("noPromise: Test 2", () => {
    const noSpy = jest.fn(fns.noPromise);
    return noSpy().catch((error) => {
      expect(error).toBe("no");
    });
  });

  it("noPromise: Test 3", () => {
    jest.spyOn(fns, "noPromise").mockRejectedValue("no");
    expect(fns.noPromise()).rejects.toBe("no");
  });

  it("okAsync", async () => {
    const okSpy = jest.fn(fns.okAsync);
    const result = await okSpy();
    expect(result).toBe("ok");
  });

  it("noAsync", async () => {
    const noSpy = jest.fn(fns.noAsync);
    try {
      const result = await noSpy();
    } catch (error) {
      expect(error).toBe("no");
    }
  });
});
