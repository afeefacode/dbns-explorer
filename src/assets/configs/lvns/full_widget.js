export const config = {
  name: 'full_widget',
  brandColor: '5FA93D',
  contrastTextColor: 'FFFFFF',
  showMainFilters: true,
  entities: [
    {
      type: 'events',
      showFilters: true,
      showMapView: true,
      showListView: true
    },
    {
      type: 'counselings',
      showMapView: true,
      showListView: true
    },
    {
      type: 'educations',
      showMapView: true,
      showListView: true
    },
    {
      type: 'actors',
      showFilters: true,
      showListView: true,
      showMapView: true
    },
    {
      type: 'projects',
      showMapView: true,
      showListView: true
    },
    {
      type: 'stores',
      showFilters: true,
      showMapView: true,
      showListView: true
    }
  ]
}
