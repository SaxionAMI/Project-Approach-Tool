const assert = require("assert");
const { before } = require("mocha");
const should = require('should');
const request = require('supertest');
const app = require('../server.js');
const auth = require('./auth');

// TODO - GET requests

before(async () => {
  global.studentToken = await auth.generateToken('student', 'studentid');
  global.teacherToken = await auth.generateToken('teacher', 'teacherid');
  global.adminToken = await auth.generateToken('admin', 'adminid');
})

describe('GET/ vt-rules', () => {
  it('Should get all the enabled rules', (done) => {
    request(app)
      .get('/vt-rules')
      .set('Authorization', global.studentToken)
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})


describe('GET/ vt-rules/all', () => {
  it('Should get all the rules', (done) => {
    request(app)
      .get('/vt-rules/all')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/actions', () => {
  it('Should get all the actions', (done) => {
    request(app)
      .get('/vt-rules/actions')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/conditions', () => {
  it('Should get all the conditions', (done) => {
    request(app)
      .get('/vt-rules/conditions')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/comparisons', () => {
  it('Should get all the comparisons', (done) => {
    request(app)
      .get('/vt-rules/comparisons')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/scopes', () => {
  it('Should get all the scopes', (done) => {
    request(app)
      .get('/vt-rules/scopes')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/catalog-tabs', () => {
  it('Should get all the catalog-tabs', (done) => {
    request(app)
      .get('/vt-rules/catalog-tabs')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/severities', () => {
  it('Should get all the severities', (done) => {
    request(app)
      .get('/vt-rules/severities')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/phases', () => {
  it('Should get all the phases', (done) => {
    request(app)
      .get('/vt-rules/phases')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

describe('GET/ vt-rules/strategies', () => {
  it('Should get all the strategies', (done) => {
    request(app)
      .get('/vt-rules/strategies')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

// TODO - POST requests

describe('POST/ vt-rules', () => {
  it('Should create a new rule', (done) => {
    let body = {
      title: "test title",
      description: "test description",
      phases: [
        {
          display: "Test",
          identifier: "test"
        }
      ],
      condition: {},
      action: {},
      enabled: false
    }
    request(app)
      .post('/vt-rules')
      .set('Authorization', global.teacherToken)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body._id.should.match(/^[a-f\d]{24}$/i);
        global.ruleId = res.body._id;
        done();
      })
  })

  it('Check that rule was created', (done) => {
    request(app)
      .get('/vt-rules/all')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => res.body.find(e => e._id == global.ruleId))
      .end(done)
  })
})

describe('POST/ vt-rules/:_id', () => {
  it('Should update existing rule', (done) => {
    let body = {
      title: "test title",
      description: "test description",
      phases: [
        {
          display: "Update",
          identifier: "update"
        }
      ],
      condition: {},
      action: {},
      enabled: false
    }
    request(app)
      .post(`/vt-rules/${global.ruleId}`)
      .set('Authorization', global.teacherToken)
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(done)
  })

  it('Check if rule was updated', (done) => {
    request(app)
      .get('/vt-rules/all')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let rule = res.body.filter(e => e._id == global.ruleId)[0]
        assert.equal(rule.phases[0].display, 'Update')
        assert.equal(rule.phases[0].identifier, 'update')
        done();
      })
  })
})

describe('POST/ vt-rules/:_id/set-enabled', () => {
  it('Should rule is not enabled', (done) => {
    request(app)
      .get('/vt-rules')
      .set('Authorization', global.studentToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(!res.body.find(e => e._id == global.ruleId));
        done();
      })
  })

  it('Should set rule as enabled', (done) => {
    request(app)
      .post(`/vt-rules/${global.ruleId}/set-enabled`)
      .set('Authorization', global.teacherToken)
      .send({ enable: true })
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('Check rule is enabled', (done) => {
    request(app)
      .get('/vt-rules')
      .set('Authorization', global.studentToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(res.body.find(e => e._id == global.ruleId));
        done();
      })
  })
})

// TODO - DELETE request(app)s

describe('DELETE/ vt-rules/:_id', () => {
  it('Check if test rule is in database', (done) => {
    request(app)
      .get('/vt-rules/all')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.ok(res.body.find(e => e._id == global.ruleId))
        done();
      })
  })

  it('Should delete test rule', (done) => {
    request(app)
      .delete(`/vt-rules/${global.ruleId}`)
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

  it('Check if test rule is not in database', (done) => {
    request(app)
      .get('/vt-rules/all')
      .set('Authorization', global.teacherToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => !res.body.find(e => e._id == global.ruleId))
      .end(done)
  })
})
