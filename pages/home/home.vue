<template>
	<view id="h">
		<!-- 搜索框 -->
		<view class="search-box">
			<search disabled="true" @click="shiftSearch"></search>
		</view>
		
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index">
				<image class="nav-image" :src="item.image_src" @click="navHandler(item)"></image>
				<!-- <span>{{item.name}}</span> -->
			</view>
		</view>
		
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="4000" :duration="1000" :circular="true">
			<swiper-item v-for="item in swiperList" :key="item.goods_id">
				<navigator class="swiper-item" :url="`/subpkg/goods_details/goods_details?goods_id=${item.goods_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<!-- 商品楼层 -->
		<view class="floor-list">
			<view class="floor-frame" v-for="(item,index) in floorList" :key="index">
				<view class="floor-title">
					<image :src="item.floor_title.image_src"></image>
				</view>
				<view class="floor-main">
					<navigator class="floor-first" :url="`/subpkg/goods_list/goods_list?${item.product_list[0].navigator_url.split('?')[1]}`">
						<image :src="item.product_list[0].image_src" mode="widthFix"></image>
					</navigator>
					<view class="floor-others">
						<navigator class="floor-others-item" v-for="(image,index) in item.product_list" :key="index" v-if="index !== 0" :url="`/subpkg/goods_list/goods_list?${image.navigator_url.split('?')[1]}`">
							<image :src="image.image_src"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList:[],
				swiperList:[],
				floorList:[]
			}
		},
		created() {
			this.getNavList()
			this.getSwiperList()
			this.getFloorList()
		},
		methods: {
			// 获取导航栏信息
			async getNavList() {
				// 发起请求
				const {data : res} = await uni.$http.get('/api/public/v1/home/catitems')
				//请求失败弹窗
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				// 请求成功为data中navList赋值
				this.navList = res.message
			},
			
			// 导航栏跳转处理
			navHandler(item) {
				if(item.name === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			
			// 获取轮播图数据
			async getSwiperList() {
				// 发起请求
				const {data : res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				//请求失败弹窗
				if(res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 请求成功为data中swiperList赋值
				this.swiperList = res.message
			},
			
			async getFloorList() {
				// 发起请求
				const {data : res} = await uni.$http.get('/api/public/v1/home/floordata')
				//请求失败弹窗
				if(res.meta.status !== 200) {
					return uni.$showMsg()
				}
				// 请求成功为data中floorList赋值
				this.floorList = res.message
			},
			
			// 跳转到search页面
			shiftSearch(){
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style scoped>
	image {
		width: 100%;
		height: 100%;
	}
	swiper,.nav-list,.floor-list {
		margin: 10rpx 15rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}
	.search-box {
		margin: 10rpx 15rpx;
		position: sticky;
		top: 10rpx;
		z-index: 5;
	}
	.nav-list {
		display: flex;
		justify-content: space-around;
		background-color: #fff;
	}
	 .nav-image {
		 width: 120rpx;
		 height: 125rpx;
	 }
	.swiper-item{
		width: 100%;
		height: 100%;
	}
	.floor-main {
		display: flex;
	}
	.floor-title {
		width: 100%;
		height: 60rpx;
	}
	.floor-first {
		width: 34%;
		margin-right: 1%;
	}
	.floor-others {
		display: flex;
		width: 65%;
		justify-content: space-around;
		flex-wrap: wrap;
	}
	.floor-others-item {
		width: 49%;
		margin-bottom: 6rpx;
	}
</style>
