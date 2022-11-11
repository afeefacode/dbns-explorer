import {defineStore} from 'pinia';
import {config as full_widget} from "assets/configs/lvns/full_widget";

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      config: full_widget,
      activeEntity: '',
    }
  },
  getters: {
    entityConfig(): any {
      return this.config.entities.find((entity: any) => entity.type === this.activeEntity)
    }
  },
  actions: {
    init(router: any) {
      this.activeEntity = router.currentRoute.value.fullPath.split('/')[1]
      const configString = (new URL(window.location.href)).searchParams.get('config')
      if (configString) {
        this.config = JSON.parse(decodeURI(configString))
      }
    },
  },
});
