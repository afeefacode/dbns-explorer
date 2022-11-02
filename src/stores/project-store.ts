import {defineStore} from 'pinia';
import {fetchEntityList, fetchEntityDetails} from '../api/entities'

export const useProjectStore = defineStore('projects', {
  state: () => {
    return {
      projects: null,
      project: null,
    }
  },
  getters: {},
  actions: {
    async fetchProjectList() {
      try {
        this.projects = await fetchEntityList('projects')
      } catch (e) {
        console.error(e)
        return e
      }
    },
    async fetchProjectDetails(id: string | string[]) {
      try {
        this.projects = await fetchEntityDetails('projects', id)
      } catch (e) {
        console.error(e)
        return e
      }
    },
  },

});
