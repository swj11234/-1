<template>
	<view class="login-page">
		<!-- Logo区域 -->
		<view class="logo-section">
			<text class="logo-title">极吧</text>
			<text class="logo-subtitle">极拉更好的生活</text>
		</view>
		
		<!-- 表单区域 -->
		<view class="form-section">
			<!-- 手机号输入 -->
			<view class="input-wrapper">
				<uni-icons type="phone" size="20" color="#999"></uni-icons>
				<input 
					class="input-field" 
					type="number" 
					placeholder="请输入手机号码" 
					v-model="phone"
					maxlength="11"
				/>
			</view>
			
			<!-- 密码输入 -->
			<view class="input-wrapper">
				<uni-icons type="locked" size="20" color="#999"></uni-icons>
				<input 
					class="input-field" 
					type="password" 
					placeholder="请输入密码" 
					v-model="password"
				/>
			</view>
			
			<!-- 链接区域 -->
			<view class="links-row">
				<text class="link-text link-left" @tap="gotoRegister">马上注册</text>
				<text class="link-text link-right">忘记密码</text>
			</view>
			
			<!-- 登录按钮 -->
			<view class="login-button" @tap="doLogin">
				<text class="button-text">登录</text>
			</view>
		</view>
		
		<!-- 第三方登录 -->
		<view class="third-party">
			<text class="third-party-text">第三方登录</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: "",
			password: ""
		};
	},
	methods: {
		doLogin() {
			// 验证手机号
			if(!this.phone) {
				uni.showToast({
					title: "请输入手机号",
					icon: "none"
				});
				return;
			}
			
			// 验证手机号格式
			const phoneReg = /^1[3-9]\d{9}$/;
			if(!phoneReg.test(this.phone)) {
				uni.showToast({
					title: "手机号格式不正确",
					icon: "none"
				});
				return;
			}
			
			// 验证密码
			if(!this.password) {
				uni.showToast({
					title: "请输入密码",
					icon: "none"
				});
				return;
			}
			
			// 调用登录API
			uni.request({
				url: "/api/user/login",
				method: "POST",
				header: {
					'Content-Type': 'application/json'
				},
				data: {
					phone: this.phone,
					password: this.password
				},
				success: (resp) => {
					if(resp.data.code == 0) {
						// 登录成功,保存用户信息
						const userData = resp.data.data;
						
						// 保存到全局数据
						getApp().globalData.user = userData;
						getApp().globalData.userInfo = userData;
						getApp().globalData.isLogin = true;
						
						// 保存到本地存储，以便页面刷新后也能读取
						uni.setStorageSync('isLogin', true);
						uni.setStorageSync('userInfo', userData);
						
						uni.showToast({
							title: "登录成功",
							icon: "success"
						});
						// 跳转到首页
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/home/home"
							});
						}, 1500);
					} else {
						uni.showToast({
							title: resp.data.message || "登录失败",
							icon: "none"
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: "网络错误",
						icon: "none"
					});
				}
			});
		},
		gotoRegister() {
			uni.navigateTo({
				url: "/pages/register/register"
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.login-page {
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150rpx;
}

.logo-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 80rpx;
	
	.logo-title {
		font-size: 80rpx;
		font-weight: bold;
		color: #fff;
		letter-spacing: 10rpx;
		margin-bottom: 20rpx;
	}
	
	.logo-subtitle {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.9);
	}
}

.form-section {
	width: 600rpx;
	
	.input-wrapper {
		width: 100%;
		height: 90rpx;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		
		.input-field {
			flex: 1;
			margin-left: 20rpx;
			font-size: 28rpx;
			color: #333;
		}
	}
	
	.links-row {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		margin-bottom: 50rpx;
		
		.link-text {
			font-size: 26rpx;
			color: rgba(255, 255, 255, 0.9);
		}
		
		.link-left {
			color: #6c63ff;
		}
		
		.link-right {
			color: #ff6b9d;
		}
	}
	
	.login-button {
		width: 100%;
		height: 90rpx;
		background: linear-gradient(90deg, #6c63ff 0%, #8b7fff 100%);
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 10rpx 30rpx rgba(108, 99, 255, 0.3);
		
		.button-text {
			font-size: 32rpx;
			color: #fff;
			font-weight: bold;
		}
	}
}

.third-party {
	margin-top: 100rpx;
	
	.third-party-text {
		font-size: 26rpx;
		color: rgba(255, 255, 255, 0.8);
	}
}
</style>
