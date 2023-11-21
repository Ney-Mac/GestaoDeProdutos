"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Product_1 = __importDefault(require("../../domain/product/Product"));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});
const ProductModel = (0, mongoose_1.model)('Product', ProductSchema);
class ProductRepository {
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDocument = new ProductModel({
                name: product.name,
                price: product.price
            });
            yield productDocument.save();
            return product;
        });
    }
    findById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const productDocument = yield ProductModel.findById(productId);
            if (!productDocument) {
                return null;
            }
            return new Product_1.default(productDocument.name, productDocument.price);
        });
    }
}
exports.default = ProductRepository;
