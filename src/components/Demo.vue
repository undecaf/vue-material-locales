<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <div class="md-layout-item md-title">
        Vue Material datepicker locales demo
      </div>
    </md-app-toolbar>

    <md-app-content>
      <form class="md-layout md-alignment-center-left" novalidate>
        <md-autocomplete
          class="md-layout-item md-dense"
          v-model="tag"
          :md-options="locales"
          @md-selected="selectLocale(tag)" @focusout.native="selectLocale(tag)"
        >
          <label>Select a locale</label>
        </md-autocomplete>

        <md-datepicker class="md-layout-item" v-model="date">
          <label>Selected locale: {{ effectiveTag }}</label>
        </md-datepicker>
      </form>
    </md-app-content>
  </md-app>
</template>

<script>
    export default {
        name: 'App',

        data() {
            return {
                locales: Object.keys(this.$material.locales),
                tag: null,
                effectiveTag: null,
                date: new Date(),
            }
        },

        methods: {
            selectLocale(tag) {
                if (tag) {
                    this.effectiveTag = this.$material.selectLocale(tag) || this.$material.locale.tag
                }
            }
        },

        mounted() {
            this.selectLocale(navigator.language)
        }
    }
</script>
