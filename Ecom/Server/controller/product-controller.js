import Product from "../model/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products: products });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.find({ id: req.params.id });
    res.status(200).json({ products: product });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
