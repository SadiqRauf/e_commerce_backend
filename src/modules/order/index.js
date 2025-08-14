const Order = require('../../models/Order');
const User = require('../../models/User');


exports.createOrder = async (req, res) => {
    try {

        const { status, total_amount, user_id, quantity } = req.body;

        // Validate required fields
        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }
        // Check if user exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const order = await Order.create({
            status,
            total_amount,
            user_id,
            quantity
        });

        res.status(201).json({ message: 'Order created', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });

        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) return res.status(404).json({ error: 'Order not found' });

        await order.update(req.body);

        res.json({ message: 'Order updated', order });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);

        if (!order) return res.status(404).json({ error: 'Order not found' });

        await order.destroy();

        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
