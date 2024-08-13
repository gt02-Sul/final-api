const request = require('supertest');
const { sequelize, Category } = require('../models');
const app = require('../index');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Category Routes', () => {

  describe('GET /api/categories', () => {
    it('deve resgatar todas as categorias', async () => {
      await Category.create({ name: 'Eletrônicos' });

      const res = await request(app).get('/api/categories');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /api/categories/:id', () => {
    it('deve resgatar uma categoria por id', async () => {
      const category = await Category.create({ name: 'Eletrônicos' });

      const res = await request(app).get(`/api/categories/${category.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Eletrônicos');
    });

    it('deve retornar erro 404 para categoria não encontrada', async () => {
      const res = await request(app).get('/api/categories/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Categoria não encontrada');
    });
  });

  describe('POST /api/categories', () => {
    it('deve criar uma nova categoria', async () => {
      const res = await request(app)
        .post('/api/categories')
        .send({ name: 'Livros' });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('name', 'Livros');
    });
  });

  describe('PUT /api/categories/:id', () => {
    it('deve atualizar uma categoria', async () => {
      const category = await Category.create({ name: 'Eletrônicos' });

      const res = await request(app)
        .put(`/api/categories/${category.id}`)
        .send({ name: 'Eletrodomésticos' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name', 'Eletrodomésticos');
    });

    it('deve retornar erro 404 para categoria não encontrada', async () => {
      const res = await request(app)
        .put('/api/categories/999')
        .send({ name: 'Categoria Inexistente' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Categoria não encontrada');
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('deve deletar uma categoria por id', async () => {
      const category = await Category.create({ name: 'Eletrônicos' });

      const res = await request(app).delete(`/api/categories/${category.id}`);
      expect(res.statusCode).toBe(204);
    });

    it('deve retornar erro 404 para categoria não encontrada', async () => {
      const res = await request(app).delete('/api/categories/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Categoria não encontrada');
    });
  });

});
