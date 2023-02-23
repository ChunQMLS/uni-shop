export default {
	// 开启命名空间
	namespaced: true,
	
	// state 数据
	state:{
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '[]' ),
		
		// 用户token
		token: uni.getStorageSync('token') || null,
		
		// 用户的基本信息
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
	},
	
	// mutations方法
	mutations:{
		
		// 更新收获地址信息
		updateAddress(state,address){
			const findResult = state.address.find( x=> x.id === address.id)
			if(address.default){
				state.address.find((x)=>{
					if(x.default === true) x.default = false
				})
			}
			if(!findResult){
				state.address.push(address)
			}else{
				 Object.keys(findResult).forEach((x)=>{
					 if(findResult[x] !== address[x]) findResult[x] = address[x]
				 })
			}
			// 调用方法保存 user 到本地
			this.commit('m_user/saveAddressToStorage')
		},
		
		//  保存state address 到localStorage
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		
		// 更新用户信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		
		//  保存state userinfo 到localStorage
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		
		// 保存token
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		
		//  保存state token 到localStorage
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
	},
	
	// getters属性
	getters:{
		defaultAddress(state){
			const target = state.address.find( x => x.default === true)
			return typeof(target) === 'undefined' ? {} : target
		}
	}
}