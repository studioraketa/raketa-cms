import styled from 'styled-components';
import { em, reset, resetButton } from 'raketa-ui';

export const ComponentPreview = styled.button`
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

export const ComponentTooltip = styled.div`
  display: none;
  position: absolute;
  left: ${em(20)};
  width: ${em(15)};
  height: ${em(10)};
  border: 10px solid ${props => props.theme.whiteColor};
  border-radius: 3px;
  background-color: ${props => props.theme.buttonColor};
  z-index: 100;
  box-shadow: 0 0 20px rgba(0,0,0,.3);
  pointer-events: none;

  &:before {
    position: absolute;
    top: 50%;
    left: -30px;
    width: 0;
    height: 0;
    margin-top: -15px;
    border-right: 20px solid ${props => props.theme.whiteColor};
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    content: '';
  }

  &.show-tooltip { display: block; }
`;
