import React from 'react'
import styled from 'styled-components'
import { reset, buttonReset } from '@raketa-cms/raketa-mir'

export const SideNav = styled.div`
  ${reset}
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 64px;
  background-color: ${(props) => props.theme.colors.black};
  border-right: 1px solid ${(props) => props.theme.colors.darkerGray};
  z-index: 30;
`

export const NavGroup = styled.div`
  ${reset};
  display: flex;
  flex-direction: column;
  z-index: 1;
`

export const NavItem = styled.div`
  z-index: 10;

  &:hover > * {
    display: block;
  }
`

const NavButtonStyle = styled.button`
  ${reset}
  ${buttonReset}
  position: relative;
  z-index: 1000;
  display: block;
  font-size: ${(props) => props.theme.font.medium};
  color: ${(props) => props.theme.colors.white};
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${(props) =>
    props.active
      ? props.theme.colors.darkerGray
      : props.success
      ? props.theme.colors.success
      : 'transparent'};
  ${(props) => (props.icon ? `background-image: url("${props.icon}");` : '')}
  width: 64px;
  height: 64px;
  border-bottom: 1px solid ${(props) => props.theme.colors.darkerGray};
  z-index: 12;

  &:hover {
    background-color: ${(props) =>
      props.success
        ? props.theme.colors.success
        : props.theme.colors.darkerGray};
  }

  &:active {
    opacity: 0.9;
  }
`

const TooltipWrapper = styled.div`
  position: relative;

  &:hover {
    .cms-tooltip {
      opacity: 1;
    }
  }
`

const Tooltip = styled.div`
  ${reset};
  position: absolute;
  top: calc(50% - 1em);
  left: 72px;
  z-index: 1001;
  height: 2em;
  padding: 0.5em 0.75em;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${(props) => props.theme.colors.white};
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease-in-out;
`

export const NavButton = ({ tooltip, ...props }) => (
  <TooltipWrapper>
    <NavButtonStyle {...props} />
    {tooltip && <Tooltip className='cms-tooltip'>{tooltip}</Tooltip>}
  </TooltipWrapper>
)

export const NavPanel = styled.div`
  ${reset}
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 64px;
  width: 300px;
  padding: ${(props) => `calc(${props.theme.font.base} * 2)`};
  background-color: rgba(0, 0, 0, 0.9);
  color: ${(props) => props.theme.colors.white};
  backdrop-filter: blur(8px);
  overflow-y: auto;
  z-index: 11;
`

export const NavSectionMenu = styled.div`
  display: flex;
  flex-direction: row;
`

export const NavSectionMenuItem = styled.button`
  ${reset}
  ${buttonReset}
  display: block;
  width: 100%;
  padding-bottom: ${(props) => `calc(${props.theme.font.base} / 2)`};
  margin-bottom: ${(props) => `calc(${props.theme.font.base} / 2)`};
  font-size: ${(props) => props.theme.font.medium};
  font-weight: 300;
  text-align: left;
  color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.darkerGray};
  transition: all 0.2s ease-in-out;

  &:hover {
    padding-left: ${(props) => `calc(${props.theme.font.base} / 2)`};
  }
`

export const SideNavSearchWrapper = styled.div`
  position: relative;
  height: ${(props) => `calc(${props.theme.font.base} * 3.125)`};
  margin-bottom: ${(props) => props.theme.font.base};

  input:not([type]) {
    position: absolute;
    top: 0;
    right: ${(props) => `calc(${props.theme.font.base} * -2)`};
    left: ${(props) => `calc(${props.theme.font.base} * -2)`};
    bottom: 0;
    width: 125%;
    padding-left: ${(props) => `calc(${props.theme.font.base} * 2)`};
    padding-right: ${(props) => `calc(${props.theme.font.base} * 2)`};
    font-size: ${(props) => props.theme.font.medium};
    border: 0 !important;
    border-radius: 0;
    background-color: ${(props) => props.theme.colors.black};
    color: ${(props) => props.theme.colors.white};
  }
`
