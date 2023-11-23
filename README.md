Sistema de Gestão de Produtos com DDD e Arquitetura Limpa

Este projeto é um exemplo prático de um Sistema de Gestão de Produtos desenvolvido em Node.js utilizando TypeScript, Mongoose para persistência de dados, e seguindo princípios de Domain-Driven Design (DDD) e Arquitetura Limpa.

Estrutura de Diretórios
O projeto segue a estrutura de diretórios baseada em DDD e Arquitetura Limpa:

src/domain: Contém a lógica de negócios e as entidades do domínio, como a classe Product.
src/application: Responsável por conter os serviços de aplicação que orquestram a lógica de negócios.
src/infrastructure/mongoose: Aqui está o repositório ProductRepository que lida com a persistência dos produtos utilizando o Mongoose.
src/interfaces/http: Contém os controladores (ProductController) e as rotas (ProductRoutes) para lidar com as solicitações HTTP relacionadas a produtos.
src/dtos: Define os objetos de transferência de dados (DTOs), como CreateProductDTO e UpdateProductDTO.
src/shared/errors: Contém a classe AppError para representar erros compartilhados em toda a aplicação.
src/utils: Utilitários comuns.
Funcionalidades Principais
Produto (Product)

Modelo (Product) representa um produto com propriedades como nome e preço.
Serviço de aplicação (ProductService) contém a lógica de negócios relacionada a produtos.
Controlador (ProductController) e Rotas (ProductRoutes) para lidar com solicitações HTTP relacionadas a produtos.
DTOs (Data Transfer Objects)

CreateProductDTO define a estrutura para criar um novo produto.
UpdateProductDTO define a estrutura para atualizar um produto existente.
Erros Compartilhados

AppError é utilizado para representar erros compartilhados em toda a aplicação, proporcionando consistência nas respostas de erro.
Testes Unitários
Utiliza Jest para escrever testes unitários.
Utiliza mocks para isolar dependências externas.
Documentação API
A documentação básica da API pode ser acessada através das rotas definidas nos controladores e é destacada pela estrutura do projeto e os princípios DDD aplicados.
Este projeto visa demonstrar boas práticas de desenvolvimento, arquitetura limpa e design orientado a domínio na construção de sistemas em Node.js.