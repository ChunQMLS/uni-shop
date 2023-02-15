<template>
	<view class="goods-details-container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<view class="goods-price">
				<text class="iconfont icon-yuan"></text>
				<text>{{goods_info.goods_price}}</text>
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="goods-collect">
					<uni-icons type="star" color="gray" size="18"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="freight">
				快递：免运费
			</view>
		</view>
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	// 引入vuex mapMutations,mapGetters 方法
	import { mapMutations,mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				// 商品详情对象
				goods_info: {},
				
				// 底部导航配置项
				// 左侧按钮配置项
				options:[{
					icon: 'shop',
					text: '店铺'
				},{
					icon: 'cart',
					text: '购物车'
				}],
				// 右侧按钮配置项
				buttonGroup: [{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			};
		},
		computed:{
			// 将cart total 映射
			...mapGetters('m_cart',['total'])
		},
		watch:{
			// 监听cart total的变化，改变info值
			total:{
				handler(newVal){
					// 获取目标对象
					const targetObj = this.options.find( obj => obj.text === '购物车')
					// 修改info值
					if(targetObj){
						targetObj.info = newVal
					}
				},
				immediate:true
			}
		},
		onLoad(options) {
			// 获取商品id
			const goods_id = options.goods_id
			// 请求商品详情数据
			this.getGoodsDetail(goods_id)
		},
		methods: {
			// 请求页面数据
			async getGoodsDetail(goods_id){
				// 发起请求
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail', {goods_id})
				// 失败弹窗
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				// 为img标签添加行内样式
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;" ').replace(/webp/g,'jpg')
				
				// 为data中的数据赋值
				this.goods_info = res.message
			},
			
			// 图片放大预览
			preview(index){
				uni.previewImage({
					current: index,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			
			// 底部导航左侧点击事件
			onClick(e){
				// 判断哪个按钮
				if(e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			
			// 底部导航右侧点击事件
			buttonClick(e){
				// 加入购物车事件
				if(e.content.text === '加入购物车') {
					// 初始化购物车对象
					const  goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					
					// 添加对象到cart state
					this.addToCart(goods)
				}
			},
			
			// 映射 mutation 方法
			...mapMutations('m_cart',['addToCart'])
		}
	}
</script>

<style scoped>
	.goods-details-container {
		padding-bottom: 100rpx;
	}
	swiper {
		height: 750rpx;
	}
	swiper image {
		width: 100%;
		height: 100%;
	}
	.goods-info-box {
		margin: 20rpx;
		background-color: #fff;
		border-radius: 30rpx;
		overflow: hidden;
	}
	.goods-price {
		color: #ff3108;
		font-size: 18px;
		margin: 20rpx;
	}
	.iconfont {
		font-size: 12px;
	}
	.goods-info-body {
		display: flex;
		justify-content: space-between;
		margin-left: 20rpx;
	}
	.goods-name {
		font-size: 26rpx;
		margin-right: 20rpx;
	}
	.goods-collect {
		width: 240rpx;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-left: 1px solid #efefef;
		color: gray;
	}
	.freight {
		margin: 20rpx;
		font-size: 24rpx;
		color: gray;
	}
	.goods-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
