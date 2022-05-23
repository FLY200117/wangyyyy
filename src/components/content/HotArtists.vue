<template>
    <div class="HotArtist">
        <div class="title">
            <p>入驻歌手</p>
            <a href="">查看全部 ></a>
        </div>
        <div class="content">
            <div class="artist-card" v-for="(item,index) in ArtistArray.result" :key="index">
                <img :src="item.img1v1Url" alt="">
                <div class="artist-info">
                    <div class="artist-name">{{item.name}}</div>
                    <div class="artist-alias">{{item.alias[0]}}</div>
                </div>
            </div>
        </div>
        <div class="btn">
            <a href="">申请成为网易音乐人</a>
        </div>
    </div>
</template>

<script>
import { getHotArtists } from 'network/index'
import { onMounted, reactive } from '@vue/runtime-core'

export default {
    name: "HotArtist",
    setup(){
        const ArtistArray = reactive({result:[]})

        onMounted(async() => {
            let res = await getHotArtists()
            ArtistArray.result = res.data.artists
            console.log(ArtistArray)
        })
        return {
            ArtistArray
        }
    }
}
</script>

<style scoped>
    .HotArtist{
        margin-top: 15px;
        background-color: #fff;
    }
    .title{
        height: 25px;
        margin: 0 20px;
        border-bottom: 1px solid #ccc;
        color: #333;
        display: flex;
        justify-content: space-between;

        font-size: 12px;
    }
    .content{
        height: 360px;
        margin: 6px 0 14px 20px;
    }
    .artist-card{
        margin-top: 12px;
        height: 60px;
        width: 250px;
        background-color:#f5f5f5;
        border: 1px solid #e9e9e9;
        display: flex;
    }
    .artist-card img{
        
        width: 60px;
    }
    .artist-info{
        margin-left: 20px;
        color: #333;
    }
    .artist-name{
        line-height: 30px;
    }
    .artist-alias{
        line-height: 20px;
        color: #666;
        font-size: 12px;
    }
    .btn{
        width: 298px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .btn a{
        width: 250px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        color: #333;
        background-color: rgba(234, 230, 230, 0.179);
    }
    .btn a:hover{
        background-color: white;
    }
</style>