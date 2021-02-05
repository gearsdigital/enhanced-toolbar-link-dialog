describe("Enhanced Link Toolbar Dialog", () => {
  it("should filter pages correctly while searching", () => {
    cy.login();
    cy.openFirstNote();
    cy.openDialog();
    cy.openInternalTab();

    cy.get(".k-text-input").type("jun",{delay: 100}).should("have.value", "jun");

    cy.wait(1000);

    cy.get(".k-pages-dialog .k-list")
      .find(".k-list-item")
      .should("have.length", 1);
  });

  it("should paginate correctly", () => {
    cy.login();
    cy.openFirstNote();
    cy.openDialog();
    cy.openInternalTab();

    cy.get(".k-pages-dialog .k-dialog-pagination")
      .find('button[title="Next"]')
      .click()
      .click();

    cy.get(".k-pages-dialog .k-list")
      .find(".k-list-item")
      .should("have.length", 1);
  });

  describe("Options", () => {
    beforeEach(() => {
      cy.task('copyKirbyConfig');
      cy.login();
      cy.openFirstNote();
      cy.openDialog();
    });

    afterEach(() => {
      cy.task('restoreKirbyConfig')
    });

    it('link.title and tab.order', () => {
      cy.wait(2000);

      cy.get(".k-pages-dialog .k-list-item:first-child")
        .should(
          "include.text",
          "###"
        );
    });
  });

  describe("KirbyText", () => {
    describe("with selected link", () => {

      it('should insert "text:" from page name', () => {
        cy.login();
        cy.openFirstNote();

        cy.get(".k-textarea-field textarea").clear();

        cy.openDialog();
        cy.openInternalTab();

        cy.get(".k-pages-dialog .k-list")
          .find(".k-list-item:first-child")
          .click();

        cy.get(".k-button").contains("Ok").click();

        cy.get(".k-textarea-field textarea").should(
          "include.value",
          "(link: /notes/in-the-jungle-of-sumatra text: In the jungle of Sumatra)"
        );
      });

      it('should insert "text:" from selection', () => {
        cy.login();
        cy.openFirstNote();

        cy.get(".k-textarea-field textarea")
          .clear()
          .type("Lorem ipsum dolor")
          .type("{selectall}");

        cy.openDialog();
        cy.openInternalTab();

        cy.get(".k-pages-dialog .k-list")
          .find(".k-list-item:first-child")
          .click();

        cy.get(".k-button").contains("Ok").click();

        cy.get(".k-textarea-field textarea").should(
          "include.value",
          "(link: /notes/in-the-jungle-of-sumatra text: Lorem ipsum dolor)"
        );
      });

      it('should insert "text:" from selection and "target:" from dropdown', () => {
        cy.login();
        cy.openFirstNote();

        cy.get(".k-textarea-field textarea")
          .clear()
          .type("Lorem ipsum dolor")
          .type("{selectall}");

        cy.openDialog();
        cy.openInternalTab();

        cy.get(".k-pages-dialog .k-list")
          .find(".k-list-item:first-child")
          .click();
        cy.get(".k-pages-dialog .k-select-input-native").select("Blank");

        cy.get(".k-button").contains("Ok").click();

        cy.get(".k-textarea-field textarea").should(
          "include.value",
          "(link: /notes/in-the-jungle-of-sumatra text: Lorem ipsum dolor target: _blank)"
        );
      });
    });

    describe("without selected link", () => {
      it("should insert nothing", () => {
        cy.login();
        cy.openFirstNote();

        cy.get(".k-textarea-field textarea").clear().type("Lorem ipsum dolor");

        cy.openDialog();
        cy.openInternalTab();

        cy.get(".k-button").contains("Ok").click();

        cy.get(".k-textarea-field textarea").should(
          "include.value",
          "Lorem ipsum dolor"
        );
      });

      it("should insert nothing even with selection", () => {
        cy.login();
        cy.openFirstNote();

        cy.get(".k-textarea-field textarea")
          .clear()
          .type("Lorem ipsum dolor")
          .type("{selectall}");

        cy.openDialog();
        cy.openInternalTab();

        cy.get(".k-button").contains("Ok").click();

        cy.get(".k-textarea-field textarea").should(
          "include.value",
          "Lorem ipsum dolor"
        );
      });
    });
  });
});
