export default (className, containerSettings) => {
  const classes = [className]
  if (
    containerSettings &&
    containerSettings.spacing !== 'none' &&
    containerSettings.spacing !== undefined
  )
    classes.push(`spacing-${containerSettings.spacing}`)
  if (
    containerSettings &&
    containerSettings.theme !== 'none' &&
    containerSettings.theme !== undefined
  )
    classes.push(`${containerSettings.theme}-bg`)

  return classes.join(' ')
}
