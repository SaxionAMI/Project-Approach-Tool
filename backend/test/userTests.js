const { before } = require("mocha");
const should = require('should');
const assert = require('assert');
const request = require('supertest')('http://localhost:13788');
const auth = require('./auth');

before(async () => {
    global.adminToken = await auth.generateToken('admin', 'adminid');
    global.testingToken = await auth.generateToken('student', 'testing')
})

// POST Tests

describe('POST/ user', () => {
    it('Should create account', (done) => {
        let body = {
            firstName: 'testfirstname',
            lastName: 'testlastname',
            email: 'test@projectapproachtool.nl',
            study: 'teststrudy',
            school: 'testschool',
            uid: 'testing'
        }
        request
            .post('/user')
            .set('Authorization', global.testingToken)
            .send(body)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                global.userId = res.body.uid
                done();
            })
    })
})

describe('POST/ user/check', () => {
    it('Should be a valid email', (done) => {
        let body = {
            email: 'test@projectapproachtool.nl'
        }
        request
            .post('/user/check')
            .set('Authorization', global.testingToken)
            .send(body)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.ok(res.body)
                done();
            })
    })

    it('Should be invalid email', (done) => {
        let body = {
            email: 'invalidemail@invalid.nl'
        }
        request
            .post('/user/check')
            .set('Authorization', global.testingToken)
            .send(body)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.ok(!res.body)
                done();
            })
    })
})

describe('POST/ user/:uid/role', () => {
    it('Check current user role', (done) => {
        request
            .get(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.body.role, 'student')
                done();
            })
    })

    it('Should update user role', (done) => {
        let body = {
            role: 'teacher'
        }
        request
            .post(`/user/${global.userId}/role`)
            .set('Authorization', global.adminToken)
            .send(body)
            .expect(200, done)
    })

    it('Check new user role', (done) => {
        request
            .get(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.body.role, 'teacher')
                done();
            })
    })
})

// GET Tests

describe('GET/ user/role', () => {

    // this gets all users

    it('Should get list of user roles', (done) => {
        request
            .get('/user/role')
            .set('Authorization', global.adminToken)
            .expect(200, done)
    })
})

describe('GET/ user/:uid', () => {
    it('Should get user by ID', (done) => {
        request
            .get(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(200, done)
    })
})

describe('GET/ user/export/:uid', () => {
    it('Should get user', (done) => {
        request
            .get(`/user/export/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    })
})

// PUT Tests

describe('PUT/ user/:uid', () => {
    it('Check current user', (done) => {
        request
            .get(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.body.firstName, 'testfirstname');
                assert.equal(res.body.lastName, 'testlastname');
                assert.equal(res.body.email, 'test@projectapproachtool.nl');
                done();
            })
    })

    it('Should update user', (done) => {
        let body = {
            firstName: 'updatefirstname',
            lastName: 'updatelastname',
            email: 'updateemail@projectapproachtool.nl'
        }
        request
            .put(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .send(body)
            .expect(200, done)
    })

    it('Check updated user', (done) => {
        request
        .get(`/user/export/${global.userId}`)
        .set('Authorization', global.testingToken)
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.firstName, 'updatefirstname');
            assert.equal(res.body.lastName, 'updatelastname');
            assert.equal(res.body.email, 'updateemail@projectapproachtool.nl');
            done();
        })
    })
})

// DELETE Tests

describe('DELETE/ user/:uid', () => {
    it('Check if use is in database', (done) => {
        request
            .get(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(200, done)
    })

    it('Should delete user', (done) => {
        request
            .delete(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(200, done)
    })

    it('Check if user is not in database', (done) => {
        request
            .get(`/user/${global.userId}`)
            .set('Authorization', global.testingToken)
            .expect(404, done)
    })
})