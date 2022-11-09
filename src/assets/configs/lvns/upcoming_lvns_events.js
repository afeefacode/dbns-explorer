export const config = {
  brandColor: '#5FA93D',
  contrastTextColor: '#FFFFFF',
  regions: 'all',
  entities: [
    {
      type: 'event',
      filters: {
        'actors': ['432'],
      },
      limit: 3,
      cardStyle: 'vertical'
    }
  ]
}

export const urlParam = 'config=%7B%22brandColor%22:%22#5FA93D%22,%22contrastTextColor%22:%22#FFFFFF%22,%22regions%22:%22all%22,%22entities%22:%5B%7B%22type%22:%22event%22,%22filters%22:%7B%22actors%22:%5B%22432%22%5D%7D,%22limit%22:3,%22cardStyle%22:%22vertical%22%7D%5D%7D'
