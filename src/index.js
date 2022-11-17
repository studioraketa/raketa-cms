import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme, Label, FormGroup } from '@raketa-cms/raketa-mir'

import PageBuilder from './PageBuilder'
import TextInput from './forms/TextInput'
import TextArea from './forms/TextArea'
import RichText from './forms/RichText'
import SelectMenu from './forms/SelectMenu'
import ImagePicker from './pickers/ImagePicker/ImagePicker'
import ImageInput from './pickers/ImagePicker/ImageInput'
import Dialog from './dialogs/Dialog'
import Img from './lib/Image'
import List from './List'
import Container from './Container'
import EmbeddedVideo from './EmbeddedVideo'
import MediaManager from './MediaManager'
import ListInput from './ListInput'
import imageSrc from './helpers/imageSrc'
import Button from './forms/Button'
import ButtonSettings from './forms/ButtonSettings'
import LinkSettings from './forms/LinkSettings'
import Link from './lib/Link'
import BuilderContext from './contexts/BuilderContext'

const RaketaUIProvider = ({ theme, children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

RaketaUIProvider.defaultProps = {
  theme: theme
}

export {
  PageBuilder,
  TextInput,
  TextArea,
  RichText,
  SelectMenu,
  Dialog,
  Img,
  List,
  Container,
  EmbeddedVideo,
  MediaManager,
  ImagePicker,
  ImageInput,
  ListInput,
  imageSrc,
  Button,
  ButtonSettings,
  LinkSettings,
  Link,
  Label,
  theme,
  FormGroup,
  RaketaUIProvider,
  BuilderContext
}
