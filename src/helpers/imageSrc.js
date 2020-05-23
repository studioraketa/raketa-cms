const imgageSrc = (src, variant) => {
  if (typeof src === 'object' && !('name' in src))
    console.warn(`WARNING: Image with empty {}: ${variant}`)

  if (
    typeof src === 'object' &&
    'name' in src &&
    (src.name.includes('.svg') || src.name.includes('.gif'))
  )
    return src.urls.original
  if (typeof src === 'object' && 'name' in src) return src.urls[variant]
  if (typeof src === 'string') return src

  return null
}

export default imgageSrc
