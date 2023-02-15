<template>
	<view class="update-box" v-if="show">
		<view class="update-box-hint">
			{{hint}}
		</view>
		<input class="input-box" :disabled="disabled" type="number" v-model="outputContent" @input="_onInput">
		<view class="update-box-options">
			<button class="button" @click="cancelHandler">取消</button>
			<button class="button" @click="confirmHandler">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"number-update-box",
		props:{
			show:{
				type: Boolean,
				default: false
			},
			hint:{
				type: String,
				default: ''
			},
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
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				outputContent: 0
			}
		},
		watch:{
			number:{
				handler(newVal,oldVal){
					this.outputContent = newVal
				},
				immediate: true
			}
		},
		methods:{
			confirmHandler(){
				this.$emit('handler',{
					choose: true,
					value: this.outputContent
				})
			},
			cancelHandler(){
				this.$emit('handler',{
					choose: false
				})
			},
			_onInput(e){
				let value = parseInt(e.detail.value)
				if(value === NaN){
					this.$nextTick(function (){
						this.outputContent = this.outputContent
					})
					return
				}else if(value < this.min) {
					value = this.min
				}else if(value >= this.max) {
					value = this.max
				}
				this.$nextTick(function (){
					this.outputContent = Math.floor(value)
				})
			}
		}
	}
</script>

<style scoped>
	.update-box {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 250px;
		height: 100px;
		margin: auto;
		padding: 20px 20px;
		background-color: #fff;
		border-radius: 10px;
		z-index: 11;
	}
	.update-box-hint {
		font-size: 18px;
	}
	.input-box {
		border-bottom: 1px solid #ff3300;
	}
	.update-box-options {
		display: flex;
	}
	.button {
		padding: 9px 15px;
		font-size: 14px;
		line-height: 1;
		color: #ff3300;
		background: rgba(0, 0, 0, 0);
	}
	button::after {
		border: none;
	}
</style>