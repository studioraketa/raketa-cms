import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MdImportExport from 'react-icons/lib/md/import-export';
import MdEdit from 'react-icons/lib/md/edit';
import MdDelete from 'react-icons/lib/md/delete';

import {
  em,
  IconButton,
  IconSpan,
} from 'raketa-ui';

import SettingsDialog from '../dialogs/SettingsDialog';
import SelectMenu from '../forms/SelectMenu';
import TextInput from '../forms/TextInput';

const AdminWidgetWrapper = styled.div`
  z-index: 1;

  ${props => props.isPreview ? '' : `
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

const CommonSettings = ({ settings, themes, onChange }) => (
  <SegmentWrapper>
    <Segment>
      <SelectMenu
        label="Spacing"
        options={[['none', 'None'], ['both', 'Both'], ['top', 'Top'], ['bottom', 'Bottom']]}
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

CommonSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  themes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

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

    const widgetProps = fields.map(field => ({ [field]: this.props[field] || '' }));
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

    const widgetProps = fields.map(field => ({ [field]: this.state[field] || '' }));
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

  renderWidget() {
    return React.createElement(
      this.getWidget(),
      Object.assign(this.getWidgetProps(), { containerSettings: this.getContainerSettings() }),
    );
  }

  render() {
    const { widgetId, isPreview, themes } = this.props;

    return (
      <AdminWidgetWrapper isPreview={isPreview}>
        <AdminWidgetToolbar data-toolbar>
          <IconSpan className="btn-drag"><MdImportExport /></IconSpan>
          <IconButton primary onClick={() => this.setState({ open: true })}><MdEdit /></IconButton>
          <IconButton danger onClick={() => this.handleDeleteWidget(widgetId)}><MdDelete /></IconButton>
        </AdminWidgetToolbar>

        {this.renderWidget()}

        <SettingsDialog
          open={this.state.open}
          widget={this.getWidget()}
          settings={this.state}
          onChangeField={(field, value) => this.handleChange(field, value)}
          onPrimary={() => this.handleSave()}
          onClose={() => this.setState({ open: false })}
          headerToolbar={() =>
            <CommonSettings
              themes={themes}
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

AdminWidget.propTypes = {
  widgetId: PropTypes.string.isRequired,
  widgetComponent: PropTypes.string.isRequired,
  containerSettings: PropTypes.object.isRequired,
  themes: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AdminWidget;
