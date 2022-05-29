beforeEach (() => {
    cy.logout()
    cy.visit('localhost:4200')
})

describe('Pre-login section', function() {

    // Proper login 
    it('Proper Login', function () {
        cy.get('input').type('realemail@gmail.com').should('have.value', 'realemail@gmail.com')
        cy.get('button').contains('LOGIN').click() 
    })

    // Improper login
    it('Improper Login', function () {
        cy.get('input').type('fake_login').should('have.value', 'fake_login')
        cy.get('button').contains('LOGIN').click()
    })

    // Help button - Privacy statement
    it('Help button - Privacy statement', function () {
        cy.get('#question-button').click()
        cy.get('button').contains('Privacy statement').click()
    })


    // Help button - About
    it('Help button - About', function () {
        cy.get('#question-button').click()
        cy.get('button').contains('About').click()
    })

    // Help button - Report issue
    it('Help button - Report issue', function () {
        cy.get('#question-button').click()
        cy.get('button').contains('Report issue').click()
    })

})
