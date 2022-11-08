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
  getters: {},
  actions: {
    async fetchActorList() {
      this.actorsLoading = true
      try {
        this.actors = await fetchActorListApiV2()
        console.log('this.actors', this.actors)
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
