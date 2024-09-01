const express = require('express')
const router = express.Router()

router.get('/',async(req, res, next) => {
    if(req.query['id_sdm']){
        res.render('pages/karya_ilmiah_detail')
    }else{
        req.render('pages/karya_ilmiah')
    }
})


module.exports = router