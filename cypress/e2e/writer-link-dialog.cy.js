/// <reference types="cypress" />

describe("Writer Link Dialog", () => {
  beforeEach(() => {
    cy.login();
    cy.openContentPage();
  });

  it("should select a page from autosuggest results", () => {
    cy.addAndSelectText()
    cy.openWriterDialog();
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
    cy.closeWriterDialog();

    cy.verifyLink({
      text: "Lorem",
      href: "/notes/chasing-waterfalls",
      title: "Chasing waterfalls"
    });
  });

  it('should handle absolute paths', () => {
    cy.addAndSelectText()
    cy.openWriterDialog();
    cy.addLink("/my-path");
    cy.addTitle("My path"); // I don't know why (yet), but the test fails without title
    cy.closeWriterDialog();

    cy.verifyLink({
      href: "/my-path",
      title: "My path"
    });
  });

  it('should handle qualified urls', () => {
    cy.addAndSelectText()
    cy.openWriterDialog();
    cy.addLink("https://example.com");
    cy.addTitle("My path"); // I don't know why (yet), but the test fails without title
    cy.closeWriterDialog();

    cy.verifyLink({
      href: "https://example.com",
      title: "My path"
    });
  });

  it('should handle anchored links', () => {
    cy.addAndSelectText()
    cy.openWriterDialog();
    cy.addLink("/my-path");
    cy.addAnchor("#lorem");
    cy.closeWriterDialog();

    cy.verifyLink({
      href: "/my-path#lorem",
    });
  });

  it('should handle anchor only links', () => {
    cy.addAndSelectText()
    cy.openWriterDialog();
    cy.addAnchor("#lorem");
    cy.closeWriterDialog();

    cy.verifyLink({
      href: "#lorem"
    });
  });

  it('should add target to links', () => {
    cy.addAndSelectText()
    cy.openWriterDialog();
    cy.addLink("https://example.com");
    cy.toogleTarget();
    cy.closeWriterDialog();

    cy.verifyLink({
      href: "https://example.com",
      target: "_blank"
    });
  });

  it('should add a title to links', () => {
    cy.addAndSelectText()
    cy.openWriterDialog();
    cy.addLink("https://example.com");
    cy.addTitle("I am legend!");
    cy.closeWriterDialog();

    cy.verifyLink({
      href: "https://example.com",
      title: "I am legend!"
    });
  });

});
