import styled from 'styled-components';
import { em, reset, resetButton } from 'raketa-ui';

export const SidebarItem = styled.button`
  position: relative;
  ${reset()}
  ${resetButton()}
  background-color: transparent;
  width: 100%;
  margin-bottom: ${em(1)};
  font-size: ${em(1)};
  color: #999;
  text-align: left;
  transition: all .2s ease-in-out;

  &:hover {
    color: ${props => props.theme.whiteColor};
  }
`;
