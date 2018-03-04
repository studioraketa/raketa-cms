import React from 'react';
import PropTypes from 'prop-types';

import MdMenu from 'react-icons/lib/md/menu';
import MdAddCircle from 'react-icons/lib/md/add-circle';
import MdImportExport from 'react-icons/lib/md/import-export';
import FaMailReply from 'react-icons/lib/fa/mail-reply';
import MdDone from 'react-icons/lib/md/done';
import FaSearch from 'react-icons/lib/fa/search';

import {
  SideNav,
  NavItem,
  NavButton,
  NavPanel,
  NavSectionTitle,
  NavSectionMenuItem,
  SideNavSearchWrapper,
} from 'raketa-ui';

import { ComponentPreview } from '../lib/ComponentPreview';
import TextInput from '../forms/TextInput';

class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      widgetName: '',
      q: '',
    };
  }

  renderWidgets() {
    const { q } = this.state;
    const { library, onAddWidget } = this.props;

    const widgets = Object.keys(library).filter(widgetName => widgetName.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    const widgetsCategories = widgets.map(widgetName => library[widgetName].category).filter((c, idx, self) => self.indexOf(c) === idx);

    return (
      <div>
        <SideNavSearchWrapper>
          <FaSearch style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '20px',
              marginTop: '14px',
              opacity: q !== '' ? 1 : 0.5 }} />
          <TextInput
            value={q}
            onChange={q => this.setState({ q })}
            placeholder="Search..."
          />
        </SideNavSearchWrapper>

        {widgetsCategories.map((categoryName, idx) =>
          <div key={idx} style={{ marginBottom: '25px' }}>
            <NavSectionTitle secondary>{categoryName}</NavSectionTitle>

            {widgets.filter(widgetName => library[widgetName].category === categoryName).map((widgetName, widgetIdx) =>
              <ComponentPreview key={widgetIdx} onClick={() => onAddWidget(widgetName)}>{library[widgetName].title}</ComponentPreview>
            )}
          </div>)}
      </div>
    );
  }

  render() {
    const { library, navigation, dirty, onSave, onReorderDialog, onExit } = this.props;

    return (
      <SideNav>
        <NavItem>
          <NavButton><MdAddCircle /></NavButton>
          <NavPanel>
            <NavSectionTitle>Library</NavSectionTitle>
            {this.renderWidgets()}
          </NavPanel>
        </NavItem>
        <NavItem>
          <NavButton onClick={onReorderDialog}><MdImportExport /></NavButton>
        </NavItem>
        <NavItem>
          <NavButton success={dirty} onClick={onSave}><MdDone /></NavButton>
        </NavItem>
        <NavItem bottom>
          <NavButton onClick={onExit}><FaMailReply /></NavButton>
        </NavItem>
      </SideNav>
    );
  }
}

AdminSidebar.propTypes = {
  onSave: PropTypes.func.isRequired,
  onAddWidget: PropTypes.func.isRequired,
  onReorderDialog: PropTypes.func.isRequired,
};

export default AdminSidebar;
