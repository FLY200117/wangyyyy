<template>
    <div class="newalbum">
        <el-icon :size="20" class="icon"><ArrowLeftBold /></el-icon>
        <div class="album-swiper">
            <div class="album-item" v-for="(item,index) in AlbumArray.result" :key="index" ref="item">
                <div class="album-img" @click="GoToAlbum(item.albumId)">
                    <img :src="item.coverUrl" alt="">
                </div>
                <div class="album-name">{{item.albumName}}</div>
                <div class="album-author">{{item.artistName}}</div>
            </div>
        </div>
        <el-icon :size="20" class="icon"><ArrowRightBold /></el-icon>
    </div>
</template>

<script>
import { getAlbum } from 'network/index'
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: "NewAlbum",
    setup(){
        const ctx = getCurrentInstance()
        const Router = useRouter()
        let AlbumArray = reactive({result:[]})

        // 页面跳转
        const GoToAlbum = (id) => {
            console.log(id)
            Router.push({path: "/album",query:{Id:id}})
        }

        onMounted(async() => {
            let res = await getAlbum(10)
            AlbumArray.result = res.data.products
            console.log(AlbumArray)
        })

        return{
            AlbumArray,
            GoToAlbum,
        }
    }
}
</script>

<style scoped>
    .newalbum{
        margin-top: 10px;
        height: 200px;
        border: 1px solid #d8cbcb;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
    }
    .album-swiper{
        margin: 0;
        padding: 0;
        width: 648px;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
    }
    .album-item{
        display: inline-block;
        margin-top: 40px;
        margin-left: 11px;
        height: 140px;
        width: 118px;
        overflow: hidden; 
    }
    .album-img img{
        width: 118px;
        height: 109px;
    }
    .album-name{
        color: #000;
        font-size: 12px;
    }
    .album-author{
        font-size: 12px;
        color: #666;
    }
    .icon{
        color: #666;
    }
    .icon:hover{
        color: #000;
    }
</style>