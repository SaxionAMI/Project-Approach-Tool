before (() => {
  cy.login()
})

beforeEach(() => {
  cy.visit('localhost:4200')
  cy.wait(1000)
})

describe('Group Manipulation', function() {

  // click the group to have one in the workspace
  it('Click group onto the board', function () {
    //create a new workspace
    cy.get('#add-button').click()
    cy.get('#mat-input-0').type('testworkplace').should('have.value', 'testworkplace')
    cy.get('#mat-input-1').type('testgoal').should('have.value', 'testgoal')
    cy.get('#0')
    cy.get('button').contains('SAVE').click()
    cy.wait(1000)
    cy.get('mat-card').contains('testworkplace').should('be.visible')
    cy.get('app-workspace-card')
    cy.get('.mat-card-image').eq(-1).click()
    cy.get('#mat-dialog-0').should('be.visible')
    cy.get('li').click('left', { multiple: true})
    cy.get('button').contains('SAVE').click()
    cy.wait(1000)


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
    cy.get('mat-card').contains('testworkplace - copy').should('be.visible')
  })

  // Delete workplace
  it('Delete workplace', function () {
    cy.get('app-workspace-card')
    cy.get('mat-card').eq(1)
    cy.get('div').eq(0)
    cy.get('mat-card-title').contains('testworkplace - copy')
    cy.get('#more-button').click()
    cy.get('.mat-menu-content').should('be.visible')
    cy.get('button').contains('Delete').should('be.visible').click()
  })

  // Select random workplace
  it('Select random workpalce', function () {
    let randomInt = Math.floor(Math.random() * 'mat-card'.length)
    cy.get('mat-card').eq(Math.floor(randomInt))
    cy.get('.mat-card-image').eq(randomInt).click()
    cy.wait(2000)
    cy.get('mat-dialog-container')
    cy.get('button').contains('CANCEL').click()
  })

})
