<template>
  <view>
    <view>
      <view class="bg digit" style="background-position: 0 0"></view>
    </view>
    <view></view>
  </view>
</template>
<script lang="ts">
import Matrix from "./Matrix";
import Game from "./Game";
import { distribute, fill, fillStatus } from "./Zone";
import type { StyleValue } from "vue";
import { defineComponent } from "vue";
import type { status } from "./Zone";

export default defineComponent({
  data() {
    const game = new Game();
    return { zone: game.zone.matrix, game, time: 0 };
  },

  methods: {},

  mounted() {},

  computed: {
    minesCount() {
      const count = 99 - this.zone.flat().filter((a) => a[1] == "flag").length;
      return [Math.floor(count / 10), count % 10];
    },
  },
});
</script>
<style scoped>
.bg {
  background-image: url(./static/sprite150.gif);
}

.digit {
  width: 20rpx;
  height: 35rpx;
}
</style>
