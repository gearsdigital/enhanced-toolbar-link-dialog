<template>
	<div class="enhanced-toolbar-autosuggest-field">
		<k-text-field
			v-if="selectedPage.length === 0"
			v-model="url"
			:counter="false"
			icon="file-document"
			:label="label"
			placeholder="Enter a URL or search term…"
			name="autosuggesttext"
			@input="updateSearch"
		/>
		<k-tags-field
			v-if="selectedPage.length === 1"
			v-model="selectedPage"
			:counter="false"
			icon="file-document"
			:label="label"
			name="tags"
			type="tags"
			max="1"
		/>
		<enhanced-toolbar-dropdown
      v-if="pages.length"
			:pages="pages"
			:pagination="pagination"
			@select="selectPage"
			@paginate="fetch(searchTerm, $event)"
		/>
	</div>
</template>

<script>
import EnhancedToolbarDropdown from "../EnhancedToolbarDropdown.vue";

export default {
	name: "EnhancedToolbarAutosuggest",
	components: { EnhancedToolbarDropdown },
	props: {
		id: String,
		label: String
	},
	data() {
		return {
			searchTerm: "",
			pagination: {},
			/**
			 * Holds all found page-objects
			 */
			pages: [],

			/**
			 * Holds the current selected page.
			 * Must be an array in order to work as tags-field.
			 */
			selectedPage: [],

			/*
			 * Holds the current URL if a page couldn't be retrieved.
			 */
			url: ""
		};
	},
	watch: {
		selectedPage(page) {
			if (!page.length) {
				document.dispatchEvent(
					new CustomEvent("enhanced-toolbar-link-dialog/page", {
						detail: { page: null }
					})
				);
			}
		}
	},
	async created() {
		this.updateSearch = this.$helper.debounce(this.updateSearch, 200);

		if (!this.id) {
			return;
		}

		await this.$api
			.get(`enhanced-toolbar-link-dialog/page`, {
				id: this.id
			})
			.then((page) => {
				this.selectedPage = [page];
			})
			.catch((err) => {
				if (err.code === 404) {
					this.url = this.id;
				}
			});
	},
	methods: {
		async fetch(searchTerm, paginate) {
			const page = paginate?.page || 1;
			if (!this.searchTerm) {
				this.pages = [];
				return;
			}

			// don't perform a search if a user entered a link manually
			if (
				this.searchTerm.startsWith("http") ||
				this.searchTerm.startsWith("/")
			) {
				this.pages = [];
				return;
			}

			const response = await this.$api.get(
				"enhanced-toolbar-link-dialog/pages",
				{
					q: this.searchTerm,
					page
				}
			);
			this.pages = response.data;
			this.pagination = response.pagination;
		},
		updateSearch($event) {
			this.searchTerm = $event;
			this.fetch();
			this.$emit("input", $event);
		},
		selectPage(page) {
			document.dispatchEvent(
				new CustomEvent("enhanced-toolbar-link-dialog/page", {
					detail: { page }
				})
			);

			this.selectedPage = [page];
			this.url = "";
		}
	}
};
</script>

<style scoped>
.enhanced-toolbar-autosuggest-field {
	position: relative;
}
</style>
