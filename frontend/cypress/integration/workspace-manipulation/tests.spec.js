before (() => {
    cy.login()
})

beforeEach(() => {
    cy.visit('localhost:4200')
    cy.wait(1000)
})

describe('Post-login section', function() {

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
        cy.get('#more-button').click()
        cy.get('.mat-menu-content').should('be.visible')
        cy.get('button').contains('Make copy').should('be.visible').click()
        cy.get('mat-card').contains('testworkplace - copy')
    })

    // Delete workplace
    it('Delete workplace', function () {
        cy.get('app-workspace-card')
        cy.get('mat-card').eq(0)
        cy.get('div').eq(0)
        cy.get('mat-card-title').contains('testworkplace')
        cy.get('#more-button').click({force:true})
        cy.get('.mat-menu-content').should('be.visible')
        cy.get('button').contains('Delete').should('be.visible').click()
    })

})