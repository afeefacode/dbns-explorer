import {defineStore} from 'pinia';
import {fetchActorOffers, fetchEntityDetails, fetchEntityList} from "src/api/entities";

export const useEntityStore = defineStore('entities', {
  state: () => {
    return {
      entityList: [],
      entityListLoading: false,
      entityDetail: {offers: []},
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
    async fetchEntityDetails(entityType: string, id: string | string[]) {
      this.entityDetailLoading = true
      try {
        let response = await fetchEntityDetails(entityType, id)
        this.entityDetail = response.data

        if (entityType === 'actors') {
          response = await fetchActorOffers(id)
          this.entityDetail.offers = response.data
        }

      } catch (e) {
        console.error(e)
        return e
      }
      this.entityDetailLoading = false
    },
  },
});
