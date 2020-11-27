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
          .click({force: true})
    })
    cy.url().should('include', '/panel')
  })
});

Cypress.Commands.add('openFirstNote', function (options = {}) {
  cy.visit('http://localhost:8000/panel');

  cy.get('.k-section-name-notes li:first-child a')
      .click({force: true})
});

Cypress.Commands.add('openDialog', function (options = {}) {
  cy.get('.k-toolbar .k-icon-url').click({force: true})
});

Cypress.Commands.add('openInternalTab', function (options = {}) {
  cy.get(".k-dialog-body nav").contains("Internal Link").click({force: true});
});
