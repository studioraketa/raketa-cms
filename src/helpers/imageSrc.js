const imgageSrc = (src, variant) => {
  if (typeof src === 'object' && 'name' in src && (src.name.includes('.svg') || src.name.includes('.gif'))) return src.urls.original;
  if (typeof src === 'string') return src;
  if (typeof src === 'object' && 'name' in src) return src.urls[variant];

  return null;
};

export default imgageSrc;
