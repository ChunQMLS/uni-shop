<template>
	<view>
		<view class="goodslist-container">
			<block v-for="(item,index) in goodsList">
				<view class="goodslist-item" @click="shiftDetail(item)">
					<view class="goods-image">
						<image :src="item.goods_small_logo || defaultPic"></image>
					</view>
					<view class="goods-info">
						<view class="goods-intro">
							{{item.goods_name}}
						</view>
						<view class="goods-price">
							<text class="iconfont icon-yuan"></text>
							<text class="goods-price-val">{{item.goods_price | tofixed}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				// 商品列表数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0
			};
		},
		filters: {
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
		},
		created() {
			this.getGoodsList()
		},
		methods:{
			// 获取商品列表数据的方法
			async getGoodsList(cb){
				// 发起请求
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				
				cb && cb()
				
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				console.log(res.message)
				// 赋值
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			// 点击跳转到商品详情页
			shiftDetail(item){
				uni.navigateTo({
					url: `/subpkg/goods_details/goods_details?goods_id=${item.goods_id}`
				})
			}
		},
		onReachBottom() {
			// 页码自增1
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.goodsList = []
			
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style scoped>
	.goodslist-container {
/* 		margin: 10rpx; */
		display: flex;
		flex-wrap: wrap;
	}
	.goodslist-item {
		width: 46%;
		margin: 10rpx 2%;
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.goods-image {
		overflow: hidden;
		height: 400rpx;
	}
	.goods-image>image {
		width: 100%;
	}
	.goods-info {
		margin: 20rpx;
	}
	.goods-intro {
		font-size: 28rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.goods-price {
		color: #ff2f06;
	}
	.goods-price-val {
		font-size: 40rpx;
	}
	.iconfont {
		font-size: 12px;
	}
</style>
