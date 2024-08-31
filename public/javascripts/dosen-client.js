const sdmList = JSON.parse(localStorage.getItem('sdm'))

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

async function initSister(e) {
    const check = await checkToken()
    if(check){
        e.target.className = 'badge bg-success'
        e.target.innerHTML = 'Terkoneksi ke SISTER'
    }else{
        const token = await callSisterLogin()
        // console.log(token)
        if(token['status']){
            sessionStorage.setItem('sister-token', token['token'])
            initSister()
        }
    }
}

async function callSisterLogin() {
    const req = await fetch('/api/dosen/sister-login')
    const res = await req.json()
    return res
}