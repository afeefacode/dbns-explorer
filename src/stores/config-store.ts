import {defineStore} from 'pinia';
import {fetchConfig} from "src/api/config";
import {config} from 'src/assets/lvns-config'

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      config: config
    }
  },
  getters: {},
  actions: {
    async getConfig() {
      try {
        this.config = await fetchConfig()
      } catch (e) {
        console.error(e)
        return e
      }
    },
  },
});
