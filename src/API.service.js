import axios from 'axios'

axios.defaults.baseURL = 'https://www.iqi1.com/'

const apiService = {
  getRooms () {
    return new Promise((resolve) => {
      axios.get('api/app/doll/room')
        .then(response => {
          resolve(response.data)
          console.log('response', response)
          console.log('response.data', response.data)
        })
    })
  }
}

export default apiService
