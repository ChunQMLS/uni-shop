<template>
	<view>
		<view class="consignee container">
			<view class="hint">
				收货人
			</view>
			<view class="input">
				<input type="text" placeholder="名字" v-model="address.userName">
			</view>
		</view>
		<view class="tel-number container">
			<view class="hint">
				手机号码
			</view>
			<view class="input">
				<input type="text" placeholder="手机号" v-model="address.telNumber">
			</view>
		</view>
		<view class="area container">
			<view class="hint">
				所在地区
			</view>
			<view class="input input-more">
				<input type="text" placeholder="省" v-model="address.provinceName">
				<input type="text" placeholder="市" v-model="address.cityName">
				<input type="text" placeholder="区" v-model="address.countyName">
				<input type="text" placeholder="街道" v-model="address.streetName">
			</view>
		</view>
		<view class="detailed-address container">
			<view class="hint">
				详细地址
			</view>
			<view class="input">
				<input type="text" placeholder="小区楼栋/乡村名称" v-model="address.detailInfo">
			</view>
		</view>
		<view class="container">
			<view class="hint">
				设置为默认地址
			</view>
			<view class="options-button transition" @click="address.default = !address.default" :style="{justifyContent: address.default ? 'flex-end' : 'flex-start',backgroundColor: address.default ? '#ff370f' : 'none'}">
				<view class="options-ball transition" :style="{left: address.default ? '24px' : '0px'}"></view>
			</view>
		</view>
		<view class="button-container">
			<button class="bottom-nav-button" @click="saveAddress">保存</button>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				address:{
					id:'',
					userName:'',
					provinceName:'',
					cityName:'',
					countyName:'',
					streetName:'',
					detailInfo:'',
					telNumber:'',
					default: false
				}
			}
		},
		methods: {
			...mapMutations('m_user',['updateAddress']),
			
			// 保存地址
			saveAddress(){
				if(this.address.id === '') {
					let date = new Date()
					this.address.id = date.toDateString()
				}
				if(Object.values(this.address).some( x => x === ''))return
				this.updateAddress(this.address)
				uni.navigateBack()
			}
			
		},
		onLoad(option) {
			if(option.address === 'undefined') return
			this.address = JSON.parse(decodeURIComponent(option.address))
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 16px;
	}
	.area {
		display: flex;
		align-items: flex-start;
	}
	.hint {
		font-size: 18px;
		font-weight: bold;
	}
	.input {
		width: 70%;
	}
	.input-more>input {
		margin-bottom: 16px;
	}
	input {
		font-size: 14px;
		background-color: #d5d5d5;
		height: 40px;
		line-height: 40px;
		border-radius: 10px;
		outline: 0;
		padding: 0 15px;
	}
	.options-button {
		position: relative;
		width: 48px;
		height: 24px;
		border: 1px solid #d5d5d5;
		border-radius: 12px;
	}
	.options-ball {
		position: absolute;
		top: 0;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background-color: #d5d5d5;
	}
	.button-container {
		margin-top: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.bottom-nav-button {
		margin: 0;
		border: none;
		background-color: #ff370f;
		color: #fff;
		border-radius: 20px;
		font-size: 16px;
		padding: 0 100px;
	}

	.transition {
		transition-property: all;
		transition-duration: 0.5s;
		transition-timing-function: cubic-bezier(0.4,0,0.4,1);
		transition-delay: 0s;
	}
</style>
