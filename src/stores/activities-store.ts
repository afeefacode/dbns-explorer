import {defineStore} from 'pinia';
import {} from ''

export const useActivitiesStore = defineStore('activities', {
  state: () => ({
    activities: [{id: 1}, {id: 2}],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
