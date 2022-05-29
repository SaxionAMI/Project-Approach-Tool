const { before } = require("mocha");
const should = require('should');
const assert = require('assert');
const request = require('supertest')('http://localhost:13788');
const auth = require('./auth');

before(async () => {
    global.testingToken = await auth.generateToken('student', 'testing')
})

// POST Tests

describe('POST/ invite', () => {
    
})

// GET Tests

describe('GET/ invite/:id', () => {
    
})