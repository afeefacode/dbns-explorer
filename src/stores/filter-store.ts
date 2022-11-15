import {defineStore} from 'pinia';
import {fetchCategoryList} from "src/api/filters";

export const useFilterStore = defineStore('filters', {
  state: () => {
    return {
      categories: null
    }
  },
  actions: {
    // @todo: this response has mixed data in it as of 22/11/14
    async fetchCategoryList(requestBody: object) {
      this.categories = await fetchCategoryList(requestBody)
    }
  },
});
