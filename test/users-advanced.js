import supertest from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';

const request = supertest('https://gorest.co.in/public-api/');
const TOKEN =
  'db57a3d82f04f77eac821326921eaa5d8ba7a222cdf88e27cdee3db7954cbe8a';
let userId;

describe('Users', () => {
  describe('POST', () => {
    it('user', () => {
      const data = {
        email: `tex${Math.floor(Math.random() * 9999)}@mail.com`,
        name: 'Jake',
        gender: 'male',
        status: 'active',
      };
      return request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
          userId = res.body.data.id;
        });
    });
  });

  describe('GET', () => {
    it('/users', () => {
      return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
      });
    });

    it('/users/:id', () => {
      return request
        .get(`users/${userId}?access-token=${TOKEN}`)
        .then((res) => {
          expect(res.body.data.id).to.be.eq(userId);
        });
    });

    it('/users with query params', () => {
      const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
      return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
          expect(data.gender).to.eq('female');
          expect(data.status).to.eq('active');
        });
      });
    });
  });

  describe('PUT', () => {
    it('/users/:id', () => {
      const data = {
        status: 'inactive',
        name: `Jake-${Math.floor(Math.random() * 9999)}`,
      };
      return request
        .put(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(data)
        .then((res) => {
          expect(res.body.data).to.deep.include(data);
        });
    });
  });

  describe('DELETE', () => {
    it('/users/:id', () => {
      return request
        .delete(`users/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then((res) => {
          expect(res.body.data).to.be.eq(null);
        });
    });
  });
});
