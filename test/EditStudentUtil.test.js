const { describe, it } = require('mocha');
const { expect } = require('chai');
const { app, server } = require('../index-edit');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let baseUrl;

describe('Student API', () => {
  before(async () => {
    const { address, port } = await server.address();
    baseUrl = `http://${address == '::' ? 'localhost' : address}:${port}`;
  });

  after(() => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  let studentId = 12345;

  // Test Suite for editing students
  describe('PUT /edit-student/:id', () => {

    it('should return 500 for empty fields', (done) => {
      chai.request(baseUrl)
        .put(`/edit-student/${studentId}`)
        .send({ name: '', group: '', email: '' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal('All fields are required');
          done();
        });
    });

    it('should return 500 for invalid email format', (done) => {
      chai.request(baseUrl)
        .put(`/edit-student/${studentId}`)
        .send({ name: 'Updated name', group: 'Updated group', email: 'invalid-email' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal('Invalid email format');
          done();
        });
    });

    it('should return 500 for invalid group input length', (done) => {
      chai.request(baseUrl)
        .put(`/edit-student/${studentId}`)
        .send({ name: 'Updated name', group: 'Updated group testing', email: 'Update test@gmail.com' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal('Invalid group input length');
          done();
        });
    });

    it('should return 500 for invalid group input characters', (done) => {
      chai.request(baseUrl)
        .put(`/edit-student/${studentId}`)
        .send({ name: 'Updated name', group: '@#', email: 'Update test@gmail.com' })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equal('Invalid group input characters');
          done();
        });
    });

    it('should update an existing student', (done) => {
      chai.request(baseUrl)
        .put(`/edit-student/${studentId}`)
        .send({
          name: 'Updated name',
          email: 'Updated test@gmail.com',
          group: 'Updated group'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Student updated successfully!');
          done();
        });
    });
  });
});
