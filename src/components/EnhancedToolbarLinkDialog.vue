<template>
  <k-dialog
    ref="dialog"
    :button="$t('insert')"
    size="medium"
    class="k-pages-dialog enhanced-toolbar"
    @submit="submit"
    @open="fetch"
    @close="resetForm">
    <div class="k-header">
      <div v-if="tabs && tabs.length > 1" class="k-tabs">
        <nav>
          <k-button
            v-for="tab in tabs"
            :key="tab.name"
            :current="currentTab && currentTab.name === tab.name"
            class="k-tab-button"
            @click="selectTab(tab)">
            {{ tab.label }}
          </k-button>
        </nav>
      </div>
    </div>

    <div v-if="currentTab.name === 'external'" class="k-tab">
      <k-form ref="form" v-model="value" :fields="externalFields" @submit="submit" />
    </div>

    <div v-if="currentTab.name === 'internal'" class="k-tab">
      <k-input
        v-model="search"
        autofocus="true"
        :placeholder="$t('search') + ' …'"
        type="text"
        class="k-dialog-search"
        icon="search" />

      <div v-if="hasPages">
        <k-item
          v-for="page in pages"
          :key="page.id"
          :text="page.title"
          layout="list"
          @click="selectPage(page)">
          <template slot="options">
            <k-button
              v-if="isCurrentPage(page)"
              slot="options"
              autofocus="true"
              icon="check"
              theme="positive"
              :tooltip="$t('remove')" />
            <k-button
              v-else
              slot="options"
              autofocus="true"
              icon="circle-outline"
              :tooltip="$t('select')" />
          </template>
        </k-item>
        <k-pagination
          :details="true"
          :dropdown="false"
          v-bind="pagination"
          align="center"
          class="k-dialog-pagination"
          @paginate="paginate" />
        <k-line-field />

        <label class="k-toggle-input enhanced-toolbar-advanced">
          <input class="k-toggle-input-native" type="checkbox" @change="toogleAvanced" />
          <span class="k-toggle-input-label">
            {{ $t("gearsdigital.enhanced-toolbar-link-dialog.advanced") }}
          </span>
        </label>

        <k-form v-if="showAvanced" v-model="attributes" :fields="attributeFields" />
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
          label: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target.title"),
          type: "select",
          options: [
            {
              value: "_blank",
              text: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target.blank"),
            },
            {
              value: "_self",
              text: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target.self"),
            },
            {
              value: "_parent",
              text: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target.parent"),
            },
            {
              value: "_top",
              text: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target.top"),
            },
          ],
          help: this.$t("gearsdigital.enhanced-toolbar-link-dialog.target.help"),
        },
        title: {
          label: this.$t("gearsdigital.enhanced-toolbar-link-dialog.title.title"),
          type: "text",
        },
        anchor: {
          label: this.$t("gearsdigital.enhanced-toolbar-link-dialog.anchor.title"),
          type: "text",
        },
      },
      attributes: {
        selectedLinkTarget: null,
        title: null,
        anchor: null,
      },
      showAvanced: false,
    };
  },
  computed: {
    hasPages() {
      return this.pages.length;
    },
    kirbytext() {
      return this.$config.kirbytext;
    },
    urlWithAnchor() {
      return this.attributes.anchor
        ? this.value.url + "#" + this.attributes.anchor
        : this.value.url;
    },
  },
  watch: {
    search: function (val, oldVal) {
      if (val !== oldVal) {
        this.pagination.page = 0;
        this.fetch();
      }
    },
  },
  methods: {
    open(input, selection) {
      const openTab =
        parseInt(this.$t("gearsdigital.enhanced-toolbar-link-dialog.tab.order"), 10) || 0;
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
        anchor: null,
      };
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

      if (this.value.url.indexOf("http") === 0) {
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
      this.$api.get("enhanced-toolbar-link-dialog/pages", params).then((response) => {
        this.pages = response.data;
        this.pagination = response.pagination;
      });
    },
    submit() {
      if (this.value.url === null) {
        this.$refs.dialog.close();
        return;
      }
      this.$emit("submit", this.kirbytext ? this.createKirbytext() : this.createMarkdown());
      this.$refs.dialog.close();
    },
    toogleAvanced() {
      this.showAvanced = !this.showAvanced;
    },
  },
};
</script>

<style lang="scss">
.enhanced-toolbar {
  .k-header {
    padding-top: 0;
    margin-bottom: var(--spacing-4);
  }

  .k-fieldset {
    padding-bottom: 0;

    .k-grid {
      grid-row-gap: 0;
    }
  }

  .k-line-field {
    margin: 0.5rem 0 0.25rem;
  }

  .k-fieldset .k-grid {
    grid-row-gap: 1.25rem;
  }

  &-advanced {
    margin-bottom: var(--spacing-2);

    .k-toggle-input-native {
      margin-right: var(--spacing-2);
    }

    + .k-form {
      background-color: var(--color-gray-100);
      border: 1px solid var(--color-gray-300);
      padding: var(--spacing-3);
    }
  }

  // prevent z-index issue with k-line-field
  .k-pagination {
    z-index: 1;
    position: relative;
  }

  .k-list-item {
    margin-bottom: 2px;
  }
}
</style>
