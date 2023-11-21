import fastify from 'fastify';
import productRoutes from './src/interfaces/http/ProductRoutes';
import ProductService from './src/application/ProductService';
import ProductRepository from './src/infrastructure/mongoose/ProductRepository';
import connectToDatabase from './src/infrastructure/mongoose/database';

const start = () => {
    const server = fastify();
    
    connectToDatabase();

    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository);

    productRoutes(server, productService);

    server.listen({ port: 3000 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
}

start();