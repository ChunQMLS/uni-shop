<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
			<search autofocus="true" @getSearchList="getSearchList"></search>
		</view>
		
		<!-- 列表渲染 -->
		<view class="suggest-list" v-if="results.length !== 0">
			<view class="suggest-item" v-for="(item,index) in results" :key="index" @click="shiftDetail(item.goods_id)" >
				<uni-icons class="search-icon" type="search" size="18"></uni-icons>
				<view class="goods-name">
					{{item.goods_name}}
				</view>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clear" ></uni-icons>
			</view>
			<!-- 列表 -->
			<view class="history-list">
				<uni-tag class="history-item" :text="item" v-for="(item,index) in historyList" :key="index" @click="shiftGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				results: [],
				historyList:[]
			};
		},
		created() {
			// 读取本地的搜索记录
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			// input 输入事件
			async getSearchList(searchVal){
				// 如果搜索关键词为空则不执行
				if(searchVal === ''){
					this.results = []
					return
				}
				// 发起请求
				const {data : res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query: searchVal})
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.results = res.message
				this.saveSearchHistory(searchVal)
			},
			
			// 跳转到商品页面
			shiftDetail(goods_id){
				uni.navigateTo({
					url: `/subpkg/goods_details/goods_details?goods_id=${goods_id}`
				})
			},
			
			// 保存搜索关键词
			saveSearchHistory(searchVal){
				// 保存并去重
				this.historyList.unshift(searchVal)
				this.historyList = [...new Set(this.historyList)]
				// 保存到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			
			// 清空历史记录
			clear(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			
			// 跳转到商品列表
			shiftGoodsList(keyword){
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?query=${keyword}`
				})
			}
		}
	}
</script>

<style scoped>
	.search-box {
		padding: 20rpx;
		position: sticky;
		top: 0;
		z-index: 5;
		background-color: #F8F8F8;
	}
	.suggest-list {
		background-color: #fff;
	}
	.suggest-item {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: 14px;
		padding: 20rpx 0;
		margin: 0 20rpx;
		border-bottom: 1px solid #dddddd;
	}
	.search-icon {
		padding-right: 20rpx;
	}
	.goods-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.history-box {
		margin: 0 20rpx;
	}
	.history-title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.history-list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
	.history-item {
		padding: 10rpx;
	}
</style>
