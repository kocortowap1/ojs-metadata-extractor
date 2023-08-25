const express = require('express');
const axios = require('axios')

const http = require('http');
const fs = require('fs');

const { ojsHTMLParser } = require('../../lib/htmlParser');
const { getJournalAccreditation } = require('../../lib/journalAcreditation');
const router = express.Router();


const agent = new http.Agent({
    rejectUnauthorized: false,

})

router.get('/', function (req, res, next) {
    res.redirect('/')
});
router.post('/', async function (req, res, next) {
    if (req.body.url) {
        const request = await axios.get(req.body.url, { httpAgent: agent, timeout: 30000 })
        let response = {}
        if (request['statusText'] !== 'OK') {
            response['alamat_web'] = url['url_jurnal']
            response['status']  = false
            response['message'] = 'Gagal mendapatkan metadata jurnal'
        } else {
            let parseResponse = ojsHTMLParser(request.data)
            response['status'] = true

            if(parseResponse['citation_issn']){
                const reqSINTA = await getJournalAccreditation(parseResponse['citation_issn'])
                // console.log(reqSINTA['data']['data'])
                response['history_akreditasi'] = reqSINTA['data']['data']
                // response['metadata']['citation_publisher'] = reqSINTA['data']['data'][0]['publisher'] 
            }
            response['metadata'] = ojsHTMLParser(request.data)
        }
        console.log(response)
        res.send(response)
    } else {
        res.send({ status: false, message: 'Invalid Parameters' })
    }
})

module.exports = router;