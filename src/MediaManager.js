import jQuery from 'jquery';

export default class MediaManager {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  findAll(callback, params = {}) {
    jQuery.get(`${this.baseUrl}images`, params, (images) => {
      callback(images);
    });
  }

  uploadFile(file, callback) {
    const formData = new FormData();
    formData.append('image[asset]', file);

    jQuery.ajax({
      url: `${this.baseUrl}images`,
      data: formData,
      dataType: 'json',
      type: 'POST',
      processData: false,
      contentType: false,
      success: (image) => {
        callback(image);
      },
    });
  }

  update(image, params, callback) {
    jQuery.ajax({
      url: `${this.baseUrl}images/${image.id}`,
      dataType: 'json',
      type: 'PATCH',
      data: { image: params },
      success: (response) => {
        callback(response);
      },
    });
  }

  destroy(image, callback) {
    jQuery.ajax({
      url: `${this.baseUrl}images/${image.id}`,
      dataType: 'json',
      type: 'DELETE',
      processData: false,
      contentType: false,
      success: (response) => {
        callback(response);
      },
    });
  }
}
