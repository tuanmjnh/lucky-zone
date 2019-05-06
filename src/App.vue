<template>
  <v-app>
    <tpl-snackbar />
    <div class="mid-center" v-if="$store.state.$loadingApp">
      <v-progress-circular :size="130" :width="10" color="primary" indeterminate></v-progress-circular>
    </div>
    <template v-else>
      <tpl-main />
      <!-- <tpl-main v-if="$store.state.auth.isAuth"/> -->
      <!-- <tpl-auth v-else/> -->
    </template>
    <!-- <tpl-test /> -->
  </v-app>
</template>

<script>
import snackbar from "./components/snackbar";
import main from "./layouts/vuetify/main";
// import test from './layouts/vuetify/test'
import * as _store from "./plugins/storage";
export default {
  name: "App",
  components: {
    "tpl-snackbar": snackbar,
    "tpl-main": main,
    // 'tpl-test': test
  },
  // data: () => ({}),
  beforeCreate() {},
  computed: {}
};
</script>
<style lang="scss">
</style>
