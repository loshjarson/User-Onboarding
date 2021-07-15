describe('Name Test', () => {
    it("Checks if the name input works", () =>{
        cy.visit('/build');
        cy.get('[data-cy=name]').type("Joshua");
        cy.get('[data-cy=name]').should('have.value','Joshua')

    })
})

describe('Email Test', () => {
    it("Checks if the email input works", () =>{
        cy.visit('/build');
        cy.get('[data-cy=email]').type("Joshua@email.com");
        cy.get('[data-cy=email]').should('have.value','Joshua@email.com')
    })
})

describe('Password Test', () => {
    it("Checks if the password input works", () =>{
        cy.visit('/build');
        cy.get('[data-cy=password]').type("Password");
        cy.get('[data-cy=password]').should('have.value','Password')
    })
})

describe('Agree Test', () => {
    it("Checks if the terms of service input works", () =>{
        cy.visit('/build');
        cy.get('[data-cy=agree]').should('not.be.checked')
        cy.get('[data-cy=agree]').check();
        cy.get('[data-cy=agree]').should('be.checked')
        cy.get('[data-cy=agree]').uncheck();
        cy.get('[data-cy=agree]').should('not.be.checked')
    })
})

describe('Validation test', () => {
    it('Checks if the form works', () => {
        cy.visit('/build');
        cy.get('[data-cy=name]').type("Joshua");
        cy.get('[data-cy=email]').type("Joshua@email.com");
        cy.get('[data-cy=password]').type("Password");
        cy.get('[data-cy=password]').clear();
        cy.get('[data-cy=agree').click();
        cy.get('[data-cy=submit]').should('be.disabled')
        cy.get('[data-cy=error-wrapper]').should('contain',"A password is required")
        // contains("A password is required")
    })
})

describe('Form test', () => {
    it('Checks if the form submits', () => {
        cy.visit('/build');
        cy.get('[data-cy=name]').type("Joshua");
        cy.get('[data-cy=email]').type("Joshua@email.com");
        cy.get('[data-cy=password]').type("Password");
        cy.get('[data-cy=agree').click();
        cy.get('[data-cy=submit]').click()
        cy.intercept('POST','https://reqres.in/api/users', (req)=>{
            req.continue((res) => {
                console.log(res)
                expect(res.statusCode).to.equal(201)
            })
        }).as('postUser')
        cy.wait('@postUser')
    })
})