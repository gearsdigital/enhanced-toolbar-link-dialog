describe("Enhanced Link Toolbar Dialog", () => {
  it("should filter pages correctly while searching", () => {
    cy.login();
    cy.openFirstNote();
    cy.openDialog();
    cy.openInternalTab();

    cy.get(".k-dialog-search .k-text-input").type("jun",{delay: 500}).should("have.value", "jun");

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
      .click({force: true})
      .click({force: true});

    cy.get(".k-pages-dialog .k-list")
      .find(".k-list-item")
      .should("have.length", 1);
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
          .click({force: true});

        cy.get(".k-button").contains("Ok").click({force: true});

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
          .click({force: true});

        cy.get(".k-button").contains("Ok").click({force: true});

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
          .click({force: true});
        cy.get(".k-pages-dialog .k-select-input-native").select("Blank");

        cy.get(".k-button").contains("Ok").click({force: true});

        cy.get(".k-textarea-field textarea").should(
          "include.value",
          "(link: /notes/in-the-jungle-of-sumatra text: Lorem ipsum dolor target: _blank)"
        );
      });

      it('should insert "text:" from selection with #anchor', () => {
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
            .click({force: true});

        cy.get(".k-pages-dialog .k-select-input-native").select("Blank");
        cy.get(".k-pages-dialog .k-field-name-anchor .k-text-input").type("anchor");

        cy.get(".k-button").contains("Ok").click({force: true});
        cy.get(".k-textarea-field textarea").should(
            "include.value",
            "(link: /notes/in-the-jungle-of-sumatra#anchor text: Lorem ipsum dolor target: _blank)"
        );
      });

      it('should insert "text:" from selection with :title', () => {
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
            .click({force: true});

        cy.get(".k-pages-dialog .k-select-input-native").select("Blank");
        cy.get(".k-pages-dialog .k-field-name-title .k-text-input").type("Title");

        cy.get(".k-button").contains("Ok").click({force: true});
        cy.get(".k-textarea-field textarea").should(
            "include.value",
            "(link: /notes/in-the-jungle-of-sumatra text: Lorem ipsum dolor target: _blank title: Title)"
        );
      });

      it('should insert "text:" from selection with anchor, :target and :title', () => {
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
            .click({force: true});

        cy.get(".k-pages-dialog .k-select-input-native").select("Blank");
        cy.get(".k-pages-dialog .k-field-name-anchor .k-text-input").type("anchor");
        cy.get(".k-pages-dialog .k-field-name-title .k-text-input").type("Title");

        cy.get(".k-button").contains("Ok").click({force: true});
        cy.get(".k-textarea-field textarea").should(
            "include.value",
            "(link: /notes/in-the-jungle-of-sumatra#anchor text: Lorem ipsum dolor target: _blank title: Title)"
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

        cy.get(".k-button").contains("Ok").click({force: true});

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

        cy.get(".k-button").contains("Ok").click({force: true});

        cy.get(".k-textarea-field textarea").should(
          "include.value",
          "Lorem ipsum dolor"
        );
      });
    });
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
      cy.get(".k-pages-dialog .k-list-item:first-child")
        .should(
          "include.text",
          "###"
        );
    });
  });
});
