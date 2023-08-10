<script setup lang="ts">
const bottom = 'https://img.luojigou.vip/Fi-V2xt953W4XngsB_5yh3XNGKhq'
const top = 'https://img.luojigou.vip/FjiRDyCgNS36RTjXjRHcQhRcbAEG'

const emit = defineEmits(['turn'])
const props = defineProps(['showUp', 'showDown'])
// const showUp = ref<boolean>(props.showUp)
// const showDown = ref<boolean>(props.showDown)
const isHideTop = ref<boolean>(false)
const isHideBottom = ref<boolean>(false)

const showUp = computed(() => {
  return props.showUp
})

const showDown = computed(() => {
  return props.showDown
})

watch(
  showUp,
  val => {
    if (isHideTop.value || !val) return
    setTimeout(() => {
      isHideTop.value = true
    }, 3000)
  },
  { immediate: true },
)
watch(
  showDown,
  val => {
    if (isHideBottom.value || !val) return
    setTimeout(() => {
      isHideBottom.value = true
    }, 3000)
  },
  { immediate: true },
)
</script>

<template>
  <div class="turn-page tp">
    <div
      v-show="props.showUp"
      :class="['tp-btn top', isHideTop && 'hide']"
      @click="emit('turn', 'top')"
    >
      <img :src="top" alt="" />
      <div>
        <span>上一页</span>
      </div>
    </div>
    <div
      v-show="props.showDown"
      :class="['tp-btn', isHideBottom && 'hide']"
      @click="emit('turn', 'bottom')"
    >
      <img :src="bottom" alt="" />
      <div>
        <span>下一页</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tp {
  &-btn {
    position: fixed;
    right: 13px;
    bottom: 42px;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 13px;
    height: 34px;
    background: #ffffff;
    box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);
    border-radius: 17px;

    img {
      width: 10px;
      height: 12px;
      object-fit: contain;
    }

    div {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 53px;
      height: 18px;
      font-size: 13px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #fd67ac;
      transition: width 0.4s 0.2s;

      span {
        transition: opacity 0.2s;
      }
    }
  }

  .tb-btn + .tb-btn {
    margin-top: 16px;
  }

  .top {
    position: fixed;
    right: 13px;
    bottom: 91px;
    z-index: 20;
  }

  .hide {
    div {
      width: 0;
      overflow: hidden;

      span {
        height: 100%;
        opacity: 0;
      }
    }
  }
}
</style>
