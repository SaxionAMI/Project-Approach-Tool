const assert = require("assert");
const { before } = require("mocha");
const request = require('supertest')('http://localhost:13788');
const auth = require('./auth');

// TODO - GET requests

before(async () => {
  global.studentToken = await auth.generateToken('student');
  global.teacherToken = await auth.generateToken('teacher');
  global.adminToken = await auth.generateToken('admin');

})

describe('GET/ vt-rules', () => {
  it('Should get all te enabled rules', (done) => {
    request
      .get('/vt-rules')
      .set('Authorization', global.token)
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})


describe('GET/ vt-rules/all', () => {
  it('Should get all the rules', (done) => {
    console.log(global.token);
    request
      .get('/vt-rules/all')
      .set('Authorization', global.token)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/actions', () => {
  it('Should get all the actions', (done) => {
    request
      .get('/vt-rules/actions')
      .set('Authorization', global.token)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})



// describe('GET/ vt-rules/conditions', () => {
//   it('Should get all the conditions', (done) => {
//     request
//       .get('/vt-rules/conditions')
//       .set('Authorization', global.token)
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//   })
// })

// describe('GET/ vt-rules/comparisons', () => {
//   it('Should get all the comparisons', (done) => {
//     request
//       .get('/vt-rules/comparisons')
//       .set('Authorization', global.token)
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//   })
// })

// describe('GET/ vt-rules/scopes', () => {
//   it('Should get all the scopes', (done) => {
//     request
//       .get('/vt-rules/scopes')
//       .set('Authorization', global.token)
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//   })
// })

// describe('GET/ vt-rules/catalog-tabs', () => {
//   it('Should get all the catalog-tabs', (done) => {
//     request
//       .get('/vt-rules/catalog-tabs')
//       .set('Authorization', global.token)
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//   })
// })

// describe('GET/ vt-rules/severities', () => {
//   it('Should get all the severities', (done) => {
//     request
//       .get('/vt-rules/severities')
//       .set('Authorization', global.token)
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//   })
// })

// describe('GET/ vt-rules/phases', () => {
//   it('Should get all the phases', (done) => {
//     request
//       .get('/vt-rules/phases')
//       .set('Authorization', global.token)
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//   })
// })

// describe('GET/ vt-rules/strategies', () => {
//   it('Should get all the strategies', (done) => {
//     request
//       .get('/vt-rules/strategies')
//       .set('Authorization', global.token)
//       .expect('Content-Type', /json/)
//       .expect(200, done)
//   })
// })

// // TODO - POST requests

// describe('POST/ vt-rules', () => {
//   it('should <enter>', () => {

//   })
// })

// describe('POST/ vt-rules/:_id/set-enabled', () => {
//   it('should <enter>', () => {

//   })
// })

// describe('POST/ vt-rules/:_id', () => {
//   it('should <enter>', () => {

//   })
// })

// // TODO - DELETE requests

// describe('DELETE/ vt-rules/:_id', () => {
//   it('should <enter>', () => {

//   })
// })
