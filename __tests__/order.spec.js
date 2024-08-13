const request = require('supertest');
const { sequelize, Order } = require('../models');
const app = require('../index');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Order Routes', () => {

  describe('GET /api/orders', () => {
    it('deve resgatar todos os pedidos', async () => {
      await Order.create({ status: 'Pendente', total_amount: 100.50 });

      const res = await request(app).get('/api/orders');
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('deve resgatar um pedido por id', async () => {
      const order = await Order.create({ status: 'Pendente', total_amount: 100.50 });

      const res = await request(app).get(`/api/orders/${order.id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'Pendente');
    });

    it('deve retornar erro 404 para pedido não encontrado', async () => {
      const res = await request(app).get('/api/orders/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Pedido não encontrado');
    });
  });

  describe('POST /api/orders', () => {
    it('deve criar um novo pedido', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({ status: 'Completo', total_amount: 250.75 });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status', 'Completo');
    });
  });

  describe('PUT /api/orders/:id', () => {
    it('deve atualizar um pedido', async () => {
      const order = await Order.create({ status: 'Pendente', total_amount: 100.50 });

      const res = await request(app)
        .put(`/api/orders/${order.id}`)
        .send({ status: 'Enviado' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status', 'Enviado');
    });

    it('deve retornar erro 404 para pedido não encontrado', async () => {
      const res = await request(app)
        .put('/api/orders/999')
        .send({ status: 'Cancelado' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Pedido não encontrado');
    });
  });

  describe('DELETE /api/orders/:id', () => {
    it('deve deletar um pedido por id', async () => {
      const order = await Order.create({ status: 'Pendente', total_amount: 100.50 });

      const res = await request(app).delete(`/api/orders/${order.id}`);
      expect(res.statusCode).toBe(204);
    });

    it('deve retornar erro 404 para pedido não encontrado', async () => {
      const res = await request(app).delete('/api/orders/999');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('message', 'Pedido não encontrado');
    });
  });

});
