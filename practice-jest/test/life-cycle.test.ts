describe("Jest LifeCycle", () => {
  beforeAll(() => {
    console.log("beforeAll");
  });

  beforeEach(() => {
    console.log("beforeEach");
  });

  afterAll(() => {
    console.log("afterAll");
  });

  afterEach(() => {
    console.log("afterEach");
  });

  it.todo("test 1");

  it.skip("test 2", () => {
    console.log("test 2");
  });
});
