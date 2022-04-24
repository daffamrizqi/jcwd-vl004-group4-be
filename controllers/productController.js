const db = require("../models");
const multer = require("multer");
<<<<<<< HEAD
const { Op, literal } = require("sequelize");
// path : access and intereact with the file system
const path = require("path");
const { off } = require("process");
=======
const { Op } = require("sequelize");
// path : access and intereact with the file system
const path = require("path");
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940

// create main Model
const Product = db.products;
const Category = db.categories;

// main works
// 1. create product
const addProduct = async (req, res) => {
<<<<<<< HEAD
  // receiving data from client that will be inserted into products table
  let info = {
    name: req.body.name,
    stock: req.body.stock,
    unit: req.body.unit,
    volume: req.body.volume,
    buy_price: req.body.buy_price,
    sell_price: req.body.sell_price,
    description: req.body.description,
    image: req.file.path,
    bottle_capacity: req.body.bottle_capacity,
    categoryId: req.body.categoryId,
  };

  // Model.create() : insert queries

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
=======
    // receiving data from client that will be inserted into products table
    let info = {
        name: req.body.name,
        stock: req.body.stock,
        unit: req.body.unit,
        volume: req.body.volume,
        buy_price: req.body.buy_price,
        sell_price: req.body.sell_price,
        description: req.body.description,
        image: req.file.path,
        bottle_capacity: req.body.bottle_capacity,
        categoryId: req.body.categoryId,
    };

    // Model.create() : insert queries

    const product = await Product.create(info);
    res.status(200).send(product);
    console.log(product);
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940
};

// 2. get all products
const getAllProducts = async (req, res) => {
<<<<<<< HEAD
  let filters = {};
  // if (req.query.category) filters["$Category.name$"] = req.query.category;
  // if (req.query.bottle_capacity)
  //   filters.bottle_capacity = req.query.bottle_capacity;

  if (req.query.bottle_capacity) {
    let arrayOfBottleCap = req.query.bottle_capacity.split(",");
    filters.bottle_capacity = { [Op.in]: arrayOfBottleCap };
  }
  if (req.query.category) {
    let arrayOfCategory = req.query.category.split(",");
    filters["$Category.name$"] = {
      [Op.in]: arrayOfCategory,
    };
  }

  if (req.query.search)
    filters.name = {
      [Op.substring]: req.query.search,
    };

  // by default it will sort by name and asc
  let sort = ["name", "ASC"];
  if (req.query.sortField && req.query.sortDirection)
    sort = [req.query.sortField, req.query.sortDirection];

  // by default limit is 15
  let limit = 3;
  if (req.query.limit) limit = +req.query.limit;

  // by default offset is 0
  let offset = 0;
  if (req.query.offset) offset = +req.query.offset;

  // Model.findAll() : read the whole products table
  let allProducts = await Product.findAndCountAll({
    include: Category,
    where: filters,
    order: [sort],
    limit: limit,
    offset: offset,
  });

  res.status(200).send(allProducts);
=======
    // Model.findAll() : read the whole products table
    let allProducts = await Product.findAll();
    res.status(200).send(allProducts);
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940
};

// 3. get single product
const getProductById = async (req, res) => {
<<<<<<< HEAD
  const id = req.params.id;
  let product = await Product.findOne({ where: { id: id }, include: Category });
  res.status(200).send(product);
=======
    const id = req.params.id;
    let product = await Product.findOne({ where: { id: id }, include: Category });
    res.status(200).send(product);
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940
};

// 4. update product
const updateProduct = async (req, res) => {
<<<<<<< HEAD
  const id = req.params.id;
  let product = await Product.update(req.body, { where: { id: id } });
  let updatedProduct = await Product.findOne({ where: { id: id } });
  res.status(200).send(updatedProduct);
=======
    const id = req.params.id;
    let product = await Product.update(req.body, { where: { id: id } });
    let updatedProduct = await Product.findOne({ where: { id: id } });
    res.status(200).send(updatedProduct);
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940
};

// 5. delete product
const deleteProduct = async (req, res) => {
<<<<<<< HEAD
  const id = req.params.id;

  await Product.destroy({ where: { id: id } });
  const product = await Product.findAll({});
  res.status(200).send({
    message: `product with id: ${id} has been deleted`,
    data: product,
  });
=======
    const id = req.params.id;

    await Product.destroy({ where: { id: id } });
    const product = await Product.findAll({});
    res
        .status(200)
        .send({
        message: `product with id: ${id} has been deleted`,
        data: product,
        });
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940
};

// restore soft deleted product
const restoreProduct = async (req, res) => {
<<<<<<< HEAD
  const id = +req.params.id;
  await Product.restore({ where: { id: id } });
  const data = await Product.findAll({ where: { id: id } });
  res.status(200).send(data);
=======
    const id = +req.params.id;
    await Product.restore({ where: { id: id } });
    const data = await Product.findAll({ where: { id: id } });
    res.status(200).send(data);
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940
};

// 7. upload product image controller
const storage = multer.diskStorage({
<<<<<<< HEAD
  // folder to which the file has been saved
  destination: (req, file, cb) => {
    cb(null, "public/productImages");
  },
  // name of the file within destination
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Please Give a proper file format to upload!");
  },
}).single("image");

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  restoreProduct,
  upload,
=======
    // folder to which the file has been saved
    destination: (req, file, cb) => {
    cb(null, "public/productImages");
},
  // name of the file within destination
    filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: "5000000" },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));

        if (mimeType && extname) {
        return cb(null, true);
        }
        cb("Please Give a proper file format to upload!");
    },
}).single("image");

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    restoreProduct,
    upload,
>>>>>>> 0716545bb5bf6a1fb4a17efefdf88a9072d60940
};
