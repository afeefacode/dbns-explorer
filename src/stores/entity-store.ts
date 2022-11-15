import {defineStore} from 'pinia';
import {fetchEntityDetails, fetchEntityList} from "src/api/entities";

export const useEntityStore = defineStore('entities', {
  state: () => {
    return {
      entityList: [],
      entityListLoading: false,
      entityDetail: {},
      entityDetailLoading: false,
    }
  },
  actions: {
    async fetchEntityList(requestBody: object) {
      this.entityListLoading = true
      try {
        this.entityList = await fetchEntityList(requestBody)
      } catch (e) {
        console.error(e)
        return e
      }
      this.entityListLoading = false
    },
    async fetchEntityDetails(requestBody: object, id: number) {
      this.entityDetailLoading = true
      try {
        this.entityDetail = await fetchEntityDetails(requestBody, id)
      } catch (e) {
        console.error(e)
        return e
      }
      this.entityDetailLoading = false
    },
  },
});
