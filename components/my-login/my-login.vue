<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100"></uni-icons>
		<button class="button-login" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			
			getUserInfo(e){
				if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权')
				this.updateUserInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			
			
			async getToken(info){
				// 获取code
				const [err,res] = await uni.login().catch(err => err)
				if(res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！')
				
				// 准备参数
				const param = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				// 获取token
				const {data : loginRes} = await uni.$http.post('/api/public/v1/users/wxlogin', param)
				if(loginRes.meta.status !== 200) return uni.$showMsg('登录失败！')
				
				// 保存token到vuex
				this.updateToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ6eHk4NDQ4Mjc0MzgiLCJleHAiOjE2NzcxNDc0MzQsImlhdCI6MTY3NzE0MDIzNH0.WZuTiiZ2mz-N9dEWKBQvwvXpzO1sae0V8lfyGV6Sc2U')
			}
		}
	}
</script>

<style scoped>
	.login-container {
		height: 500px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.button-login {
		margin: 10px 20px;
		padding: 10px 0;
		border: none;
		background-color: #ff370f;
		color: #fff;
		border-radius: 20px;
		font-size: 16px;
		padding: 0 100px;
	}
</style>