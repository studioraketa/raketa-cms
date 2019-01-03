import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NoSSR from 'react-no-ssr';
import {
  RaketaUIProvider,
  Title,
  Text,
} from 'raketa-ui';

import SortableList from 'react-sortablejs';
import AdminSidebar from './lib/AdminSidebar';
import randomString from './helpers/randomString';
import AdminWidget from './lib/AdminWidget';
import ReorderWidgetsDialog from './dialogs/ReorderWidgetsDialog';

const EmptyCanvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class PageBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.page,
      dirty: false,
      orderDialogOpen: false,
      pageSettingsOpen: false,
    };
  }

  getChildContext() {
    return { host: this.props.host, mediaManager: this.props.mediaManager };
  }

  widgetFactory(widgetName) {
    const { library } = this.props;
    const widget = library[widgetName];

    return {
      widgetId: randomString(6),
      component: widgetName,
      settings: widget.defaults,
    };
  }

  handleAddWidget(widgetName) {
    if (widgetName === '') return;

    const { page } = this.state;

    const widgets = [
      ...page.widgets,
      this.widgetFactory(widgetName),
    ];

    this.setState({ page: Object.assign({}, page, { widgets }) }, () => this.notifyChange(page));
  }

  handleUpdate(widgetId, settings) {
    const { page } = this.state;
    const widgetIndex = page.widgets.findIndex(currentWidget =>
        currentWidget.widgetId === widgetId);

    const widgets = [
      ...page.widgets.slice(0, widgetIndex),
      Object.assign({}, page.widgets[widgetIndex], { settings }),
      ...page.widgets.slice(widgetIndex + 1),
    ];

    this.setState({ page: Object.assign({}, page, { widgets }) }, () => this.notifyChange(page));
  }

  handleDelete(widgetId) {
    const { page } = this.state;
    const widgetIndex = page.widgets.findIndex(currentWidget =>
      currentWidget.widgetId === widgetId);

    const widgets = [
      ...page.widgets.slice(0, widgetIndex),
      ...page.widgets.slice(widgetIndex + 1),
    ];

    this.setState({ page: Object.assign({}, page, { widgets }) }, () => this.notifyChange(page));
  }

  handleReorder(newOrder) {
    const { page } = this.state;

    const widgets = [];
    newOrder.forEach((i) => {
      widgets.push(page.widgets[i]);
    });

    this.setState({ page: Object.assign({}, page, { widgets }) }, () => this.notifyChange(page));
  }

  notifyChange(page) {
    this.props.onChange(page);
  }

  handleSave() {
    const { page } = this.state;
    this.props.onSave(page);
  }

  render() {
    const { library, navigation, dirty, themes, spacings, onExit } = this.props;
    const { page, isLoading, orderDialogOpen, pageSettingsOpen } = this.state;
    const { widgets } = page;

    return (
      <NoSSR>
        <RaketaUIProvider>
          <div style={{ paddingLeft: '64px' }}>
            <ReorderWidgetsDialog
              open={orderDialogOpen}
              library={library}
              onClose={() => this.setState({ orderDialogOpen: false })}
              onChange={newOrder => this.handleReorder(newOrder)}
              widgets={widgets}
            />

            <AdminSidebar
              library={library}
              navigation={navigation}
              dirty={dirty}
              onSave={() => this.handleSave()}
              onAddWidget={widget => this.handleAddWidget(widget)}
              onReorderDialog={() => this.setState({ orderDialogOpen: true })}
              onExit={onExit}
            />

            {widgets.length > 0 ?
              (
                <SortableList
                  tag="div"
                  options={{ handle: '.btn-drag', animation: 150 }}
                  onChange={newOrder => this.handleReorder(newOrder)}
                >
                  {widgets.map((widget, idx) =>
                    <div key={widget.widgetId} data-id={idx}>
                      <AdminWidget
                        library={library}
                        themes={themes}
                        spacings={spacings}
                        widgetId={widget.widgetId}
                        widgetComponent={widget.component}
                        onUpdate={(widgetId, settings) => this.handleUpdate(widgetId, settings)}
                        onDelete={widgetId => this.handleDelete(widgetId)}
                        {...widget.settings}
                      />
                    </div>)}
                </SortableList>
              ) : (
                <EmptyCanvas>
                  <div>
                    <Title primary>It's always good to start with a clean slate. </Title>
                    <Text>Use the sidebar to add content. </Text>
                  </div>
                </EmptyCanvas>
                )
              }
          </div>
        </RaketaUIProvider>
      </NoSSR>
    );
  }
}

PageBuilder.defaultProps = {
  themes: [['none', 'None'], ['light', 'Light'], ['dark', 'Dark']],
  spacings: [['none', 'None'], ['both', 'Both'], ['top', 'Top'], ['bottom', 'Bottom']],
};

PageBuilder.propTypes = {
  page: PropTypes.object.isRequired,
  host: PropTypes.string,
  mediaManager: PropTypes.object,
};

PageBuilder.childContextTypes = {
  host: PropTypes.string,
  mediaManager: PropTypes.object,
};

export default PageBuilder;
