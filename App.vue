<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	
	// 引入自定义icon
	@import '@/static/custom-icon/yuan/iconfont.css';
	
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}
	::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color:transparent;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
