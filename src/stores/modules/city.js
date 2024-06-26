import { getCityAll } from '@/services';
import { defineStore } from 'pinia';

const useCityStore = defineStore("city", {
    state: () => ({
        //所有城市
        allCities: {},
        //当前选中的城市 
        currentCity: { 
            cityName:"广州"
        }
    }),
    actions: {
        async fetchAllCitiesData() {
            const res = await getCityAll()
            this.allCities = res.data
        }

    }
})

export default useCityStore