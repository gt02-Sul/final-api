const request = require('supertest');
const { sequelize, Address } = require('../models');
const app = require('../index');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Address Routes', () => {

  describe('GET /api/addresses', () => {
    it('deve resgatar todos os endereços', async () => {
      await Address.create({ 
        street: 'Rua das Flores', 
        city: 'Fortal', 
        state: 'CE', 
        zip_code: '60000-000', 
        country: 'Brasil' 
      });

      const res = await request(app).get('/api/addresses');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /api/addresses/:id', () => {
    it('deve resgatar um endereço por id', async () => {
      const address = await Address.create({ 
        street: 'Rua das Flores', 
        city: 'Fortal', 
        state: 'CE', 
        zip_code: '60000-000', 
        country: 'Brasil' 
      });

      const res = await request(app).get(`/api/addresses/${address.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('street', 'Rua das Flores');
    });

    it('deve retornar erro 404 para endereço não encontrado', async () => {
      const res = await request(app).get('/api/addresses/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Endereço não encontrado');
    });
  });

  describe('POST /api/addresses', () => {
    it('deve criar um novo endereço', async () => {
      const res = await request(app)
        .post('/api/addresses')
        .send({ 
          street: 'Rua Nova', 
          city: 'Fortal', 
          state: 'CE', 
          zip_code: '60000-001', 
          country: 'Brasil' 
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('street', 'Rua Nova');
    });
  });

  describe('PUT /api/addresses/:id', () => {
    it('deve atualizar um endereço', async () => {
      const address = await Address.create({ 
        street: 'Rua das Flores', 
        city: 'Fortal', 
        state: 'CE', 
        zip_code: '60000-000', 
        country: 'Brasil' 
      });

      const res = await request(app)
        .put(`/api/addresses/${address.id}`)
        .send({ street: 'Rua das Rosas' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('street', 'Rua das Rosas');
    });

    it('deve retornar erro 404 para endereço não encontrado', async () => {
      const res = await request(app)
        .put('/api/addresses/999')
        .send({ street: 'Rua Inexistente' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Endereço não encontrado');
    });
  });

  describe('DELETE /api/addresses/:id', () => {
    it('deve deletar um endereço por id', async () => {
      const address = await Address.create({ 
        street: 'Rua das Flores', 
        city: 'Fortal', 
        state: 'CE', 
        zip_code: '60000-000', 
        country: 'Brasil' 
      });

      const res = await request(app).delete(`/api/addresses/${address.id}`);
      expect(res.statusCode).toBe(204);
    });

    it('deve retornar erro 404 para endereço não encontrado', async () => {
      const res = await request(app).delete('/api/addresses/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Endereço não encontrado');
    });
  });

});
