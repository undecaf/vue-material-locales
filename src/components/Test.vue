<template>
  <md-app
    v-cloak
    md-waterfall
    md-mode="fixed"
  >
    <md-app-toolbar class="md-primary md-dense md-layout md-alignment-center-space-between">
      <div class="md-layout-item md-title">
        Testing Vue Material locales
      </div>
    </md-app-toolbar>

    <md-app-content>
      <div class="md-layout">
        <md-field class="md-layout-item">
          <label>Select a locale</label>
          <md-select v-model="tag" md-dense @md-selected="material.selectLocale(tag)">
            <md-option v-for="locale in material.locales" :key="locale.tag" :value="locale.tag">
              {{ locale.tag }}
            </md-option>
          </md-select>
        </md-field>

        <md-datepicker class="md-layout-item" v-model="date" />
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
    export default {
        name: 'App',

        data() {
            return {
                material: this.$material,
                tag: null,
                date: new Date(),
            }
        },
    }
</script>
