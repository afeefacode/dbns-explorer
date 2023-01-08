import {defineStore} from 'pinia';
import {config} from 'assets/configs/lvns/full_widget';
import {useFilterStore} from 'src/stores/filter-store'


export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      parentLocation: {
        origin: null,
        pathname: null,
        search: null,
      },
      config: config,
      activeView: 'map',
      filtersExpanded: false,
      additionalFiltersExpanded: false,
      eventFiltersExpanded: false,
      actorFiltersExpanded: false,
      storeFiltersExpanded: false,
      activeMarker: {
        entity: null,
        markerDiv: null,
      },
      mapZoom: null,
      mapCenter: null,
    }
  },
  getters: {
    entityConfig(): any {
      const filterStore = useFilterStore()
      return this.config.entities.find((entity: any) => entity.type === filterStore.activeEntities[0])
    },
    showFilters(): any {
      const filterStore = useFilterStore()
      return !!filterStore.activeEntities.length
    },
    hasAdditionalFilters(): any {
      const filterStore = useFilterStore()

      const entitiesWithFilters = ['actors', 'events', 'stores']
      let show = false
      entitiesWithFilters.forEach(entityType => {
        //@ts-ignore
        if (filterStore.activeEntities.includes(entityType)) {
          show = true
          return
        }
        if (show) return;
      })

      if (!show) this.additionalFiltersExpanded = false
      return show
    },
    showActorFilters(): any {
      const filterStore = useFilterStore()
      //@ts-ignore
      return filterStore.activeEntities.includes('actors')
    },
    showEventFilters(): any {
      const filterStore = useFilterStore()
      //@ts-ignore
      return filterStore.activeEntities.includes('events')
    },
    showStoreFilters(): any {
      const filterStore = useFilterStore()
      //@ts-ignore
      return filterStore.activeEntities.includes('stores')
    },
  },
});
