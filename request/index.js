// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
// 引入Store
import store from '@/store/store.js'

// 请求路径
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function (options){
	uni.showLoading({
		title: "数据加载中..."
	})
	// 判断当前请求的是否为有权限的接口
	if(options.url.indexOf('/my/') !== -1){
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
}

// 响应拦截器
$http.afterRequest = function (options){
	uni.hideLoading()
}

export default $http