const Product = require('../../models/Product');
const Category = require('../../models/Category');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
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


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Category not found' });

        const updatedProduct = await product.update(req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
