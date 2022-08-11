<template>
	<dialog :open="open">
		<k-item
			v-for="page of pages"
			:key="page.id"
			:text="page.text"
			:image="page.image"
			:info="page.id"
			@click="select(page)"
		/>
		<k-pagination
			align="center"
			:details="true"
			:page="pagination.page"
			:total="pagination.total"
			:limit="pagination.limit"
			@paginate="$emit('paginate', $event)"
		/>
	</dialog>
</template>

<script>
export default {
	name: "EnhancedToolbarDropdown",
	props: {
		pages: {
			type: Array
		},
		pagination: {
			type: {
				page: Number,
				total: Number,
				limit: Number
			}
		}
	},
	data() {
		return {
			open: false
		};
	},
	watch: {
		pages(pages) {
			this.open = pages.length > 0;
		}
	},
	methods: {
		select(page) {
			this.$emit("select", page);
			this.open = false;
		}
	}
};
</script>

<style scoped>
dialog[open] {
	z-index: var(--z-dialog);
	background-color: var(--color-gray-100);
	box-shadow: var(--shadow-dropdown);
	margin: 0;
	padding: 4px;
	border: 0;
	top: 70px;
	width: 100%;
	height: 268px;
	display: flex;
	flex-direction: column;
}

:deep(.k-pagination) {
	margin-top: auto;
	margin-bottom: 0;
}

:deep(.k-pagination-details) {
	pointer-events: none;
}

:deep(.k-item) {
	margin-bottom: 4px;
}

:deep(.k-item:last-child) {
	margin-bottom: 0;
}

:deep(img) {
	object-fit: cover;
}
</style>
