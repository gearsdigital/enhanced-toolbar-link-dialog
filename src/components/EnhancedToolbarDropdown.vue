<template>
	<dialog class="enhanced-toolbar-dialog-element" :open="open">
		<div
			v-for="(page, index) of pages"
			:key="page.id"
			:data-index="index"
			:tabindex="0"
		>
			<k-item
				:text="page.text"
				:image="page.image"
				:info="page.id"
				@click="select(page)"
			/>
		</div>
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
			open: true,
			currentItem: 0
		};
	},
	watch: {
		pages() {
			this.focusCurrentItem();
		}
	},
	mounted() {
		this.focusCurrentItem();
		window.addEventListener("keydown", this.keydownListener);
	},
	destroyed() {
		window.removeEventListener("keydown", this.keydownListener);
	},
	methods: {
		select(page) {
			this.$emit("select", page);
			this.open = false;
			this.currentItem = 0;
		},
		focusCurrentItem() {
			document
				.querySelector(
					`.enhanced-toolbar-dialog-element div[data-index="${this.currentItem}"]`
				)
				.focus();
		},
		blurCurrentItem() {
			document
				.querySelector(
					`.enhanced-toolbar-dialog-element div[data-index="${this.currentItem}"]`
				)
				.blur();
		},
		keydownListener(event) {
			const withinUpperBoundary = this.currentItem < this.pages.length - 1;
			const withinLowerBoundary = this.currentItem > 0;
			const currentKey = event.code;

			if (currentKey === "ArrowDown" && withinUpperBoundary) {
				this.blurCurrentItem();
				this.currentItem++;
				this.focusCurrentItem();
			}

			if (currentKey === "ArrowUp" && withinLowerBoundary) {
				this.blurCurrentItem();
				this.currentItem--;
				this.focusCurrentItem();
			}

			if (currentKey === "Tab") {
				this.currentItem =
					parseInt(document.activeElement.getAttribute("data-index"), 10) ?? 0;
			}

			if (currentKey === "Enter") {
				event.stopPropagation();
				event.preventDefault();
				this.select(this.pages[this.currentItem]);
			}
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

dialog > div {
  margin-bottom: 4px;
}

dialog > div:focus {
	outline: none;
}

dialog > div:focus > :deep(.k-item) {
	outline: 2px solid var(--color-black);
}
</style>
