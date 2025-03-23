<script setup>
import wallet from '@/assets/icons/empty-wallet.svg'
import walletCheck from '@/assets/icons/wallet-check.svg'
import convertShape from '@/assets/icons/convertshape.svg'
import cardblack from '@/assets/icons/card-pos-black.svg'

import { SummaryController } from '~/services/modules/Admin/summary'

definePageMeta({
  layout: 'dashboard-layout',
})
const { summary } = SummaryController()

const percentageIncrease = (data) => {
  const percentage = parseInt(data)
  if (percentage >= 0) {
    return 'increased'
  }
  else if (percentage < 0) {
    return 'decreased'
  }
}
const appSummary = reactive({
  cards: {
    data: [
      {
        title: 'All Reports',
        value: 40,
        icon: walletCheck,
        id: 'all_reports',
        bg: 'bg-[#F45E5E1A]',
      },
      {
        title: 'Resolved Reports',
        value: 40,
        icon: wallet,
        id: 'resolved_reports',
        bg: 'bg-[#5E6DF41A]',

      },
      {
        title: 'In-Escrow',
        value: 40,
        icon: convertShape,
        id: 'in_escrow_count',
        bg: 'bg-[#F45E5E1A]',

      },
      {
        title: 'In-Escrow Value',
        value: 40,
        icon: cardblack,
        id: 'in_escrow_amount',
        bg: 'bg-[#5EF4881A]',

      },
    ],
    icon: [],
  },
  data: {},
})

// categories
const top_marketCategory = ref([])
const top_category = ref([])

const loading = ref(false)
const fetchSummary = async () => {
  loading.value = true
  try {
    const { data, status, error } = await summary()
    if (status.value === 'success') {
      appSummary.data = data.value.data
      top_marketCategory.value = data.value.data.top_marketplace_categories
      top_category.value = data.value.data.top_skill_categories

      const _data = data.value.data
      const overViewKeys = Object.keys(_data.platform_overview)

      overViewKeys.forEach((element) => {
        Object.values(appSummary.cards.data).forEach((card) => {
          if (card.id === element) {
            card.value = _data.platform_overview[element]
          }
        })
      })
    }
    if (status.value === 'error') {
      console.log(error.value)
    }
  }
  catch (error) {
    console.log(error)
  }
  finally {
    loading.value = false
  }
}

fetchSummary()
</script>

