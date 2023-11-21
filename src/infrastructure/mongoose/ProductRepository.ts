import { model, Schema } from "mongoose"; 
import Product from '../../domain/product/Product';

const ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const ProductModel = model<Product>('Product', ProductSchema);

export default class ProductRepository {
    async save(product: Product): Promise<Product> {
        const productDocument = new ProductModel({
            name: product.name,
            price: product.price
        });
        await productDocument.save();
        return product;
    }

    async findById(productId: string): Promise<Product | null> {
        const productDocument = await ProductModel.findById(productId);

        if(!productDocument) {
            return null;
        }

        return new Product(productDocument.name, productDocument.price);
    }
}