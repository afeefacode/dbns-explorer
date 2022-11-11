import {defineStore} from 'pinia';
import {fetchActorList, fetchActorListApiV2, fetchActorDetails} from 'src/api/actors'

export const useActorStore = defineStore('actors', {
  state: () => {
    return {
      actors: null,
      actorsLoading: false,
      actor: null,
      actorLoading: false,
    }
  },
  actions: {
    async fetchActorList() {
      console.log('fetching')
      this.actorsLoading = true
      try {
        this.actors = await fetchActorList()
      } catch (e) {
        console.error(e)
        return e
      }
      this.actorsLoading = false
    },
    async fetchActorDetails(id: string | string[]) {
      this.actorLoading = true
      try {
        this.actor = await fetchActorDetails(id)
      } catch (e) {
        console.error(e)
        return e
      }
      this.actorLoading = false
    },
  },
});
