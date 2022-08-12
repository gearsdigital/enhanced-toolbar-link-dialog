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
					type: "text",
					counter: false,
					before: "#",
					width: "1/2"
				},
				target: {
					label: this.$t("open.newWindow"),
					type: "toggle",
					text: [this.$t("no"), this.$t("yes")],
					width: "1/2"
				}
			};
		}
	},
	methods: {
		open(link) {
			this.link = {
				title: null,
				target: false,
				anchor: null,
				...this.extendWithAnchor(link)
			};

			this.link.target = Boolean(this.link.target);
			this.$refs.dialog.open();

			this.addListener();
		},
		close() {
			this.$emit("close");
			this.removeListener();
		},
		submit() {
			this.link.href = this.appendAnchor(this.link.href);

			this.$emit("submit", {
				...this.link,
				target: this.link.target ? "_blank" : null
			});

			this.$refs.dialog.close();
		},
		extendWithAnchor(link) {
			if (!link.href) {
				return link;
			}

			const parsedHref = link.href.split("#");
			return {
				...link,
				href: parsedHref[0] ?? null,
				anchor: parsedHref[1] ?? null
			};
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
			if (evt.detail.page === null) {
				this.link = {
					href: null,
					title: null,
					target: false
				};
			} else {
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
<style>
.k-input[data-theme="field"] .k-input-before {
	user-select: none;
}

.k-dialog-body form {
	min-height: 340px;
}
</style>
