import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
// import { storageService } from './services/async-storage.service.js'


window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos



function onInit() {
    mapService.initMap()
        .then((gMap) => {
            console.log('Map is ready')
            gMap.addListener('click', onAddLoc)
        })
        .catch(() => console.log('Error: cannot init map'))
    renderLocations()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

// function onGetLocs() {
//     locService.getLocs()
//         .then(locs => {
//             console.log('Locations:', locs)
//             document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
//         })
// }

function renderLocations() {
    locService.getLocs()
        .then(locs => {
            // console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
            let strHtml = locs.map(loc => {
                return `<div class="loc">
                    <h3 class="locName">${loc.name}</h3>
                    <span>lat:${loc.lat}  lng:${loc.lng}</span>
                    <button class="btn" onclick="onPanTo(${loc.id})">Go</button>
                    <button class="btn" onclick="onRemoveLoc(${loc.id})">X</button>
                    </div>`
            })
            document.querySelector('.locs').innerHTML = strHtml
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

//GO BUTTON
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onAddLoc(ev) {
    const lat = ev.latLng.lat()
    const lng = ev.latLng.lng()
    mapService.panTo(lat, lng)
    const name = prompt('Place name?', 'Place 1')
    if (!name) return
    locService.addLoc(name, lat, lng)
    mapService.addMarker({ lat: lat, lng: lng })
}

