const Product = require('../../models/Product');
const Category = require('../../models/Category');

exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, quantity, color, image, category_id } = req.body;
        const product = await Product.create({ title, description, price, quantity, color, image, category_id });
        res.status(201).json({ message: 'Product created', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category, attributes: ['id', 'title', 'description'] }]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
