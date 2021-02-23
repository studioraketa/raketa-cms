const LOCAL_STORAGE_KEY = 'nextjs-raketa-cms-starter'

const loadPage = () => {
  if (process.browser) {
    const loadedPage = window.localStorage.getItem(LOCAL_STORAGE_KEY)

    return loadedPage ? JSON.parse(loadedPage) : { widgets: [] }
  } else {
    return { widgets: [] }
  }
}

const savePage = (page) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(page))
}

export { loadPage, savePage }
