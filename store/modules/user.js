export default {
	// 开启命名空间
	namespaced: true,
	
	// state 数据
	state:{
		// 收货地址
		address: JSON.parse(uni.getStorageSync('address') || '[]' )
	},
	
	// mutations方法
	mutations:{
		
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
			this.commit('m_user/saveToStorage')
		},
		
		
		
		//  保存state address 到localStorage
		saveToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
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