const ProductClient = require("./productClient");

class ProductService {
  constructor() {
    this.ProductClient = new ProductClient();
  }

  fetchAvailableItems() {
    return this.ProductClient.fetchItems().then((items) =>
      items.filter((item) => item.available)
    );
  }
}
