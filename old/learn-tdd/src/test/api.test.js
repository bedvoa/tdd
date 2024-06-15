const { getAPI } = require("../controllers");

describe("todo controller test", () => {
  test('should return "Hello World"', () => {
    const res = {
      send: jest.fn(),
    };
    getAPI(null, res);
    expect(res.send).toHaveBeenCalledWith("Hello World");
  });
});
