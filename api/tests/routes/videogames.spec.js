/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, Genre, conn } = require('../../src/db.js');

const agent = session(app);

describe('Videogame routes', () => {

  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => conn.sync({ force: true }))

  describe('GET /videogames', () => {
    
    it('should reply the GET method with status code 200 and an array of videogames greater than or equal to 100', async () => {
      const res = await agent.get('/videogames');
      expect(res.statusCode).to.equal(200);
      expect(res.body.length).to.be.greaterThanOrEqual(100);
    }).timeout(20000);
      
  });

  describe('POST /videogames', () => {
    
    it('should reply the POST method with status code 400 if required data not send', async () => {
      const res = await agent.post('/videogames').send({});
      expect(res.statusCode).to.be.equal(400);
    });

    it('should reply the POST method with status code 200 and add the videogame to the database if required data is send', async () => {
      const res = await agent.post('/videogames').send({ 
        name: 'Among us', 
        description: 'multiplayer game',
        genres: ['Strategy', 'Simulation'], 
        platforms: 'iOS' 
      });
      expect(res.statusCode).to.be.equal(200);
      const videogames = await Videogame.findAll({include: Genre})
      expect(videogames.length).to.be.equal(1) 
      expect(videogames[0].name).to.be.equal('Among us') 
      expect(videogames[0].description).to.be.equal('<p>multiplayer game</p>') 
      expect(videogames[0].platforms).to.be.equal('iOS') 
      expect(videogames[0].createdInDb).to.be.equal(true) 
      expect(videogames[0].id.length).to.be.equal(36) 
    });
  
  });

});
