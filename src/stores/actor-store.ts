import {defineStore} from 'pinia';
import {fetchEntityList, fetchEntityDetails} from 'src/api/entities'

export const useActorStore = defineStore('actors', {
  state: () => {
    return {
      actors: null,
      actorsLoading: false,
      actor: null,
      actorLoading: false,
    }
  },
  getters: {},
  actions: {
    async fetchActorList() {
      this.actorsLoading = true
      try {
        this.actors = await fetchEntityList('actors')
      } catch (e) {
        console.error(e)
        return e
      }
      this.actorsLoading = false
    },
    async fetchActorDetails(id: string | string[]) {
      this.actorLoading = true
      try {
        this.actor = await fetchEntityDetails('actors', id)
      } catch (e) {
        console.error(e)
        return e
      }
      this.actorLoading = false
    },
  },
});
