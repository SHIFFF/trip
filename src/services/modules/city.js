import hyRequets from '../request/index.js'

export function getCityAll(){
    return hyRequets.get({
        url: "/city/all"
    })
}