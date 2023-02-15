<template>
	<!-- 店铺分类预留 -->
	<!-- <view class="cart-store">
		<check-box :check="false" color="#ff2a00" fillColor="#ffff00" size="30" :checkCallBack="checkCallBack"></check-box>
	</view> -->
	<view class="cart-goods-item">
		<radio class="goods-item-check" v-if="radioCheck" :checked="goods.goods_state" color="#ff2a00" @click.native="checkHandler"></radio>
		<!-- <check-box class="goods-item-check" :check="goods.goods_state" color="#ff2a00" fillColor="#ffff00" size="30" @click.native="checkCallBack(goods)" ></check-box> -->
		<view class="goods-image">
			<image :src="goods.goods_small_logo"></image>
		</view>
		<view class="goods-info">
			<view class="goods-name">
				{{goods.goods_name}}
			</view>
			<view class="goods-options">
				<view class="goods-price">
					<text class="iconfont icon-yuan"></text>
					<text>{{goods.goods_price}}</text>
				</view>
				<number-box :number="goods.goods_count" @number-change="numberHandler" @number-input="numberInputBoxShowHandler"></number-box>
			</view>
		</view>
		<view class="goods-remove" v-if="manageState">
			<uni-icons type="minus-filled" size="30" color="#ff2a00" @click="goodsRemoveHandler"></uni-icons>
		</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	
	export default {
		name:"my-goods",
		props:{
			goods:{
				type: Object,
				default:{}
			},
			manageState:{
				type: Boolean,
				default: false
			},
			radioCheck:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			
			// 勾选框事件传递
			checkHandler(){
				this.$emit('radio-check',{
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state
				})
			},
			
			// 数字输入事件传递
			numberHandler(number){
				this.$emit('number-change',{
					goods_id: this.goods.goods_id,
					goods_count: number
				})
			},
			
			// 数据输入框显示事件
			numberInputBoxShowHandler(){
				this.$emit('number-input',{
					goods_id: this.goods.goods_id,
					goods_count: this.goods.goods_count
				})
			},
			
			// 商品移除图标事件处理函数
			goodsRemoveHandler(){
				this.$emit('goods-remove',this.goods.goods_id)
			}
	
		}
	}
</script>

<style scoped>
	.cart-goods-item {
		position: relative;
		display: flex;
		align-items: center;
		padding: 10px 0;
	}
	.goods-item-check,.goods-info{
		margin: 0 10px;
		z-index: 0;
	}
	.goods-image {
		width: 100px;
		height: 100px;
		border-radius: 10px;
		overflow: hidden;
	}
	.goods-image image {
		width: 100%;
		height: 100%;
	}
	.goods-info {
		display: flex;
		flex-direction: column;
		flex: 1;
		height: 100px;
		overflow: hidden;
	}
	.goods-info view {
		margin-bottom: 10px;
	}
	.goods-name {
		font-size: 14px;
		font-weight: bold;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.goods-options {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.iconfont {
		font-size: 12px;
	}
	.goods-price {
		color: #ff3108;
		font-size: 18px;
	}
	.goods-remove {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: 100%;
		right: 0px;
		background: linear-gradient(to left,#fff 70%,transparent);
	}
</style>