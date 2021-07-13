import {createStore, Store} from "vuex";
import { InjectionKey } from 'vue'

import state from "./state";
import actions from "./actions";
import mutations from "./mutations";

export const key:InjectionKey<Store<State>> = Symbol()

export default createStore({
  state,
  actions,
  mutations,
  modules: {}
})
