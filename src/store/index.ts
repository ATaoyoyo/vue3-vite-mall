import {createStore, Store, useStore as baseUseStore} from "vuex";
import {InjectionKey} from 'vue'

import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import {State} from "src/types/State";

export const key: InjectionKey<Store<State>> = Symbol()

export function useStore() {
  return baseUseStore(key)
}

export default createStore({
  state,
  actions,
  mutations,
  modules: {}
})
