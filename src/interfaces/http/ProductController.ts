import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import ProductService from '../../application/ProductService';
import CreateProductDTO from '../../dtos/CreateProductDTO';
import UpdateProductDTO from '../../dtos/UpdateProductDTO';
import AppError from '../../shared/errors/AppError';

export default class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    async createProduct(request: FastifyRequest<{ Body: CreateProductDTO }>, reply: FastifyReply): Promise<void> {
        try {

            const createProductDTO = request.body;
            const product = await this.productService.create(createProductDTO);
            reply.send(product);

        } catch (error) {
            this.handlerErrors(error, reply);
        }
    }

    async updateProduct(request: FastifyRequest<{ Params: { productId: string }; Body: UpdateProductDTO }>, reply: FastifyReply): Promise<void> {
        try {
            const productId: string = request.params.productId;
            const updateProductDTO = request.body;
            const product = await this.productService.update(productId, updateProductDTO);
            reply.send(product);
        } catch (error) {
            this.handlerErrors(error, reply);
        }
    }

    private handlerErrors(error: any, reply: FastifyReply): void {
        if (error instanceof AppError) {
            reply.status(error.statusCode).send({ error: error.message });
        } else {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    }
}