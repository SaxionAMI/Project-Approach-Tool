// test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Test', function() {
    it('Login', function () {
        cy.visit('localhost:4200')
        cy.get('input').type('realemail@gmail.com').should('have.value', 'realemail@gmail.com')
        cy.get('button').contains('LOGIN').click() 
    })
})

describe('Test', function() {
    it('Improper Login', function () {
        cy.visit('localhost:4200')
        cy.get('input').type('fake_login').should('have.value', 'fake_login')
        cy.get('button').contains('LOGIN').click()
    })
})