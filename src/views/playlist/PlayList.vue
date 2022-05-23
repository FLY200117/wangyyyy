<template>
    <div class="playlist">
        <div v-if="IsQuery" class="PlaylistQuery">
            <div class="PlaylistContent">
                <div class="PlaylistDetail">
                    <div class="PlaylistImg">
                        <img :src="PlayList.result.coverImgUrl" alt="">
                    </div>
                    
                    <div class="PlaylistMessage">
                        <div class="message1">
                            <div>歌单</div>
                            <span>{{PlayList.result.name}}</span>
                        </div>
                        <div class="message2">
                            <img :src="PlayList.result.creator.avatarUrl" alt="">
                            <span>
                                {{PlayList.result.creator.nickname}}
                                <img :src="PlayList.result.creator.avatarDetail.identityIconUrl" alt="" v-if="IsShow">
                            </span>
                            <span>{{Time + "创建"}}</span>
                        </div>
                        <div class="message3">
                            <div class="btn1">
                                <el-icon :size="20"><VideoPlay /></el-icon>
                                播放
                            </div>
                            <div class="btn2">
                                <el-icon :size="20"><Plus /></el-icon>
                            </div>
                            <div class="btn3">
                                <el-icon :size="20"><FolderAdd /></el-icon>
                                ({{PlayList.result.subscribedCount}})
                            </div>
                            <div class="btn4">
                                <el-icon :size="20"><Wallet /></el-icon>
                                ({{PlayList.result.shareCount}})
                            </div>
                            <div class="btn5">
                                <el-icon :size="20"><Download /></el-icon>
                                下载
                            </div>
                            <div class="btn6">
                                <el-icon :size="20"><Comment /></el-icon>
                                ({{PlayList.result.commentCount}})
                            </div>
                        </div>
                        <div class="message4">
                            <div>标签:&nbsp;&nbsp;&nbsp;&nbsp;</div>
                            <div v-for="item in PlayList.result.tags" :key="item" class="tag">
                                {{item}}
                            </div>
                        </div>
                        <div class="message5">
                            介绍:&nbsp;&nbsp; {{PlayList.result.description}}
                        </div>
                    </div>
                </div>
                <div class="songlist">
                    <div class="title">
                        <div class="title1">歌曲列表</div>
                        <div class="title2">{{TotalTracks}}首歌</div>
                        <div class="title4">播放:&nbsp;{{PlayList.result.playCount}}次</div>
                        <div class="title3">生成外链播放器</div>
                    </div>
                    <div class="list">
                        <div class="ListTitle">
                            <div>&nbsp;</div>
                            <div>歌曲标题</div>
                            <div>时长</div>
                            <div>歌手</div>
                            <div>专辑</div>
                        </div>
                        <div class="songitem" v-for="(item,index) in PlayList.result.tracks" :key="index" @click="PlayingListSong(item.id,item.name,item.ar[0].name,item.al.picUrl)">
                            <div>
                                {{index+1}}
                                <el-icon :size="20"><VideoPlay /></el-icon>
                            </div>
                            <div>{{item.name}}</div>
                            <div>{{SongDuration(item.dt)}}</div>
                            <div>{{item.ar[0].name}}</div>
                            <div>{{item.al.name}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="RecommendList"></div>
        </div>
        <div v-else>没有参数</div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { computed, onMounted, watch } from '@vue/runtime-core'
import { getPlayListDetail } from 'network/index'
import { timestampToTime } from 'mixin/utils'
import { useStore } from 'vuex'

export default {
    name: 'PlayList',
    setup(){
        const Route = useRoute()
        const store = useStore()
        const IsShow = ref(false)
        const IsQuery = ref(false)
        const PlayList = reactive({result:{
            creator:{
                avatarDetail:{
                    identityIconUrl: ''
                }
            },
            tags:[],
            trackIds:[],
            tracks:[]
        }})

        const Time = computed(() => {
            let createTime = PlayList.result.createTime
            console.log(createTime)
            let result =  timestampToTime(createTime)
            return result
        })
        const TotalTracks = computed(() => {
            let track = PlayList.result.trackIds
            let result = track.length
            return result
        })
        const SongDuration = computed(() => {
            return function(val){
                let MS = (val / 1000).toFixed(0)
                let S = MS % 60
                let M = (MS-S) / 60
                let result = ''
                if(M<10){
                    M = "0" + String(M)
                }

                if(S<10){
                    S = "0" + String(S)
                }
                result = M + ":" + S
                return result
            }
            // return result
        })

        const PlayingListSong = (id,name,author,picUrl) => {
            let al = {
                id:id,
                name:name,
                author:author,
                picUrl:picUrl
            }
            // console.log(al)
            store.commit('addPlaylist',al)
            store.state.Playing = true
        }

        if(Route.query.id){
            IsQuery.value = true
        }

        watch(PlayList.result.creator.avatarDetail,(val)=> {
            console.log(val)
        })

        onMounted(async() => {
            if(Route.query.id){
                let res = await getPlayListDetail(Route.query.id)
                console.log(res)
                PlayList.result = res.data.playlist
                console.log(PlayList) 
                if(PlayList.result.creator.avatarDetail){
                    IsShow.value = true
                }
            }
        })

        return{
            IsQuery,
            PlayList,
            Time,
            IsShow,
            TotalTracks,
            SongDuration,
            PlayingListSong,
        }
    }
}
</script>

<style scoped>
    .playlist{
        display: flex;
		justify-content: center;
		align-content: center;
    }
    .PlaylistQuery{
        position: relative;
        width: 730px;
        height: 1400px;
        background-color: white;
        border: 1px solid #d8cbcb;
        border-top: 0px;
        padding: 47px 30px 40px 40px;
    }
    .RecommendList{

    }
    .PlaylistImg{
        height: 210px;
        width: 210px;
        border: 1px solid #e2e2e2;
    }
    .PlaylistImg img{
        height: 208px;
        width: 208px;
        padding: 2px;
        
    }
    .PlaylistDetail{
        display: flex;
    }
    .PlaylistMessage{
        width: 450px;
        height: 100%;
        margin-left: 20px;
    }
    .PlaylistMessage div{
        display: flex;
    }
    .message1{
        margin-bottom: 10px;
    }
    .message1 div{
        height: 24px;
        width: 54px;
        background-color: #9B0909;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .message1 span{
        margin-left: 20px;
        font-size: 20px;
    }
    .message2{
        margin-bottom: 20px;
    }
    .message2 img{
        height: 35px;
        width: 35px;
    }
    .message2 span:nth-child(2){
        color: #0c73c2;
        font-size: 12px;
        line-height: 30px;
        margin-left: 10px;
    }
    .message2 span:nth-child(2) img{
        height: 12px;
        width: 12px;
    }
    .message2 span:nth-child(3){
        font-size: 12px;
        color: #999999;
        margin-left: 20px;
        line-height: 30px;
    }
    .message3{
        margin-bottom: 20px;
    }
    .message3 div{
        
        padding: 5px;
        margin-right: 10px;
        
    }
    .message3 div:first-child{
        background-color: #0c73c2;
        color: white;
        margin-right: 0;
        border: 1px solid #0c73c2;
        border-radius: 5px 0 0 5px;
        border-right: 1px solid #333;
    }
    .btn2{
        background-color: #0c73c2;
        color: white;
        border-radius: 0 5px 5px 0;
    }
    .btn2:hover,.message3 div:first-child:hover{
        background-color: #0f87e4;
    }
    .message3 div:nth-child(3),.message3 div:nth-child(4),.message3 div:nth-child(5),.message3 div:nth-child(6){
        line-height: 20px;
        font-size: 12px;
        background-color: #f5f5f5;
        border: 1px solid #999999;
        border-radius: 5px;
    }
    .message3 div:nth-child(3):hover,.message3 div:nth-child(4):hover,.message3 div:nth-child(5):hover,.message3 div:nth-child(6):hover{
        background-color: white;
    }
    .message4{
        margin-bottom: 10px;
        font-size: 12px;
    }
    .message4 div{
        line-height: 22px;
    }
    .tag{
        color: #777777;
        height: 20px;
        padding: 10px;
        
        border: 1px solid #999999;
        background-color: #f5f5f5;
        border-radius: 20px;
        margin-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tag:hover{
        background-color: white;
    }
    .message5{
        width: 428px;
        height: 28px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .title{
        margin-top: 40px;
        display: inline-block;
        height: 35px;
        width: 100%;
    }
    .title1{
        float: left;
        font-size: 20px;
    }
    .title2{
        float: left;
        margin: 9px 0 0 20px;
        font-size: 12px;
    }
    .title3{
        float: right;
        font-size: 12px;
        margin: 5px 20px 0 0;
        color: #4996D1;
        text-decoration: underline;
    }
    .title4{
        float: right;
        font-size: 12px;
        margin-top: 5px;
    }
    .list{
        height: 340px;
        width: 658px;
    }
    .ListTitle{
        height: 40px;
        display: flex;
        border-top: 2px solid #9B0909;
    }
    .ListTitle div{
        padding: 8px 10px;
        font-size: 14px;
        border: 1px solid #e2e2e2;
        background-color: #f5f5f5;
    }
    .ListTitle div:nth-child(1){
        
        width: 75px;
    }
    .ListTitle div:nth-child(2){
        width: 250px;
    }
    .ListTitle div:nth-child(3),.ListTitle div:nth-child(4){
        width: 100px;
    }
    .ListTitle div:nth-child(5){
        width: 133px;
    }
    .songitem{
        display: flex;
        border-right: 1px solid #e2e2e2;
        border-left: 1px solid #e2e2e2;
        font-size: 12px;
    }
    .songitem:last-child{
        border-bottom: 1px solid #e2e2e2;
    }
    .songitem div {
        padding: 6px 10px;
        overflow: hidden; 
        white-space: nowrap; 
        text-overflow: ellipsis;
        
    }
    .songitem div:nth-child(2):hover,.songitem div:nth-child(4):hover,.songitem div:nth-child(5):hover{
        text-decoration: underline;
    }
    .songitem div:nth-child(1){
        width: 75px;
        height: 30px;
        
        
        display: flex;
        justify-content: space-between;
    }
    .songitem div:nth-child(2){
        width: 250px;
         
    }
    .songitem div:nth-child(3){
        width: 100px;
    }
    .songitem div:nth-child(4){
        width: 100px;
    }
    .songitem div:nth-child(5){
        width: 133px;
    }
    .songitem:nth-child(2n+1){
        background-color: #f7f7f7;
    }
</style>