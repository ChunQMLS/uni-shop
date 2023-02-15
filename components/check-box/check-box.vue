<template>
	<view>
		<uni-icons v-show="!check" type="circle" :size="size" :color="color"></uni-icons>
		<uni-icons v-show="check" type="checkbox-filled" :size="size" :color="fillColor"></uni-icons>
	</view>
</template>

<script>
	export default {
		name:'check-box',
		props:{
			check:{
				type: Boolean,
				default: false
			},
			size:{
				type: Number,
				default: 30
			},
			color:{
				type: String,
				default: 'inherit'
			},
			fillColor:{
				type: String,
				default: 'inherit'
			},
		}
	}
</script>

<style>

</style>
