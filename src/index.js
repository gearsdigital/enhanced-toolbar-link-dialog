import BetterLinkDialog from "./components/BetterLinkDialog";

panel.plugin('gearsdigital/kirby-better-link', {
  components: {
    'k-toolbar-link-dialog': {
      extends: BetterLinkDialog
    }
  }
});
