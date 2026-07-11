const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart
} = require("../controllers/cartController");

// Add Product to Cart
router.post("/", addToCart);

// Get User Cart
router.get("/:userId", getCart);

// Update Cart Quantity
router.put("/:cartId", updateCart);

// Remove One Item
router.delete("/:cartId", removeCartItem);

// Clear Entire Cart
router.delete("/user/:userId", clearCart);

module.exports = router;