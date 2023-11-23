import ProductService from "../../src/application/ProductService";
import ProductRepository from "../../src/infrastructure/mongoose/ProductRepository";
import CreateProductDTO from "../../src/dtos/CreateProductDTO";
import UpdateProductDTO from "../../src/dtos/UpdateProductDTO";
import Product from "../../src/domain/product/Product";

jest.mock('../../src/infrastructure/mongoose/ProductRepository');

describe('ProductService', () => {
    let productService: ProductService;
    let productRepositoryMock: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        productRepositoryMock = new ProductRepository() as jest.Mocked<ProductRepository>;
        productService = new ProductService(productRepositoryMock);
    });

    it('Deve criar um novo produto', async () => {
        const createProductDTO: CreateProductDTO = { name: 'Produto Teste', price: 385 };
        const product = new Product(createProductDTO.name, createProductDTO.price);

        productRepositoryMock.save.mockResolvedValue(product);

        const result = await productService.create(createProductDTO);

        expect(productRepositoryMock.save).toHaveBeenCalledWith(product);
        expect(result).toEqual(product);
    });

    it('Deve actualizar um produto existente', async () => {
        const productId = '123';
        const updateProductDTO: UpdateProductDTO = { name: 'Produto actualizado', price: 500 };
        const existingProduct = new Product('Produto Inicial', 200);

        productRepositoryMock.findById.mockResolvedValue(existingProduct);
        productRepositoryMock.update.mockResolvedValue();

        const result = await productService.update(productId, updateProductDTO);

        expect(productRepositoryMock.findById).toHaveBeenCalledWith(productId);
        expect(productRepositoryMock.update).toHaveBeenCalledWith(productId, expect.any(Product));
        expect(result).toEqual(existingProduct);
    });

    it('Deve lançar um erro quando actualizado um produto inexistente', async () => {
        const productId = '456';
        const updateProductDTO: UpdateProductDTO = { name: 'Producto actualizado', price: 100 };

        productRepositoryMock.findById.mockResolvedValue(null);

        await expect(productService.update(productId, updateProductDTO)).rejects.toThrow('Product not found');

        expect(productRepositoryMock.findById).toHaveBeenCalledWith(productId);
        expect(productRepositoryMock.update).not.toHaveBeenCalled();
    });
})