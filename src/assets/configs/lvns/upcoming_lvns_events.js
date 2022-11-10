export const config = {
  brandColor: '5FA93D',
  contrastTextColor: 'FFFFFF',
  entities: [
    {
      type: 'event',
      pre_filter: {
        'actors': ['432'],
      },
      limit: 3,
      show_views: ['list'],
      cardStyle: 'vertical'
    }
  ]
}
