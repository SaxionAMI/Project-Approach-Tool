before (() => {
    cy.login()
})

beforeEach(() => {
    cy.visit('localhost:4200')
    cy.wait(1000)
})

describe('Card Manipulation', function() {
    it('Enter workplace and select decks', function () {
        cy.get('app-workspace-card')
        cy.get('.mat-card-image').eq(0).click({force:true})
        cy.get('#mat-dialog-0').should('be.visible')
        // Forcing true causes list to no longer be selected. why??
        cy.get('li').click('left', { force:true , multiple: true})
        cy.get('button').contains('SAVE').click({force:true})
        cy.get('button').contains('build').click()
        cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(1)').should('be.visible').click()
        cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(2)').should('be.visible').click()
        // somehow get the dynamic item and drag it onto the other one. 
        cy.get('1653838874430').trigger('mousedown', 40, 40)
    })

})