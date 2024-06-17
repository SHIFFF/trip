<template>
    <div class="city-group">
        <van-index-bar :sticky="false" :index-list="indexList">
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city" @click="cityClick(city)">{{ city.cityName }}</div>
                </template> 
            </div>     
            <template v-for="(group,index) in groupData.cities" :key="index">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="cityClick(city)"/> 
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<script setup>

import useCityStore from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router';


//组件通信之父传子，使用props来声明传输的数据，可以定义默认值
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})

//自定义动态的索引
const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list;
})



//监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
    //选中当前城市
    cityStore.currentCity = city

    //子传父，1.事件总线eventbus.emit 只能传输到某一个，或指定的多个组件，父组件需要绑定
    //2.把数据存放在store里，组件间可以共享数据

    //放回上一级
    router.back()
}


</script>


<style lang="less" scoped>


.city-group {
    
    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        padding: 10px;
        padding-right: 25px;

        .city {
            width: 70px;
            height: 28px;
            border-radius: 14px;
            background-color: #fff4ec;
            font-size: 12px;
            color: #000;
            text-align: center;
            line-height: 28px;
            margin: 6px;
        }
    }
}

</style>