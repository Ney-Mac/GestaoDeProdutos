import { model, Schema } from "mongoose";
import Product from '../../domain/product/Product';

const ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const ProductModel = model<Product>('Product', ProductSchema, 'GestaoDeProdutos');

export default class ProductRepository {
    async save(product: Product): Promise<Product> {
        const productDocument = new ProductModel({
            name: product.name,
            price: product.price
        });

        try {
            await productDocument.save();
            return product;
        } catch (error) {
            console.error('Erro ao salvar produto: ', error);
            throw error;
        }
    }

    async update(productId: string, product: Product): Promise<void> {
        try {
            const productDocument = await ProductModel.findById(productId);

            if (productDocument) {
                productDocument.set(product);
                await productDocument.save();
            }
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }

    }

    async findById(productId: string): Promise<Product | null> {
        const productDocument = await ProductModel.findById(productId);

        if (!productDocument) {
            return null;
        }

        return new Product(productDocument.name, productDocument.price);
    }
}