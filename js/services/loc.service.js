export const locService = {
    getLocs,
    addLoc
}
const STORAGE_KEY = 'locationsDB'

const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function addLoc(name, lat, lng, zoom) {
    const newLoc = _createLoc(name, lat, lng, zoom)
    locs.push(newLoc)
    post(STORAGE_KEY, newLoc)
}

function _createLoc(name, lat, lng, zoom) {
    return {
        name,
        lat,
        lng,
        zoom,
    }
}
