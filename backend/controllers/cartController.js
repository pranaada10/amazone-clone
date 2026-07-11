const Cart = require("../models/Cart");

// ======================
// Add to Cart
// ======================
exports.addToCart = async (req, res) => {

    try {

        const { user, product, quantity } = req.body;

        const existingItem = await Cart.findOne({
            user,
            product
        });

        if (existingItem) {

            existingItem.quantity += quantity;

            await existingItem.save();

            return res.status(200).json({
                success: true,
                message: "Cart Updated Successfully",
                cart: existingItem
            });

        }

        const cart = await Cart.create({
            user,
            product,
            quantity
        });

        res.status(201).json({
            success: true,
            message: "Product Added to Cart",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================
// Get Cart
// ======================
exports.getCart = async (req, res) => {

    try {

        const cart = await Cart.find({
            user: req.params.userId
        }).populate("product");

        res.status(200).json({
            success: true,
            count: cart.length,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// ======================
// Update Cart Quantity
// ======================
exports.updateCart = async (req, res) => {

    try {

        const { quantity } = req.body;

        const cart = await Cart.findById(req.params.cartId);

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });

        }

        cart.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart Updated Successfully",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// ======================
// Remove Item From Cart
// ======================
exports.removeCartItem = async (req, res) => {

    try {

        const cart = await Cart.findById(req.params.cartId);

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });

        }

        await cart.deleteOne();

        res.status(200).json({
            success: true,
            message: "Item Removed From Cart"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
// ======================
// Clear Cart
// ======================
exports.clearCart = async (req, res) => {

    try {

        await Cart.deleteMany({
            user: req.params.userId
        });

        res.status(200).json({
            success: true,
            message: "Cart Cleared Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};