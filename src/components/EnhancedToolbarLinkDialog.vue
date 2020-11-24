<template>
  <k-dialog
    ref="dialog"
    class="k-pages-dialog"
    size="medium"
    @submit="submit"
    @open="fetch"
    @close="resetForm"
    :button="$t('insert')"
  >
    <div v-if="tabs && tabs.length > 1" class="k-header-tabs">
      <nav>
        <k-button
          v-for="tab in tabs"
          :current="currentTab && currentTab.name === tab.name"
          class="k-tab-button"
          @click="selectTab(tab)"
        >
          {{ tab.label }}
        </k-button>
      </nav>
    </div>

    <div class="k-tab" v-if="currentTab.name === 'external'">
      <k-form
        ref="form"
        :fields="externalFields"
        v-model="value"
        @submit="submit"
      />
    </div>

    <div class="k-tab" v-if="currentTab.name === 'internal'">
      <k-input
        autofocus="true"
        :placeholder="$t('search') + ' …'"
        v-model="search"
        type="text"
        class="k-dialog-search"
        icon="search"
      />

      <div v-if="hasPages">
        <k-list>
          <k-list-item
            v-for="page in pages"
            :key="page.id"
            :text="page.title"
            @click="selectPage(page)"
          >
            <template slot="options">
              <k-button
                v-if="isCurrentPage(page)"
                slot="options"
                autofocus="true"
                icon="check"
                theme="positive"
                :tooltip="$t('remove')"
              />
              <k-button
                v-else
                slot="options"
                autofocus="true"
                icon="circle-outline"
                :tooltip="$t('select')"
              />
            </template>
          </k-list-item>
        </k-list>
        <k-pagination
          :details="true"
          :dropdown="false"
          v-bind="pagination"
          align="center"
          class="k-dialog-pagination"
          @paginate="paginate"
        />
        <k-line-field />
        <k-form
          :fields="attributeFields"
          v-model="attributes"
        />
      </div>
      <k-text v-else>
        {{ $t("gearsdigital.enhanced-toolbar-link-dialog.empty") }}
      </k-text>
    </div>
  </k-dialog>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "external",
          label: this.$t("gearsdigital.enhanced-toolbar-link-dialog.external"),
        },
        {
          name: "internal",
          label: this.$t("gearsdigital.enhanced-toolbar-link-dialog.internal"),
        },
      ],
      search: null,
      currentPage: {},
      currentTab: {},
      pages: [],
      value: {
        url: null,
        text: null,
      },
      pagination: {
        page: 1,
        total: 0,
      },
      externalFields: {
        url: {
          label: this.$t("link"),
          type: "text",
          placeholder: this.$t("url.placeholder"),
          icon: "url",
        },
        text: {
          label: this.$t("link.text"),
          type: "text",
        },
      },
      attributeFields: {
        selectedLinkTarget: {
          label: this.$t('gearsdigital.enhanced-toolbar-link-dialog.target.title'),
          type: "select",
          options: [
            { value: "_blank", text: "Blank" },
            { value: "_self", text: "Self" },
            { value: "_parent", text: "Parent" },
            { value: "_top", text: "Top" },
          ],
          help: this.$t('gearsdigital.enhanced-toolbar-link-dialog.target.help')
        },
        title: {
          label: this.$t('gearsdigital.enhanced-toolbar-link-dialog.title.title'),
          type: "text",
        },
        anchor: {
          label: this.$t('gearsdigital.enhanced-toolbar-link-dialog.anchor.title'),
          type: "text",
        },
      },
      attributes: {
        selectedLinkTarget: null,
        title: null,
        anchor: null
      },
    };
  },
  watch: {
    search: function (val, oldVal) {
      if (val !== oldVal) {
        this.pagination.page = 0;
        this.fetch();
      }
    },
  },
  computed: {
    hasPages() {
      return this.pages.length;
    },
    kirbytext() {
      return this.$store.state.system.info.kirbytext;
    },
    urlWithAnchor() {
      return this.attributes.anchor ? this.value.url + '#' + this.attributes.anchor : this.value.url;
    }
  },
  methods: {
    open(input, selection) {
      const openTab = parseInt(this.$t('gearsdigital.enhanced-toolbar-link-dialog.tab.order'), 10) || 0;
      this.value.text = selection;
      this.currentTab = this.tabs[openTab];
      this.$refs.dialog.open();
    },
    resetForm() {
      this.value = {
        url: null,
        text: null,
      };
      this.value.text = null;
      this.search = null;
      this.pagination.page = 1;
      this.attributes = {
        selectedLinkTarget: null,
        title: null,
        anchor: null
      }
    },
    selectTab(tab) {
      this.currentTab = tab;
    },
    selectPage(model) {
      this.value = {
        url: model.slug,
        text: this.value.text || model.title,
      };
      if (this.isCurrentPage(model)) {
        this.currentPage = {};
        this.value = {
          url: null,
          text: null,
        };
      } else {
        this.currentPage = model;
      }
    },
    isCurrentPage(page) {
      return this.currentPage === page;
    },
    paginate(pagination) {
      this.pagination.page = pagination.page;
      this.fetch();
    },
    createKirbytext() {
      const parts = [];

      parts.push(`link: ${this.urlWithAnchor}`);
      parts.push(`text: ${this.value.text}`);

      if (this.attributes.selectedLinkTarget) {
        parts.push(`target: ${this.attributes.selectedLinkTarget}`);
      }

      if (this.attributes.title) {
        parts.push(`title: ${this.attributes.title}`);
      }

      if (this.value.url.indexOf('http') === 0) {
        parts.push(`rel: nofollow`);
      }

      return `(${parts.join(" ")})`;
    },
    createMarkdown() {
      return this.value.text.length > 0
        ? `[${this.value.text}](${this.value.url})`
        : `<${this.value.url}>`;
    },
    fetch() {
      const params = {
        page: this.pagination.page,
        search: this.search,
      };
      this.$api
        .get("enhanced-toolbar-link-dialog/pages", params)
        .then((response) => {
          this.pages = response.data;
          this.pagination = response.pagination;
        });
    },
    submit() {
      if (this.value.url === null) {
        this.$refs.dialog.close();
        return;
      }
      this.$emit(
        "submit",
        this.kirbytext ? this.createKirbytext() : this.createMarkdown()
      );
      this.$refs.dialog.close();
    },
  },
};
</script>

<style scoped lang="scss">
  .k-tab {
    padding: 1rem 0;
  }

  // prevent z-index issue with k-line-field
  .k-pagination {
    z-index: 1;
    position: relative;
  }
</style>
