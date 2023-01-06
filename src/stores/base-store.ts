import {defineStore} from 'pinia';
import {config} from 'assets/configs/lvns/full_widget';
import {emptyFilters, emptyFilters2} from 'src/utils'

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      parentLocation: {
        origin: null,
        pathname: null,
        search: null,
      },
      config: config,
      activeEntities: [],
      activeView: 'list',
      additionalFiltersExpanded: false,
      // pinia needs separate objects here for initial diffing
      activeFilters: emptyFilters,
      lastFilters: emptyFilters2
    }
  },
  getters: {
    entityConfig(): any {
      return this.config.entities.find((entity: any) => entity.type === this.activeEntities[0])
    },
    showFilters(): any {
      return !!this.activeEntities.length
    },
    hasAdditionalFilters(): any {
      const entitiesWithFilters = ['actors', 'events', 'stores']
      let show = false
      entitiesWithFilters.forEach(entityType => {
        //@ts-ignore
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
      //@ts-ignore
      return this.activeEntities.includes('actors')
    },
    showEventFilters(): any {
      //@ts-ignore
      return this.activeEntities.includes('events')
    },
    showStoreFilters(): any {
      //@ts-ignore
      return this.activeEntities.includes('stores')
    },
    // hasActiveFilters(): any {
    //   return !(JSON.stringify(this.activeFilters) === JSON.stringify(this.lastFilters))
    // }
    // mainFiltersChanged() : any {
    //   return !(JSON.stringify(this.activeFilters.main) === JSON.stringify(this.lastFilters.main))
    // },
    // eventFiltersChanged() : any {
    //   return !(JSON.stringify(this.activeFilters.events) === JSON.stringify(this.lastFilters.events))
    // }
  },
  actions: {
    clearFilters(filters: string): any {
      for (const [filterCategory, subCategories] of Object.entries(this.activeFilters)) {
        for (const [subcategory, filterValue] of Object.entries(subCategories)) {
          // @ts-ignore
          this.activeFilters[filterCategory][subcategory] = null
        }
      }
    },
  },
});
