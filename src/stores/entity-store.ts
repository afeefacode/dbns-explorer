import {defineStore} from 'pinia';
import {useBaseStore} from 'src/stores/base-store'
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
        similarEntities: null,
      },
      entityListLoading: false,
      entityDetail: {offers: {}},
      entityDetailLoading: false,
    }
  },
  actions: {
    async fetchEntityList(entityType: string) {
      const baseStore = useBaseStore()
      this.entityListLoading = true
      try {
        //@ts-ignore
        this.entityLists[entityType] = await fetchEntityList(entityType, baseStore.activeFilters)
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
    async fetchSimilarEntities(entityType: string) {
      const categoryStore = useCategoryStore()
      this.entityListLoading = true
      try {
        this.entityLists.similarEntities = await fetchEntityList(entityType, categoryStore)
      } catch (e) {
        console.error(e)
        return e
      }
      this.entityListLoading = false
    },
  },
});
