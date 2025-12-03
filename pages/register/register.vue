<template>
	<view class="register-page">
		<!-- 背景装饰 -->
		<view class="bg-decoration"></view>
		
		<!-- 主要内容区 -->
		<view class="register-content">
			<!-- 返回按钮 -->
			<view class="back-btn" @click="goBack">
				<uni-icons type="left" size="24" color="#fff"></uni-icons>
			</view>
			
			<!-- Logo和标题 -->
			<view class="logo-section">
				<text class="logo-title">极吧</text>
				<text class="logo-subtitle">极拉更好的生活</text>
			</view>
			
			<!-- 注册表单 -->
			<view class="register-form">
				<!-- 用户名输入 -->
				<view class="input-group">
					<uni-icons type="person" size="20" color="#999"></uni-icons>
					<input 
						class="input-field" 
						type="text" 
						v-model="name" 
						placeholder="请输入用户名"
						maxlength="12"
					/>
				</view>
				
				<!-- 手机号输入 -->
				<view class="input-group">
					<uni-icons type="phone" size="20" color="#999"></uni-icons>
					<input 
						class="input-field" 
						type="text" 
						v-model="phone" 
						placeholder="请输入手机号码"
						maxlength="11"
					/>
				</view>
				
				<!-- 密码输入 -->
				<view class="input-group">
					<uni-icons type="locked" size="20" color="#999"></uni-icons>
					<input 
						class="input-field" 
						:password="!showPassword"
						v-model="password" 
						placeholder="请输入密码"
						maxlength="16"
					/>
				</view>
				
				<!-- 确认密码输入 -->
				<view class="input-group">
					<uni-icons type="locked" size="20" color="#999"></uni-icons>
					<input 
						class="input-field" 
						:password="!showConfirmPassword"
						v-model="confirmPassword" 
						placeholder="请再次输入密码"
						maxlength="16"
					/>
				</view>
				
				<!-- 操作链接 -->
				<view class="action-links">
					<text class="link-text login-link" @click="goLogin">已有账号?去登录</text>
				</view>
				
				<!-- 注册按钮 -->
				<button class="register-btn" @click="handleRegister">注册</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			phone: '',
			password: '',
			confirmPassword: '',
			showPassword: false,
			showConfirmPassword: false
		}
	},
	methods: {
		// 注册处理
		handleRegister() {
			// 表单验证 - 用户名
			if (!this.name || !this.name.trim()) {
				uni.showToast({
					title: '请输入用户名',
					icon: 'none'
				});
				return;
			}
			
			// 用户名格式验证：以字母或中文开头，2-12个字符
			if (!/^[a-zA-Z\u4e00-\u9fa5].{1,11}$/.test(this.name.trim())) {
				uni.showToast({
					title: '用户名格式错误（以字母或中文开头，2-12个字符）',
					icon: 'none'
				});
				return;
			}
			
			// 表单验证 - 手机号
			if (!this.phone || !this.phone.toString().trim()) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			
			// 手机号转为字符串并验证格式
			const phoneStr = this.phone.toString().trim();
			if (!/^1[3589]\d{9}$/.test(phoneStr)) {
				uni.showToast({
					title: '手机号格式不正确',
					icon: 'none'
				});
				return;
			}
			
			// 表单验证 - 密码
			if (!this.password || !this.password.trim()) {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return;
			}
			
			if (this.password.length < 6 || this.password.length > 16) {
				uni.showToast({
					title: '密码长度为6-16位',
					icon: 'none'
				});
				return;
			}
			
			// 表单验证 - 确认密码
			if (!this.confirmPassword || !this.confirmPassword.trim()) {
				uni.showToast({
					title: '请确认密码',
					icon: 'none'
				});
				return;
			}
			
			if (this.password !== this.confirmPassword) {
				uni.showToast({
					title: '两次密码输入不一致',
					icon: 'none'
				});
				return;
			}
			
			// 调用注册API
			uni.showLoading({
				title: '注册中...'
			});
			
			// 准备请求数据
			const requestData = {
				name: this.name.trim(),
				phone: phoneStr,
				password: this.password,
				confirm: this.confirmPassword
			};
			
			uni.request({
				url: '/api/user/reg',
				method: 'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: requestData,
				success: (res) => {
					uni.hideLoading();
					
					console.log('注册响应:', res);
					
					if (res.data && res.data.code === 0) {
						// 注册成功
						uni.showToast({
							title: '注册成功',
							icon: 'success'
						});
						
						// 延迟跳转到登录页
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					} else {
						// 显示后端返回的错误信息
						const errorMsg = res.data ? (res.data.message || '注册失败') : '注册失败';
						console.error('注册失败:', errorMsg, res.data);
						uni.showToast({
							title: errorMsg,
							icon: 'none',
							duration: 2000
						});
					}
				},
				fail: (err) => {
					uni.hideLoading();
					console.error('注册请求失败:', err);
					uni.showToast({
						title: '网络错误，请稍后重试',
						icon: 'none'
					});
				}
			});
		},
		
		// 返回上一页
		goBack() {
			uni.navigateBack();
		},
		
		// 跳转到登录页
		goLogin() {
			uni.navigateBack();
		}
	}
}
</script>

<style scoped lang="scss">
.register-page {
	width: 100%;
	min-height: 100vh;
	background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
	position: relative;
	overflow: hidden;
}

.bg-decoration {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 600rpx;
	height: 600rpx;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	filter: blur(100rpx);
}

.register-content {
	position: relative;
	z-index: 1;
	padding: 60rpx 60rpx 100rpx;
}

.back-btn {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 40rpx;
}

.logo-section {
	text-align: center;
	margin-bottom: 80rpx;
	
	.logo-title {
		display: block;
		font-size: 80rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
		letter-spacing: 10rpx;
	}
	
	.logo-subtitle {
		display: block;
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.9);
	}
}

.register-form {
	.input-group {
		display: flex;
		align-items: center;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 50rpx;
		padding: 20rpx 30rpx;
		margin-bottom: 30rpx;
		
		.input-field {
			flex: 1;
			margin-left: 20rpx;
			font-size: 28rpx;
			color: #333;
		}
	}
	
	.action-links {
		display: flex;
		justify-content: flex-start;
		margin: 20rpx 0 40rpx;
		padding: 0 10rpx;
		
		.link-text {
			font-size: 26rpx;
		}
		
		.login-link {
			color: #ff6b6b;
		}
	}
	
	.register-btn {
		width: 100%;
		height: 90rpx;
		background: linear-gradient(90deg, #6c63ff 0%, #8b7fff 100%);
		border-radius: 50rpx;
		color: #fff;
		font-size: 32rpx;
		font-weight: bold;
		border: none;
		box-shadow: 0 10rpx 30rpx rgba(108, 99, 255, 0.3);
		
		&:active {
			opacity: 0.8;
		}
	}
}
</style>
