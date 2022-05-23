<template>
    <div class="sort">
        <div>{{title}}</div>
        <div class="sort-list">
            <router-link v-for="item in sortlist" to="/home">{{item}}</router-link>
        </div>
        <div class="more">
            <router-link to="/home">更多</router-link>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        title: String,
        sortlist: Array
    },
    name: 'SortCard'
}
</script>

<style scoped>
    .sort{
        height: 35px;
        padding: 0 10px 0 34px;
        border-bottom: 2px solid #C10D0C;
        display: flex;
        align-items: center;
    }
    .sort:first-child{
        font-size: 20px;
    }
    .sort-list{
        
        font-size: 12px;
    }
    .sort-list a{
        margin: 0 20px 0 30px;
    }
    .more{
        display: 0;
        position: absolute;
        right: 5%;
        font-size: 12px;
    }
</style>