import React from 'react';
import styled from 'styled-components';

import { em } from 'raketa-ui';

import SettingsDialog from '../dialogs/SettingsDialog';
import SelectMenu from '../forms/SelectMenu';
import TextInput from '../forms/TextInput';

const icons = {
  iconMove: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5tb3ZlPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9Im1vdmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+ICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxLjAwMDAwMCwgMS4wMDAwMDApIiBpZD0iU2hhcGUiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIj4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPSIzIDcgMCAxMCAzIDEzIj48L3BvbHlsaW5lPiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9IjcgMyAxMCAwIDEzIDMiPjwvcG9seWxpbmU+ICAgICAgICAgICAgPHBvbHlsaW5lIHBvaW50cz0iMTMgMTcgMTAgMjAgNyAxNyI+PC9wb2x5bGluZT4gICAgICAgICAgICA8cG9seWxpbmUgcG9pbnRzPSIxNyA3IDIwIDEwIDE3IDEzIj48L3BvbHlsaW5lPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDEwIEwyMCwxMCI+PC9wYXRoPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMCwwIEwxMCwyMCI+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+",
  iconEdit: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5lZGl0LTI8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+PC9kZWZzPiAgICA8ZyBpZD0iZWRpdC0yIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPiAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDIuMDAwMDAwKSIgaWQ9IlNoYXBlIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiI+ICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPSIxMyAwIDE4IDUgNSAxOCAwIDE4IDAgMTMiPjwvcG9seWdvbj4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==",
  iconDelete: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyMnB4IiBoZWlnaHQ9IjIycHgiIHZpZXdCb3g9IjAgMCAyMiAyMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT50cmFzaDwvdGl0bGU+ICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPiAgICA8ZGVmcz48L2RlZnM+ICAgIDxnIGlkPSJ0cmFzaCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj4gICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIuMDAwMDAwLCAxLjAwMDAwMCkiIGlkPSJTaGFwZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiPiAgICAgICAgICAgIDxwb2x5bGluZSBwb2ludHM9IjAgNCAyIDQgMTggNCI+PC9wb2x5bGluZT4gICAgICAgICAgICA8cGF0aCBkPSJNMTYsNCBMMTYsMTggQzE2LDE5LjEwNDU2OTUgMTUuMTA0NTY5NSwyMCAxNCwyMCBMNCwyMCBDMi44OTU0MzA1LDIwIDIsMTkuMTA0NTY5NSAyLDE4IEwyLDQgTTUsNCBMNSwyIEM1LDAuODk1NDMwNSA1Ljg5NTQzMDUsMCA3LDAgTDExLDAgQzEyLjEwNDU2OTUsMCAxMywwLjg5NTQzMDUgMTMsMiBMMTMsNCI+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+",
  iconCopy: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY29weSI+PHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjEzIiBoZWlnaHQ9IjEzIiByeD0iMiIgcnk9IjIiPjwvcmVjdD48cGF0aCBkPSJNNSAxNUg0YTIgMiAwIDAgMS0yLTJWNGEyIDIgMCAwIDEgMi0yaDlhMiAyIDAgMCAxIDIgMnYxIj48L3BhdGg+PC9zdmc+",
};

const colors = {
  primary: 'rgb(0,102,221)',
  secondary: '#000',
  danger: '#d00',
  neutral: '#fff',
};

const IconButton = (props) => (
  <button
    type="button"
    style={{
      display: 'inline-block',
      width: '32px',
      height: '32px',
      marginRight: '4px',
      marginLeft: props.type === 'neutral' ? '32px' : 0,
      appearance: 'none',
      outline: '0',
      border: '0',
      borderRadius: '3px',
      background: 'transparent',
      backgroundColor: colors[props.type] || '#000',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '50%',
      backgroundImage: `url(${icons[props.icon]})`,
      cursor: 'pointer',
    }}

    {...props}
  ></button>
);

const AdminWidgetWrapper = styled.div`
  ${props => `
    &:hover {
      position: relative;
      box-shadow: inset 0 0 0 1px ${props.theme.borderColor};

      & > div[data-toolbar] { display: flex; }
    }
  `}
`;

