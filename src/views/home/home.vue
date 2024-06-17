<template>
    <div class="home">

       <homeNavBar/>

       <div class="banner">
        <img src="@/assets/img/home/banner.webp" alt="">
       </div>

       <homeSearchBox/>
       <homeCategories/>

       <div class="search-bar" v-if="isShowSearchBar">
          <search-bar/>
       </div>
       <homeContent/>
       <!-- <button @click="moreBtnClick">加载更多</button> -->

    </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue';
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from "./cpns/home-search-box.vue"
import useHomeStore from '@/stores/modules/home'
import HomeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue';
import useScroll from '@/hooks/useScroll'
import SearchBar from '@/components/search-bar/search-bar.vue';
// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()

//滚动加载数据
// 从useScroll中拿到是否加载到底部isReachBottom变量
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if(newValue){
    // 如果返回的是promise就可以使用.then 
    // 这里的逻辑是先拿到了数据之后才设置isReachBottom为false
    homeStore.fetchHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

//搜索框显示控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })
//定义的可响应式数据，依赖另外一个可响应式的数据，那么可以用computed函数
// 计算属性会自动监听响应式对象的值的变化，而且计算属性有缓存，不会频繁调用
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 350
})

</script>

<style lang="less" scoped>

.home {
  // height: 100vh;
  // overflow-y: auto;
  // box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>