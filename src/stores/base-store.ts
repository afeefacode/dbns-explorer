import {defineStore} from 'pinia';
import {config as full_widget} from "assets/configs/lvns/full_widget";

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      config: full_widget,
      activeEntities: ['actors'],
    }
  },
  getters: {
    entityConfig(): any {
      return this.config.entities.find((entity: any) => entity.type === this.activeEntities[0])
    },
    showAdditionalFilters(): any {
      const entitiesWithFilters = ['actors', 'events', 'stores']
      let show = false
      entitiesWithFilters.forEach(entityType => {
        if (this.activeEntities.includes(entityType)) {
           show = true
          return
        }
        if (show) return;
      })
      return show
    }
  },
  actions: {},
});
