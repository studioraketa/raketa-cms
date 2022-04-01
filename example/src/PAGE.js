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
      widgetId: 'xsmdwfai',
      component: 'ButtonsWidget',
      settings: {
        variant: '"3_columns"',
        containerSettings: {},
        list: [
          {
            id: 1,
            button: {
              id: '',
              label: 'Button 1',
              link: '#',
              rel: 'follow',
              target: '_self',
              type: 'primary'
            }
          },
          {
            id: 2,
            button: {
              id: '',
              label: 'Button 2',
              link: '#',
              rel: 'follow',
              target: '_self',
              type: 'primary'
            }
          },
          {
            id: 3,
            button: {
              id: '',
              label: 'Button 3',
              link: '#',
              rel: 'follow',
              target: '_self',
              type: 'primary'
            }
          }
        ]
      },
      id: 'xsmdwfai',
      chosen: false,
      selected: false
    },
    {
      widgetId: 'xsmkf2i',
      component: 'DeprecatedWidget',
      settings: {
        align: 'text-center',
        title: 'Deprecated title',
        containerSettings: {}
      },
      id: 'xsmkf2i',
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
        image: 'https://placeholder.raketa.cloud/images/1920x1080',
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
          {
            id: 1,
            title: 'Title 1',
            image: 'http://placeholder.raketa.cloud/images/400x300'
          },
          {
            id: 2,
            title: 'Title 2',
            image: 'http://placeholder.raketa.cloud/images/400x300'
          },
          {
            id: 3,
            title: 'Title 3',
            image: 'http://placeholder.raketa.cloud/images/400x300'
          }
        ],
        containerSettings: {}
      }
    }
  ]
}

export default PAGE
