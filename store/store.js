// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 安装为vue的插件
Vue.use(Vuex)

// 引入自定义模块
import moduleCart from './modules/cart.js'
import moudleUser from './modules/user.js'

// 创建store实例对象
const store = new Vuex.Store({
	// 挂载store模块
	modules: {
		m_cart:moduleCart,
		m_user:moudleUser
	}
})

// 暴露对象
export default store