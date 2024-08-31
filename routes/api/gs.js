const express = require('express');
const { GSHTMLparser, GSDetailHTMLParser } = require('../../lib/htmlParser');
const axios = require('axios').default
const router = express.Router();


router.get('/:id?', async (req, res, next) => {
    if(!req.params.id) {
        res.json({status: false, message: 'GS ID required'})
    }else{
        
        let gsurl = `https://scholar.google.co.id/citations?hl=id&user=${req.params.id}&view_op=list_works&sortby=pubdate&cstart=1&pagesize=200z`
        const fetchGS = await axios.get(gsurl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
            }
        })
        const gsParser = GSHTMLparser(fetchGS.data)
        let details = []
        for (const obArticle of gsParser) {
    
            const fetchGSDetail = await axios.get(`https://scholar.google.co.id${obArticle.link}`, {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
                }
            })
            //     console.log(obArticle.link)
            const gsDetail = GSDetailHTMLParser(fetchGSDetail.data)
            details.push(gsDetail)
        }
        res.json(details)
    }
    // res.end()
})

module.exports = router