beforeEach (() => {
    // Login
    cy.visit('localhost:4200')
})

describe('Post-login section', function() {

    // Login  
    it('Login and set details', function () {
        cy.login()
        cy.get('#profile-button').click()
        cy.get('button').contains('Settings').click()
        cy.get('#mat-input-0').type('testfirstname').should('have.value', 'testfirstname')
        cy.get('#mat-input-1').type('testlastname').should('have.value', 'testlastname')
        cy.get('#mat-input-2').type('testschool').should('have.value', 'testschool')
        cy.get('#mat-input-3').type('teststudy').should('have.value', 'teststudy')
        cy.get('#save').click()

    })

})