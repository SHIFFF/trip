import hyRequest from '../request/index'

export function getHomeSuggests(){
    return hyRequest.get({ 
        url: "/home/hotSuggests"
    })
}

export function getHomeCategories(){
    return hyRequest.get({
        url: "/home/categories"
    })
}

// page不能写死成1，默认值可以写1
export function getHouseList(currentPage = 1) {
    return hyRequest.get({
        url: "/home/houselist",
        params: {
            page: currentPage
        }
    })
}