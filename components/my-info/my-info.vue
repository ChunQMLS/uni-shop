<template>
	<view class="my-userinfo-container">
		
		<view class="avatar-box">
			<image class="avatar" :src="userinfo.avatarUrl"></image>
			<view class="nickname">
				{{userinfo.nickName}}
			</view>
		</view>
		
		<view class="panel-list">
			<view class="panel-record panel">
				<view class="panel-item">
					<uni-icons type="star" size="30"></uni-icons>
					<text>收藏</text>
				</view>
				<view class="panel-item">
					<uni-icons type="heart" size="30"></uni-icons>
					<text>订阅店铺</text>
				</view>
				<view class="panel-item">
					<uni-icons type="gift" size="30"></uni-icons>
					<text>关注商品</text>
				</view>
				<view class="panel-item">
					<uni-icons type="loop" size="30"></uni-icons>
					<text>足迹</text>
				</view>
			</view>
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-order">
					<view class="panel-item">
						<uni-icons type="star" size="30"></uni-icons>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<uni-icons type="star" size="30"></uni-icons>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<uni-icons type="star" size="30"></uni-icons>
						<text>退款/售后</text>
					</view>
					<view class="panel-item">
						<uni-icons type="star" size="30"></uni-icons>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-item-list">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="30"></uni-icons>
				</view>
				<view class="panel-item-list">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="30"></uni-icons>
				</view>
				<view class="panel-item-list" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="30"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	
	export default {
		name:"my-info",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['userinfo'])
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateAddress']),
			//  退出登录
			async logout(){
				// 退出登录授权
				const [err,succ] = await uni.showModal({
					title: '提示',
					content: '确认退出登录吗?'
				}).catch(err => err)
				
				if(succ && succ.confirm){
					this.updateUserInfo({})
					this.updateToken('')
					this.updateAddress({})
				}
			}
		}
	}
</script>

<style scoped>
	.my-userinfo-container {
		height: 100%;
		background-color: #f4f4f4;
	}
	.avatar-box {
		height: 200px;
		background-color: #ffe147;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.avatar {
		width: 90px;
		height: 90px;
		border-radius: 45px;
		border: 2px solid #fff;
		box-shadow: 0 1px 5px black;
	}
	.nickname {
		font-size: 16px;
		font-weight: bold;
		color: #fff;
		margin-top: 10px;
	}
	.panel-list {
		position: relative;
		top: -10px;
		padding: 0 10px;
	}
	.panel {
		background-color: #fff;
		margin-bottom: 10px;
		border-radius: 4px;
	}
	.panel-record,.panel-order {
		display: flex;
		justify-content: space-around;
	}
	.panel-item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-size: 13px;
		padding: 10px 0;
	}
	.panel-title {
		line-height: 45px;
		padding-left: 10px;
		font-size: 16px;
		border-bottom: 1px solid #dfdfdf;
		font-weight: bold;
	}
	.panel-item-list {
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		padding: 0 10px;
		line-height: 45px;
	}
</style>