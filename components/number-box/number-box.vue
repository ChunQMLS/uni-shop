<template>
	<view class="number-box-option" v-show="disabled">
		<view class="decrease-button-container" @click="decrease">
			<text class="decrease-button">-</text>
		</view>
		<view class="number-box-show" @click="inputBoxHandler">
			<view class="number-box-wrapper">
				{{number}}
			</view>
		</view>
		<view class="increase-button-container" @click="increase">
			<text class="increase-button">+</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'number-box',
		props:{
			number:{
				type: Number,
				default: 1
			},
			min:{
				type: Number,
				default: 1
			},
			max:{
				type: Number,
				default: 10
			},
			disabled:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				inputBoxShow: false
			}
		},
		methods:{
			decrease(){
				let number = this.number-1
				if(number<this.min || number>this.max) return
				this.$emit('number-change',number)
			},
			increase(){
				let number = this.number+1
				if(number<this.min || number>this.max) return
				this.$emit('number-change',number)
			},
			inputBoxHandler(){
				this.$emit('number-input')
			}
		}
	}
</script>

<style scoped>
	.number-box-option {
		display: flex;
		/* align-items: center; */
	}
	.number-input {
		width: 24px;
		height: 18px;
		min-width: 24px;
		text-align: center;
	}
	.decrease-button, .increase-button {
		line-height: 20px;
		font-size: 20px;
		font-weight: 300;
		cursor: pointer;
	}
	.number-input {
		border: 1px solid #7c7c7c;
	}
	.decrease-button-container, .increase-button-container {
		border-top: 1px solid #7c7c7c;
		border-bottom: 1px solid #7c7c7c;
	}
	.decrease-button-container {
		border-left: 1px solid #7c7c7c;
		border-radius: 8px 0 0 8px;
	}
	.increase-button-container {
		border-right: 1px solid #7c7c7c;
		border-radius: 0 8px 8px 0;
	}
	.decrease-button-container, .increase-button-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 0 8px;
	}
	.number-box-show {
		width: 40px;
		height: 26px;
		border: 1px solid #7c7c7c;
		text-align: center;
		text-align: center;
		font-size: 14px;
	}
	.number-box-wrapper {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: center;
	}
</style>