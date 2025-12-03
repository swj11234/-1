<template>
	<view class="mine-wrap">
		<!-- 上半部分 -->
		<view class="top-wrap">
			<!-- 未登录状态 -->
			<view v-if="user==null" class="not-logined">
				<view class="head">
					<uni-icons type="contact" size="100" color="gray"></uni-icons>
				</view>
				<view class="name" @tap="gotoLogin">点击登录</view>
			</view>
			
			<!-- 已登录状态 -->
			<view v-else class="logined">
				<view class="head">
					<image v-if="user.image && user.image !== 'default-avatar.png'" :src="imageUrl+user.image" mode="aspectFill" @error="handleImageError"></image>
					<uni-icons v-else type="contact" size="100" color="#fff"></uni-icons>
				</view>
				<view class="edit-image">
					<uni-icons type="compose" color="blueviolet"></uni-icons>
				</view>
				<view class="name">{{user.name}}</view>
					<view class="user-info">
						<text class="white">关注</text>
						<text class="blueviolet">{{user.followCount || 0}}</text>
						<text class="white">|</text>
						<text class="white">粉丝</text>
						<text class="blueviolet">{{user.fansCount || 0}}</text>
					</view>
			</view>
		</view>
		
		<!-- 下半部分 - 仅登录后显示 -->
			<view v-if="user!=null" class="bottom-wrap">
				<view class="user-item">
					<view>
						<uni-icons type="list" color="blueviolet"></uni-icons>
					</view>
					<view>我的订单 (1)</view>
					<view>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
				<view class="user-item">
					<view>
						<uni-icons type="heart" color="blueviolet"></uni-icons>
					</view>
					<view>我的关注 (2)</view>
					<view>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
				<view class="user-item">
					<view>
						<uni-icons type="star" color="blueviolet"></uni-icons>
					</view>
					<view>我的发布 (3)</view>
					<view>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
				<view class="user-item">
					<view>
						<uni-icons type="wallet" color="blueviolet"></uni-icons>
					</view>
					<view>我的收藏 (4)</view>
					<view>
						<uni-icons type="right"></uni-icons>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import UniIcons from '@/components/uni-icons/uni-icons.vue';
	export default {
		data() {
			return {
				user: null,
				imageUrl: ""
			}
		},
		components: {
			UniIcons
		},
		onLoad() {
			this.imageUrl = getApp().globalData.imageUrl;
			// 检查登录状态，不要直接设置为 null
			this.checkLoginStatus();
		},
		onShow() {
			// 每次页面显示时检查登录状态
			this.checkLoginStatus();
		},
		methods: {
			gotoLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			handleImageError(e) {
				// 图片加载失败时使用默认图标
				console.log('图片加载失败', e);
			},
			checkLoginStatus() {
				// 从全局数据或本地存储获取登录状态
				const app = getApp();
				let userInfo = null;
				
				console.log('[Mine] 检查登录状态...');
				console.log('[Mine] globalData.isLogin:', app.globalData.isLogin);
				console.log('[Mine] globalData.userInfo:', app.globalData.userInfo);
				
				// 优先从全局数据获取（用户刚刚登录后的状态）
				if (app.globalData.isLogin && app.globalData.userInfo) {
					userInfo = app.globalData.userInfo;
					console.log('[Mine] 从全局数据获取到用户信息:', userInfo.name);
				} else {
					// 如果全局数据没有，尝试从本地存储恢复
					console.log('[Mine] 全局数据为空，尝试从本地存储恢复...');
					try {
						const isLogin = uni.getStorageSync('isLogin');
						const storedUserInfo = uni.getStorageSync('userInfo');
						console.log('[Mine] localStorage isLogin:', isLogin);
						console.log('[Mine] localStorage userInfo:', storedUserInfo);
						
						if (isLogin && storedUserInfo) {
							userInfo = storedUserInfo;
							// 同时更新全局数据
							app.globalData.isLogin = true;
							app.globalData.userInfo = userInfo;
							app.globalData.user = userInfo;
							console.log('[Mine] 已从本地存储恢复用户信息:', userInfo.name);
						} else {
							console.log('[Mine] 本地存储中没有登录信息');
						}
					} catch (e) {
						console.error('[Mine] 恢复登录状态失败:', e);
					}
				}
				
				if (userInfo) {
					// 后端返回的字段：id, name, phone, image, state
					this.user = {
						id: userInfo.id,
						name: userInfo.name || '用户',
						image: userInfo.image || null,
						phone: userInfo.phone,
						followCount: userInfo.followCount || 0,
						fansCount: userInfo.fansCount || 0
					};
				} else {
					this.user = null;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.mine-wrap {
		width: 100%;
		min-height: 100vh;
		background-color: #f5f5f5;
	}
	
	.top-wrap {
		height: 480rpx;
		background-color: #3cc51f;
		
		.logined {
			position: relative;
			
			.head {
				width: 200rpx;
				position: relative;
				margin: 0 auto;
				top: 50rpx;
				
				image {
					width: 100%;
					height: 200rpx;
					border-radius: 50%;
				}
			}
			
			.edit-image {
				position: absolute;
				top: 50rpx;
				left: 400rpx;
			}
			
			.name {
				width: 200rpx;
				position: relative;
				margin: 0 auto;
				top: 50rpx;
				text-align: center;
				font-size: 40rpx;
				color: #fff;
			}
			
			.user-info {
				width: 50%;
				margin: 70rpx auto 0;
				text-align: center;
				
				.white {
					color: #fff;
				}
				
				.blueviolet {
					color: blueviolet;
				}
			}
		}
		
		.not-logined {
			.head {
				width: 200rpx;
				position: relative;
				margin: 0 auto;
				top: 50rpx;
			}
			
			.name {
				width: 200rpx;
				position: relative;
				margin: 0 auto;
				top: 50rpx;
				text-align: center;
				font-size: 40rpx;
				color: lightgrey;
			}
		}
	}
	
		.bottom-wrap {
			.user-item {
				border-bottom: 2rpx solid #ccc;
				padding: 10rpx;
				view {
					float: left;
					height: 60rpx;
					line-height: 60rpx;
					margin-right: 20rpx;
				}
				view:last-child {
					float: right;
				}
			}
			.user-item::after {
				content: "";
				display: block;
				clear: both;
			}
		}
</style>
