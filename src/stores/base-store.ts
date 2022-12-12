import {defineStore} from 'pinia';
import {config as full_widget} from "assets/configs/lvns/full_widget";

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      config: full_widget,
      activeEntities: [],
      additionalFiltersExpanded: false,
      activeFilters: {
        main: {
          region: null,
          category: null,
          search: null,
        },
        actors: {
          orgTypes: null
        },
        events: {
          startDate: null,
          endDate: null,
        },
        stores: {
          tradeCategories: null,
          tradeTypes: null,
          productTypes: null,
        }
      }
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
    hasActiveFilters(): any {
      let hasActiveFilter = false
      for (const [filterCategory, subCategories] of Object.entries(this.activeFilters)) {
        for (const [subcategory, filterValue] of Object.entries(subCategories)) {
          if (!!filterValue) hasActiveFilter = true
        }
      }
      return hasActiveFilter
    }
  },
  actions: {
    clearFilters(filters: string): any {
      for (const [filterCategory, subCategories] of Object.entries(this.activeFilters)) {
        for (const [subcategory, filterValue] of Object.entries(subCategories)) {
          // @ts-ignore
          this.activeFilters[filterCategory][subcategory] = null
        }
      }
    }
  },
});
