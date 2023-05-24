// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('baseUrl', () => {
    cy.visit('/');
})

Cypress.Commands.add('general', () => {
  if (Cypress.$('h1').length > 0) {
    cy.get('h1')
      .should('have.css', 'font-size', '55px')
      .should('have.css', 'font-weight', '800')
      .should('have.css', 'line-height', '65px')
      .should('have.css', 'font-family').and('match', /DIN 2014/)
  }

  if (Cypress.$('h2').length > 0) {
    cy.get('h2')
      .should('have.css', 'font-size', '42px')
      .should('have.css', 'font-weight', '700')
      .should('have.css', 'line-height', '52px')
      .should('have.css', 'font-family').and('match', /DIN 2014/)
  }
   
  if (Cypress.$('h3').length > 0) { 
    cy.get('h3')
      .should('have.css', 'font-size', '32px')
      .should('have.css', 'font-weight', '700')
      .should('have.css', 'line-height', '42px')
      .should('have.css', 'font-family').and('match', /DIN 2014/)
  }

  if (Cypress.$('h4').length > 0) {
    cy.get('h4')
      .should('have.css', 'font-size', '28px')
      .should('have.css', 'font-weight', '700')
      .should('have.css', 'line-height', '38px')
      .should('have.css', 'font-family').and('match', /DIN 2014/)
  }
    
  if (Cypress.$('h5').length > 0) { 
    cy.get('h5')
      .should('have.css', 'font-size', '24px')
      .should('have.css', 'font-weight', '600')
      .should('have.css', 'line-height', '36px')
      .should('have.css', 'font-family').and('match', /DIN 2014/)
  }
    
  if (Cypress.$('h6').length > 0) { 
    cy.get('h6')
      .should('have.css', 'font-size', '22px')
      .should('have.css', 'font-weight', '400')
      .should('have.css', 'line-height', '34px')
      .should('have.css', 'font-family').and('match', /DIN 2014/)
  }    
})