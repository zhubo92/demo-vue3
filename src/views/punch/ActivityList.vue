<script setup lang="ts">
import { usePunchStore } from '@/store/modules/punch'
import { IPunchItem } from '@/api/types/punch'
import { getIsApp, navAppPage, navWebPage } from '@/utils'

const btn = 'https://img.luojigou.vip/FoSomKl--jao35iZruPQ82TH0zr4'
const dog = 'https://img.luojigou.vip/FgoPjYpinYKYNq8hoz1dwI9rtRCN'
const bgi = 'https://img.luojigou.vip/FpWvdNbnO1vVIGZZBg3QmAAkocFw'

const store = usePunchStore()

const list = computed(() => store.list)

const router = useRouter()

const formatImgCover = (imgCover: string) => {
  return imgCover?.split(',')[0] || ''
}

const formatBuyText = (purchased: 0 | 1) => {
  return purchased === 0 ? '立即抢购' : '立即查看'
}

onMounted(async () => {
  await store.getPunchList()
  console.log(list, 'list')
})

const goDetail = (record: IPunchItem) => {
  const {
    purchased,
    joinCashbackActivity,
    hasGroupBuyActivity,
    id,
    courseSkuId,
  } = record
  const { origin, pathname } = window.location
  const isApp = getIsApp()

  if (isApp) {
    // 已购买
    if (purchased === 1) {
      const route =
        joinCashbackActivity === 1
          ? 'course/punchActivities?url=' +
            encodeURIComponent(`${origin}${pathname}#/punchCourse/${id}`)
          : '/course/pipeline?course_id=' + courseSkuId
      navAppPage(route)
    } else {
      const url =
        hasGroupBuyActivity === 1
          ? `${origin}${pathname}#/growTogether/group/course?id=${courseSkuId}`
          : `${origin}${pathname}#/courseDetail?id=${courseSkuId}`
      navWebPage(url, true)
    }
  } else {
    const url =
      hasGroupBuyActivity === 1
        ? `/growTogether/group/course?id=${courseSkuId}`
        : `/courseDetail?id=${courseSkuId}`

    router.push(url)
  }
}
</script>

<template>
  <div class="punch" :style="{ backgroundImage: `url(${bgi})` }">
    <img :src="dog" alt="" class="punch-bgi" />
    <div
      v-for="(item, index) in list"
      :key="index"
      class="punch-item"
      @click="goDetail(item)"
    >
      <div class="punch-item-title">{{ item.title }}</div>
      <div class="punch-item-detail">
        <div class="age fc">{{ item.suitAge }}岁</div>
        <div class="desc fc">打卡{{ item.goalDays }}天全额返现</div>
      </div>
      <img :src="formatImgCover(item.imgCover)" class="punch-item-img" alt="" />
      <div class="btn fc" :style="{ backgroundImage: `url(${btn})` }">
        <div class="btn-price fc">
          <div class="btn-price-text">超值价￥</div>
          <div class="btn-price-num">{{ item.price }}</div>
        </div>
        <div class="btn-buy fc">{{ formatBuyText(item.purchased) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.punch {
  padding-top: 211px;
  position: relative;
  padding-bottom: 20px;
  width: 100vw;
  min-height: 100vh;
  background: no-repeat top/contain #ffac2d;
  box-sizing: border-box;
  overflow: hidden;

  &-bgi {
    display: block;
    position: absolute;
    top: 96px;
    right: -46px;
    z-index: 10;
    width: 209px;
    height: 140px;
    object-fit: contain;
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 343px;
    background: #ffffff;
    border-radius: 20px;

    &-title {
      margin-top: 25px;
      width: 303px;
      height: 24px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 700;
      color: #333333;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-detail {
      display: flex;
      margin-top: 6px;
      width: 303px;

      .age {
        margin-right: 6px;
        padding: 3px 12px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fc7a3f;
        background: #ffede4;
        border-radius: 16px;
      }

      .desc {
        padding: 3px 12px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        background: #fc7a3f;
        border-radius: 16px;
      }
    }

    &-img {
      display: block;
      margin-top: 17px;
      width: 303px;
      height: 171px;
      border-radius: 10px;
      object-fit: cover;
    }

    .btn {
      margin-top: 23px;
      margin-bottom: 27px;
      width: 303px;
      height: 46px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      overflow: hidden;

      &-price {
        width: 150px;
        height: 46px;

        &-text {
          margin-top: 4px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #ff6363;
          line-height: 12px;
        }

        &-num {
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #ff4747;
          line-height: 22px;
        }
      }

      &-buy {
        width: 153px;
        height: 46px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
    }
  }

  .punch-item + .punch-item {
    margin-top: 20px;
  }
}
</style>
