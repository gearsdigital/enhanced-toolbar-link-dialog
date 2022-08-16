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

		cy.get("dialog > div:nth-child(1)")
			.should("have.focus", true)
			.type("{downArrow}{downArrow}");

		cy.get("dialog > div:nth-child(3)")
			.should("have.focus", true)
			.type("{upArrow}");

		// respect lower boundary
		cy.get("dialog > div:nth-child(2)")
			.should("have.focus", true)
			.type(
				"{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}{downArrow}"
			);

		// respect upper boundary
		cy.get("dialog > div:nth-child(5)")
			.should("have.focus", true)
			.type("{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}{upArrow}");

		cy.get("dialog > div:nth-child(1)")
			.should("have.focus", true)
			.type("{enter}");

    // ensure link and title is automatically added after enter
    cy.get(".k-dialog .k-tag").contains("Mountains");
    cy.get(".k-dialog .k-tag .k-icon-cancel-small").should("have.length", 1);
    cy.get(".k-dialog .k-field-name-title input").should(
      "have.value",
      "Mountains"
    );

    // close writer dialog
    cy.closeDialog();
	});
});
