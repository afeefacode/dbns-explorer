import {defineStore} from 'pinia';
import {fetchActorOffers, fetchEntityDetails, fetchEntityList} from "src/api/entities";

export const useEntityStore = defineStore('entities', {
  state: () => {
    return {
      entityList: [],
      entityListLoading: false,
      entityDetail: {offers: {}},
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
        const details = await fetchEntityDetails(entityType, id)
        this.entityDetail = details.data

        if (entityType === 'actors') {
          const offers = await fetchActorOffers(id)
          this.entityDetail.offers = offers
        }

      } catch (e) {
        console.error(e)
        return e
      }
      this.entityDetailLoading = false
    },
  },
});
