import Product from '../domain/product/Product';
import ProductRepository from '../infrastructure/mongoose/ProductRepository';
import CreateProductDTO from '../dtos/CreateProductDTO';
import UpdateProductDTO from '../dtos/UpdateProductDTO';

export default class ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async create(createProductDTO: CreateProductDTO): Promise<Product> {
        const { name, price } = createProductDTO;
        const product = new Product(name, price);
        await this.productRepository.save(product);
        return product;
    }

    async update(productId: string, updateProductDTO: UpdateProductDTO): Promise<Product> {
        const existingProduct = await this.productRepository.findById(productId);

        if (!existingProduct) {
            throw new Error('Product not found');
        }

        if(updateProductDTO.name){
            existingProduct.name = updateProductDTO.name;
        }

        if(updateProductDTO.price) {
            existingProduct.price = updateProductDTO.price;
        }

        await this.productRepository.update(productId, existingProduct);
        return existingProduct;
    }
}
