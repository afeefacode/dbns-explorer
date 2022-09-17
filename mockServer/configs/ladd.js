const config = {
  brandColor: '#009999',
  brandTextColor: '#FFFFFF',
  heading: 'Aktiv in Sachsen',
  introduction: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti eaque explicabo ipsum nam omnis porro praesentium quaerat quasi rem, soluta voluptates? Beatae laudantium modi odit praesentium voluptatibus. Aperiam at culpa dicta dolorem dolorum ducimus, et incidunt iste libero minima quo reiciendis. Consequuntur delectus, molestias necessitatibus nemo neque odio omnis.',
  entities: [
    {
      name: 'actors',
      filters: {
        orgType: {
          showFilter: true
        },
        search: {
          showSearch: true
        },
        region: {
          showFilter: true
        }
      },
      views: [
        'map',
        'list'
      ]
    },
    {
      name: 'events',
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

module.exports = config
