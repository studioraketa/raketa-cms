import React from 'react'

const Img = ({
  src,
  variant,
  className,
  onLoad,
  alt = null,
  title = null,
  ...props
}) => {
  if (!src) {
    console.warn(
      `WARNING: Image with src null or undefined will not be rendered: ${variant} ${
        className || ''
      }`
    )
    return null
  }

  const imgAlt = alt !== null ? alt : src.alt
  const imgTitle = title !== null ? title : ''

  if (typeof src === 'object' && !('name' in src))
    console.warn(`WARNING: Image with empty {}: ${variant} ${className || ''}`)

  if (
    typeof src === 'object' &&
    'name' in src &&
    (src.name.includes('.svg') || src.name.includes('.gif'))
  )
    return (
      <img
        src={src.urls.original}
        alt={imgAlt !== null ? imgAlt : src.name}
        className={className}
        onLoad={onLoad}
        title={imgTitle}
        {...props}
      />
    )
  if (typeof src === 'object' && 'name' in src)
    return (
      <img
        src={src.urls[variant]}
        alt={imgAlt !== null ? imgAlt : src.name}
        className={className}
        onLoad={onLoad}
        title={imgTitle}
        {...props}
      />
    )
  if (typeof src === 'string')
    return (
      <img
        src={src}
        alt={src}
        className={className}
        onLoad={onLoad}
        title={imgTitle}
        {...props}
      />
    )

  return null
}

export default Img
