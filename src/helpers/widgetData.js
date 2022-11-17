const title = (widget) => {
  return widget.Config.title
}

const adminFields = (widget) => {
  return widget.Admin
}

const category = (widget) => {
  return widget.Config.category
}

const deprecated = (widget) => {
  return widget.Config.deprecated
}

const primaryField = (widget) => {
  return widget.Config.primaryField
}

const defaults = (widget) => {
  return widget.Defaults
}

export default {
  title,
  adminFields,
  category,
  deprecated,
  defaults,
  primaryField
}
