const { before } = require("mocha");
const should = require('should');
const assert = require('assert');
const request = require('supertest');
const app = require('../server.js');
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