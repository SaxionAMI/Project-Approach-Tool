before (() => {
    cy.login()
})

beforeEach(() => {
    cy.viewport(2000,2000) 
    cy.visit('localhost:4200')
    cy.wait(1000)
})

describe('Card Manipulation', function() {
    it('Click cards onto the board', function () {
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
        cy.get('button').contains('build').click()
        cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(1)').should('be.visible').click()
        cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(2)').should('be.visible').click()
        cy.get('img').eq(1).click()
        cy.get('app-card-selector-card').should('be.visible')
        cy.get('mat-card').contains('Document analysis').should('be.visible')
    })

    it('Search for a card and drag it into the group', function () {
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
        cy.wait(100)
        cy.get('button').contains('build').click()
        cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(1)').should('be.visible').click()
        cy.get('img').eq(7).click()
        cy.get('.mat-form-field-infix').should('be.visible').type('Docum')

        cy.get('.sidebar-extended').should('be.visible');
        cy.get('mat-card').eq(0).should('be.visible').then(() => {
            cy.get('app-card-selector-card').eq(0).then(el => {
                const draggable = el[0]
                cy.get('.card-list').then(el => {
                  const droppable = el[0]
                  const coords = droppable.getBoundingClientRect()
                  draggable.dispatchEvent(new MouseEvent('mousemove'), { force: true });
                  draggable.dispatchEvent(new MouseEvent('mousedown'));
                  draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: 10, clientY: 0}));
                  draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.x+10, clientY: coords.y+10}));
                  draggable.dispatchEvent(new MouseEvent('mouseup'));
              
                })
              })
        })
    })

    it('Drag  a card from group 1 to a group 2', function () {
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
        cy.wait(100)
        cy.get('button').contains('build').click()
        cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(1)').should('be.visible').dblclick()
            cy.get('.group-header').eq(0).then(() => {
                cy.get('.group-header').eq(0)
                .trigger('mousedown', { force: true, button: 0 })
                // .wait(1500)
                .trigger('mousemove', { force: true,
                       pageX: 0,
                       pageY: 0
                   })
                 .trigger('mouseup', { force: true });
            })
        cy.get('img').eq(1).click()
        cy.get('.sidebar-extended').should('be.visible');
        cy.get('mat-card').eq(0).should('be.visible').then(() => {
            cy.get('app-card-selector-card').eq(0).then(el => {
                const draggable = el[0]
                cy.get('.card-list').eq(1).then(el => {
                  const droppable = el[0]
                  const coords = droppable.getBoundingClientRect()
                  draggable.dispatchEvent(new MouseEvent('mousemove'), { force: true });
                  draggable.dispatchEvent(new MouseEvent('mousedown'));
                  draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: 10, clientY: 0}));
                  draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.x+10, clientY: coords.y+10}));
                  draggable.dispatchEvent(new MouseEvent('mouseup'));
                })
            })
        })

        cy.get('.card-listitem').eq(0).should('be.visible').then(() => {
            cy.get('.card-listitem').eq(0).then((el) => {
                const draggable = el[0]
                cy.get('.card-list').eq(0).then(el => {
                  const droppable = el[0]
                  const coords = droppable.getBoundingClientRect()

                  cy.get('.card-listitem').eq(0).trigger('mousedown', { force: true})
                  .trigger('mousemove', { force: true,
                    pageX: 0,
                       pageY: 0
                })
                .trigger('mousemove', { force: true,
                    clientX: coords.x+20,
                    clientY: coords.y+20
                })
                .trigger('mouseup', { force: true });
                  draggable.dispatchEvent(new MouseEvent('mousemove', {force: true}));
                  draggable.dispatchEvent(new MouseEvent('mousedown'));
                  draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: 10, clientY: 0}));
                  draggable.dispatchEvent(new MouseEvent('mousemove', {clientX: coords.x+10, clientY: coords.y+10}));
                  draggable.dispatchEvent(new MouseEvent('mouseup'));
                })
            })
        })
})

    it('Drag cards from inspiration toolbar to a group', function () {
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
        cy.get('button').contains('build').click()
        cy.get('#screen > mat-drawer > div > div.ng-star-inserted > img:nth-child(1)').should('be.visible').click()
        cy.get('img').eq(1).click()
        cy.get('.sidebar-extended').should('be.visible');
        cy.get('mat-card').eq(0).should('be.visible').then(() => {
            cy.get('app-card-selector-card').eq(0).then(el => {
                const draggable = el[0]  // Pick up this
                cy.get('.card-list').then(el => {
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
})
    
    it('View card', function () {
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
        cy.get('img').eq(1).click()
        cy.get('app-card-selector-card').should('be.visible')
        cy.get('mat-card').contains('Document analysis').should('be.visible').click()
        cy.get('app-card').contains('Document analysis').should('be.visible').click()
        cy.get('mat-dialog-container').should('be.visible')
    })

    it('Remove cards from a group', function () {
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
        cy.wait(100);
        cy.get('app-card').eq(0).rightclick()
        cy.get('button').contains('Remove card').click()
    })
})