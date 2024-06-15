import {beforeEach, describe, expect, jest, test} from '@jest/globals';
import request from 'supertest';


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
    
    
})
