beforeEach (() => {
    cy.logout()
    cy.visit('localhost:4200')
    cy.wait(1000)
})

describe('Account creation and verification', function() {

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

    // Set details  
    it('Set details', function () {
        cy.login()
        cy.get('#profile-button').click()
        cy.get('button').contains('Settings').click()
        cy.get('#mat-input-0').clear().type('testfirstname').should('have.value', 'testfirstname')
        cy.get('#mat-input-1').clear().type('testlastname').should('have.value', 'testlastname')
        cy.get('#mat-input-2').clear().type('testschool').should('have.value', 'testschool')
        cy.get('#mat-input-3').clear().type('teststudy').should('have.value', 'teststudy')
        cy.get('#save').click()
        // cy.get('#profile-button').click()
        // cy.get('button').contains('Settings').click()        
        // cy.get('#mat-input-0').should('have.value', 'testfirstname')
        // cy.get('#mat-input-1').should('have.value', 'testlastname')
        // cy.get('#mat-input-2').should('have.value', 'testschool')
        // cy.get('#mat-input-3').should('have.value', 'teststudy')
})

})
