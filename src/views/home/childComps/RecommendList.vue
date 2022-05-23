<template>
    <div class="recommendlist">
        <div class="loginbox">
            <login-box/>
        </div>
        <div class="toplist">
            <hot-artists/>
        </div>
        <div class="bottomlist">
            <new-comers/>
        </div>
    </div>
</template>

<script>
import { gethotlist,getdata } from 'network/index'

import { onMounted } from 'vue'
import LoginBox from 'components/content/LoginBox.vue'
import HotArtists from 'components/content/HotArtists.vue'
import NewComers from 'components/content/NewComers.vue'

export default {
    name: 'RecommendList',
    components: {
        LoginBox,
        HotArtists,
        NewComers,
    },
    setup(){
        onMounted(async () => {
            let res = await getdata(8)
            // console.log(res)
        })
    }
    
}
</script>

<style scoped>
    .recommendlist{
        width: 300px;
        height: 1400px;
        border: 1px solid #d8cbcb;
        background-color: #fff;
    }
    .loginbox{
        height: 126px;
    }
    .toplist{
        height: 455px;
    }
    .bottomlist{
        height: 300px;
        background-color: bisque;
    }
</style>