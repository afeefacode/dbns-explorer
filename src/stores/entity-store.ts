import {defineStore} from 'pinia';
import {fetchEntityDetails, fetchEntityList} from "src/api/entities";

export const useEntityStore = defineStore('entities', {
  state: () => {
    return {
      entityList: null,
      entityListLoading: false,
      entityDetail: null,
      entityDetailLoading: false,
    }
  },
  actions: {
    async fetchEntityList(requestBody: object) {
      this.entityListLoading = true
      try {
        const response = await fetchEntityList(requestBody)
        this.entityList = response
      } catch (e) {
        console.error(e)
        return e
      }
      this.entityListLoading = false
    },
    async fetchEntityDetails(requestBody: object) {
      this.entityDetailLoading = true
      try {
        this.entityDetail = await fetchEntityDetails(requestBody)
      } catch (e) {
        console.error(e)
        return e
      }
      this.entityDetailLoading = false
    },
  },
});
