beforeEach (() => {
    // Login
    cy.visit('localhost:4200')
    cy.login()
})

describe('Post-login section', function() {

    // Set details  
    it('Set details', function () {
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

    // Create workplace 
    it('Create workplace', function () {
        cy.get('#add-button').click()
        cy.get('#mat-input-0').type('testworkplace').should('have.value', 'testworkplace')
        cy.get('#mat-input-1').type('testgoal').should('have.value', 'testgoal')
        cy.get('#0')
        cy.get('button').contains('SAVE').click()
        // figure out how to check if workplace is created
    })

    // Copy workplace
    it('Copy workplace', function () {
        cy.get('app-workspace-card')
        cy.get('mat-card').eq(0)
        cy.get('div').eq(0)
        cy.get('mat-card-title').contains('testworkplace')
        cy.get('.mat-button-wrapper').click()
        cy.get('button').contains('Make copy').click()
    })

    //Delete workplace
    it('Delete workplace', function () {
        cy.get('app-workspace-card')
        cy.get('mat-card').eq(0)
        cy.get('div').eq(0)
        cy.get('mat-card-title').contains('testworkplace')
        cy.get('.mat-button-wrapper').click()
        cy.get('button').contains('Delete').click()
    })

})