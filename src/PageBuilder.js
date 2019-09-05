import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NoSSR from 'react-no-ssr';
import {
  RaketaUIProvider,
  Title,
  Text,
} from 'raketa-ui';

import {
  add,
  removeById,
  updateFieldById,
  reorder,
  randomString,
} from './lists';

import SortableList from 'react-sortablejs';
import AdminSidebar from './lib/AdminSidebar';
import AdminWidget from './lib/AdminWidget';
import ReorderDialog from './dialogs/ReorderDialog';
import ErrorBoundary from './ErrorBoundary';

const EmptyCanvas = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Canvas = React.memo(({ widgets, library, themes, spacings, onReorder, onUpdate, onRemove, identifier }) => (
  <React.Fragment>
    {(widgets.length > 0) &&
      <SortableList
        tag="div"
        options={{ handle: '[data-drag]', animation: 150 }}
        onChange={onReorder}
      >
        {widgets.map((widget, idx) =>
          <ErrorBoundary key={idx}>
            <div data-id={idx}>
              <AdminWidget
                library={library}
                themes={themes}
                spacings={spacings}
                widgetId={widget.widgetId}
                widgetComponent={widget.component}
                onUpdate={onUpdate}
                onDelete={onRemove}
                identifier={identifier}
                {...widget.settings}
              />
            </div>
          </ErrorBoundary>
        )}
      </SortableList>
    }

    {(widgets.length === 0) &&
      <EmptyCanvas>
        <div>
          <Title primary>It's always good to start with a clean slate. </Title>
          <Text>Use the sidebar to add content. </Text>
        </div>
      </EmptyCanvas>
    }
  </React.Fragment>
), (props, nextProps) => {
  // TODO: Make this comparision quicker
  const themesAreEqual = JSON.stringify(props.themes) === JSON.stringify(nextProps.themes);
  const spacingsAreEqual = JSON.stringify(props.spacings) === JSON.stringify(nextProps.spacings);
  const widgetsAreEqual = JSON.stringify(props.widgets) === JSON.stringify(nextProps.widgets);

  return themesAreEqual && spacingsAreEqual && widgetsAreEqual;
});

class PageBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: props.page,
      dirty: false,
      reorderOpen: false,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleOpenReorder = this.handleOpenReorder.bind(this);
    this.handleCloseReorder = this.handleCloseReorder.bind(this);
    this.handleReorder = this.handleReorder.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  getChildContext() {
    const { host, mediaManager } = this.props;

    return {
      host,
      mediaManager,
    };
  }

  factory(widgetName) {
    const { library } = this.props;
    const widget = library[widgetName];

    return {
      widgetId: randomString(6),
      component: widgetName,
      settings: widget.defaults,
    };
  }

  handleOpenReorder() {
    this.setState({ reorderOpen: true });
  }

  handleCloseReorder() {
    this.setState({ reorderOpen: false });
  }

  handleAdd() {
    const { page } = this.state;
    this.setState({
      page: Object.assign({}, page, { widgets: add(page.widgets, this.factory(widgetName)) })
    }, () => this.notifyChange(page));
  }

  handleUpdate(id, settings) {
    const { page } = this.state;
    this.setState({
      page: Object.assign({}, page, { widgets: updateFieldById(page.widgets, 'settings', settings, id, 'widgetId') })
    }, () => this.notifyChange(page));
  }

  handleRemove(id) {
    const { page } = this.state;
    this.setState({
      page: Object.assign({}, page, { widgets: removeById(page.widgets, id, 'widgetId') })
    }, () => this.notifyChange(page));
  }

  handleReorder(order) {
    const { page } = this.state;
    this.setState({
      page: Object.assign({}, page, { widgets: reorder(page.widgets, order) })
    }, () => this.notifyChange(page));
  }

  notifyChange(page) {
    this.props.onChange(page);
  }

  handleSave() {
    const { page } = this.state;
    this.props.onSave(page);
  }

  handlePasteWidget() {
    const { page } = this.state;
    const { identifier } = this.props;

    const clipboardWidget = JSON.parse(localStorage.getItem(`clipboard–${this.props.identifier}`));

    if (!clipboardWidget) {
      return alert('Nothing to paste, yet');
    }

    const newWidget = {
      widgetId: randomString(6),
      component: clipboardWidget.widgetName,
      settings: clipboardWidget.widget,
    };

    this.setState({
      page: Object.assign({}, page, { widgets: add(page.widgets, newWidget) })
    }, () => this.notifyChange(page));

    localStorage.removeItem(`clipboard–${identifier}`);
  }

  render() {
    const { library, navigation, dirty, themes, spacings, onExit, sidebarButtons, identifier } = this.props;
    const { page, reorderOpen } = this.state;
    const { widgets } = page;

    return (
      <NoSSR>
        <RaketaUIProvider>
          <div style={{ paddingLeft: '64px' }}>
            <ReorderDialog
              open={reorderOpen}
              library={library}
              onClose={this.handleCloseReorder}
              onChange={this.handleReorder}
              onDelete={this.handleRemove}
              widgets={widgets}
            />

            <AdminSidebar
              library={library}
              navigation={navigation}
              dirty={dirty}
              onSave={this.handleSave}
              onAddWidget={this.handleAdd}
              onReorderDialog={this.handleOpenReorder}
              onExit={onExit}
              buttons={sidebarButtons}
              identifier={identifier}
              onPasteWidget={() => this.handlePasteWidget()}
            />

            <Canvas
              widgets={widgets}
              library={library}
              themes={themes}
              spacings={spacings}
              onReorder={this.handleReorder}
              onUpdate={this.handleUpdate}
              onRemove={this.handleRemove}
              identifier={identifier}
            />
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

PageBuilder.childContextTypes = {
  host: PropTypes.string,
  mediaManager: PropTypes.object,
};

export default PageBuilder;
