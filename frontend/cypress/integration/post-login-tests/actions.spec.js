before (() => {
    cy.login()
})

beforeEach(() => {
    cy.visit('localhost:4200')
    cy.wait(1000)
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

    // TODO: Get menu to become visible
    // Copy workplace
    it('Copy workplace', function () {
        cy.get('app-workspace-card')
        cy.get('mat-card').eq(0)
        cy.get('div').eq(0)
        cy.get('mat-card-title').contains('testworkplace')
        cy.get('#more-button').click({force:true})
        cy.get('.mat-menu-content').should('be.visible')
        cy.get('button').contains('Make copy').should('be.visible').click()
    })

    // TODO: Get menu to become visible
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