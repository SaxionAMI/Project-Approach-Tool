before (() => {
    cy.login()
})

beforeEach(() => {
    cy.viewport('macbook-16') 
    cy.visit('localhost:4200')
    cy.wait(1000)
})

describe('Workspace Manipulation', function() {
    let workspaceName = 'testworkplace1'
    let workspaceToBeDeleted

    // Create workplace
    it('Create workplace', function () {
        cy.get('#add-button').click()
        cy.get('#mat-input-0').type(workspaceName).should('have.value', workspaceName)
        cy.get('#mat-input-1').type('testgoal').should('have.value', 'testgoal')
        cy.get('#0')
        cy.get('button').contains('SAVE').click()
        cy.wait(1000)
        cy.get('mat-card').contains(workspaceName).should('be.visible')
    })

    // Copy workplace
    it('Copy workplace', function () {
        cy.get('app-workspace-card').eq(-1).within(() => {
            cy.contains(workspaceName)
            cy.get('#more-button').click()
        })       
        cy.get('.mat-menu-content').should('be.visible')
        cy.get('button').contains('Make copy').should('be.visible').click()
        cy.get('mat-card').contains(workspaceName + ' - copy').should('be.visible')
    })

    // Delete workplace
    it('Delete workplace', function () {
        cy.get('app-workspace-card').eq(-1).within(() => {
            cy.get('mat-card-title').eq(-1).then(($element) => {
                workspaceToBeDeleted = $element.text()
            })
            cy.get('#more-button').click()
        })
        cy.get('.mat-menu-content').should('be.visible')
        cy.get('button').contains('Delete').should('be.visible').click()
        cy.get('button').contains('YES').should('be.visible').click().then(() => {
            cy.get('mat-card').contains(workspaceToBeDeleted).should('not.exist')
        })
    })

    // Select random workplace
    it('Select random workplace', function () {
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        console.log(randomIntFromInterval(0, '.mat-card-image'.length))
        
        eq(randomIntFromInterval(0, '.mat-card-image'.length)).click()
        cy.wait(1000)
        cy.get('mat-dialog-container')
        cy.get('button').contains('CANCEL').click()
    })

    // Delete all workplaces -- ONLY USED TO CLEAN OUT TEST ACCOUNT WHILE TESTING -- DO NOT UNCOMMENT
    // it('Delete all workplaces', function () {
    //     cy.get('mat-card').each(() => {
    //         cy.get('mat-card').eq(0)
    //         cy.get('#more-button').should('be.visible').click()
    //         cy.get('.mat-menu-content').should('be.visible')
    //         cy.get('button').contains('Delete').should('be.visible').click()
    //         cy.get('button').contains('YES').should('be.visible').click()
    //         cy.wait(200)
    //     })
    // })


    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
})