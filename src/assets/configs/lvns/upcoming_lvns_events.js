export const config = {
  name: 'upcoming_lvns_events',
  brandColor: '5FA93D',
  contrastTextColor: 'FFFFFF',
  entities: [
    {
      type: 'events',
      preFilter: {
        'actors': ['432'],
      },
      limit: 3,
      showListView: true,
      cardStyle: 'vertical'
    }
  ]
}
