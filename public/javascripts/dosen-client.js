
document.addEventListener('DOMContentLoaded', async () => {
    //inisiasi loading pertama kali
    await initSister()
    console.log(localStorage.getItem('dosenList'))
})
const sdmList = JSON.parse(localStorage.getItem('sdm'))
const tokenSister = sessionStorage.getItem('sister-token')

function saveToLS(data, keyname) {
    const d = JSON.stringify(data)
    return localStorage.setItem(keyname, d)
}

async function loadDataApi(path) {
    const request = await fetch(path)
    const data = await request.json()
    return data;
}
function checkToken() {
    const sesi = sessionStorage.getItem('sister-token')
    if (!sesi) {
        return false
    } else {
        const token = JSON.parse(atob(sesi.split('.')[1]))
        const expAt = token['exp']

        return Math.floor(Date.now() / 1000) < expAt
    }
}

async function initSister() {
    const check = await checkToken()
    console.log(check)
    const elStatus = document.getElementById('status-sister')
    if (check) {
        elStatus.className = 'badge bg-success'
        elStatus.innerHTML = 'Terkoneksi ke SISTER'
    } else {
        const token = await callSisterLogin()
        // console.log(token)
        if (token['status']) {
            sessionStorage.setItem('sister-token', token['token'])
            window.location.reload()
        }
    }
}

async function callSisterLogin() {
    const req = await fetch('/api/dosen/sister-login')
    const res = await req.json()
    return res
}

async function callSisterData(path, id = null) {
    const req = await fetch(`/api/dosen/${path}?id_sdm=${id}`, { 
        method: 'POST', 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ token: sessionStorage.getItem('sister-token') }) 
    })
    const res = await req.json()
    return res
}
async function callDosen() {
    const inLocal = localStorage.getItem('dosenList')
    if (!inLocal) {
        const reqDosen = await fetch(`/api/dosen/dosen-sister`, { 
            method: 'POST', 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ token: sessionStorage.getItem('sister-token') }) 
        })
        console.log(reqDosen)
        const resDosen = await reqDosen.json()
        if (resDosen['status']) {
            localStorage.setItem('dosenList', JSON.stringify(resDosen['data']))
            parseAsTable(resDosen['data'])
        }
    } else {
        parseAsTable(JSON.parse(inLocal))

    }
}
function parseAsTable(data = []) {
    const bodySdm = document.getElementById('table-sdm-body')
    let tableBody = ''
    data.forEach(el => {
        tableBody += '<tr>'
        tableBody += `<td>
                        <div class="btn-group">
                            <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-printer"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/karil?id_sdm=${el['id_sdm']}">Karya Ilmiah</a></li>
                                <li><a class="dropdown-item" href="/pakta?id_sdm=${el['id_sdm']}">Pakta Integritas</a></li>
                                <li><a class="dropdown-item" href="/ba?id_sdm=${el['id_sdm']}">Berita Acara</a></li>
                            </ul>
                        </div>
        </td>`
        tableBody += `<td>${el['nidn']}</td>`
        tableBody += `<td>${el['nama_sdm']}</td>`
        tableBody += `<td>${el['nama_status_pegawai']}</td>`
        tableBody += '</tr>'
    })
    bodySdm.innerHTML = tableBody
}
function hideEl(el) {
    const elToHide = document.getElementById(el)
    elToHide.style.visibility = 'hidden';
    elToHide.style.display = 'none'
}