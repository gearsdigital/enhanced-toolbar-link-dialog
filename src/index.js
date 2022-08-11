import EnhancedToolbarLinkDialog from "./components/dialogs/EnhancedToolbarLinkDialog.vue";
import EnhancedToolbarWriterLinkDialog from "./components/dialogs/EnhancedToolbarWriterLinkDialog.vue";
import EnhancedToolbarAutosuggestField from "./components/fields/EnhancedToolbarAutosuggestField.vue";

panel.plugin("gearsdigital/enhanced-toolbar-link-dialog", {
	components: {
		"k-toolbar-link-dialog": {
			extends: EnhancedToolbarLinkDialog
		},
		"k-writer": {
			extends: "k-writer",
			components: {
				"k-writer-link-dialog": EnhancedToolbarWriterLinkDialog
			}
		}
	},
	fields: {
		autosuggest: EnhancedToolbarAutosuggestField
	}
});