<template>
  <div class=" bg-primary_bg w-full p-8">
    <!-- Select -->
    <div class="bg-black w-fit text-sm p-2 mb-10 px-5 rounded-2xl  text-white  center gap-3">
      <span class=""> Show Result For</span>
      <span class="ring ring-white ring-offset-0 center rounded-sm">
        <select class="select border  max-w-xs ml-4 bg-black ">
          <option
            disabled
            selected
          >
            This Year
          </option>
          <option>
            This Month
          </option>
          <option>
            This Week
          </option>
        </select>
      </span>
    </div>

    <div class="flex gap-4 mb-10">
      <div class="card card-compact bg-base-100 h-[500px] w-2/4  shadow-xl flex-1">
        <div class="card-body">
          <SharedLoader v-if="loading" />

          <ClientOnly v-else>
            <DashboardAreaChart :income-from-skills="appSummary.data?.income_from_skills" />
          </ClientOnly>
        </div>
      </div>

      <div class="flex gap-4 flex-col">
        <div class="card card-compact bg-base-100 min-w-[19%]  h-40 shadow-xl">
          <div class="card-body p-[16px] text-[#101828] ">
            <h2 class="text-[#101828] text-sm font-semibold">
              Total User
            </h2>
            <div class="flex flex-col justify-evenly gap-4">
              <p class="flex  items-center justify-between w-[70%] mx-auto">
                <span class="text-[22px] font-bold">
                  {{ appSummary.data?.total_users?.value }}
                </span>
                <svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="43"
                    height="43"
                    rx="10"
                    fill="white"
                  />
                  <rect
                    width="43"
                    height="43"
                    rx="10"
                    fill="#DADFFF"
                  />
                  <path
                    opacity="0.587821"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.7474 16.7394C14.7474 18.775 16.4543 20.4251 18.5598 20.4251C20.6652 20.4251 22.3721 18.775 22.3721 16.7394C22.3721 14.7039 20.6652 13.0537 18.5598 13.0537C16.4543 13.0537 14.7474 14.7039 14.7474 16.7394ZM24.2782 20.4252C24.2782 21.9519 25.5584 23.1895 27.1375 23.1895C28.7166 23.1895 29.9967 21.9519 29.9967 20.4252C29.9967 18.8986 28.7166 17.6609 27.1375 17.6609C25.5584 17.6609 24.2782 18.8986 24.2782 20.4252Z"
                    fill="#4C4C4C"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.5439 22.2678C14.044 22.2678 10.3521 24.5037 9.98268 28.9014C9.96255 29.1409 10.4364 29.6393 10.6754 29.6393H26.4196C27.1355 29.6393 27.1466 29.0822 27.1355 28.9021C26.8562 24.3808 23.1071 22.2678 18.5439 22.2678ZM32.3374 29.6393H28.6624V29.6392C28.6624 27.5652 27.9536 25.6512 26.7575 24.1113C30.0041 24.1457 32.655 25.7327 32.8545 29.0865C32.8625 29.2216 32.8545 29.6393 32.3374 29.6393Z"
                    fill="#4C4C4C"
                  />
                </svg>
              </p>
              <div class="flex gap-2 items-center w-[70%] mx-auto">
                <svg
                  v-if=" appSummary.data?.total_users?.percentage_increase > 0"
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0992 0L17.4679 2.29L12.4202 7.17L8.28283 3.17L0.618286 10.59L2.07672 12L8.28283 6L12.4202 10L18.9366 3.71L21.3053 6V0H15.0992Z"
                    fill="#00B69B"
                  />
                </svg>
                <svg
                  v-else
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.0992 12L17.4679 9.71L12.4202 4.83L8.28283 8.83L0.618286 1.41L2.07672 0L8.28283 6L12.4202 2L18.9366 8.29L21.3053 6V12H15.0992Z"
                    fill="#FF0000"
                  />
                </svg>
                <span
                  class="text-[#00B69B]"
                  :class="{ 'text-[#FF0000]': appSummary.data?.total_users?.percentage_increase < 0 }"
                >{{ appSummary.data?.total_users?.percentage_increase }}%</span>
                <span>Up from yesterday</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-compact bg-base-100 w-80 shadow-xl">
          <div class="card-body gap-1">
            <h2 class=" text-sm mb-1">
              Top Skill Categories
            </h2>
            <div class="text-[#606060] flex flex-wrap text-sm font-semibold justify-between items-center gap-4">
              <div
                v-for="(detail, index) in top_category"
                :key="index"
              >
                <span class="text-brightGold mr-2">{{ index + 1 }}.</span>
                <span>{{ detail.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card card-compact bg-base-100 w-80 shadow-xl">
          <div class="card-body gap-1">
            <h2 class=" text-sm mb-1">
              Top MarketPlace Categories
            </h2>
            <div class="text-[#606060] flex flex-wrap text-sm font-semibold justify-between items-center gap-4">
              <div
                v-for="(detail, index) in top_marketCategory"
                :key="index"
              >
                <span class="text-brightGold mr-2">{{ index + 1 }}.</span>
                <span>{{ detail.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-8 mb-10">
      <div class="card card-compact bg-base-100 h-[400px] w-2/4  shadow-xl flex-1">
        <div class="card-body">
          <SharedLoader v-if="loading" />
          <ClientOnly v-else>
            <DashboardBarChart :skilled-employments="appSummary.data?.skilled_employments" />
          </ClientOnly>
        </div>
      </div>
      <div class="card card-compact bg-base-100 h-[400px] w-2/4  shadow-xl flex-1">
        <div class="card-body">
          <SharedLoader v-if="loading" />

          <ClientOnly v-else>
            <DashboardLineChart :marketplace-sales="appSummary.data?.market_place_sales" />
          </ClientOnly>
        </div>
      </div>
    </div>
    <div class=" flex flex-wrap gap-6 justify-between mb-10">
      <DashboardStatsCard
        v-for="(detail, index) in appSummary.cards.data"
        :key="index"
        :title="detail.title"
        :value="detail.value.value ?? detail.value"
        :percentage="detail.value.percentage"
        :icon="detail.icon"
        :icon-bg="detail.bg"
      />
    </div>
  </div>
</template>
