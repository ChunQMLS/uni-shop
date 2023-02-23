<template>
	<view>
		<view class="cart-top-nav">
			<view class="cart-theme">
				<text class="cart-title">购物车</text>
				<text class="cart-goods-count">({{total}})</text>
			</view>
			<view class="cart-manage">
				<text v-show="!manageState" @click="manageState = !manageState">管理</text>
				<text v-show="manageState" @click="manageState = !manageState" :style="{color: '#ff370f'}">退出管理</text>
			</view>
		</view>
		<view class="cart-goods-box">
			<uni-swipe-action>
				<view class="cart-goods-container" v-for="(goods,index) in cart" :key="index">
					<uni-swipe-action-item :rightOptions="options" @click="swipeItemHandler(goods)">
							<my-goods :goods="goods" :manageState="manageState" @radio-check="radioCheck" @number-change="numberChange" @number-input="numberBoxBeforeHandler" @goods-remove="goodsRemoveHandler"></my-goods>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
		<view class="cart-bottom-nav">
			<view class="cart-bottom-settle-accounts" :style="{bottom: manageState ? '-50px' : '0px'}">
				<radio class="goods-checkall" :checked="checkAll" color="#ff2a00" @click.native="checkAllHandler">全选</radio>
				<view class="settle-accounts">
					<view class="settle-accounts-total">
						合计:
						<view class="settle-accounts-price">
							<text class="iconfont icon-yuan"></text>
							{{settlementAmount}}
						</view>
					</view>
					<button class="bottom-nav-button" @click="shiftGoodsOrder">结算</button>
				</view>
			</view>
			<view class="cart-bottom-manage" :style="{bottom: manageState ? '0px' : '-50px'}">
				<radio class="goods-checkall" :checked="checkAll" color="#ff2a00" @click.native="checkAllHandler">全选</radio>
				<button class="bottom-nav-button">删除</button>
			</view>
		</view>
		<number-update-box :show="numberBoxShow" hint="请输入" :number="targetGoods.goods_count" @handler="numberBoxAfterHandler"></number-update-box>
		<view class="mask-layer" v-if="numberBoxShow" catchtouchmove="true"></view>
	</view>
</template>

<script>
	// 引入cart tabbar mixins
	import cartBadge from '@/mixins/tabbar-badge.js'
	
	// 引入vuex mapGetters 方法
	import { mapState,mapGetters,mapMutations } from 'vuex'
	
	export default {
		// 将 cartBadge mixins 引入页面
		mixins:[cartBadge],
		data() {
			return {
				numberBoxShow: false,
				targetGoods: {
					goods_id: '',
					goods_count: ''
				},
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#ff2a00'
						}
					}
				],
				manageState: false
			};
		},
		computed:{
			// 将cart 映射
			...mapState('m_cart',['cart']),
			// 将cart total 映射
			...mapGetters('m_cart',['total','checkAll','settlementAmount','checkedTotal'])
		},
		methods:{
			// 引入 store 中修改商品状态的方法 updateState updateNumber removeGoodById
			...mapMutations('m_cart',['updateState','updateNumber','removeGoodById','updateStateAll']),
			
			// 商品勾选框事件处理函数
			radioCheck(e){
				// 更改商品状态
				this.updateState(e)
			},
			
			// 商品全选勾选框事件处理函数
			checkAllHandler(){
				this.updateStateAll(this.checkAll)
			},
			
			// 商品数量事件处理函数
			numberChange(e){
				// 修改商品数量
				this.updateNumber(e)
			},
			
			// 数字输入框显示事件处理函数
			numberBoxBeforeHandler(e){
				// 将修改目标id count 存入targetGoods属性中，方便后续目标数量地修改
				this.targetGoods.goods_id = e.goods_id
				this.targetGoods.goods_count = e.goods_count
				
				// 显示修改框以及遮罩层
				this.numberBoxShow = !this.numberBoxShow
			},
			
			// 数字输入框显示事件处理函数
			numberBoxAfterHandler(e){
				// 根据修改框返回的数据，判断对targetGoods的数量是否进行修改，以及缓存修改
				if(e.choose){
					this.targetGoods.goods_count = Number(e.value)
					this.updateNumber(this.targetGoods)
				}
				
				// 隐藏修改框以及遮罩层
				this.numberBoxShow = !this.numberBoxShow
			},
			
			// 商品滑动删除事件处理函数
			swipeItemHandler(goods){
				this.removeGoodById(goods.goods_id)
			},
			
			// 商品移除图标事件处理函数
			goodsRemoveHandler(goods_id){
				this.removeGoodById(goods_id)
			},
			
			shiftGoodsOrder(){
				if(!this.checkedTotal) return uni.$showMsg('请勾选商品')
				uni.navigateTo({
					url: '/subpkg/goods_order/goods_order'
				})
			}
		},
		// onPageScroll() {
		// 	uni.$emit('onPageScroll')
		// }
	}
</script>

<style scoped>
	.cart-top-nav {
		position: fixed;
		top: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;
		letter-spacing: 1px;
		color: #3e3e3e;
		background: #ffe147;
		z-index: 1;
	}
	.cart-theme {
		margin-left: 15px;
		display: flex;
		align-items: center;
	}
	.cart-title {
		font-size: 18px;
		font-weight: bold;
	}
	.cart-goods-count {
		font-size: 12px;
		margin-left: 2px;
	}
	.cart-manage {
		margin-right: 15px;
		font-size: 14px;
	}
	.cart-goods-box {
		margin-top: 44px;
		padding-bottom: 50px;
		overflow: hidden;
	}
	.cart-goods-container {
		margin: 15px 10px;
		background: #fff;
		border-radius: 10px;
	}
	.cart-bottom-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		background: #fefefe;
		z-index: 1;
		overflow: hidden;
	}
	.cart-bottom-settle-accounts,.cart-bottom-manage {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		height: 50px;
		width: calc(100% - 20px);
		padding: 0 10px;
	}
	.settle-accounts {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
	}
	.settle-accounts-price {
		display: inline-block;
		margin-right: 10px;
		color: #ff3108;
		font-size: 20px;
	}
	.iconfont {
		font-size: 12px;
	}
	.bottom-nav-button {
		margin: 0;
		border: none;
		background-color: #ff370f;
		color: #fff;
		border-radius: 20px;
		font-size: 16px;
		padding: 0 30px;
	}
	.goods-checkall {
		font-size: 14px;
		color: #3e3e3e;
	}
	.mask-layer {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.6);
		z-index: 10;
	}
</style>
