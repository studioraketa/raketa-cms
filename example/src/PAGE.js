const PAGE = {
  title: 'Example',
  slug: 'example',
  widgets: [
    {
      widgetId: 'xsmkfai',
      component: 'SectionTitleWidget',
      settings: {
        align: 'text-center',
        title: 'Section title',
        containerSettings: {}
      },
      id: 'xsmkfai',
      chosen: false,
      selected: false
    },
    {
      widgetId: 'hwvm3ul',
      component: 'NavigationWidget',
      settings: {
        list: [
          { id: 1, title: 'All', link: '#' },
          { id: 2, title: 'Houses', link: '#' },
          { id: 3, title: 'Offices', link: '#' },
          { id: 4, title: 'Apartments', link: '#' },
          { id: 5, title: 'Infrastructure', link: '#' }
        ],
        variant: '3_columns',
        containerSettings: {}
      },
      id: 'hwvm3ul',
      chosen: false,
      selected: false
    },
    {
      widgetId: 'zj3nij4',
      component: 'ImageWidget',
      settings: {
        variant: 'col-12',
        image: 'https://placehold.it/1920x1080',
        description: 'Example image',
        containerSettings: {}
      },
      id: 'zj3nij4',
      chosen: false,
      selected: false
    },
    {
      widgetId: 'hn6x94n',
      component: 'ArticlesWidget',
      settings: {
        variant: 'col-6',
        list: [
          { id: 1, title: 'Title', image: 'http://placehold.it/400x300' },
          { id: 2, title: 'Title', image: 'http://placehold.it/400x300' }
        ],
        containerSettings: {}
      }
    }
  ]
}

export default PAGE
