export default class MediaManager {
  constructor() {
    console.warn(
      'MediaManager is no longer part of @raketa-cms/raketa-cms. Please use @raketa-cms/raketa-image-input. '
    )
  }

  findAll(callback, params = {}) { }

  uploadFile(file, callback) { }

  update(image, params, callback) { }

  destroy(image, callback) { }
}
