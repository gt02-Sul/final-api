const { OrderItem } = require('../models');

const getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findByPk(id);
    if (orderItem) {
      res.status(200).json(orderItem);
    } else {
      res.status(404).json({ message: 'Pedido individual não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res.status(201).json(orderItem);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await OrderItem.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedOrderItem = await OrderItem.findByPk(id);
      res.status(200).json(updatedOrderItem);
    } else {
      res.status(404).json({ message: 'Pedido individual não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OrderItem.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Pedido individual não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};
