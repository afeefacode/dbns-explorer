import {defineStore} from 'pinia';
import {emptyFilters} from 'src/utils'

export const useFilterStore = defineStore('filter', {
  state: () => {
    return {
      // pinia needs separate objects here for initial diffing
      activeEntities: [],
      activeFilters: emptyFilters,
    }
  },
});
