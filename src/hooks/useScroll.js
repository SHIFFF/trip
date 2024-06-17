import { onMounted, onUnmounted, ref } from "vue"
import { throttle } from 'underscore';


export default function useScroll(){
    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)

    // 监听滚动的执行次数太高了，需要节流（规定时间内只执行一次）
    const scrollListenerHandler = throttle(() => {
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
      clientHeight.value = document.documentElement.clientHeight
    //  console.log("-----------");
     if(clientHeight.value + scrollTop.value >= scrollHeight.value){
       console.log("滚动到底部了")
       isReachBottom.value = true
     }
   }, 100)
      
      // 挂载的时候进行监听
      onMounted(() => {
        window.addEventListener("scroll", scrollListenerHandler)
      }),
      
      // 卸载，离开页面，要去除监听
      onUnmounted(() => {
        window.removeEventListener("scroll", scrollListenerHandler)
      })

    // 以对象的形式返回，可以返回多个ref对象，并且可以通过解构来拿到这些值
    return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}