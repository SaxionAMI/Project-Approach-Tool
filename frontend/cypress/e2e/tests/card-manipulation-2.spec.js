before (() => {
  cy.login()
})

beforeEach(() => {
  cy.visit('localhost:4200')
  cy.wait(1000)
})

describe('Card Manipulation', function() {

  it('Add time frames to an activity card in its detail dialog', function () {
    cy.viewport('macbook-16')
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
    cy.get('li').click('left', {multiple: true})
    cy.get('button').contains('SAVE').click()
    cy.wait(1000)
    cy.get('img').eq(1).click()
    cy.get('app-card-selector-card').should('be.visible')
    cy.get('mat-card').contains('Document analysis').should('be.visible').click()
    cy.get('app-card').contains('Document analysis').should('be.visible').click()
    cy.get('mat-dialog-container').should('be.visible')
    cy.get('#start-date-area').find('button').should('be.visible').click()
    cy.wait(1000)
    cy.get('.mat-calendar-body').should('be.visible')
    cy.get('.ng-star-inserted')
    const now = new Date()
    cy.log(now.getUTCDay().toString())
    cy.get('.mat-calendar-body-cell').children().contains(now.getDay()).click()
    cy.wait(1000)
    cy.get('#end-date-area').find('button').should('be.visible').click()
    cy.wait(1000)
    cy.get('.mat-calendar-body').should('be.visible')
    cy.get('tr td').should(value => {
      expect(Number.isNaN(+value), 'input should be a number').to.eq(true)
    }).then(($td) => {
      const items = $td.toArray()
      return Cypress._.sample(items)
    }).then(($td) => {
      // the yielded element is automatically wrapped in jQuery by Cypress
      expect(Cypress.dom.isJquery($td), 'jQuery element').to.be.true
      cy.log(`you picked "${$td.text()}"`)
      // we do not need to return anything from `cy.then`
      // if we want to continue working with the same element
    })
      .click()
    cy.wait(1000)
  })

})
