import supertest from 'supertest';
import { expect } from 'chai';
import { it } from 'mocha';

const request = supertest('https://gorest.co.in/public-api/');
const TOKEN =
  'db57a3d82f04f77eac821326921eaa5d8ba7a222cdf88e27cdee3db7954cbe8a';

describe.skip('Users', () => {
  it('GET /users', () => {
    return request.get(`users?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data).to.not.be.empty;
    });
  });

  it('GET /users/:id', () => {
    return request.get(`users/1271?access-token=${TOKEN}`).then((res) => {
      expect(res.body.data.id).to.be.eq(1271);
    });
  });

  it('GET /users with query params', () => {
    const url = `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
    return request.get(url).then((res) => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach((data) => {
        expect(data.gender).to.eq('female');
        expect(data.status).to.eq('active');
      });
    });
  });

  it('POST /users', () => {
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
      });
  });

  it('PUT /users/:id', () => {
    const data = {
      status: 'inactive',
      name: `Jake-${Math.floor(Math.random() * 9999)}`,
    };
    return request
      .put('users/1271')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        expect(res.body.data).to.deep.include(data);
      });
  });

  it('DELETE /users/:id', () => {
    return request
      .delete('users/1384739')
      .set('Authorization', `Bearer ${TOKEN}`)
      .then((res) => {
        expect(res.body.data).to.be.eq(null);
      });
  });
});
