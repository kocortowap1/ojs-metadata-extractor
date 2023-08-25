const axios = require('axios')

const getJournalAccreditation = async function (issn) {
    try {
        let newISSN = issn?.split('-').join('')
        const req = await axios.get(`https://arjuna-api-zmltmhkk4a-et.a.run.app/api/frontpage/getJurnalList?page=1&row=5&search=${newISSN}&order=asc`)

        if (req['statusText'] !== 'OK' && req.data['status']) {
            return { status: false, message: 'Error Request' }
        } else {
            if (req.data['data']) {
                return { status: true, data: req.data['data'] }
            } else {
                return { status: false, message: 'Akreditasi Jurnal tidak ditemukan di Database Arjuna' }
            }
        }
    } catch (error) {
        return { status: false, message: error }
    }
}
const getJournalAccreditationDetail = async function (id_identitas_jurnal) {
    const { status, data } = await axios.get(`https://arjuna-api-zmltmhkk4a-et.a.run.app/api/frontpage/getJurnalProgres/${id_identitas_jurnal}`)
    if (data['data']['data']) {
        return data['data']['data']
    } else {
        return { status: false, message: 'Gagal mendapatkan detail history akreditasi jurnal' }
    }
}
const getJournalIndexByIssn = async function(url){
    const {status,data} = await axios.get(url)
    if (data['status']) {
        return data['data']
    } else {
        return { status: false, message: 'Gagal mendapatkan URL Index jurnal' }
    }
}
module.exports = {
    getJournalAccreditation,
    getJournalAccreditationDetail,
    getJournalIndexByIssn
}