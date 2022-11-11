import {defineStore} from 'pinia';

export const useBaseStore = defineStore('base', {
  state: () => {
    return {
      activeEntity: '',
      activeEntityConfig: {}
    }
  },
  actions: {
    getActiveEntity(useRouter: any) {
      this.activeEntity = useRouter().currentRoute.value.fullPath.split('/')[1]
    },
    getActiveEntityConfig(useRouter: any) {
      this.activeEntity = useRouter().currentRoute.value.fullPath.split('/')[1]
    },
  },
});
