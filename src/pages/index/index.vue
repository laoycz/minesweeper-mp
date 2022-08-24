<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">扫雷</text>
    </view>
    <view>
      <navigator url="/pages/home/index" open-type="redirect">
        <button>开始游戏</button>
      </navigator>
    </view>
    <view>
      <image
        v-for="n in 8"
        :key="n"
        style="width: 40rpx; height: 40rpx"
        :src="`/static/count${n}.png`"
      ></image>
    </view>
    <!-- :style="`background-image: url('../../static/count1.png')`" -->
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
  mounted() {},
});
</script>

<style>
.start {
  width: 80rpx;
  height: 50rpx;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
