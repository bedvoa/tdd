class Lifecycle {
  constructor() {
    this.data = [];
  }

  add(item) {
    this.data.push(item);
  }

  remove(item) {
    this.data = this.data.filter((i) => i !== item);
  }

  get() {
    return this.data;
  }

  clear() {
    this.data = [];
  }
}

describe("LifeCycle Test", () => {
  let lifecycle;

  // Class Level Setup
  beforeAll(() => {
    console.log("beforeAll");
  });

  // Setup
  beforeEach(() => {
    console.log("beforeEach");
    lifecycle = new Lifecycle();
  });

  // Cleanup
  afterEach(() => {
    console.log("afterEach");
  });

  // Class Level Cleanup
  afterAll(() => {
    console.log("afterAll");
  });

  // Test Execution
  test("add test", () => {
    lifecycle.add(1);
    lifecycle.add(2);
    expect(lifecycle.get()).toEqual([1, 2]);
  });
});
