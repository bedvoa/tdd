const createProduct = (req, res, next) => {
  const { data } = req.body;
  res.status(200).json(data);
};

module.exports = {
  createProduct,
};
