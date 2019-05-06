import Vue from 'vue'
// define a mixin object
var mixin = {
  data: function() {
    return {
      get global() {
        return null
      }
    }
  },
  beforeCreate: function() {},
  created: function() {},
  watch: {},
  computed: {},
  methods: {}
}
Vue.mixin(mixin)
export default mixin
