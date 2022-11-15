export const config = {
  brandColor: '#009999',
  contrastTextColor: '#FFFFFF',
  entities: [
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
