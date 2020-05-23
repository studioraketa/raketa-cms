const add = (items, item) => [...items, item]
const addAt = (items, item, idx) => console.log('TODO: Implement me')
const removeByIndex = (items, idx) => [
  ...items.slice(0, idx),
  ...items.slice(idx + 1)
]
const removeById = (items, id, idField = 'id') =>
  removeByIndex(
    items,
    items.findIndex((current) => current[idField] === id)
  )
const updateFieldByIndex = (items, field, value, idx) => [
  ...items.slice(0, idx),
  Object.assign({}, items[idx], { [field]: value }),
  ...items.slice(idx + 1)
]
const updateFieldById = (items, field, value, id, idField = 'id') =>
  updateFieldByIndex(
    items,
    field,
    value,
    items.findIndex((current) => current[idField] === id)
  )
const reorder = (items, order) => order.map((idx) => items[idx])

const randomId = () => Math.floor(Math.random() * (999 - 100 + 1)) + 100
const randomString = (length) => Math.random().toString(36).substring(length)

export {
  add,
  addAt,
  removeByIndex,
  removeById,
  updateFieldByIndex,
  updateFieldById,
  reorder,
  randomId,
  randomString
}
