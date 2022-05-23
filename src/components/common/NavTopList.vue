<template>
    <div class="navtoplist">
        <!-- <div class="navlist">
            <div>
                <router-link to="/home" >推荐</router-link>
            </div>
            <div>
                <router-link to="/toplist" >排行榜</router-link>
            </div>
            <div>
                <router-link to="/home">歌单</router-link>
            </div>
            <div>
                <router-link to="/home" >主播电台</router-link>
            </div>
            <div>
                <router-link to="/home" >歌手</router-link>
            </div>
            <div>
                <router-link to="/home">新碟上架</router-link>
            </div>
        </div> -->
        <tab-bar>
            <tab-bar-item path="/home">
                <template v-slot:item-text>推荐</template>
            </tab-bar-item>
            <tab-bar-item path="/toplist">
                <template v-slot:item-text>排行榜</template>
            </tab-bar-item>
            <tab-bar-item path="/playlist">
                <template v-slot:item-text>歌单</template>
            </tab-bar-item>
            <tab-bar-item path="/djradio">
                <template v-slot:item-text>主播电台</template>
            </tab-bar-item>
            <tab-bar-item path="/artist">
                <template v-slot:item-text>歌手</template>
            </tab-bar-item>
            <tab-bar-item path="/album">
                <template v-slot:item-text>新碟上架</template>
            </tab-bar-item>
        </tab-bar>
    </div>
</template>

<script lang="ts">
import TabBar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
// import { defineEmits,getCurrentInstance,ctx,defineComponent } from 'vue'
import { ref } from 'vue'

export default {
    name: 'NavTopList',
    components: {
        TabBar,
        TabBarItem,
    }
}
</script>

<style scoped>
    .navtoplist{
        height: 30px;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navlist div{
        display: inline-block;
        
        height: 23px;
        border: 1px solid red;
        border-radius: 20px;
        text-align: center;
        font-size: 12px;
    }
    .navlist div:hover{
        background-color: #9B0909;
    }
    .navlist div a{
        line-height: 19px;
        margin: 7px 17px 0;
        color: #ccc;
    }
    .navlist div:first-child{
        background-color: #9B0909;
    }
    
</style>

