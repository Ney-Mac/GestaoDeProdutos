"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const ProductRoutes_1 = __importDefault(require("./src/interfaces/http/ProductRoutes"));
const ProductService_1 = __importDefault(require("./src/application/ProductService"));
const ProductRepository_1 = __importDefault(require("./src/infrastructure/mongoose/ProductRepository"));
const database_1 = __importDefault(require("./src/infrastructure/mongoose/database"));
const start = () => {
    const server = (0, fastify_1.default)();
    (0, database_1.default)();
    const productRepository = new ProductRepository_1.default();
    const productService = new ProductService_1.default(productRepository);
    (0, ProductRoutes_1.default)(server, productService);
    server.listen({ port: 3000 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
};
start();
