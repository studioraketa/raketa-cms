import React from 'react'
import styled from 'styled-components'
import { reset } from '@raketa-cms/raketa-mir'

const SIZE = '64px'

const LanguageSwitcherWrapper = styled.div`
  ${reset};
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: ${SIZE};
  height: ${SIZE};
  color: #fff;

  &:hover {
    [data-switcher] {
      left: ${SIZE};
      top: 0;
      opacity: 1;
    }
  }
`

const LanguageSwitcherMenu = styled.div`
  ${reset};
  position: absolute;
  z-index: 9;
  left: -1000px;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  background-color: ${(props) => props.theme.colors.trueBlack};
  opacity: 0;
  transition: all ease-in-out 0.3s;
`

const LanguageSwitcherItem = styled.div`
  ${reset};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${SIZE};
  height: ${SIZE};
  background-color: ${(props) => props.theme.colors.trueBlack};
  text-transform: uppercase;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.trueWhite};
    font-weight: 700;
    font-size: ${(props) => props.theme.font.medium};
    text-decoration: none;

    :hover {
      background-color: ${(props) => props.theme.colors.primaryRGB06};
    }
  }
`

const LanguageSwitcherNewItem = styled.div`
  ${reset};
  position: relative;
  width: ${SIZE};
  height: ${SIZE};
  background-color: ${(props) => props.theme.colors.trueBlack};
  text-transform: uppercase;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    opacity: 0.6;

    color: ${(props) => props.theme.colors.trueWhite};
    font-weight: 700;
    font-size: ${(props) => props.theme.font.medium};
    text-decoration: none;
  }

  a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;

    color: ${(props) => props.theme.colors.trueWhite};
    font-weight: 700;
    font-size: ${(props) => props.theme.font.medium};
    text-decoration: none;

    :hover {
      background-color: ${(props) => props.theme.colors.primaryRGB06};
    }
  }
`

const LanguageSwitcherCurrent = styled.div`
  ${reset};
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${(props) => props.theme.colors.trueWhite};
  background-color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.font.medium};
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
`

const LanguageSwitcherItemComponent = ({ path, label }) => (
  <LanguageSwitcherItem>
    <a href={path}>{label}</a>
  </LanguageSwitcherItem>
)

const LanguageSwitcherNewItemComponent = ({ path, label }) => (
  <LanguageSwitcherNewItem>
    <span>{label}</span>
    <a href={path}>+</a>
  </LanguageSwitcherNewItem>
)

const LanguageSwitcher = ({ current, navigation }) => {
  return (
    <LanguageSwitcherWrapper>
      <LanguageSwitcherCurrent>{current}</LanguageSwitcherCurrent>
      <LanguageSwitcherMenu data-switcher>
        {navigation.map((navItem, idx) => {
          const LinkComponent = navItem.newItem
            ? LanguageSwitcherNewItemComponent
            : LanguageSwitcherItemComponent

          return (
            <LinkComponent
              key={idx}
              path={navItem.path}
              label={navItem.label}
            />
          )
        })}
      </LanguageSwitcherMenu>
    </LanguageSwitcherWrapper>
  )
}

export default LanguageSwitcher
