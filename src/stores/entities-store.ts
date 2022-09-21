import {defineStore} from 'pinia';
import {fetchEntities} from '../api/entities'

export const useEntitiesStore = defineStore('entities', {
  state: () => {
    return {
      actors: null,
    }
  },
  getters: {
  },
  actions: {
    async getActors() {
      try {
        this.actors = await fetchEntities('actors')
      } catch (e) {
        console.error(e)
        return e
      }
    },
  },
});
