import { defineStore } from 'pinia'
import { getHomeSuggests, getHomeCategories, getHouseList } from '@/services';

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houselist: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouseListData() {
            const res = await getHouseList(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore