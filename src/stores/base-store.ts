import {defineStore} from 'pinia';
import {config as full_widget} from "assets/configs/lvns/full_widget";

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      config: full_widget,
      activeEntities: ['actors'],
      additionalFiltersExpanded: false,
    }
  },
  getters: {
    entityConfig(): any {
      return this.config.entities.find((entity: any) => entity.type === this.activeEntities[0])
    },
    showFilters(): any {
      return !!this.activeEntities.length
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

      if (!show) this.additionalFiltersExpanded = false
      return show
    },
    showActorFilters(): any {
      return this.activeEntities.includes('actors')
    },
    showEventFilters(): any {
      return this.activeEntities.includes('events')
    },
    showStoreFilters(): any {
      return this.activeEntities.includes('stores')
    }
  },
  actions: {},
});
