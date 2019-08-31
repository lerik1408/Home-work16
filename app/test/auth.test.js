const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const app = require('../../server');

chai.should();
chai.use(chaiHttp);

let token = '';

describe('Accounts', () => {
  before((done) => {
    chai.request(app)
      .post('/api/auth/sign-in')
      .send({
        email: 'popruzhuk.38@gmail.com',
        password: 'Okf123fu',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.have.keys(['name', 'surname', 'email', 'photo']);
        res.body.should.have.property('token');
        // eslint-disable-next-line prefer-destructuring
        token = res.body.token;
        done();
      });
  });
  it('Should login user and return his auth data', (done) => {
    chai.request(app)
      .post('/api/auth/sign-in')
      .send({
        email: 'popruzhuk.38@gmail.com',
        password: 'Okf123fu',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('user').that.have.keys(['name', 'surname', 'email', 'photo']);
        res.body.should.have.property('token');
        done();
      });
  });

  it('Should upload user photo and return url', (done) => {
    chai.request(app)
      .put('/api/profile/photo')
      .set('Authorization', `JWT ${token}`)
      .attach('photo', fs.readFileSync('./app/test/default.jpg'), 'default.jpg')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('photo');
        done();
      });
  });
});
