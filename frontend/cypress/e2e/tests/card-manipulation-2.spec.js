before (() => {
  cy.login()
})

beforeEach(() => {
  cy.visit('localhost:4200')
  cy.wait(1000)
})

describe('Card Manipulation', function() {

  it('Add time frames to an activity card, see method card on the planning step', function () {
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
    cy.wait(100)
    cy.get('button').contains('build').click()
    cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(1)').should('be.visible').click()
    cy.get('img').eq(1).click()
    cy.get('app-card-selector-card').should('be.visible')
    cy.get('mat-card').eq(0).click()
    cy.get('mat-card').eq(0).should('be.visible').then(() => {
      cy.get('app-card').eq(0).then(el => {
        const draggable = el[0]  // Pick up this
        cy.get('.group-content').then(el => {
          const droppable = el[0]
          const coords = droppable.getBoundingClientRect()
          draggable.dispatchEvent(new MouseEvent('mousemove'));
          draggable.dispatchEvent(new MouseEvent('mousedown'));
          draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: 10, clientY: 0}));
          draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.x+10, clientY: coords.y+10}));
          draggable.dispatchEvent(new MouseEvent('mouseup'));
        })
      })
    })
    cy.get('.card-listitem').should('be.visible').click()
    cy.get('mat-dialog-container').should('be.visible')
    cy.get('#start-date-area').find('button').should('be.visible').click()
    cy.wait(100)
    cy.get('.mat-calendar-body').should('be.visible')
    cy.get('.ng-star-inserted')
    const now = new Date()
    cy.log(now.getUTCDay().toString())
    cy.get('.mat-calendar-body-cell').children().contains(now.getDate()).click()
    cy.wait(100)
    cy.get('#end-date-area').find('button').should('be.visible').click()
    cy.wait(100)
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
    }).click()
    cy.wait(100)
    cy.get('mat-dialog-container').should('be.visible').within(() => {
      cy.get('.material-icons').should('be.visible').click({force: true})

    })
    cy.get('.vt-dashboard-content').should('be.visible').contains('Planning').click()
    cy.get('.dx-splitter-border').trigger('mousedown', { pageX: 600, pageY: 100 })
      .trigger('mousemove', { pageX: 600, pageY: 600 })
      .trigger('mouseup')

    // cy.get('.dx-gantt-taskResWrapper').eq(1).trigger('mousedown', 'right',{force: true, pageX: 600, pageY: 100 })
    //   .trigger('mousemove', { force: true, pageX: 600, pageY: 600})
    //   .trigger('mouseup', 40, 25, {force: true})
    })
})
