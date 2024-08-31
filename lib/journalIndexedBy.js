const axios = require('axios')
const { garudaHTMLParser } = require('./htmlParser')
const getJournalIndexByIssn = async function (url, indexedBy) {
    const { status, data } = await axios.get(url)
    if (data['status']) {
        return { status: true, url: data['data'], indexed_by: indexedBy }
    } else {
        return { status: false, message: 'Gagal mendapatkan URL Index jurnal' }
    }
}
const getJournalIndexByDoi = async function (doi, indexedBy) {
    let preparedURL = new URL(`https://garuda.kemdikbud.go.id/documents`)
    if (indexedBy = 'Garuda') {
        preparedURL = new URL(`https://garuda.kemdikbud.go.id/documents`)
        preparedURL.searchParams.set('q', doi)
        preparedURL.searchParams.set('select', 'doi')
        // console.log(`===GARUDA====`)
        // console.log(preparedURL)
    } else if (indexedBy = 'DOAJ') {
        preparedURL = new URL(`https://doaj.org/query/article/_search`)
        preparedURL.searchParams.set('ref', 'public_article')
        preparedURL.searchParams.set('callback', `jQuery3410992926451359621_${Date.now()}`)
        preparedURL.searchParams.set('callback', `jQuery3410992926451359621_${Date.now()}`)
        const sourcePayload = JSON.stringify({
            "query": { "query_string": { "query": doi, "default_operator": "AND", "default_field": "bibjson.identifier.id" } }, "size": 50, "sort": [{ "created_date": { "order": "desc" } }], "aggs": { "subject": { "terms": { "field": "index.schema_codes_tree.exact", "size": 9999, "order": { "_count": "desc" } } }, "year_published": { "date_histogram": { "field": "index.date", "interval": "year" } } }, "track_total_hits": true
        })
        preparedURL.searchParams.set('source', sourcePayload)
        preparedURL.searchParams.set('_', Date.now())
        // console.log(`===DOAJ====`)
        // console.log(preparedURL)


    } else {
        return { status: false, message: `Pencarian melalui indexing ${indexedBy} belum didukung` }
    }

    const { status, data } = await axios.get(preparedURL.href)
    if (status) {
        const parsedHTML = garudaHTMLParser(data)
        parsedHTML['url_index'] = `${preparedURL.origin}${parsedHTML['url_index']}`
        return { status: true, ...parsedHTML, indexed_by: indexedBy }
    } else {
        return { status: false, message: 'Gagal mendapatkan URL Index jurnal' }
    }
}

module.exports = {
    getJournalIndexByIssn,
    getJournalIndexByDoi
}