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

/**
 * @memberof cy
 * @method login
 * @returns Chainable
 */
Cypress.Commands.add('login', () => {
  cy.visit('/panel/login');
  cy.get('[type="email"]').type("mail@example.com");
  cy.get('[type="password"]').type("mail@example.com");
  cy.get('[type="submit"]').click();
});

/**
 * @memberof cy
 * @method openContentPage
 * @returns Chainable
 */
Cypress.Commands.add('openContentPage', () => {
  cy.intercept({
    method: 'GET',
    url: '/panel/pages/notes+exploring-the-universe',
  }).as('contentPage');
  cy.get('[data-id="notes/exploring-the-universe"]').click();
  cy.wait("@contentPage");
});

/**
 * @memberof cy
 * @method openWriterDialog
 * @returns Chainable
 */
Cypress.Commands.add('openWriterDialog', () => {
  cy.get('.k-writer-toolbar-button[title="Link"]').click();
});

/**
 * @memberof cy
 * @method openToolbarDialog
 * @returns Chainable
 */
Cypress.Commands.add("openToolbarDialog", () => {
	cy.get('.k-field-name-texttest button[title="Link"]')
		.scrollIntoView()
		.click();
});

/**
 * @memberof cy
 * @method addAndSelectText
 * @returns Chainable
 */
Cypress.Commands.add('addAndSelectText', () => {
  cy.get(".k-field-name-text .ProseMirror")
    .first()
    .clear()
    .type("Lorem{selectall}");
});

/**
 * @memberof cy
 * @method addLink
 * @param {string} value
 * @returns Chainable
 */
Cypress.Commands.add('addLink', (value) => {
  cy.get(".k-dialog").within(() => {
    cy.get(".enhanced-toolbar-autosuggest-field input").type(value, {delay: 20});
  });
});

/**
 * @memberof cy
 * @method addTitle
 * @param {string} value
 * @returns Chainable
 */
Cypress.Commands.add('addTitle', (value) => {
  cy.get(".k-dialog").within(() => {
    cy.get(".k-field-name-title input").type(value)
  });
});

/**
 * @memberof cy
 * @method addText
 * @param {string} value
 * @returns Chainable
 */
Cypress.Commands.add("addText", (value) => {
  cy.get(".k-dialog").within(() => {
    cy.get(".k-field-name-text input").type(value);
  });
});

/**
 * @memberof cy
 * @method toogleTarget
 * @returns Chainable
 */
Cypress.Commands.add('toogleTarget', () => {
  cy.get(".k-dialog").within(() => {
    cy.get(".k-toggle-input-native").click()
  });
});

/**
 * @memberof cy
 * @method closeDialog
 * @returns Chainable
 */
Cypress.Commands.add('closeDialog', () => {
  cy.get(".k-dialog").within(() => {
    cy.get("button").contains("Ok").click();
  });
});

/**
 * @memberof cy
 * @method addAnchor
 * @param {string} selector
 * @param {*} [args]
 * @returns Chainable
 */
Cypress.Commands.add('addAnchor', (anchor) => {
  cy.get(".k-field-name-anchor input").type(anchor);
});

/**
 * @memberof cy
 * @method verifyLinkElement
 * @param {{text:string?, href:string?, title:string?, target:string?}} linkValues
 * @param {*} [args]
 * @returns Chainable
 */
Cypress.Commands.add('verifyLinkElement', ({href, title, target}) => {

  // Link text is set by addAndSelectText() and neccessary to have cypress wait
  // for prose mirror to finish the rendering
  cy.get("a").contains("Lorem").as("link");

  cy.get("@link").should("have.text", "Lorem");

  if (href) {
    cy.get("@link").invoke("attr", "href").should("eq", href);
  }

  if (title) {
    cy.get("@link").invoke("attr", "title").should("eq", title);
  } else {
    cy.get("@link").should("not.have.attr", "title");
  }

  if (target) {
    cy.get("@link").invoke("attr", "target").should("eq", target);
  } else {
    cy.get("@link").should("not.have.attr", "target");
  }
});

/**
 * @memberof cy
 * @method verifyLinkText
 * @param {{text:string?, href:string?, title:string?, target:string?}} linkValues
 * @param {*} [args]
 * @returns Chainable
 */
Cypress.Commands.add("verifyLinkText", (value) => {
	cy.get(".k-field-name-texttest textarea").should("have.value", value);
});
