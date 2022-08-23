import {defineStore} from 'pinia';
import {fetchActivities} from '../api/activities'

export const useActivitiesStore = defineStore('activities', {
  state: () => {
    return {
      activities: null,
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
