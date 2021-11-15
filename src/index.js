import EnhancedToolbarLinkDialog from "./components/EnhancedToolbarLinkDialog.vue";

panel.plugin('gearsdigital/enhanced-toolbar-link-dialog', {
  components: {
    'k-toolbar-link-dialog': {
      extends: EnhancedToolbarLinkDialog
    }
  }
});
