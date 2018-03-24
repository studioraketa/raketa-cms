const serialize = (params) => Object.keys(params)
  .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
  .join('&');

const get = (url, params = {}, opts = {}) => fetch(`${url}?${serialize(params)}`, opts);
const patch = (url, params = {}, opts = {}) => fetch(url, Object.assign({ method: 'PATCH', credentials: 'same-origin', body: JSON.stringify(params) }, opts))
const post = (url, params = {}, opts = {}) => fetch(url, Object.assign({ method: 'POST', credentials: 'same-origin', body: JSON.stringify(params) }, opts))
const del = (url, params = {}, opts = {}) => fetch(url, Object.assign({ method: 'DELETE', credentials: 'same-origin', body: JSON.stringify(params) }, opts))

export default class MediaManager {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  findAll(callback, params = {}) {
    get(`${this.baseUrl}images`, params).then(r => r.json()).then(images => callback(images));
  }

  uploadFile(file, callback) {
    const body = new FormData();
    body.append('image[asset]', file);

    post(`${this.baseUrl}images`, {}, { body })
      .then(r => r.json())
      .then(image => callback(image));
  }

  update(image, params, callback) {
    patch(`${this.baseUrl}images/${image.id}`, { image: params }, { headers: { 'content-type': 'application/json' } })
      .then(r => r.json())
      .then(image => callback(image));
  }

  destroy(image, callback) {
    del(`${this.baseUrl}images/${image.id}`, {}, { headers: { 'content-type': 'application/json' } })
      .then(r => r.json())
      .then(image => callback(image));
  }
}
