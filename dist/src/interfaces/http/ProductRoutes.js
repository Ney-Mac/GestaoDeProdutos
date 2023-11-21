"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = __importDefault(require("./ProductController"));
function productRoutes(fastify, productService) {
    const controller = new ProductController_1.default(productService);
    fastify.post('/products', controller.createProduct);
    fastify.put('/products/:productId', controller.updateProduct);
}
exports.default = productRoutes;