const AdminWidgetToolbar = styled.div`
  display: none;
  position: absolute;
  top: ${em(1)};
  left: ${em(1)};
  z-index: 9;
`;

const SegmentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Segment = styled.div`
  width: 32%;
`;

const CommonSettings = ({ settings, themes, spacings, onChange }) => (
  <SegmentWrapper>
    <Segment>
      <SelectMenu
        label="Spacing"
        options={spacings}
        value={settings.spacing}
        onChange={newValue => onChange('spacing', newValue)}
      />
    </Segment>
    <Segment>
      <SelectMenu
        label="Theme"
        options={themes}
        value={settings.theme}
        onChange={newValue => onChange('theme', newValue)}
      />
    </Segment>
    <Segment>
      <TextInput
        label="Section ID"
        value={settings.sectionID}
        onChange={newValue => onChange('sectionID', newValue)}
      />
    </Segment>
  </SegmentWrapper>
);

class AdminWidget extends React.Component {
  constructor(props) {
    super(props);

    const widgetProps = this.getWidgetProps();
    this.state = Object.assign({
      open: false,
      containerSettings: this.getContainerProps() || {},
    }, widgetProps);
  }

  getWidget() {
    const { library, widgetComponent } = this.props;
    return library[widgetComponent];
  }

  getWidgetProps() {
    const widget = this.getWidget();
    const fields = Object.keys(widget.defaults);

    const widgetProps = fields.map(field => ({ [field]: this.props[field] }));
    return Object.assign(...widgetProps);
  }

  getContainerProps() {
    return this.props.containerSettings ? this.props.containerSettings : { spacing: 'none' };
  }

  getContainerSettings() {
    return this.state.containerSettings;
  }

  getSettings() {
    const widget = this.getWidget();
    const fields = Object.keys(widget.defaults);

    const widgetProps = fields.map(field => ({ [field]: this.state[field] }));
    return Object.assign(...widgetProps, { containerSettings: this.getContainerSettings() });
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSave() {
    const newState = Object.assign({}, { open: false }, this.getSettings());

    const { widgetId, onUpdate } = this.props;
    this.setState(newState, () => {
      onUpdate(widgetId, newState);
    });
  }

  handleToolbarChange(field, value) {
    const { containerSettings } = this.state;
    const newSettings = Object.assign({}, containerSettings, { [field]: value });
    this.setState({ containerSettings: newSettings });
  }

  handleDeleteWidget(widgetId) {
    if (!confirm('Are you sure?')) return;
    this.props.onDelete(widgetId);
  }

  handleCopyWidget() {
    const { widgetComponent, identifier } = this.props;
    const storedWidget = JSON.stringify({ widgetName: widgetComponent, widget: this.getSettings()});

    localStorage.setItem(`clipboard–${identifier}`, storedWidget);
  }

  render() {
    const { widgetId, themes, spacings } = this.props;

    return (
      <AdminWidgetWrapper>
        <AdminWidgetToolbar data-toolbar>
          <IconButton icon="iconMove" data-drag />
          <IconButton icon="iconEdit" type="primary" onClick={() => this.setState({ open: true })} />
          <IconButton icon="iconDelete" type="danger" onClick={() => this.handleDeleteWidget(widgetId)} />
          <IconButton icon="iconCopy" type="neutral" onClick={() => this.handleCopyWidget()} />
        </AdminWidgetToolbar>

        {React.createElement(
          this.getWidget(),
          Object.assign(this.getWidgetProps(), { containerSettings: this.getContainerSettings() }),
        )}

        <SettingsDialog
          open={this.state.open}
          widget={this.getWidget()}
          settings={this.state}
          onChangeField={(field, value) => this.handleChange(field, value)}
          onPrimary={() => this.handleSave()}
          onClose={() => this.setState({ open: false })}
          renderCommonSettings={() =>
            <CommonSettings
              themes={themes}
              spacings={spacings}
              settings={this.state.containerSettings}
              onChange={(field, value) => this.handleToolbarChange(field, value)}
            />
          }
        />
      </AdminWidgetWrapper>
    );
  }
}

AdminWidget.defaultProps = {
  containerSettings: {},
};

export default AdminWidget;
