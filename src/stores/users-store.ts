import {defineStore} from 'pinia';
import {fetchActivities} from '../api/activities'

export const useActivitiesStore = defineStore('activities', {
  state: () => {
    return {
      activities: null,
      // https://stackoverflow.com/questions/12828707/how-to-merge-and-shuffle-array-of-arrays
    }
  },
  getters: {
  },
  actions: {
    async getActivities() {
      try {
        this.activities = await fetchActivities()
      } catch (e) {
        console.error(e)
        return e
      }
    },
  },
});
