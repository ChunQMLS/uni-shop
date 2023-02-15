// 引入vuex mapGetters 方法
import { mapGetters } from 'vuex'

export default {
	computed:{
		...mapGetters('m_cart',['total'])
	},
	watch:{
		// 监听 total 值的变化
		total(){
			this.setBadge()
		}
	},
	onShow(){
		this.setBadge()
	},
	methods:{
		// 设置 cart 数字徽标
		setBadge(){
			// 调用 uni.setTabBarBadge 设置徽标
			uni.setTabBarBadge({
				index: 2,
				text: String(this.total) || ''
			})
		}
	}
}