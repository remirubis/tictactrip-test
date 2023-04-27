import type { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../app';

describe('/api/token', () => {
  describe('isAuthenticated middleware', () => {
    it('should return 400 Malformed if no email is provided', async () => {
      const response = await request(app).post('/api/token');
      expect(response.status).toBe(400);
    });

    it('should return 400 Malformed if no email is malformed', async () => {
      const response = await request(app).post('/api/token').send({ email: 'invalid_email' });
      expect(response.status).toBe(400);
    });

    it('should return access token', async () => {
      const response = await request(app).post('/api/token').send({ email: 'test@example.com' });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should return 401 Unauthorized if an invalid token is provided', async () => {
      const response = await request(app).post('/api/justify').set('Authorization', 'Bearer invalid_token');
      expect(response.status).toBe(401);
    });

    it('should set req.user and call next() if a valid token is provided', async () => {
      // Mock a valid JWT token
      const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
      const email = 'test@example.com';
      const token = jwt.sign({ email }, accessTokenSecret);

      // Make a request with the valid token
      const response = await request(app)
        .post('/api/justify')
        .set('Authorization', `Bearer ${token}`)
        .send('Test message')
        .set('Content-Type', 'text/plain');

      expect(response.status).toBe(200);
    });
  });
});
