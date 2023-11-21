import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import ProductService from '../../application/ProductService';
import CreateProductDTO from '../../dtos/CreateProductDTO';
import UpdateProductDTO from '../../dtos/UpdateProductDTO';

export default class ProductController {
    private productService: ProductService;

    constructor(productService: ProductService) {
        this.productService = productService;
    }

    async createProduct(request: FastifyRequest<{ Body: CreateProductDTO }>, reply: FastifyReply): Promise<void> {
        const createProductDTO = request.body;
        const product = await this.productService.create(createProductDTO);
        reply.send(product);
    }

    async updateProduct(request: FastifyRequest<{ Params: { productId: string }; Body: UpdateProductDTO }>, reply: FastifyReply): Promise<void> {
        const productId: string = request.params.productId;
        const updateProductDTO = request.body;
        const product = await this.productService.update(productId, updateProductDTO);
        reply.send(product);
    }
}