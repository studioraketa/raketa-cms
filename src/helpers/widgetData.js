const title = (widget) => {
  if (widget.Config) {
    return widget.Config.title
  } else {
    return widget.title
  }
}

const adminFields = (widget) => {
  if (widget.Admin) {
    return widget.Admin
  } else {
    return widget.adminFields
  }
}

const category = (widget) => {
  if (widget.Config) {
    return widget.Config.category
  } else {
    return widget.category
  }
}

const deprecated = (widget) => {
  if (widget.Config) {
    return widget.Config.deprecated
  } else {
    return widget.deprecated
  }
}

const primaryField = (widget) => {
  if (widget.Config) {
    return widget.Config.primaryField
  } else {
    return widget.primaryField
  }
}

const defaults = (widget) => {
  if (widget.Defaults) {
    return widget.Defaults
  } else {
    return widget.defaults
  }
}

export default {
  title,
  adminFields,
  category,
  deprecated,
  defaults,
  primaryField
}
