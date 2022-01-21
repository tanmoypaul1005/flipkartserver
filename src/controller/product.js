
const slugify = require('slugify');
const Category = require('../models/category');
const Product = require('../models/product');



exports.createProduct=(req,res)=>{
const { name, price, description, category, quantity,productPicture,createdBy} = req.body;

let picture = [];

if (req.files.length > 0) {
  picture = req.files.map(file => {
    return { img: file.location };
  });
}

  const product = new Product({
    name:name,
    slug:name,
    price,
    quantity,
    description,
    productPicture,
    picture,
    category,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
};



exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug }).select('_id type')
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        Product.find({ category: category._id })
          .exec((error, products) => {
            if (error) {
              return res.status(400).json({ error });
            }

            if(category.type){
            if (products.length > 0) {
              res.status(200).json({
                products,
                productsByPrice: {
                  under5k: products.filter(product => product.price <= 5000),
                  under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                  under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                  under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                  under25k: products.filter(product => product.price > 20000 && product.price <= 35000),
                }

              });
            }
            }else{res.status(200).json({ products})}
          })
      }
    });
}




exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
