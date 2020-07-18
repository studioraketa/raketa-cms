import styled from 'styled-components'
import { reset, buttonReset } from '@raketa-cms/raketa-mir'

export const SidebarItem = styled.button`
  ${reset}
  ${buttonReset}
  position: relative;
  background-color: transparent;
  width: 100%;
  padding: 0;
  margin-bottom: ${(props) => props.theme.font.base};
  font-size: ${(props) => props.theme.font.base};
  color: #999;
  text-align: left;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`
