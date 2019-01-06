import http from 'http';
import jwt from 'jsonwebtoken';
import supertest from 'supertest';
import app from '../../../app';
import models from '../models';

const { Supervisor } = models;

const supervisorsDetails = {
  supervisorId: 'TN234563',
  firstname: 'firstname',
  lastname: 'lastname',
  designation: 'designation',
  email: 'email@email.com'
};

const supervisorsIncorrectDetails = {
  supervisorId: 'TN234563678',
  firstname: '   ',
  lastname: '   ',
  designation: '    ',
  email: 'email'
};

describe('VLA: Add or Change Supervisor', () => {
  let server;
  let request;

  beforeAll(async () => {
    server = http.createServer(app);
    await server.listen(7000);
    request = supertest('http://vla.overtime.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Supervisor tests', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN012345', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if staff is not logged in', async () => {
      const response = await request
        .post('/supervisor')
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Please login first.');
    });

    it('should fail if field entries are incorrect', async () => {
      const response = await request
        .post('/supervisor')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsIncorrectDetails);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors.length).toEqual(5);
    });

    it('should fail if fields are missing', async () => {
      const supervisor = { ...supervisorsDetails };
      delete supervisor.email;
      const response = await request
        .post('/supervisor')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisor);

      const expectedMessage = 'The following fields are missing: email';

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(expectedMessage);
    });

    it('should add supervisor if supervisor does not already exist', async () => {
      const response = await request
        .post('/supervisor')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Supervisor added successfully.');
    });

    it('should update supervisor if supervisor already exists', async () => {
      const response = await request
        .post('/supervisor')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Supervisor updated successfully.');
    });

    it('should respond with an error message if an error occurs', async () => {
      const err = new Error('Not working');
      Supervisor.findOrCreate = jest.fn(() => Promise.reject(err));
      const response = await request
        .post('/supervisor')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('An error occured ERR500CNGSUP');
    });

    it('should respond with an error message if authentication fails', async () => {
      jwt.verify = jest.fn(() => { throw new Error(); });

      const response = await request
        .post('/supervisor')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(supervisorsDetails);

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('Authentication error ERR401AUTH');
    });
  });
});