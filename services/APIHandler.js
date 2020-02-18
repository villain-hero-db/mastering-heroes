const axios = require("axios")
class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.axiosApp = axios.create({
      baseURL: this.BASE_URL
    })
  }

  getHeroDetails(id) {
    return this.axiosApp.get(id)
      .then(response => response.data)
      .catch(err => console.log('El error al coger los detalles del heroes es:', err))
  }

  


}

module.exports = APIHandler