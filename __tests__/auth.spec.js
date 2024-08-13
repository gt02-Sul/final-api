const request = require('supertest');
const app = require('../index');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthController', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('register', () => {
        it('deve criar um novo usuário e retornar status 201', async () => {
            const mockUser = {
                id: 1,
                full_name: 'John Doe',
                email: 'john@example.com',
                password: 'hashedpassword'  // Senha mockada
            };

            // Mock do bcrypt.hashSync para retornar a senha mockada
            bcrypt.hashSync.mockReturnValue('hashedpassword');
            User.create.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/auth/register')
                .send({ full_name: 'John Doe', email: 'john@example.com', password: '123456' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockUser);
            expect(bcrypt.hashSync).toHaveBeenCalledWith('123456', 10);
            expect(User.create).toHaveBeenCalledWith({
                full_name: 'John Doe',
                email: 'john@example.com',
                password: 'hashedpassword'
            });
        });

        it('deve retornar status 500 em caso de erro', async () => {
            User.create.mockRejectedValue(new Error('Erro ao criar usuário'));

            const response = await request(app)
                .post('/auth/register')
                .send({ full_name: 'John Doe', email: 'john@example.com', password: '123456' });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erro ao criar usuário');
        });
    });

    describe('login', () => {
        it('deve fazer login com sucesso e retornar um token JWT', async () => {
            const mockUser = {
                id: 1,
                full_name: 'John Doe',
                email: 'john@example.com',
                password: 'hashedpassword',
                createdAt: new Date()
            };
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compareSync.mockReturnValue(true);
            jwt.sign.mockReturnValue('mockedToken');

            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'john@example.com', password: '123456' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ token: 'mockedToken' });
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'john@example.com' } });
            expect(bcrypt.compareSync).toHaveBeenCalledWith('123456', 'hashedpassword');
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: 1, name: 'John Doe', createdAt: mockUser.createdAt },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
        });

        it('deve retornar status 401 se as credenciais forem inválidas', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'john@example.com', password: 'wrongpassword' });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Credencias inválidas');
        });

        it('deve retornar status 500 em caso de erro', async () => {
            User.findOne.mockRejectedValue(new Error('Erro ao procurar usuário'));

            const response = await request(app)
                .post('/auth/login')
                .send({ email: 'john@example.com', password: '123456' });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Erro ao procurar usuário');
        });
    });
});
