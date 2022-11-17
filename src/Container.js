import React from 'react'

const Container = ({ settings, className, children }) => {
  const { containerID, ...restSettings } = settings

  const cssClasses = [...Object.values(restSettings), className].join(' ')

  return (
    <div id={containerID} className={cssClasses}>
      {children}
    </div>
  )
}

export default Container
