const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.render('components/sdmList', { extractScript: true })
})

module.exports = router