/// <reference types="cypress" />

describe("Toolbar Link Dialog", () => {
	beforeEach(() => {
		cy.login();
		cy.openContentPage();
	});

	it("should select a page from autosuggest results", () => {
		cy.openToolbarDialog();
		cy.addLink("Moun");

		// ensure autosuggest works correctly
		cy.get("dialog article").should("have.length", 5);

		// ensure pagination is present and works correctly
		cy.get(".k-pagination").contains("1-5 / 8");
		cy.get(".k-pagination .k-button").last().click();
		cy.get(".k-pagination").contains("6-8 / 8");
		cy.get("dialog article").should("have.length", 3);

		// select first result from page two
		cy.get("dialog article").first().click();

		// ensure link and title is automatically added
		cy.get(".k-dialog .k-tag").contains("Chasing waterfalls");
		cy.get(".k-dialog .k-tag .k-icon-cancel-small").should("have.length", 1);
		cy.get(".k-dialog .k-field-name-title input").should(
			"have.value",
			"Chasing waterfalls"
		);

		// close writer dialog
		cy.closeDialog();
	});

	it("should handle absolute paths", () => {
		cy.openToolbarDialog();
		cy.addLink("/my-path");
		cy.addText("Lorem");
		cy.closeDialog();

		cy.verifyLinkText("(link: /my-path text: Lorem)");
	});

	it("should handle qualified urls", () => {
		cy.openToolbarDialog();
		cy.addLink("https://example.com");
		cy.addText("Lorem");
		cy.closeDialog();

		cy.verifyLinkText("(link: https://example.com text: Lorem)");
	});

	it("should handle anchored links", () => {
		cy.openToolbarDialog();
		cy.addLink("/my-path");
		cy.addText("Lorem");
		cy.addAnchor("lorem");
		cy.closeDialog();

		cy.verifyLinkText("(link: /my-path#lorem text: Lorem)");
	});

	it("should handle anchor only links", () => {
		cy.openToolbarDialog();
		cy.addText("Lorem");
		cy.addAnchor("lorem");
		cy.closeDialog();

		cy.verifyLinkText("(link: #lorem text: Lorem)");
	});

	it("should add target to links", () => {
		cy.openToolbarDialog();
		cy.addLink("https://example.com");
		cy.addText("Lorem");
		cy.toogleTarget();
		cy.closeDialog();

		cy.verifyLinkText("(link: https://example.com text: Lorem target: _blank)");
	});

	it("should add a title to links", () => {
		cy.openToolbarDialog();
		cy.addLink("https://example.com");
		cy.addTitle("Lorem");
		cy.closeDialog();

		cy.verifyLinkText("(link: https://example.com title: Lorem)");
	});
});
