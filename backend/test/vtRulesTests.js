const assert = require("assert");
const request = require('supertest')('http://localhost:13788');
const auth = require('./auth');

// TODO - GET requests

before(async () => {
  global.token = await auth.generateToken('teacher');
})

describe('GET/ vt-rules', () => {
    it('should <enter>', (done) => {
      request
        .get('/vt-rules')
        .set('Authorization', global.token)
        .expect('Content-Type', /json/)
        .expect(200, done);
    })
})

describe('GET/ vt-rules/all', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/actions', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/conditions', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/comparisons', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/scopes', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/catalog-tabs', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/severities', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/phases', () => {
  it('should <enter>', () => {

  })
})

describe('GET/ vt-rules/strategies', () => {
  it('should <enter>', () => {

  })
})

// TODO - POST requests

describe('POST/ vt-rules', () => {
  it('should <enter>', () => {

  })
})

describe('POST/ vt-rules/:_id/set-enabled', () => {
  it('should <enter>', () => {

  })
})

describe('POST/ vt-rules/:_id', () => {
  it('should <enter>', () => {

  })
})

// TODO - DELETE requests

describe('DELETE/ vt-rules/:_id', () => {
  it('should <enter>', () => {

  })
})
