<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 从本地存储恢复登录状态
			try {
				const isLogin = uni.getStorageSync('isLogin');
				const userInfo = uni.getStorageSync('userInfo');
				
				if (isLogin && userInfo) {
					this.globalData.isLogin = true;
					this.globalData.userInfo = userInfo;
					this.globalData.user = userInfo;
					console.log('已恢复登录状态:', userInfo.name);
				}
			} catch (e) {
				console.error('恢复登录状态失败:', e);
			}

			// 如果没有任何登录信息，首次进入时跳转到登录页
			if (!this.globalData.isLogin) {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
			globalData:{
				imageUrl:"http://127.0.0.1:8088/image/",
				token: "",
				userInfo: null,
				isLogin: false
			}
	}
</script>

<style>
	@import url(common/iconfont.css);
	.status_bar {
	 height: var(--status-bar-height);
	 width: 100%;
	 }
</style>
