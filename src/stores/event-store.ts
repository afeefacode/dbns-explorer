import {defineStore} from 'pinia';
import {fetchEventList, fetchEventDetails} from 'src/api/events'

export const useEventStore = defineStore('events', {
  state: () => {
    return {
      events: null,
      eventsLoading: false,
      event: null,
      eventLoading: false,
    }
  },
  getters: {},
  actions: {
    async fetchEventList() {
      this.eventsLoading = true
      try {
        this.events = await fetchEventList()
      } catch (e) {
        console.error(e)
        return e
      }
      this.eventsLoading = false
    },
    async fetchEventDetails(id: string | string[]) {
      this.eventLoading = true
      try {
        this.event = await fetchEventDetails(id)
      } catch (e) {
        console.error(e)
        return e
      }
      this.eventLoading = false
    },
  },
});
