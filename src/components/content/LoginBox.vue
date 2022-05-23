<template>
    <div class="LoginBox">
        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
        <div class="LoginBtn">
            <a href="" @click="open">用户登录</a>
        </div>
        
    </div>
</template>

<script>


export default {
    name: "LoginBox",
    setup(){
        

        return {
            
        }
    }
}
</script>

<style scoped>
    .LoginBox{
        height: 126px;
        border: 1px solid #fff;
        background-color: #f5f5f5;
        border-bottom: 1px solid #d8cbcb;
    }
    .LoginBox p{
        width: 205px;
        margin: 0 auto;
        padding: 16px 0;
        line-height: 22px;
        color: #666;
        font-size: 12px;
    }
    .LoginBox a{
        display: block;
        width: 100px;
        height: 31px;
        line-height: 31px;
        text-align: center;
        color: #fff;
        text-shadow: 0 1px 0 #8a060b;
        background-color: #e00a11f6;
        border-radius: 5px;
        font-size: 12px;
    }
    .LoginBox a:hover{
        background-color: #f71921;
    }
    .LoginBtn{
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>