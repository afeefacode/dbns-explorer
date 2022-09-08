import {defineStore} from 'pinia';

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      brandColor: '#5FA93D',
      entities: [
        {
          name: 'actor',
          filters: [
            'organization_type',
            'search',
            'region'
          ],
          views: [
            'map',
            'list'
          ]
        },

        {
          name: 'event',
          filters: [
            'category',
            'quick_date',
            'date_picker',
            'additional_event_filters',
            'search',
            'region'
          ],
          views: [
            'map',
            'list'
          ]
        }
      ]
    }
  },
  getters: {},
  actions: {},
});
