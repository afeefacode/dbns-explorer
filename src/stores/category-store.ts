import {defineStore} from 'pinia';
import {fetchCategoryList} from "src/api/categories";

export const useCategoryStore = defineStore('categories', {
  state: () => {
    return {
      orgTypes: null,
      formats: null,
      targetGroups: null,
      tradeTypes: null,
      tradeCategories: null,
      resourceTypes: null,
      regions: null,
      productTypes: null,
      targets: null,
      mainCategories: null,
      annotationCategories: null
    }
  },
  actions: {
    async fetchCategoryList() {
      const response = await fetchCategoryList()
      this.orgTypes = response[0].categories
      this.formats = response[1].categories
      this.targetGroups = response[2].categories
      this.tradeTypes = response[3].categories
      this.tradeCategories = response[4].categories
      this.resourceTypes = response[5].categories
      this.regions = response[6].categories
      this.productTypes = response[7].categories
      this.targets = response[8].categories
      this.mainCategories = response[9].categories
      this.annotationCategories = response[10].categories
    }
  },
});
