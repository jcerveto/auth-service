import {beforeEach, describe, expect, jest, test} from '@jest/globals';
import request from 'supertest';
//import jwt from 'jsonwebtoken';


import { app } from '../src/server'; 
//import { UserRepository } from '../src/controllers/userRepository';

describe('Test the endpoints', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /ping', async () => {
        const response = await request(app).get('/ping');
        expect(response.status).toBe(200);
        expect(response.text).toBe('pong');
    });

    test('GET / should respond with Hello World!', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World!');
    });

    test('POST /login should respond with a token and username on success', async () => {
        return request(app)
            .post('/login')
            .send({ username: 'test', password: 'test' })
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('token');
                expect(response.body).toHaveProperty('name');
            }); 
    });

    test('POST /login should respond with 500 on error', async () => {
        return request(app)
            .post('/login')
            .send({ username: null, password: null })
            .expect(500);
    });




    
    
})
