export const config = {
  name: 'full_widget',
  brandColor: '5FA93D',
  contrastTextColor: 'FFFFFF',
  showMainFilters: true,
  showMapView: true,
  showListView: true,
  entities: [
    {
      type: 'events',
      showFilters: true,
    },
    {
      type: 'counselings',
    },
    {
      type: 'educations',
    },
    {
      type: 'actors',
      showFilters: true,
    },
    {
      type: 'projects',
    },
    {
      type: 'stores',
      showFilters: true,
    }
  ]
}
