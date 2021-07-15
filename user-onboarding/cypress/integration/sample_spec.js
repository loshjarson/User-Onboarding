describe('Name test', () => {
    it('Checks if the name input works', () => {
        cy.visit('/public/index.html')

        cy.get('[data-cy=name]')
    })
})