import {defineStore} from 'pinia';
import {fetchEntityList, fetchEntityDetails} from '../api/entities'

export const useActorStore = defineStore('entities', {
  state: () => {
    return {
      actors: null,
      actor: null,
    }
  },
  getters: {},
  actions: {
    async fetchActorList() {
      try {
        this.actors = await fetchEntityList('actors')
      } catch (e) {
        console.error(e)
        return e
      }
    },
    async fetchActorDetails(id: string | string[]) {
      try {
        this.actors = await fetchEntityDetails('actors', id)
      } catch (e) {
        console.error(e)
        return e
      }
    },
  },

});
