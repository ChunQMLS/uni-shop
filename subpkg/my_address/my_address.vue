<template>
	<view>
		<view class="address-container">
			<view class="address-item" v-for="(item,index) in address" :key="index">
				<uni-icons class="icon location-filled" type="location-filled" color="#fc500b" size="30"></uni-icons>
				<view class="receiver-address-info" @click="chooseAddress(item)">
					<view class="recipients-info">
						<view class="user-name">
							{{item.userName}}
						</view>
						<view class="tel-number">
							{{item.telNumber}}
						</view>
						<view class="default" v-show="item.default">
							默认
						</view>
					</view>
					<view class="receiver-address">
						<text class="province-name">
							{{item.provinceName}}
						</text>
						<text class="city-name">
							{{item.cityName}}
						</text>
						<text class="county-name">
							{{item.countyName}}
						</text>
						<text class="street-name">
							{{item.streetName}}
						</text>
						<text class="detail-info">
							{{item.detailInfo}}
						</text>
					</view>
				</view>
				<uni-icons class="icon forward" @click="shiftAddressEditing(item)" type="refreshempty" color="#9e9e9e" size="20"></uni-icons>
			</view>
		</view>
		<view class="bottom-nav" @click="shiftAddressEditing()">
			<button class="bottom-nav-button">+ 添加收货地址</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState('m_user',['address'])
		},
		methods: {
			shiftAddressEditing(address){
				uni.navigateTo({
					url: typeof(address) === "undefined" ? `/subpkg/address_editing/address_editing?address=${address}` : '/subpkg/address_editing/address_editing?address='+encodeURIComponent(JSON.stringify(address))
				})
			},
			
			chooseAddress(address){
				let pages = getCurrentPages()
				let nowPage = pages[pages.length - 1]
				let prevPage = pages[pages.length - 2]
				prevPage.$vm.prevDateFun(address)
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	.address-container {
		margin: 10px 6px;
		border-radius: 10px;
		background-color: #fff;
		padding: 0 10px;
	}
	.address-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 0;
	}
	.receiver-address-info {
		margin: 0 10px;
	}
	.recipients-info {
		display: flex;
		align-items: flex-end;
	}
	.receiver-address {
		display: inline-block;
		font-size: 14px;
	}
	.recipients-info>view,.receiver-address>text {
		margin-right: 6px;
	}
	.user-name {
		font-size: 16px;
		font-weight: bold;
	}
	.tel-number {
		font-size: 12px;
		color: #9e9e9e;
	}
	.bottom-nav {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fefefe;
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
</style>
