<template>
    <div class="homecontent">
        <sort-card :title="recommendtitle" :sortlist="sortlist"/>
        <div class="songlist">
            <div class="sortitem" v-for="item in recommendListArry.result" :key="item">
                <div class="sortitem-img">
                    <router-link :to="{path:'/playlist',query:{'id':item.id}}">
                        <img :src="item.picUrl" alt="">
                    </router-link>
                </div>
                <router-link :to="{path:'/playlist',query:{'id':item.id}}" class="song-list-name">{{item.name}}</router-link>
                <!-- <div class="song-list-name">{{item.name}}</div> -->
            </div>
        </div>
        <div class="new">
            <sort-card :title='newtitle'/>
            <new-album/>
        </div>
        <div class="toplist">
            <sort-card :title="'榜单'"/>
            <div class="toplist-content">
                <home-singer-list :ary= musicList.ary[0] :idAry = musicList.idAry.targetAry1SongDetail  v-if="Show"/>
                <home-singer-list :ary= musicList.ary[1] :idAry = musicList.idAry.targetAry1SongDetai2  v-if="Show"/>
                <home-singer-list :ary= musicList.ary[2] :idAry = musicList.idAry.targetAry1SongDetai3  v-if="Show"/>
            </div>
        </div>
    </div>
</template>

<script>
import HomeSingerList from 'components/content/HomeSingerList.vue'
import NewAlbum from 'components/content/NewAlbum.vue'
import SortCard from 'components/content/SortCard.vue'
import { getdata,getTopList,getPlayListDetail,getSong,getArtistDetail } from 'network/index'
import { onMounted, reactive, ref } from 'vue'


export default {
    name: 'HomeContent',
    components: {
        SortCard,
        NewAlbum,
        HomeSingerList,
    },
    setup(){
        let Show = ref(false)
        let recommendtitle = '热门推荐'
        const newtitle = '新碟上架'
        let sortlist = ['华语','流行','摇滚','民谣','电子']
        const recommendListArry = reactive({result:[]})
        const musicList = reactive({
            ary:[],
            idAry:{
                targetAry1SongDetail:[],
                targetAry1SongDetai2:[],
                targetAry1SongDetai3:[],
            }
        })
        // const musicList = ref({ary1:[],ary2:[],ary3:[]})

        onMounted(async() => {
            let res = await getdata(8)
            recommendListArry.result = res.data.result
            console.log(res)
            // 获取热门榜单中的前三个榜单
            let res2 = await getTopList()
            musicList.ary = res2.data.list.slice(0,3)
            Show.value = true
            console.log(res2)

            // 获取第一个榜单所有的歌曲信息
            let res3 = await getPlayListDetail(musicList.ary[0].id)
            musicList.idAry.targetAry1SongDetail = res3.data.playlist.tracks.slice(0,10)
            // 获取第二个榜单所有的歌曲信息
            let res4 = await getPlayListDetail(musicList.ary[1].id)
            musicList.idAry.targetAry1SongDetai2 = res4.data.playlist.tracks.slice(0,10)
            // 获取第三个榜单所有的歌曲信息
            let res5 = await getPlayListDetail(musicList.ary[2].id)
            musicList.idAry.targetAry1SongDetai3 = res5.data.playlist.tracks.slice(0,10)

            console.log(musicList)
            console.log(res3)
            // 获取该榜单所有的歌曲
        })

        return {
            recommendtitle,
            newtitle,
            sortlist,
            recommendListArry,
            musicList,
            Show,
        }
    }
}
</script>

<style scoped>
    .homecontent{
        position: relative;
        width: 730px;
        height: 1400px;
        background-color: white;
        padding: 20px 20px 40px;
        border: 1px solid #e2e2e2;
        border-top: 0px;
        
    }
    .songlist{
        margin-top: 20px;
        height: 500px;
        display: flex;
        flex-wrap: wrap;
    }
    .sortitem{
        height: 230px;
        width: 172px;
        padding: 0 0 30px 32px;
        
        color: black;

    }
    .sortitem-img img{
        height: 140px;
        width: 140px;
    }
    .song-list-name{
        margin-top: 5px;
        display: 0;
        font-size: 14px;
        line-height: 20px;
    }
    .song-list-name:hover{
        text-decoration: underline;
    }
    .new{
        height: 250px;
    }
    .toplist{
        margin-top: 20px;
        height: 530px;
    }
    .toplist-content{
        margin-top: 20px;
        display: flex;
    }
    .toplist-content div{
        height: 495px;
        width: 228px;
        border: 1px solid #e2e2e2;
    }
</style>