export default {
	// 开启命名空间
	namespaced: true,
	
	// state数据
	state: {
		// 每个购物车商品对象包含 6个 属性：
		// {goods_id,goods_name,goods_count,goods_small_logo,goods_state}
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
		
	},
	
	// actions方法
	// actions:{
		
	// },
	
	// mutations方法
	mutations:{
		// 添加商品到购物车
		addToCart(state,goods){
			// 判断state.cart是否存在该商品，存在findResult则为查找到的对象，否则为undefined
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			// 如果购物车没有该商品则添加进cart，否则更新cart中该商品的数量
			if(!findResult){
				state.cart.push(goods)
			}else {
				findResult.goods_count++
			}
			// 调用方法保存 cart 到本地
			this.commit('m_cart/saveToStorage')
		},
		
		//  保存state cart 到localStorage
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		
		// 修改商品勾选状态
		updateState(state,goods){
			// 寻找修改目标
			const target = state.cart.find(x => x.goods_id === goods.goods_id)
			// 修改状态
			target.goods_state = goods.goods_state
			// 调用方法保存 cart 到本地
			this.commit('m_cart/saveToStorage')
		},
		
		// 修改全部商品勾选状态
		updateStateAll(state,checkAll){
			// 使所有商品的状态与 checkAll 相反
			state.cart.forEach( x => x.goods_state = !checkAll)
			// 调用方法保存 cart 到本地
			this.commit('m_cart/saveToStorage')
		},
		
		// 修改商品数量
		updateNumber(state,goods){
			// 寻找修改目标
			const target = state.cart.find(x => x.goods_id === goods.goods_id)
			// 修改商品数量
			target.goods_count = goods.goods_count
			// 调用方法保存 cart 到本地
			this.commit('m_cart/saveToStorage')
		},
		
		// 删除购物车商品
		removeGoodById(state,goods_id){
			// 通过 filter 过滤
			state.cart = state.cart.filter( x => x.goods_id !== goods_id )
			// 调用方法保存 cart 到本地
			this.commit('m_cart/saveToStorage')
		}
	},
	
	// getters属性
	getters:{
		// 计算购物车商品的数量
		total(state){
			let count = 0
			state.cart.forEach( goods => count += goods.goods_count)
			return count
		},
		
		// 计算选中的商品数量
		checkedTotal(state){
			let count = 0
			state.cart.forEach( (goods) => {
				if(goods.goods_state) count += goods.goods_count
			})
			return count
		},
		
		// 购物车全选
		checkAll(state){
			return !state.cart.some( x => x.goods_state === false)
		},
		
		// 结算金额
		settlementAmount(state){
			let price = 0
			state.cart.forEach( (goods) => {
				if(goods.goods_state) price += goods.goods_count*goods.goods_price
			})
			return price
		},
		
		// 选中的商品
		checkedGoods(state){
			return state.cart.filter( x => x.goods_state === true)
		}
	}
}