const express = require('express')
const { SisterData, SisterLogin } = require('../../lib/sister-api')
const router = express.Router()

router.get('/', async (req, res, next) => {
    res.json('dosen')
})
router.get('/sister-login', async(req, res, next) => {
    const login = await SisterLogin()
    res.json(login)
})
router.post('/dosen-sister', async (req, res, next) => {
    if (req.body['token']) {
        const sdm = await SisterData(req.body['token'], '/referensi/sdm')
        console.log(sdm)

    } else {
        res.status(401).json({ status: false, message: 'Token tidak ditemukan' })
    }
})


module.exports = router 