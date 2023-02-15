import Vue from 'vue'
import App from './App'

// 引入配置好的request
import $http from './request'

// 挂载
uni.$http = $http

// 引入store
import store from 'store/store.js'

// 封装一些方法
uni.$showMsg = function (title='数据请求失败！',duration=2000){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
