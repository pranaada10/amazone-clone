
const Order = require("../models/Order");

// ======================
// Place Order
// ======================
exports.placeOrder = async (req, res) => {
    try {

        const order = await Order.create(req.body);

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Get My Orders
// ======================
exports.getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.params.userId
        }).populate("products.product");

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Get Single Order
// ======================
exports.getOrderById = async (req, res) => {
    try {

const order = await Order.findById(req.params.orderId)
    .populate("products.product")
    .populate("user", "-password");


        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================
// Update Order Status
// ======================
exports.updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findById(req.params.orderId);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        order.status = req.body.status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order Status Updated",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};