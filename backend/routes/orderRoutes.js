const express = require("express");

const router = express.Router();

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/orderController");

// Place Order
router.post("/", placeOrder);

// Get My Orders
router.get("/user/:userId", getMyOrders);

// Get Single Order
router.get("/:orderId", getOrderById);

// Update Order Status
router.put("/:orderId", updateOrderStatus);

module.exports = router;