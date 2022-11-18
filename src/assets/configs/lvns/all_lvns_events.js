export const config = {
  name: 'all_lvns_events',
  brandColor: '5FA93D',
  contrastTextColor: 'FFFFFF',
  entities: [
    {
      type: 'events',
      preFilter: {
        'actors': ['432']
      },
      showListView: true,
    }
  ]
}
