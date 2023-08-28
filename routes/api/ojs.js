const express = require('express');
const axios = require('axios')

const http = require('http');
const fs = require('fs');

const { ojsHTMLParser } = require('../../lib/htmlParser');
const { getJournalAccreditation } = require('../../lib/journalAcreditation');
const { getJournalIndexByDoi } = require('../../lib/journalIndexedBy');
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
            response['indexed'] = []
            if(parseResponse['citation_doi']){
                const garudaIndex = await getJournalIndexByDoi(parseResponse['citation_doi'],'Garuda')
                if(garudaIndex['status']){
                    response['indexed'].push(garudaIndex)
                }
                // const DOAJIndex = await getJournalIndexByDoi(parseResponse['citation_doi'],'DOAJ')
                // if(DOAJIndex['status']){
                //     response['indexed'].push(DOAJIndex)
                // }
            }
            //request to ARJUNA
            if(parseResponse['citation_issn']){
                const reqSINTA = await getJournalAccreditation(parseResponse['citation_issn'])
                response['history_akreditasi'] = reqSINTA['data']['data']
            }
            response['metadata'] = ojsHTMLParser(request.data)
        }
        res.send(response)
    } else {
        res.send({ status: false, message: 'Invalid Parameters' })
    }
})

module.exports = router;