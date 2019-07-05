import axios from 'axios'

const BASE_URI = 'http://localhost:21523'

const headers = {
  Accept: 'application/json',
}

export const startBot = () =>
  axios.post(`${BASE_URI}/bot`, {headers}).then(res => res.data.qrcode)

export const currentUser = () =>
  axios.get(`${BASE_URI}/bot`, {headers}).then(res => res.data.name)

export const stopBot = () => axios.delete(`${BASE_URI}/bot`, {headers})
