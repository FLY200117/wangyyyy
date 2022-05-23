<template>
  <div class="homeswiper">
    <div class="carousel">
        <el-carousel :interval="5000">
            <el-carousel-item v-for="item in state.musicList" :key="item">
                <img :src="item.imageUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
  </div>
</template>

<script>
import { getBanner } from 'network/index.js'
import { onMounted, reactive } from 'vue'

export default {
    name: 'HomeSwiper',
    setup(){
        let state = reactive({musicList:[]})
         onMounted(async() => {
            let res = await getBanner(0)
            state.musicList = res.data.banners
        })

        return {
            state
        }
    }
}
</script>

<style scoped>
    .homeswiper{
        height: 300px;
        background-color: antiquewhite;
        display: flex;
        align-content: center;
        justify-content: center;
    }
    .carousel{
        width: 800px;
    }
    .carousel img{
        height: 100%;
        width:100%;
    }
</style>