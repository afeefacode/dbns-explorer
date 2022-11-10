export const config = {
  brandColor: '5FA93D',
  contrastTextColor: 'FFFFFF',
  entities: [
    {
      type: 'event',
      preFilter: {
        'actors': ['432'],
      },
      limit: 3,
      showListView: true,
      cardStyle: 'vertical'
    }
  ]
}
