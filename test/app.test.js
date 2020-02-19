const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');


describe('GET /apps', () => {
  it('should return 200 and JSON data of apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('should return 400 when sort param is invalid', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'invalid'})
      .expect(400, 'sort must be one of rating or app');
  });
  
  it('should return 400 when genres param is invalid', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'invalid'})
      .expect(400, 'genres not valid');
  });

  it('should return 200 when genres param is valid', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'Card'})
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
      });
  });

  it('should return app-sorted when sort=App', () =>{
    return supertest(app)
      .get('/apps')
      .query({sort : 'App'})
      .expect(200)
      .then(res =>{
        expect(res.body).to.be.an('array');
        let i=0 , sorted = true;
        while(sorted && i < res.body.length -1) {
          sorted = sorted && res.body[i].App < res.body[i+1].App;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});