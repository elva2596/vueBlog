import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import state from './states'
import actions from './actions'
import mutations from './mutations'
const store =  new Vuex.Store({
    state,
    mutations,
    actions
})
export default store;
