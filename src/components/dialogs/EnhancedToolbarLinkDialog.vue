<template>
  <k-form-dialog
    ref="dialog"
    v-model="link"
    :fields="fields"
    :submit-button="$t('confirm')"
    size="medium"
    @close="close"
    @submit="submit"
  >
  </k-form-dialog>
</template>

<script>
export default {
  data() {
    return {
      link: {
        href: null,
        title: null,
        target: false,
        text: null,
        anchor: null
      }
    };
  },
  computed: {
    fields() {
      return {
        href: {
          label: this.$t("link"),
          type: "autosuggest",
          id: this.link.href
        },
        text: {
          label: this.$t("link.text"),
          type: "text",
          icon: "title"
        },
        title: {
          label: this.$t("title"),
          type: "text",
          counter: false,
          icon: "title"
        },
        anchor: {
          label: this.$t(
            "gearsdigital.enhanced-toolbar-link-dialog.anchor.title"
          ),
          type: this.$t("gearsdigital.enhanced-toolbar-link-dialog.anchor-field") === "hidden" ? "hidden" : "text",
          disabled: this.$t("gearsdigital.enhanced-toolbar-link-dialog.anchor-field") === "disabled",
          counter: false,
          before: "#",
          width: "1/2"
        },
        target: {
          label: this.$t("open.newWindow"),
          type: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target-field") === "hidden" ? "hidden" : "toggle",
          disabled: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target-field") === "disabled",
          text: [this.$t("no"), this.$t("yes")],
          width: "1/2",
        }
      };
    },
    kirbytext() {
      return this.$config.kirbytext;
    }
  },
  methods: {
    open(input, selection) {
      this.link.text = selection;
      this.$refs.dialog.open();
      this.addListener();
    },
    close() {
      this.$emit("cancel");
      this.removeListener();

      this.link = {
        href: null,
        title: null,
        target: false,
        text: null,
        anchor: null
      };
    },
    submit() {
      this.$emit(
        "submit",
        this.kirbytext ? this.createKirbytext() : this.createMarkdown()
      );

      this.link = {
        href: null,
        title: null,
        target: false,
        text: null,
        anchor: null
      };

      this.$refs.dialog.close();
    },
    createKirbytext() {
      const parts = [];

      parts.push(`link: ${this.appendAnchor(this.link.href)}`);

      if (this.link.text && this.link.text.length > 0) {
        parts.push(`text: ${this.link.text}`);
      }

      if (this.link.title && this.link.title.length > 0) {
        parts.push(`title: ${this.link.title}`);
      }

      if (this.link.target) {
        parts.push(`target: _blank`);
      }

      return `(${parts.join(" ")})`;
    },
    createMarkdown() {
      if (this.link.text.length > 0) {
        return `[${this.link.text}](${this.link.href})`;
      } else {
        return `<${this.link.href}>`;
      }
    },
    appendAnchor(href) {
      let anchor = this.$refs.dialog.model.anchor;

      if (!anchor) {
        return href;
      }

      // ensure href to be defined, otherwise it would get concatenated
      // to "undefined + #anchor" below
      if (!href) {
        href = "";
      }

      if (anchor.startsWith("#")) {
        return href + anchor;
      }

      return href + "#" + anchor;
    },
    listener(evt) {
      if (evt.detail.page !== null) {
        // Don't set this.link.text here, it would override the
        // user selected text.
        this.link = {
          ...this.link,
          href: evt.detail.page.link,
          title: evt.detail.page.text
        };
      }
    },
    addListener() {
      document.addEventListener(
        "enhanced-toolbar-link-dialog/page",
        this.listener
      );
    },
    removeListener() {
      document.removeEventListener(
        "enhanced-toolbar-link-dialog/page",
        this.listener
      );
    }
  }
};
</script>
