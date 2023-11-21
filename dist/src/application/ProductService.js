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
const Product_1 = __importDefault(require("../domain/product/Product"));
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    create(createProductDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price } = createProductDTO;
            const product = new Product_1.default(name, price);
            yield this.productRepository.save(product);
            return product;
        });
    }
    update(productId, updateProductDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield this.productRepository.findById(productId);
            if (!existingProduct) {
                throw new Error('Product not found');
            }
            if (updateProductDTO.name) {
                existingProduct.name = updateProductDTO.name;
            }
            if (updateProductDTO.price) {
                existingProduct.price = updateProductDTO.price;
            }
            yield this.productRepository.save(existingProduct);
            return existingProduct;
        });
    }
}
exports.default = ProductService;
