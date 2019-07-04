import axios from 'axios'

const BASE_URI = 'http://localhost:21523'

const headers = {
  Accept: 'application/json',
}

export const startBot = () =>
  axios.post(`${BASE_URI}/bot`, {headers}).then(res => res.data.qrcode)
