<template>
	<view class="my">
		<my-login v-if="!token"></my-login>
		<my-info v-else></my-info>
	</view>
</template>

<script>
	// 引入cart tabbar mixins
	import cartBadge from '@/mixins/tabbar-badge.js'
	
	import {mapState} from 'vuex'
	
	export default {
		// 将 cartBadge mixins 引入页面
		mixins:[cartBadge],
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
	page,.my {
		height: 100%;
	}
</style>
