if (!window.Promise) {
  window.Promise = Promise
}
import 'whatwg-fetch'

const Api = {
  get: function(url) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'GET',
      headers: this._setHeaders()
    })
    .then(this._parseJSON)
    .then(this._checkStatus)
    .then(this._getData)
  },

  post: function(url, data) {
    debugger
    return fetch(`${this._baseUrl}${url}`, {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._parseJSON)
    .then(this._checkStatus)
    .then(this._getData)
  },

  put: function(url, data) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'PUT',
      headers: this._setHeaders(),
      body: JSON.stringify(data)
    })
    .then(this._parseJSON)
    .then(this._checkStatus)
    .then(this._getData)
  },

  delete: function(url) {
    return fetch(`${this._baseUrl}${url}`, {
      method: 'DELETE',
      headers: this._setHeaders()
    })
    .then(this._parseJSON)
    .then(this._checkStatus)
    .then(this._getData)
  },

  _baseUrl: ($('body').data('api-url') || ""),

  _checkStatus: function(json) {
    if (json.status >= 200 && json.status < 300) {
      return json
    } else {
      throw json
    }
  },

  _setHeaders: function() {
    return new Headers({
      'Content-Type': 'application/json'
    })
  },

  _parseJSON: function(response) {
    return response.json()
  },

  _getData: function(json) {
    return json.data
  }
}
export default Api
