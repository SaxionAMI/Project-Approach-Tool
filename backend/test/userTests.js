const {
    before
} = require("mocha");
const request = require('supertest')('http://localhost:13788');
const auth = require('./auth');

before(async () => {
    global.studentToken = await auth.generateToken('student', 'studentid');
    global.teacherToken = await auth.generateToken('teacher', 'teacherid');
    global.adminToken = await auth.generateToken('admin', 'adminid');
})

describe('POST/ user', () => {
    it('should create account', (done) => {
        let body = {
            firstName: 'adminfirstname',
            lastName: 'adminlastname',
            email: 'adminemail@projectapproachtool.nl',
            study: 'adminstudy',
            school: 'adminschool',
            uid: 'adminid'
        }
        request
            .post('/user')
            .set('Authorization', global.adminToken)
            .send(body)
            .expect(200, done)
    })
})