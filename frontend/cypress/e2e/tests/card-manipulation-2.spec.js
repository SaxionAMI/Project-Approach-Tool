before(() => {
  cy.login()
})

beforeEach(() => {
  cy.visit('localhost:4200')
  cy.wait(1000)
})


describe('Card Manipulation', function () {

  it('Add time frames to an activity card' +
    'See method card on the planning step' +
    'See the cards ordered by activity starting dates' +
    'Adjust start date and end date on the planning step', function () {

    cy.viewport('macbook-16')
    cy.get('#add-button').click()
    cy.get('#mat-input-0').type('testworkplace').should('have.value', 'testworkplace')
    cy.get('#mat-input-1').type('testgoal').should('have.value', 'testgoal')
    cy.get('#0')
    cy.get('button').contains('SAVE').click()
    cy.wait(1500)
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
          draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.x + 10, clientY: coords.y + 10}));
          draggable.dispatchEvent(new MouseEvent('mouseup'));
        })
      })
    })
    cy.get('app-card-selector-card').should('be.visible')
    cy.get('mat-card').eq(1).click()

    cy.get('mat-card').eq(1).should('be.visible').then(() => {
      cy.get('app-card').eq(0).then(el => {
        const draggable = el[0]  // Pick up this
        cy.get('.group-content').then(el => {
          const droppable = el[0]
          const coords = droppable.getBoundingClientRect()
          draggable.dispatchEvent(new MouseEvent('mousemove'));
          draggable.dispatchEvent(new MouseEvent('mousedown'));
          draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: 10, clientY: 0}));
          draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.x + 10, clientY: coords.y + 10}));
          draggable.dispatchEvent(new MouseEvent('mouseup'));
        })
      })
    })
    cy.wait(1000)
    cy.get('.card-listitem').should('be.visible').eq(1).click()
    cy.get('mat-dialog-container').should('be.visible')
    cy.get('.mat-form-field')
    cy.get('#note-area').type('testnote')
    cy.wait(1500)
    cy.get('#start-date-area').find('button').should('be.visible').click()
    cy.wait(100)
    cy.get('.mat-calendar-body').should('be.visible')
    cy.get('.ng-star-inserted')

    var now = new Date()
    var startDay = 0;
    var endDay = 0;

    if (now.toUTCString().includes('Feb')) {
      if (now.getDate() === 28) {
        startDay = 26;
        endDay = 28;
      } else {
        startDay = 25;
        endDay = 27;
      }
    } else if (now.getDate() >= 30) {
      startDay = 28;
      endDay = 30;
    } else {
      startDay = 27;
      endDay = 29;
    }

    now.setDate(startDay)
    cy.get('.mat-calendar-body-cell').children().contains(now.getDate()).click()
    cy.wait(1000)
    cy.get('#end-date-area').find('button').should('be.visible').click()
    cy.wait(1000)
    cy.get('.mat-calendar-body').should('be.visible')
    now.setDate(endDay)
    cy.get('tr').children().contains(now.getDate()).click()
    cy.wait(1000)

    cy.get('mat-dialog-container').should('be.visible').within(() => {
      cy.get('.material-icons').should('be.visible').click({force: true})
      cy.wait(1000)
    })
    cy.get('.vt-dashboard-content').should('be.visible').contains('Planning').click()
    cy.get('.dx-treelist-icon-container').click()
    cy.get('.dx-splitter-border').trigger('mousedown', {pageX: 600, pageY: 100})
      .trigger('mousemove', {pageX: 600, pageY: 600})
      .trigger('mouseup')

    cy.wait(1000)
    cy.get('.dx-treelist-text-content').eq(4).should('be.visible').dblclick()

    cy.get('.dx-overlay-content').should('be.visible').within(() => {
      cy.get('.dx-button-content').eq(2).click()
    })
    cy.wait(1000)

    cy.get('.dx-calendar-body').should('be.visible').within(() => {
      cy.wait(1000)
      cy.get('tr').eq(5).children().contains(now.getDate()).click()
    })
    cy.get('.dx-button-content').eq(16).click()
    cy.wait(100)

    cy.get('.dx-overlay-content').should('be.visible').within(() => {
      cy.get('.dx-button-content').eq(4).click()
    })
  })
})
