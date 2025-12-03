<template>
  <view class="try-item-card-wrap">
    <view class="try-item-image">
      <image :src="image" :style="'height:'+imageHeight"></image>
      <!-- 右上角标签 -->
      <view v-if="category==='tys'" class="try-item-tag tys-tag">体验师专享</view>
      <view v-else class="try-item-tag sf-tag">首发</view>
    </view>
    
    <view class="try-item-title">{{title}}</view>
    
    <view class="try-item-price-quantity">
      <view class="price-box">{{price?price:'暂无'}}</view>
      <view class="quantity-box">{{quantity}}台</view>
    </view>
    
    <view class="try-item-status">
      <view class="try-item-apply-count">
        <text class="count-num">{{applyCount}}</text>申请
      </view>
      <view v-if="status==='apply'" class="status-text apply-status">
        剩余天数{{remainDays}}天
      </view>
      <view v-else-if="status==='try'" class="status-text try-status">
        查看试用名单
      </view>
      <view v-else class="status-text end-status">
        报告数量: {{reportCount}}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "TryItemCard",
  data() {
    return {};
  },
  props: {
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    reportCount: {
      type: Number,
      required: false
    },
    applyCount: {
      type: Number,
      required: true,
      default: 0
    },
    remainDays: {
      type: Number,
      required: false,
      default: 0
    },
    status: {
      type: String,
      required: true
    },
    imageHeight: {
      type: String,
      required: false,
      default: "328rpx"
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.try-item-card-wrap {
  border-radius: 10rpx;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  
  .try-item-image {
    width: 100%;
    position: relative;
    
    image {
      width: 100%;
      display: block;
    }
    
    .try-item-tag {
      position: absolute;
      top: 0;
      right: 0;
      padding: 8rpx 20rpx;
      font-size: 24rpx;
      font-weight: bold;
    }
    
    .sf-tag {
      background-color: #ff0000;
      color: #fff;
    }
    
    .tys-tag {
      background-color: #ffff00;
      color: #333;
    }
  }
  
  .try-item-title {
    font-size: 32rpx;
    font-weight: bold;
    padding: 15rpx 20rpx 10rpx;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .try-item-price-quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10rpx 20rpx;
    gap: 15rpx;
    
    .price-box,
    .quantity-box {
      padding: 8rpx 20rpx;
      border: 2rpx solid #ccc;
      border-radius: 30rpx;
      font-size: 24rpx;
      color: #999;
    }
  }
  
  .try-item-status {
    padding: 10rpx 20rpx 20rpx;
    text-align: center;
    
    .try-item-apply-count {
      font-size: 26rpx;
      color: #666;
      margin-bottom: 8rpx;
      
      .count-num {
        color: #ff0000;
        font-weight: bold;
        font-size: 28rpx;
      }
    }
    
    .status-text {
      font-size: 24rpx;
    }
    
    .apply-status {
      color: #ff0000;
    }
    
    .try-status {
      color: #00aa00;
    }
    
    .end-status {
      color: #999;
    }
  }
}
</style>
