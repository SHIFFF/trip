<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex"
         active-color="var(--primary-color)" 
         route>
            <template v-for="(item, index) in tabbarData" :key="index">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
                
            </template>
            
        </van-tabbar>
    </div>
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar.js'
import { getAssetURL } from "@/utils/load_assets_img.js"
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'


// 监听路由改变时，对应的
const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if(index === -1 ) return
    currentIndex.value = index
})

</script>

<style lang="less" scoped>

.tab-bar {

    img {
        height: 26px;
    }

}

</style>