const { before } = require("mocha");
const should = require('should');
const assert = require('assert');
const request = require('supertest')('http://localhost:13788');
const auth = require('./auth');

before(async () => {
    global.studentToken = await auth.generateToken('student', 'studentid');
    global.teacherToken = await auth.generateToken('teacher', 'teacherid');
    global.adminToken = await auth.generateToken('admin', 'adminid');
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
            uid: 'adminid'
        }
        request
            .post('/user')
            .set('Authorization', global.adminToken)
            .send(body)
            .expect(200, done)
    })
})

describe('POST/ user/check', () => {
    it('Should', (done) => {

    })
})

describe('POST/ user/:uid/role', () => {
    it('Should', (done) => {
        
    })
})

// GET Tests

describe('GET/ user/role', () => {
    it('Should', (done) => {
        
    })
})

describe('GET/ user/:uid', () => {
    it('Should', (done) => {
        
    })
})

describe('GET/ user/export/:uid', () => {
    it('Should', (done) => {
        
    })
})

// PUT Tests

describe('PUT/ user/:uid', () => {
    it('Should', (done) => {
        
    })
})

// DELETE Tests

describe('DELETE/ user/:uid', () => {
    it('Should', (done) => {
        
    })
})