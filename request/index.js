// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

// 请求路径
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function (options){
	uni.showActionSheet({
		title: "数据加载中..."
	})
}

// 响应拦截器
$http.afterRequest = function (options){
	uni.hideLoading()
}

export default $http