const httpMocks = require("node-mocks-http");
const data = require("./data/dummy-data.json");
const productController = require("../controllers/products");

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body.data = { ...data };
  });

  it("should have a createProduct function", async () => {
    expect(typeof productController.createProduct).toBe("function");
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual(data);
  });
});
