before (() => {
  cy.login()
})

beforeEach(() => {
  cy.visit('localhost:4200')
  cy.wait(1000)
})

describe('Group Manipulation', function() {

  // click the group to have one in the workspace
  it('Click group onto the board then delete it', function () {
    //create a new workspace
    cy.viewport('macbook-16')
    cy.get('#add-button').click()
    cy.get('#mat-input-0').type('testworkplace').should('have.value', 'testworkplace')
    cy.get('#mat-input-1').type('testgoal').should('have.value', 'testgoal')
    cy.get('#0')
    cy.get('button').contains('SAVE').click()
    cy.wait(1000)

    //open the newly created workspace
    cy.get('mat-card').contains('testworkplace').should('be.visible')
    cy.get('app-workspace-card')
    cy.get('.mat-card-image').eq(-1).click()
    cy.get('#mat-dialog-0').should('be.visible')

    //choose the cards
    cy.get('li').click('left', { multiple: true})
    cy.get('button').contains('SAVE').click()
    cy.wait(1000)

    //click the wrench button
    cy.get('button').contains('build').click()
    //click the group
    cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(1)').should('be.visible').click()
    //group shows up in the workspace
    cy.get('app-group').should('be.visible')

   





  })








})
