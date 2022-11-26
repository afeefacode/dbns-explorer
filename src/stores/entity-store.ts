import {defineStore} from 'pinia';
import {useCategoryStore} from 'src/stores/category-store'
import {fetchActorOffers, fetchEntityDetails, fetchEntityList} from "src/api/entities";

export const useEntityStore = defineStore('entities', {
  state: () => {
    return {
      entityLists: {
        actors: null,
        counselings: null,
        educations: null,
        events: null,
        projects: null,
        stores: null,
      },
      entityListLoading: false,
      entityDetail: {offers: {}},
      entityDetailLoading: false,
    }
  },
  actions: {
    async fetchEntityList(entityType: string) {
      const categoryStore = useCategoryStore()
      console.log(categoryStore.mainCategories)
      this.entityListLoading = true

      return

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
