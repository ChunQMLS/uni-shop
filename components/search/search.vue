<template>
	<view class="search-box" :style="{'border': `6rpx solid ${bgcolor}`}">
		<uni-icons type="search" :color="bgcolor" size="24"></uni-icons>
		<input class="search-input" type="text" :disabled="disabled" :focus="autofocus" v-model="searchVal" @input="input" @click="searchHandler" :style="{'color':textColor}">
		<uni-icons class="search-clearicon" type="clear" size="24" v-show="clearIcon" @click="clearSearchVal" ></uni-icons>
		<button class="search-button" :style="{'background': bgcolor}" @click="searchButtonHandler">搜索</button>
	</view>
</template>

<script>
	export default {
		name:"search",
		props:{
			// 是否自动获取焦点
			autofocus:{
				type: Boolean,
				default: false
			},
			// 是否禁用
			disabled:{
				type: Boolean,
				default: false
			},
			// 背景颜色
			bgcolor:{
				type: String,
				default: '#ffe147'
			},
			// 文字颜色
			textColor:{
				type: String,
				default: '#858585'
			}
		},
		data() {
			return {
				searchVal: '',
				clearIcon: false
			};
		},
		methods:{
			// 搜索框点击回调
			searchHandler(){
				this.$emit('click')
			},
			
			// 搜索框回调
			input(){
				if(this.searchVal.length !== 0){
					this.clearIcon = true
				}else {
					this.clearIcon = false
				}
				
				this.$emit('getSearchList',this.searchVal)
			},
			
			// 清空搜索框
			clearSearchVal(){
				this.searchVal = ''
				this.$emit('getSearchList',this.searchVal)
			},
			
			// 搜索按钮回调
			searchButtonHandler(){
				this.$emit('shiftGoodsList',this.searchVal)
			}
		}
	}
</script>

<style scoped>
	.search-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60rpx;
		border-radius: 100rpx;
		background-color: #fff;
	}
	.search-input {
		flex: 1;
		font-size: 26rpx;
	}
	.search-clearicon {
		padding: 0 20rpx;
	}
	.search-button {
		margin: 2rpx;
		border-radius: 30rpx;
		color: #fff;
		font-size: 28rpx;
		line-height: 2;
	}
	.search-button::after {
		border: none;
	}
</style>