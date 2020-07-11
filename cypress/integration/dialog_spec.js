describe("Enhanced Link Toolbar Dialog", () => {

  it("should filter pages correctly while searching", () => {
    cy.login();
    cy.openFirstNote();
    cy.openDialog();

    cy.get(".k-text-input").type("ju")
      .should("have.value", "ju");

    cy.get(".k-pages-dialog .k-list")
      .find(".k-list-item")
      .should("have.length", 1);
  });

  it("should paginate correctly", () => {
    cy.login();
    cy.openFirstNote();
    cy.openDialog();

    cy.get(".k-pages-dialog .k-dialog-pagination")
      .find('button[title="Next"]')
      .click()
      .click();

    cy.get(".k-pages-dialog .k-list")
      .find(".k-list-item")
      .should("have.length", 1);
  });

  it("should insert kirby text", () => {
    cy.login();
    cy.openFirstNote();
    cy.openDialog()

    cy.get(".k-pages-dialog .k-list")
      .find(".k-list-item:first-child").click();

    cy.get(".k-button")
      .contains("Ok")
      .click();

    cy.get(".k-textarea-field textarea")
      .should(
        "include.value",
        "(link: /notes/in-the-jungle-of-sumatra text: In the jungle of Sumatra )"
      );
  });

  it("should insert kirby text with selected text", () => {
    cy.login();
    cy.openFirstNote();

    cy.get(".k-textarea-field textarea")
      .clear()
      .type("Lorem ipsum dolor")
      .type('{selectall}');

    cy.openDialog()

    cy.get(".k-pages-dialog .k-list").find(".k-list-item:first-child").click();

    cy.get(".k-button").contains("Ok").click();

    cy.get(".k-textarea-field textarea").should(
      "include.value",
      "(link: /notes/in-the-jungle-of-sumatra text: Lorem ipsum dolor )"
    );
  });

  it("should insert kirby text with selected text and target", () => {
    cy.login();
    cy.openFirstNote();

    cy.get(".k-textarea-field textarea")
      .clear()
      .type("Lorem ipsum dolor")
      .type('{selectall}');

    cy.openDialog()

    cy.get(".k-pages-dialog .k-list").find(".k-list-item:first-child").click();
    cy.get(".k-pages-dialog .k-select-input-native").select('Blank')

    cy.get(".k-button").contains("Ok").click();

    cy.get(".k-textarea-field textarea").should(
      "include.value",
      "(link: /notes/in-the-jungle-of-sumatra text: Lorem ipsum dolor target: _blank)"
    );
  });
});
