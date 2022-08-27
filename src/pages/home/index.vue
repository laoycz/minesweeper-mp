<template>
  <view
    style="
      display: grid;
      grid-template-columns: 27rpx auto 27rpx;
      grid-template-rows: 27rpx 81rpx 27rpx auto 87rpx 27rpx;
      justify-content: center;
      width: 750rpx;
      height: 99vh;
    "
  >
    <image src="/static/bordertl.png" class="full"></image>
    <view style="display: flex">
      <image
        src="/static/bordertb.png"
        class="bordertb"
        v-for="n in 16"
        :key="n"
      ></image>
    </view>
    <image src="/static/bordertr.png" class="full"></image>
    <image src="/static/borderlr2.png" class="full"></image>

    <view
      style="
        background-color: silver;
        display: flex;
        padding: 0 16rpx;
        justify-content: space-between;
        align-items: center;
      "
    >
      <!-- minesCount雷数 -->
      <view style="display: flex">
        <image class="digit" src="/static/digit0.png"></image>
        <image class="digit" :src="`/static/digit${minesCount[0]}.png`"></image>
        <image class="digit" :src="`/static/digit${minesCount[1]}.png`"></image>
      </view>
      <!-- minesCount雷数 -->
      <!-- face -->
      <image
        @click="newGame()"
        class="face"
        :src="`/static/${game.status}.png`"
      ></image>
      <!-- face -->
      <!-- splitedTime计数器 -->
      <view style="display: flex">
        <image
          class="digit"
          :src="`/static/digit${splitedTime[0]}.png`"
        ></image>
        <image
          class="digit"
          :src="`/static/digit${splitedTime[1]}.png`"
        ></image>
        <image
          class="digit"
          :src="`/static/digit${splitedTime[2]}.png`"
        ></image>
      </view>
      <!-- splitedTime计数器 -->
    </view>

    <image src="/static/borderlr2.png" class="full"></image>
    <image src="/static/borderjointl.png" class="full"></image>
    <view style="display: flex">
      <image
        src="/static/bordertb.png"
        class="bordertb"
        v-for="n in 16"
      ></image>
    </view>
    <image src="/static/borderjointr.png" class="full"></image>
    <image
      src="/static/borderlr.png"
      style="width: 27rpx; height: 100%"
    ></image>

    <movable-area style="width: 100%; height: 100%; overflow: hidden">
      <movable-view
        direction="all"
        class="zone"
        scale
        :scale-value="scale ? 1.6 : 1"
      >
        <view v-for="(row, i) in zone" :key="i" style="display: contents">
          <image
            v-for="(cell, j) in row"
            :key="j"
            :src="`/static/${getCellImage(cell)}`"
            @click="open([j, i])"
            class="full"
          >
          </image>
        </view>
      </movable-view>
    </movable-area>

    <image
      src="/static/borderlr.png"
      style="width: 27rpx; height: 100%"
    ></image>
    <image src="/static/borderlr2.png" class="full"></image>
    <view
      style="
        background-color: silver;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 12rpx;
        gap: 16rpx;
      "
    >
      <button
        @click="setFlag(false)"
        class="button"
        :style="buttonShadow(flag == false)"
      >
        Open
      </button>
      <button
        @click="setFlag(true)"
        class="button"
        :style="buttonShadow(flag == true)"
      >
        Flag
      </button>
      <button
        class="button"
        @click="setScale(!scale)"
        :style="buttonShadow(scale)"
      >
        Zoom
      </button>
    </view>
    <image src="/static/borderlr2.png" class="full"></image>
    <image src="/static/borderbl.png" class="full"></image>
    <view style="display: flex">
      <image
        src="/static/bordertb.png"
        class="bordertb"
        v-for="n in 16"
        :key="n"
      ></image>
    </view>
    <image src="/static/borderbr.png" class="full"></image>
  </view>
</template>
<script lang="ts">
import Matrix from "../../Matrix";
import Game from "../../Game";
import { distribute, fill, fillStatus } from "../../Zone";
import type { StyleValue } from "vue";
import { defineComponent } from "vue";
import type { status } from "../../Zone";
import type { status as GameStatus } from "../../Game";

export default defineComponent({
  data() {
    const game = new Game();
    return { zone: game.zone.matrix, game, time: 0, flag: false, scale: false };
  },

  methods: {
    getCellImage([value, status]: [number, status]) {
      if (this.game.status == "lose") {
        if (value == -1 && status == "open") return "boom.png";
        if (value == -1) return "mine.png";
      }
      if (status == "close") return "close.png";
      if (status == "flag") return "flag.png";
      if (value == -1) return "boom.png";

      return `count${value}.png`;
    },

    open([x, y]: [number, number]) {
      if (this.flag) {
        this.game.flag([x, y]);
      } else {
        this.game.open([x, y]);
      }
    },

    setFlag(flag: boolean) {
      this.flag = flag;
    },

    setScale(scale: boolean) {
      this.scale = scale;
    },

    newGame() {
      this.game = new Game();
      this.zone = this.game.zone.matrix;
      this.time = 0;
    },

    tick() {
      if (this.game.status == "play") {
        this.time = this.time + 1;
      }
    },

    buttonShadow(active: boolean): StyleValue {
      if (active) {
        return { boxShadow: "inset 8rpx 8rpx 8rpx 0" };
      } else {
        return { boxShadow: "8rpx 8rpx 8rpx 0" };
      }
    },
  },

  mounted() {
    setInterval(this.tick, 1000);
  },

  computed: {
    minesCount() {
      const count = 99 - this.zone.flat().filter((a) => a[1] == "flag").length;
      return [Math.floor(count / 10), count % 10];
    },

    splitedTime() {
      return [
        Math.floor(this.time / 100),
        Math.floor((this.time / 10) % 10),
        this.time % 10,
      ];
    },
  },
});
</script>
<style scoped>
.digit {
  width: 36rpx;
  height: 63rpx;
  background-size: cover;
}

.face {
  width: 70rpx;
  height: 70rpx;
}

.zone {
  display: grid;
  grid-template-columns: repeat(16, 43rpx);
  grid-auto-rows: 43rpx;
  justify-content: start;
  width: auto;
  height: auto;
}

.bordertb {
  width: 43rpx;
  height: 27rpx;
}

.borderlr {
  width: 27rpx;
  height: 43rpx;
  display: block;
}

.full {
  width: 100%;
  height: 100%;
}

.button {
  background-color: silver;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
}
</style>
