import { FastifyInstance } from 'fastify';
import ProductService from '../../application/ProductService';
import ProductController from './ProductController';

export default function productRoutes(fastify: FastifyInstance, productService: ProductService): void {
    const controller = new ProductController(productService);

    fastify.post('/products', controller.createProduct);

    fastify.put('/products/:productId', controller.updateProduct);
}