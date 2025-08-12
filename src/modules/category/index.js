const Category = require('../../models/Category');
const { v4: uuidv4 } = require('uuid');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create({ id: uuidv4(), ...req.body });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({ where: { is_deleted: false } });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        const updatedCategory = await category.update(req.body);
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


