const express = require('express')
const { SisterData, SisterLogin } = require('../../lib/sister-api')
const router = express.Router()

router.get('/', async (req, res, next) => {
    // const { params, body, query } = req
    // if (!body['token']) {
    //     res.status(401).json({ status: false, message: 'Token tequired' })
    // } else if (!params.path) {
    //     res.status(400).json({ status: false, message: 'Path required' })
    // } else if (!query['id_sdm']) {
    //     res.status(400).json({ status: false, message: 'ID Dosen required' })
    // } else {
    //     const data = await SisterData(body['token'], params.path)
    //     res.json(data)
    // }

    res.json({ 'dosen': 'ok' })
})
router.get('/sister-login', async (req, res, next) => {
    const login = await SisterLogin()
    res.json(login)
})
router.post('/dosen-sister', async (req, res, next) => {
    if (req.body['token']) {
        const sdm = await SisterData(req.body['token'], '/referensi/sdm')
        // console.log(sdm)
        res.json({ status: true, data: sdm['data'] })
    } else {
        res.status(401).json({ status: false, message: 'Token tidak ditemukan', data: null })
    }
})
router.post('/:path?', async (req, res, next) => {
    const { params, body, query } = req
    if (!body['token']) {
        res.status(401).json({ status: false, message: 'Token tequired' })
    } else if (!params.path) {
        res.status(400).json({ status: false, message: 'Path required' })
    } else if (!query['id_sdm']) {
        res.status(400).json({ status: false, message: 'ID Dosen required' })
    } else {
        const data = await SisterData(body['token'], params.path)
        res.json(data)
    }

    // res.json('dosen', {layout : false})
})


// router.get('')


module.exports = router 