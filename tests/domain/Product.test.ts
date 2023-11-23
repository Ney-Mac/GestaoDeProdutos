import Product from '../../src/domain/product/Product';

describe('Product', () => {
    it('Deve criar uma nova instancia de Product', () => {
        const product = new Product('Test Product', 19.99);

        expect(product).toBeDefined();
        expect(product.name).toEqual('Test Product');
        expect(product.price).toEqual(19.99);
    });
});
