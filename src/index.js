import EnhancedToolbarLinkDialog from "./components/EnhancedToolbarLinkDialog";

panel.plugin('gearsdigital/enhanced-toolbar-link-dialog', {
  components: {
    'k-toolbar-link-dialog': {
      extends: EnhancedToolbarLinkDialog
    }
  }
});
