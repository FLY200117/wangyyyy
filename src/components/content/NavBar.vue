<template>
    <div class="navbar">
        <a href="https://music.163.com/#">
            <img src="~assets/img/logo.jpg" alt="">
        </a>
        <div class="navbar-list">
            <div>
                <router-link to="/home">发现音乐</router-link>
            </div>
            <div>
                <a href="">我的音乐</a>
            </div>
            <div>
                <a href="">关注</a>
            </div>
            <div>
                <a href="https://music.163.com/store/product" target="_blank">商场</a>
            </div>
            <div>
                <a href="https://music.163.com/st/musician" target="_blank">音乐人</a>
            </div>
        </div>

        <div class="search">
            <img src="~assets/img/search.svg" alt="">
            <input type="text" placeholder="音乐/视频/电台/用户">   
        </div>
        

        <div class="topbtn">
            <a href="https://music.163.com/#/login?targetUrl=%2Fcreatorcenter" target="_blank">创作者中心</a>
        </div>

        <div class="login">
            <span>登录</span>
        </div>

    </div>
    <!-- <div class="navtoplist">
        <div class="navlist">
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
        </div>
    </div> -->
</template>

<script>
import { getCurrentInstance,computed,watchEffect,watch } from 'vue'


export default {
    name: "NavBar",
    setup(){
        const { ctx } = getCurrentInstance()
        // console.log(ctx.$root.$route.path)

        const isactive = computed(() => {
            return 
        })

        watch(() => ctx.$root.$route.path,
        (new1,old)=> {
            console.log(new1,old)
        })

        return {

        }
    },
    // watch:{
    //     '$route.path': function (new1,old){
    //         console.log(new1,old)
    //     }
    // }
}
</script>

<style scoped>
    .navbar{
        width: 100%;
        height: 70px;
        background: #333;
        padding: 0 400px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .navbar img{
        height: 70px;
        margin-right: 20px;
    }
    .navbar a {
        color: inherit;
    }
    .navbar-list{
        display: flex;
    }
    .navbar-list div{
        width: 120px;
        padding: 0 20px;
        line-height: 70px;
        text-align: center;
    }
    .navbar-list div:first-child{
        color: #fff;
        background: #000;
        text-decoration: none;
    }
    .navbar-list div:hover{
        color: #fff;
        background: #000;
        text-decoration: none;
    }
    .search{
        height: 30px;
        width: 190px;
        margin-top: 19px;
        border-radius: 20px;
        background: #fff;
    }
    .search img{
        margin: 5px 0 0 5px;
        padding: 0;
        height: 20px;
        width: 20px;
    }
    .search input{
        position: absolute;
        margin-top: 5px;
        outline: none;
        height: 20px;
        width: 140px;
        border-width: 0;
        font-size: 12px;
    }
    .topbtn{
        height: 32px;
        width: 90px;
        border: 1px solid #4f4f4f;
        border-radius: 20px;
        line-height: 32px;
        font-size: 12px;
        text-align: center;
        margin-top: 19px;
    }
    .topbtn:hover{
        color: #ccc;
        border: 1px solid #ccc;
    }
    .login{
        display: block;
        width: 28px;
        color: #787878;
        font-size: 12px;
        line-height: 70px;
    }
    .login:hover{
        color: #999;
    }
    .navtoplist{
        height: 30px;
        background-color: red;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navlist{
        width: 820px;
        height: 100%;
        display: flex;
        justify-content: space-around;
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