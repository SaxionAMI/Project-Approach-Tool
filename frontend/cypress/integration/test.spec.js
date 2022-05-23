// test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Pre-login section', function() {

    // Proper login 
    it('Proper Login', function () {
        cy.visit('localhost:4200')
        cy.get('input').type('realemail@gmail.com').should('have.value', 'realemail@gmail.com')
        cy.get('button').contains('LOGIN').click() 
    })

    // Improper login
    it('Improper Login', function () {
        cy.visit('localhost:4200')
        cy.get('input').type('fake_login').should('have.value', 'fake_login')
        cy.get('button').contains('LOGIN').click()
    })

    // Help button - Privacy statement
    it('Help button - Privacy statement', function () {
        cy.visit('localhost:4200')
        cy.get('#question-button').click()
        cy.get('button').contains('Privacy statement').click()
    })


    // Help button - About
    it('Help button - About', function () {
        cy.visit('localhost:4200')
        cy.get('#question-button').click()
        cy.get('button').contains('About').click()
    })

    // Help button - Report issue
    it('Help button - Report issue', function () {
        cy.visit('localhost:4200')
        cy.get('#question-button').click()
        cy.get('button').contains('Report issue').click()
    })

})

describe('Post-login section', function() {

    // Login  
    it('Proper Login', function () {
        cy.visit('localhost:4200')
        cy.get('input').type('test@projectapproachtool.nl').should('have.value', 'test@projectapproachtool.nl')
        cy.get('button').contains('LOGIN').click() 
        // cy.getLoginButton().click();

    })

})