const request = require('supertest');
const { sequelize, User } = require('../models');
const app = require('../index'); 

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User Routes', () => {

  describe('GET /api/users', () => {
    it('deve resgatar todos os usuários', async () => {
      await User.create({ full_name: 'Lucas de Paula', email: 'lucas@email.com', password: 'senha123' });

      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /api/users/:id', () => {
    it('deve resgatar um usuário por id', async () => {
      const user = await User.create({ full_name: 'Lucas de Paula', email: 'lucas@email.com', password: 'senha123' });

      const res = await request(app).get(`/api/users/${user.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('email', 'lucas@email.com');
    });

    it('deve retornar erro 404 para usuário não encontrado', async () => {
      const res = await request(app).get('/api/users/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Usuário não encontrado');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('deve editar um usuário', async () => {
      const user = await User.create({ full_name: 'Lucas de Paula', email: 'lucas@email.com', password: 'senha123' });
      
      const res = await request(app)
        .put(`/api/users/${user.id}`)
        .send({ full_name: 'Lucas de Paula atualizado!' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('full_name', 'Lucas de Paula atualizado!');
    });

    it('deve retornar erro 404 para usuário não encontrado', async () => {
      const res = await request(app)
        .put('/api/users/999')
        .send({ full_name: 'Usuário não existe' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Usuário não encontrado');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('deve deletar um usuário por id', async () => {
      const user = await User.create({ full_name: 'Lucas de Paula', email: 'lucas@email.com', password: 'senha123' });

      const res = await request(app).delete(`/api/users/${user.id}`);
      expect(res.statusCode).toBe(204);
    });

    it('deve retornar erro 404 para usuário não encontrado', async () => {
      const res = await request(app).delete('/api/users/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Usuário não encontrado');
    });
  });
});
