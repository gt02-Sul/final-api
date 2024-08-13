const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const addressController = require('../controllers/addressController');
const categoryController = require('../controllers/categoryController');
const orderController = require('../controllers/orderController');
const orderItemController = require('../controllers/orderItemController');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: e-commerce API
 *   description: Documentação de referência da API de demonstração para o trabalho final da geração Tech
 */

// Auth routes
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 */
router.post('/register', authController.register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', authController.login);

// User routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Recuperar uma lista de usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', userController.getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Recuperar um único usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Um único usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/users/:id', userController.getUserById);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/users/:id', userController.updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Sem corpo da resposta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/users/:id', userController.deleteUser);

// Address routes
/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Recuperar uma lista de endereços
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: Lista de endereços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 */
router.get('/addresses', addressController.getAllAddresses);
/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Recuperar um único endereço
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do endereço
 *     responses:
 *       200:
 *         description: Um único endereço
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Endereço não encontrado
 */
router.get('/addresses/:id', addressController.getAddressById);
/**
 * @swagger
 * /addresses:
 *   post:
 *     summary: Criar um novo endereço
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Endereço criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       500:
 *         description: Erro no servidor
 */
router.post('/addresses', addressController.createAddress);
/**
 * @swagger
 * /addresses/{id}:
 *   put:
 *     summary: Atualizar um endereço
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do endereço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Endereço atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *       404:
 *         description: Endereço não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/addresses/:id', addressController.updateAddress);
/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Deletar um endereço
 *     tags: [Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do endereço
 *     responses:
 *       204:
 *         description: Sem corpo da resposta
 *       404:
 *         description: Endereço não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/addresses/:id', addressController.deleteAddress);

// Categories routes
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Recuperar uma lista de categorias
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/categories', categoryController.getAllCategories);
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Recuperar uma única categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Uma única categoria
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 */
router.get('/categories/:id', categoryController.getCategoryById);
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoria criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro no servidor
 */
router.post('/categories', categoryController.createCategory);
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Atualizar uma categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoria atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.put('/categories/:id', categoryController.updateCategory);
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Deletar uma categoria
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da categoria
 *     responses:
 *       204:
 *         description: Sem corpo da resposta
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.delete('/categories/:id', categoryController.deleteCategory);

// Order routes
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Recuperar uma lista de pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/orders', orderController.getAllOrders);
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Recuperar um único pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Um único pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 */
router.get('/orders/:id', orderController.getOrderById);
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Pedido criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Erro no servidor
 */
router.post('/orders', orderController.createOrder);
/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Atualizar um pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/orders/:id', orderController.updateOrder);
/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Deletar um pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       204:
 *         description: Sem corpo da resposta
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/orders/:id', orderController.deleteOrder);

// OrderItem routes
/**
 * @swagger
 * /orderItems:
 *   get:
 *     summary: Recuperar uma lista de itens de pedido
 *     tags: [OrderItems]
 *     responses:
 *       200:
 *         description: Lista de itens de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderItem'
 */
router.get('/orderItems', orderItemController.getAllOrderItems);
/**
 * @swagger
 * /orderItems/{id}:
 *   get:
 *     summary: Recuperar um único item de pedido
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de pedido
 *     responses:
 *       200:
 *         description: Um único item de pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Item de pedido não encontrado
 */
router.get('/orderItems/:id', orderItemController.getOrderItemById);
/**
 * @swagger
 * /orderItems:
 *   post:
 *     summary: Criar um novo item de pedido
 *     tags: [OrderItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       201:
 *         description: Item de pedido criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       500:
 *         description: Erro no servidor
 */
router.post('/orderItems', orderItemController.createOrderItem);
/**
 * @swagger
 * /orderItems/{id}:
 *   put:
 *     summary: Atualizar um item de pedido
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderItem'
 *     responses:
 *       200:
 *         description: Item de pedido atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Item de pedido não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/orderItems/:id', orderItemController.updateOrderItem);
/**
 * @swagger
 * /orderItems/{id}:
 *   delete:
 *     summary: Deletar um item de pedido
 *     tags: [OrderItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de pedido
 *     responses:
 *       204:
 *         description: Sem corpo da resposta
 *       404:
 *         description: Item de pedido não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/orderItems/:id', orderItemController.deleteOrderItem);

// Product routes
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Recuperar uma lista de produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', productController.getAllProducts);
/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Recuperar um único produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Um único produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 */
router.get('/products/:id', productController.getProductById);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Criar um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erro no servidor
 */
router.post('/products', productController.createProduct);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualizar um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/products/:id', productController.updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deletar um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Sem corpo da resposta
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
