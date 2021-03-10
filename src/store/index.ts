import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { AllState } from './types';

export default createStore<AllState>({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    num: 0
  },
  mutations: {
    ADD_NUM: (state) => {
      state.num++
    }
  }
})

export const key: InjectionKey<Store<AllState>> = Symbol('vue-store')

export function useStore<T = AllState>() {
  return baseUseStore<T>(key)
}
