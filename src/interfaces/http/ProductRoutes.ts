import { FastifyInstance } from 'fastify';
import ProductService from '../../application/ProductService';
import ProductController from './ProductController';
import CreateProductDTO from '../../dtos/CreateProductDTO';
import UpdateProductDTO from '../../dtos/UpdateProductDTO';

export default function productRoutes(fastify: FastifyInstance, productService: ProductService): void {
    const controller = new ProductController(productService);

    fastify.post<{ Body: CreateProductDTO }>('/products', (request, reply) => {
        controller.createProduct(request, reply);
    });

    fastify.put<{ Params: { productId: string }; Body: UpdateProductDTO }>('/products/:productId', (request, reply) => {
        controller.updateProduct(request, reply);
    });
}