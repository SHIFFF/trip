<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location">
        <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
        <div class="position" @click="positionClick">
            <span class="text">我的位置</span>
            <img src="@/assets/img/home/icon_location.png" alt="">
        </div>
       </div>

       <!-- 日期范围 -->
       <div class="section date-range" @click="showCalendar = true">
        <div class="start">
            <div class="date">
                <span class="tip">入住</span>
                <span class="time">{{ startDateStr }}</span>
            </div>
            <div class="stay">共{{ stayCount }}晚</div>
        </div>
        <div class="end">
            <div class="date">
                <span class="tip">离店</span>
                <span class="time">{{ endDateStr }}</span>
            </div>        
        </div>
       </div>

       <!-- 日历 -->
       <van-calendar 
       v-model:show="showCalendar"
       type="range"
       :round="false"
       @confirm="onConfirm"
       color="var(--primary-color)"
       :show-confirm="false"
       />

      <!-- 价格/人数选择 -->
       <div class="section price-counter bottom-gray-line">
        <div class="start">价格不限</div>
        <div class="end">人数不限</div>
       </div>

       <!-- 关键字 -->
       <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>


       <!-- 热门推荐 -->
       <!-- http://123.207.32.32:1888/api/home/hotSuggests -->
        <div class="section hot-suggests">
          <template v-for="(item, index) in hotSuggests" :key="index">
            <div class="item"
            :style="{ color: item.tagText.color, background: item.tagText.background.color}"
            >
              {{ item.tagText.text }}
            </div>
          </template>
        </div>

        <!-- 搜索按钮 -->
         <div class="section search-btn">
          <div class="btn" @click="searchBtnClick">开始搜索</div>
         </div>

    </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import useHomeStore from '@/stores/modules/home'
import { formatMonthDay, getDiffDays } from '@/utils/format_date';
  

const router = useRouter()

//位置/城市
const cityClick = () => {
    router.push('/city');
}

const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log("获取位置成功", res);
    }, err =>{
        console.log("获取位置失败", err);
    })
}

// 当前城市
const cityStore = useCityStore()
const { currentCity }  = storeToRefs(cityStore)


// 日期范围的处理
// 动态显示当前日期和当前日期的后一天
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)


// 获取默认值，并用computed监听
const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const  stayCount = ref(getDiffDays(startDate.value, endDate.value))


//通过日历选择入店离店结束日期
const showCalendar = ref(false);
const onConfirm = function(value){
  // 设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  stayCount.value = getDiffDays(selectStartDate, selectEndDate);
  //隐藏日历
  showCalendar.value = false;
}

// 热门推荐
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 开始搜索
const searchBtnClick = () => {
  // 转跳到search页面并传送一些参数
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}

</script>


<style lang="less" scoped>

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }


    .position {
        width: 74px;
        display: flex;
        align-items: center;

        .text {
            font-size: 12px;
            height: 12px;
            color: #666;
        }
        
        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }

    }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 3.2vw;
      color: #999;
    }

    .time {
      margin-top: 0.8vw;
      color: #333;
      font-size: 4vw;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;
  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.search-box {
  --van-calendar-popup-height:100%
}

.price-counter {
  .start {
    border-right: 1px solid  var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}


</style>