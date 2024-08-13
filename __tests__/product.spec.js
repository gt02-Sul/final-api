const request = require('supertest');
const { sequelize, Product } = require('../models');
const app = require('../index');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Product Routes', () => {

  describe('GET /api/products', () => {
    it('deve resgatar todos os produtos', async () => {
      await Product.create({ name: 'Produto 1', price: 50.00 });

      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /api/products/:id', () => {
    it('deve resgatar um produto por id', async () => {
      const product = await Product.create({ name: 'Produto 1', price: 50.00 });

      const res = await request(app).get(`/api/products/${product.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Produto 1');
    });

    it('deve retornar erro 404 para produto não encontrado', async () => {
      const res = await request(app).get('/api/products/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Produto não encontrado');
    });
  });

  describe('POST /api/products', () => {
    it('deve criar um novo produto', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'Produto 2', price: 75.00 });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', 'Produto 2');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('deve atualizar um produto', async () => {
      const product = await Product.create({ name: 'Produto 1', price: 50.00 });

      const res = await request(app)
        .put(`/api/products/${product.id}`)
        .send({ name: 'Produto Atualizado', price: 60.00 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Produto Atualizado');
    });

    it('deve retornar erro 404 para produto não encontrado', async () => {
      const res = await request(app)
        .put('/api/products/999')
        .send({ name: 'Produto Inexistente', price: 100.00 });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Produto não encontrado');
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('deve deletar um produto por id', async () => {
      const product = await Product.create({ name: 'Produto 1', price: 50.00 });

      const res = await request(app).delete(`/api/products/${product.id}`);
      expect(res.statusCode).toBe(204);
    });

    it('deve retornar erro 404 para produto não encontrado', async () => {
      const res = await request(app).delete('/api/products/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Produto não encontrado');
    });
  });

});
