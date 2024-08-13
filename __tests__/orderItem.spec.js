describe('POST /api/order-items', () => {
  it('deve retornar erro 400 se os dados forem inválidos', async () => {
    const res = await request(app)
      .post('/api/order-items')
      .send({ quantity: -1, price: 50.00 });  // Dados inválidos

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('PUT /api/order-items/:id', () => {
  it('deve retornar erro 400 se a quantidade for inválida', async () => {
    const order = await Order.create({ status: 'Pendente', total_amount: 100.50 });
    const product = await Product.create({ name: 'Produto 1', price: 50.00 });
    const orderItem = await OrderItem.create({ quantity: 2, price: 50.00, product_id: product.id, order_id: order.id });

    const res = await request(app)
      .put(`/api/order-items/${orderItem.id}`)
      .send({ quantity: -3 });  // Quantidade inválida

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
