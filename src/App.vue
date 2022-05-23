<template>
  <div id="app">
	<nav-bar/>
	<nav-top-list/>
	<router-view/>
	<bottom-audio :IsShow="IsShow"/>
  </div>
</template>

<script>
import NavBar from 'components/content/NavBar.vue'
import NavTopList from 'components/common/NavTopList.vue'
import BottomAudio from 'components/content/BottomAudio.vue'

import { MouseMovement } from 'mixin/utils.js'
import { reactive, ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'


export default {
	name: 'app',
	components:{
		NavBar,
		NavTopList,
		BottomAudio,
	},
	setup(){
		const movement = MouseMovement()
		const IsShow = ref(false)


		// 监听鼠标在当前窗口的位置，如果到达底部则显示bottom-audio组件
		watch(movement,(newvalue)=>{
			if(newvalue.h>900){
				IsShow.value = true
				
			}else{
				IsShow.value = false
			}			
		})

		return {
			movement,
			IsShow
		};
	}
}
</script>


<style scoped>
  @import url("assets/css/base.css");
  #app{
	  background-color: #f5f5f5;
  }
</style>
