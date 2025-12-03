<template>

	<view class="status_bar"></view>
	<view class="uni-margin-wrap">
		<swiper class="swiper" indicator-dots="true" autoplay="true" duration="500" interval="2000" circular="true">

			<swiper-item v-for="(img,index) in carousel" :key="index">
				<view class="swiper-item uni-bg-red">
					<image :src="imageUrl+img"></image>
				</view>

			</swiper-item>
		</swiper>
	</view>
	<view class="search-bar">
		<view class="iconfont icon-search mysearch"></view>
		<view class="">
			<input @focus="gotoSearch" type="text" placeholder="手机/游戏机/关键字" />
		</view>
	</view>
	<view class="split"></view>
	<title-bar icon="icon-shangpin2" title="酷玩商品" page="/pages/cool/cool"></title-bar>
	<view class="cool-items-wrap">
		<view class="cool-item-view" v-for="item in coolItems" :key="item.id" @tap="gotoDetail">
				<cool-item-card @clickthumb="doThumb(item)" 
				 :id="item.id" :name="item.name" :title="item.title" :price="item.price"
					:thumb-count="item.thumbCount" :comment-count="item.commentCount"
					:image="imageUrl+item.image" :is-thumb="item.isThumb"></cool-item-card>
			</view>
	</view>
	<view class="split"></view>
	<title-bar icon="icon-baogao" title="导购商品" page="/pages/guide/guide"></title-bar>
	<view class="guide-items-wrap">
		<view class="guide-item-view" v-for="g in guideItems" :key="g.id" @tap="gotoGuideDetail(g.id)">
			<guide-item-card
				@clickthumb="handleGuideThumb(g)"
				:id="g.id"
				:title="g.title"
				:thumb-count="g.thumbCount"
				:comment-count="g.commentCount"
				:image="imageUrl+g.image"
				:is-thumb="g.isThumb">
			</guide-item-card>
		</view>
	</view>
	<view class="split"></view>
	<view>
		<title-bar icon="icon-baogao" title="报告精选" page="/pages/report/report" :is-tab="false"></title-bar>
	</view>

	

</template>

<script>
	import TitleBar from '../../components/TitleBar.vue';
	import CoolItemCard from '../../components/CoolItemCard.vue';
	import GuideItemCard from '../../components/GuideItemCard.vue';
	export default {
			data() {
				return {
					imageUrl: "",
					user: null,
					carousel: ["k1.jpg", "k2.jpg",
						"k3.jpg", "k4.jpg"
					],
					interval: 2000,
					coolItems: [],
					guideItems: [],
				}
			},
		components: {
			TitleBar,
			CoolItemCard,
			GuideItemCard
		},
			onLoad() {
				this.imageUrl = getApp().globalData.imageUrl;
				this.user = getApp().globalData.user;
			// console.log(this.imageUrl);
			uni.request({
				url: "/api/coolitem/search",
				data: {
					order: 'hot',
					pno: 1,
					size: 4,
				},
				success:(resp) =>{
					console.log(resp.data.data.list);
					// 确保 isThumb 是布尔值
					if(resp.data.data.list) {
						resp.data.data.list.forEach(item => {
							item.isThumb = !!item.isThumb; // 转换为布尔值
						});
					}
					this.coolItems = resp.data.data.list;
				},
				fail: function(resp) {
					uni.showToast({
						title: "出现错了"
					})
				}
			})
			// 加载导购商品列表
			uni.request({
				url: "/api/guide/search",
				data: {
					order: 'hot',
					pno: 1,
					size: 4,
				},
				success:(resp) =>{
					if(resp.data && resp.data.data && resp.data.data.list){
						const list = resp.data.data.list;
						list.forEach(it => {
							it.isThumb = !!it.isThumb;
						});
						this.guideItems = list;
					}
				},
				fail: function() {
					uni.showToast({
						title: "导购加载失败"
					})
				}
			})
			},
			onShow() {
				this.user = getApp().globalData.user;
				// 如果用户登录状态改变，重新加载数据以更新点赞状态
				if(this.user) {
					this.coolItems = [];
					uni.request({
						url: "/api/coolitem/search",
						data: {
							order: 'hot',
							pno: 1,
							size: 4,
						},
						success:(resp) =>{
							// 确保 isThumb 是布尔值
							if(resp.data.data.list) {
								resp.data.data.list.forEach(item => {
									item.isThumb = !!item.isThumb; // 转换为布尔值
								});
							}
							this.coolItems = resp.data.data.list;
						}
					});
				}
			},
			methods: {
			gotoSearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			gotoDetail(){
				uni.navigateTo({
					url:"/pages/cooldetail/cooldetail"
				})
			},
			gotoGuideDetail(id){
				uni.navigateTo({
					url:"/pages/guidedetail/guidedetail?id="+id
				})
			},
				doThumb(data) {
					if (this.user == null) {
						uni.showToast({
							title: "请先登录！",
							icon: "error"
						});
						return;
					}
					let op = data.isThumb ? "cancel" : "add";
					uni.request({
						url: "/api/coolthumb/" + op,
						data: { itemId: data.id },
						success: (resp) => {
							if (resp.data.code) {
								uni.showToast({
									title: resp.data.message,
									icon: "error"
								});
							}
							if (resp.data.code == 600) {
								if (op == "add") {
									data.isThumb = true;
								}
							} else {
								if (op == "add") {
									data.isThumb = true;
									data.thumbCount++;
								} else {
									data.isThumb = false;
									data.thumbCount--;
								}
							}
							uni.showToast({
								title: "操作成功！",
								icon: "success"
							});
						},
						fail: function (resp) {}
					});
				},
				handleGuideThumb(item){
					if(this.user == null) {
						uni.showToast({
							title: "请先登录！",
							icon: "error"
						});
						return;
					}
					let op = item.isThumb ? "cancel" : "add";
					uni.request({
						url: "/api/guidethumb/" + op,
						data: { guideId: item.id },
						success: (resp) => {
							if(resp.data.code) {
								uni.showToast({
									title: resp.data.message,
									icon: "error"
								});
							}
							if(resp.data.code == 600) {
								if(op == "add") {
									item.isThumb = true;
								}
							}
							else {
								if(op == "add") {
									item.isThumb = true;
									item.thumbCount++;
								}
								else {
									item.isThumb = false;
									item.thumbCount--;
								}
							}
							uni.showToast({
								title: "操作成功！",
								icon: "success"
							});
						},
						fail: function(resp) {}
					});
				}
		}
		}
</script>
<style scoped>
	/* .split {
		height: 20px;

	} */

	.search-bar {
		width: 80%;
		margin: 20rpx 10%;
		position: fixed;
		top: 0;
		background-color: rgba(255, 255, 255, .6);
		border-radius: 30rpx;
		height: 60rpx;
		padding: 8rpx;
		box-sizing: border-box;
	}

	.search-bar view {
		float: left;
	}

	.search-bar .mysearch {
		font-size: 40rpx;
		color: deepskyblue;
	}

	.search-bar input {
		padding-left: 20rpx;
	}

	.uni-margin-wrap .swiper {
		width: 750rpx;
		height: 375rpx;
	}

	.uni-margin-wrap .swiper image {
		width: 100%;
		height: 375rpx;

	}

	.myicon {
		front: saize 48px;
		color: red;
	}
</style>