/// <reference types="cypress" />

describe("Autosuggest Dropdown", () => {
	beforeEach(() => {
		cy.login();
		cy.openContentPage();
	});

	it("should navigate using arrow keys and respect list boundaries", () => {
		cy.addAndSelectText();
		cy.openWriterDialog();
		cy.addLink("Moun");

		cy.get("dialog > div").first().should("not.have.focus");
		cy.get("body").type("{downArrow}");
		cy.get("dialog > div").first().should("have.focus");
		cy.get("body").type("{downArrow}{downArrow}{downArrow}{downArrow}");
		cy.get("dialog > div").last().should("have.focus");
		cy.get("body").type("{upArrow}{upArrow}{upArrow}{upArrow}");
		cy.get("dialog > div").first().should("have.focus")
    cy.get("body").type("{enter}");

		// ensure link and title is automatically added after enter
		cy.get(".k-dialog .k-field-name-title input").should(
			"have.value",
			"Mountains"
		);

		// close writer dialog
		cy.closeDialog();
	});
});
