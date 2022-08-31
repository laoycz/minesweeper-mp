<template>
  <view class="content">
    <view>
      <navigator url="/pages/home/index" open-type="redirect">
        <button>开始游戏</button>
      </navigator>
    </view>
    <view>
      <image
        v-for="n in 8"
        :key="n"
        style="width: 40rpx; height: 40rpx; padding-top: 30rpx"
        :src="`/static/count${n}.png`"
      ></image>
    </view>
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

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
</style>
