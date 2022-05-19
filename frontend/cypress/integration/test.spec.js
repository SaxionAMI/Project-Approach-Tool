// test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Test', function() {
    it('Login', function () {
        cy.visit('localhost:4200')
        cy.get('input').type('test_item').should('have.value', 'test_item')
        cy.get('.btn-login mat-focus-indicator mat-raised-button mat-button-base').click()
    })
})

describe('Test', function() {
    it('Improper Login', function () {
        cy.visit('localhost:4200')
        cy.get('input').type('fake_login').should('have.value', 'fake_login')
        cy.get('button').click()
        cy.get('i').click()
    })
})