<template>
    <div class="tab-bar-item" @click="itemClick" :style="activestyle">
        <div  class="item-text">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance,computed,watchEffect,watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'TabBarItem',
    props: {
        path: String
    },
    setup(props){
        const { ctx } = getCurrentInstance()
        const Router = useRouter()

        let itemClick = () => {
            Router.replace(props.path).catch(err =>err)
        }
        
        const isactive = computed(() => {
            return Router.currentRoute.value.fullPath.indexOf(props.path) !==-1
        })

        // const activestyle = computed(() => {
        //     return isactive ? {
        //         background: '#9B0909'
        //     } : {}
        // })

        const activestyle = computed(() => {
            if(Router.currentRoute.value.fullPath.indexOf(props.path) !==-1){
                return { background: '#9B0909' }
            }else{
                return {}
            }
        })

        
        return {
            itemClick,
            activestyle,
        }
    }
}
</script>

<style scoped>
    .tab-bar-item{
        display: inline-block;
        
        height: 23px;
        border: 1px solid red;
        border-radius: 20px;
        text-align: center;
        font-size: 12px;
    }
    .tab-bar-item:hover{
        background-color: #9B0909;
    }
    .item-text{
        line-height: 7px;
        margin: 7px 17px 0;
        color: #ccc;
    }
    
</style>