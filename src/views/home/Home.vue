<template>
	<div class="home">
		<home-swiper/>
		<div class="content">
			<home-content/>
			<recommend-list/>
		</div>
		<footer class="footer"></footer>
	</div>
</template>

<script>
import HomeContent from './childComps/HomeContent.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendList from './childComps/RecommendList.vue'

	export default {
		name:"Home",
		components:{
			HomeSwiper,
			HomeContent,
			RecommendList,
		},
		
	}
</script>

<style scoped>
	.content{
		display: flex;
		justify-content: center;
		align-content: center;
	}
	.footer{
		height: 180px;
		background-color: #f4f4f4;
	}
</style>
