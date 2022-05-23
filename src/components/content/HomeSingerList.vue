<template>
    <div class="homesingerlist">
        <div class="top">
            <img :src="ary.coverImgUrl" alt="">
            <div class="arylist">
                <div class="aryname">{{ary.name}}</div>
                <el-icon :size="25" class="icon"><VideoPlay /></el-icon>
            </div>
        </div>
        <div class="list">
            <div class="songitem" v-for="(item,index) in idAry" :key="index" @click="AddSong(item.id,item.al.name,item.al.picUrl,item.ar[0].name)"> 
                <div class="songindex">
                    <span>{{index+1}}</span>
                </div>
                <div class="songname">
                    <a href="">{{item.name}}</a>
                </div>
                <a href="">
                    <el-icon :size="20" class="icon" ><VideoPlay /></el-icon>
                </a>
            </div>
            <div></div>
        </div>
        <div class="more">
            <a href="">查看全部></a>
        </div>
    </div>
</template>

<script>

import { useStore } from 'vuex'
export default {
    name:"HomeSingerList",
    props: {
        ary: Object,
        idAry:Array,
    },
    setup(props){
        const store = useStore()
        // console.log(store.state.playlist)
        const AddSong = (id,name,picUrl,author) => { 
            let al = {
                id:id,
                name:name,
                author:author,
                picUrl:picUrl
            }
            store.commit('addPlaylist',al)
            store.state.Playing = true
            // console.log(al)
        }
        // console.log(props)

        return {
            AddSong
        }
    }
}
</script>

<style>
    .top{
        width: 230px;
        height: 120px;
        padding: 20px 0 0 19px;
        background-color: #f5f5f5;
        display: flex;
    }
    .top img{
        height: 80px;
        width: 80px;
    }
    .songitem{
        height: 30px;
    }
    .songitem:nth-child(2n){
        background-color: #f5f5f5;
    }
    .arylist{
        margin: 6px 0 0 10px;
        
    }
    .aryname{
        color: #000;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .icon{
        color: #9e9e9e;
    }
    .icon svg:hover{
        color: gray;
    }
    .songitem{
        height: 34px;
        display: flex;
        align-items: center;
    }
    .songitem a{
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .songindex{
        height: 100%;
        width: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .songname{
        width: 150px;
        height: 34px;
        display: flex;
        align-items: center;
    }
    .more{
        font-size: 14px;
        height: 35px;
        float: right;
        line-height: 35px;
        margin-right: 20px;
    }
</style>