before (() => {
    cy.login()
})

beforeEach(() => {
    cy.viewport('macbook-16') 
    cy.visit('localhost:4200')
    cy.wait(1000)
})

describe('Multiple user functionality', function() {

    it('Something', function () {
        
    })


})