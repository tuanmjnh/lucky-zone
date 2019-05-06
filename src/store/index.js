import Vue from 'vue'
import Vuex from 'vuex'
import notification from './modules/notification'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    notification
  },
  state: {
    $user: {},
    $loadingApp: false,
    $loading: false,
    $noimage: `Uploads/noimage.jpg`,
    $message: {
      mode: '',
      x: 'right',
      y: 'top',
      timeout: 6000,
      show: false,
      color: 'success',
      text: '',
      status: '',
      statusText: ''
    }
  }, // State
  getters: {
    
  }, // = computed properties
  mutations: {
    SET_MESSAGE(state, res) {
      state.$message = {
        mode: '',
        x: 'right',
        y: 'top',
        show: res.text ? true : false,
        timeout: 6000,
        color: res.color || 'success',
        text: res.text || ''
      }
    },
    SET_CATCH(state, error) {
      state.$message.mode = ''
      state.$message.x = 'right'
      state.$message.y = 'top'
      state.$message.timeout = 6000
      state.$message.text = 'Lỗi hệ thống, vui lòng thử lại!'
      // state.$message.text = state.$dictionary.error && state.$dictionary.error.connection ?
      //   state.$dictionary.error.connection : error.message
      if (!error.response) {
        console.log(error.message) // Network Error
      } else if (error.response.status === 401) {
        this.dispatch('auth/signOut')
        state.$message.text = 'Hết hạn đăng nhập, vui lòng đăng nhập lại!'
        // state.$message.text = state.$dictionary.auth && state.$dictionary.auth.msg_err_expired ?
        //   state.$dictionary.auth.msg_err_expired :
        //   error.response ? error.response.statusText : error
        console.log(error.response.statusText)
      }
      state.$message.color = 'danger'
      state.$message.show = true
    },
  }, // Mutations
  actions: {
    message({ commit }, data) {
      commit('SET_MESSAGE', data)
    },
    messageClose({ state }, data) {
      state.$message.show = data
    },
    notification({ state }) {
      state.$notification = !state.$notification
    }
  } // Actions
})
