<template>
	<view>
		<view class="receiver-address-box container">
			<uni-icons class="icon location-filled" type="location-filled" color="#fc500b" size="30"></uni-icons>
			<view class="receiver-address-info" @click="shiftAddress">
				<view class="receiver-address-hint" v-if="JSON.stringify(address) === '{}'">
					请选择地址
				</view>
				<view v-else>
					<view class="receiver-address">
						{{address.detailInfo}}
					</view>
					<view class="recipients-info">
						<view class="recipients-name">
							{{address.userName}}
						</view>
						<view class="recipients-phone">
							{{address.telNumber}}
						</view>
					</view>
				</view>
			</view>
			<uni-icons class="icon forward" type="forward" color="#9e9e9e" size="20"></uni-icons>
		</view>
		<view class="goods-box">
			<view class="container" v-for="(goods,index) in checkedGoods" :key="index">
				<my-goods :goods="goods" :radioCheck="radioCheck" @number-change="numberChange" @number-input="numberBoxBeforeHandler"></my-goods>
			</view>
		</view>
		<view class="bottom-nav">
			<view class="goods-count">
				共{{checkedTotal}}件
			</view>
			<view class="settle-accounts-total">
				合计:
				<view class="settle-accounts-price">
					<text class="iconfont icon-yuan"></text>
					{{settlementAmount}}
				</view>
			</view>
			<button class="bottom-nav-button" @click="submitOrder">提交订单</button>
		</view>
		<number-update-box :show="numberBoxShow" hint="请输入" :number="targetGoods.goods_count" @handler="numberBoxAfterHandler"></number-update-box>
		<view class="mask-layer" v-if="numberBoxShow" catchtouchmove="true"></view>
	</view>
</template>

<script>
	import { mapMutations,mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				numberBoxShow: false,
				targetGoods: {
					goods_id: '',
					goods_count: ''
				},
				radioCheck: false,
				chooseAddress:{}
			}
		},
		computed:{
			...mapGetters('m_cart',['checkedGoods','checkedTotal','settlementAmount']),
			...mapGetters('m_user',['defaultAddress']),
			
			address(){
				return Object.keys(this.chooseAddress).length !== 0 ? this.chooseAddress : this.defaultAddress
			}
		},
		methods: {
			...mapMutations('m_cart',['updateNumber']),
			
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
			
			// 跳转选择地址页面
			shiftAddress(){
				uni.navigateTo({
					url: '/subpkg/my_address/my_address'
				})
			},
			
			prevDateFun(object){
				if(object){
					this.chooseAddress = object
				}else{
					return
				}
			},
			
			submitOrder(){
				if(!this.checkedGoods) return uni.$showMsg('请选择商品')
				if(!this.address) return uni.$showMsg('请选择地址')
				this.payOrder()
			},
			
			// 微信支付
			async payOrder(){
				// 订单信息
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.address,
					goods: this.checkedGoods.filter(x=>x.goods_state).map(x=> ({goods_id:x.goods_id,goods_number:x.goods_count,goods_price:x.goods_price}))
				}
				
				// 请求创建订单
				const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				if(res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
				
				// 获得订单编号
				const orderNumber = res.message.order_number
				
				// 订单预支付
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number: orderNumber})
				// 预付订单生成失败
				if(res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
				// 得到订单支付的相关参数
				const payInfo = res2.message.pay
				
				// 发起支付
				const [err,succ] = await uni.requestPayment(payInfo)
				// 未支付
				if(err) return uni.$showMsg('订单未支付')
				const {data:res3} = await uni.$http.post('/api/public/v1/my/order/chkOrder',{order_number: orderNumber})
				// 检测订单未支付
				if(res3.meta.status !==200) return uni.$showMsg('订单未支付！')
				// 支付完成
				uni.showToast({
					title: '支付完成！',
					icon: 'success'
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		margin: 10px 6px;
		background-color: #fff;
		border-radius: 10px;
	}
	.receiver-address-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
	}
	.receiver-address-info {
		flex: 1;
	}
	.receiver-address-info,.icon {
		padding: 0 2px;
	}
	.recipients-info {
		display: flex;
	}
	.receiver-address {
		font-size: 18px;
		font-weight: 600;
	}
	.recipients-info {
		font-size: 14px;
	}
	.receiver-address,.recipients-info {
		margin: 2px 0;
	}
	.recipients-phone {
		margin-left: 4px;
		color: #9e9e9e;
	}
	.bottom-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		background: #fefefe;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		z-index: 1;
		overflow: hidden;
	}
	.goods-count {
		color: #9e9e9e;
		font-size: 14px;
		margin-right: 2px;
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
