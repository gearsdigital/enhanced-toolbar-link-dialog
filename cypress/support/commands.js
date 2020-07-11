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
Cypress.Commands.add('login', function (options = {}) {
  cy.visit('http://localhost:8000/panel');
  cy.fixture('user').then((user) => {
    cy.get('.k-panel-view').within(function () {

      cy.get('input[type="email"]')
        .clear()
        .type(user.email)

      cy.get('input[type="password"]')
        .clear()
        .type(user.password)

      cy.get('button')
        .click()
    })
    cy.url().should('include', '/panel')
  })
});

Cypress.Commands.add('openFirstNote', function (options = {}) {
  cy.visit('http://localhost:8000/panel');

  cy.get('.k-section-name-notes li:first-child a')
    .click()
});

Cypress.Commands.add('openDialog', function (options = {}) {
  cy.get('.k-toolbar .k-icon-url').click()
  cy.get(".k-dialog-body nav").contains("Internal Link").click();
});


