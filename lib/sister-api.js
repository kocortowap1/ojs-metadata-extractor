const { default: axios } = require("axios")
const SISTER_REQUEST = axios.create({
    baseURL: 'https://sister-api.kemdikbud.go.id/ws.php/1.0',
    headers: {
        "Content-Type": 'application/json'
    }
})
// const SISTER_URL = 'https://sister-api.kemdikbud.go.id/ws.php/1.0'
async function SisterLogin() {
    const req = await SISTER_REQUEST.post('/authorize', { "username": "eS0W1EHo6bDow+o8pjyQXqroOLYyT6ZO9MbRvkAfrMI=", "password": "kiRv2jQjw+qjSItP8W9tb4ENRBuXC03S0SGM3lGpoypN8wMevNMjDb3U+dQ6HhFo", "id_pengguna": "9b1b3668-b438-4c48-a6b7-559b1e4c615c" })
    if (req.status) {
        return { status: true, token: await req.data['token'] }
    } else {
        return { status: false, message: req.statusText }
    }
}
async function SisterData(token = '', path = '', method = 'GET', data = {}) {
    console.log(`<= console from sister-lib =>`)
    console.log(`${token}`)
    if (!token || !path) {
        return { status: false, message: 'Invalid Parameter' }
    } else {
        SISTER_REQUEST.defaults.headers.common['Authorization'] = `Bearer ${token}`
        let body = null
        if (Object.entries(data).length) {
            body = data
        }
        const req = await SISTER_REQUEST.request({ url: path, method: method })
        if (req.status) {
            return { status: true, data: req.data }
        } else {
            return { status: false, message: req.statusText }
        }

    }
}
async function SisterPost(token = '', path = '', method = 'GET', data = {}) {
    console.log(`<= console from sister-lib =>`)
    console.log(`${token}`)
    if (!token || !path) {
        return { status: false, message: 'Invalid Parameter' }
    } else {
        SISTER_REQUEST.defaults.headers.common['Authorization'] = `Bearer ${token}`
       
        const req = await SISTER_REQUEST.request({ url: path, method: method, data:data })
        if (req.status) {
            return { status: true, data: req.data }
        } else {
            return { status: false, message: req.statusText }
        }

    }
}
module.exports = {
    SisterLogin,
    SisterData,
    SisterPost
}