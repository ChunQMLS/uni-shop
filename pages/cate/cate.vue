<template>
	<view class="scroll-container">
		<scroll-view class="left-scroll" scroll-y="true">
			<block v-for="(item,index) in cateList" :key="index">
				<view :class="['left-scroll-item', index===active ? 'active' : '']" @click="changeActive(index)">{{item.cat_name}}</view>
			</block>
		</scroll-view>
		<scroll-view class="right-scroll" scroll-y="true" :scroll-top="scrollTop">
			<block v-for="(item,index) in cateChildList" :key="index">
				<view class="right-scroll-item">
					<view class="products-type">
						<span>{{item.cat_name}}</span>
					</view>
					<view class="products">
						<view class="products-item" v-for="(pd,index) in item.children" :key="index" @click="shiftGoodsPage(pd.cat_id)">
							<view class="products-item-image">
								<image :src="pd.cat_icon.replace('api-ugo-dev','api-ugo-web')"></image>
							</view>
							<view class="products-item-title">
								<span>{{pd.cat_name}}</span>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	// 引入cart tabbar mixins
	import cartBadge from '@/mixins/tabbar-badge.js'
	
	export default {
		// 将 cartBadge mixins 引入页面
		mixins:[cartBadge],
		data() {
			return {
				cateList:[],
				active: 0,
				cateChildList:[],
				scrollTop: 0
			};
		},
		watch:{
			active(newVal,oldVal){
				this.cateChildList = this.cateList[newVal].children
			}
		},
		created() {
			this.getCateList()
		},
		methods:{
			// 获取cateList数据
			async getCateList(){
				// 发起请求
				const {data : res} = await uni.$http.get('/api/public/v1/categories')
				//请求失败弹窗
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.cateList = res.message
				this.cateChildList = this.cateList[this.active].children
				console.log(res.message)
			},
			
			// 点击切换选项卡
			changeActive(index){
				this.active = index
				this.scrollTop = this.scrollTop===0 ? 1 : 0
			},
			
			// 点击跳转商品详情页
			shiftGoodsPage(id){
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${id}`
				})
			}
		}
	}
</script>

<style scoped>
	.scroll-container {
		display: flex;
	}
	.left-scroll {
		width: 20%;
		height: 100vh;
	}
	.left-scroll-item {
		text-align: center;
		line-height: 120rpx;
		font-size: 26rpx;
		letter-spacing: 1rpx;
		color: #3e3e3e;
	}
	.left-scroll-item.active {
		font-size: 32rpx;
		font-weight: bold;
		color: #ff0000;
	} 
	.right-scroll {
		width: 80%;
		height: 100vh;
	}
	.right-scroll-item {
		margin: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
		overflow: hidden;
	}
	.products-type {
		font-weight: bold;
		font-size: 32rpx;
		margin-bottom: 10rpx;
	}
	.products {
		display: flex;
		flex-wrap: wrap;
	}
	.products-item {
		width: 33.33%;
		margin-bottom: 10rpx;
	}
	.products-item-image {
		display: flex;
	}
	.products-item-image>image {
		width: 120rpx;
		height: 120rpx;
		margin: 0 auto;
	}
	.products-item-title {
		text-align: center;
		font-size: 24rpx;
		color: #858585;
	}
</style>
