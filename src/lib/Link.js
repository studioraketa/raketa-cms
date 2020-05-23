import React from 'react'

const Link = ({ settings, children, className }) => {
  const { id, label, link, target, rel } = settings

  return (
    <a
      href={link}
      className={[settings.className, className].join(' ')}
      id={id || ''}
      target={target}
      rel={rel}
    >
      {children || settings.label}
    </a>
  )
}

export default Link
