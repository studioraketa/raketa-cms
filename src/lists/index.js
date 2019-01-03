const add = (items, item) => [...items, item];
const addAt = (items, item, idx) => console.log('TODO: Implement me');
const removeByIndex = (items, idx) => [...items.slice(0, idx), ...items.slice(idx + 1)];
const removeById = (items, id) => console.log('TODO: Implement me');
const updateFieldByIndex = (items, field, value, idx) => [...items.slice(0, idx), Object.assign({}, items[idx], { [field]: value }), ...items.slice(idx + 1)];
const updateFieldById = (items, field, value, id) => console.log('TODO: Implement me');
const reorder = (items, order) => order.map(idx => items[idx]);

const randomId = () => Math.floor(Math.random() * ((999 - 100) + 1)) + 100;

export {
  add,
  addAt,
  removeByIndex,
  removeById,
  updateFieldByIndex,
  updateFieldById,
  reorder,
  randomId,
};
