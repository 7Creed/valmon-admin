<script setup>
import { useGlobalStore } from '@/store'
import { WalletController } from '~/services/modules/wallet'

const store = useGlobalStore()
const { getWallet, getWalletSummary, getWalletTxn } = WalletController()

// Wallet Summary
const WSLoader = ref(false)
const WalletSummaryData = ref({})

// get Wallet Txns
const walletTxn = ref([])
const walletTxnData = ref([])
const walletTxnLoader = ref(false)

// Wallet api management
const WalletApi = async (func, loader) => {
  loader.value = true
  const { status, data, error } = await func()

  if (status.value === 'success') {
    console.log(func.name, data.value.data)
    switch (func.name) {
      case 'getWalletSummary':
        WalletSummaryData.value = data.value.data
        break
      case 'getWalletTxn':
        walletTxn.value = data.value.data
        walletTxnData.value = data.value.data.data
        break
      default:
        break
    }
  }
  if (status.value === 'error') {
    loader.value = false
    console.log(error.value)
  }
}

// Wallet Summary
const walletSummary = () => {
  WalletApi(getWalletSummary, WSLoader)
}
walletSummary()

// get Wallet Txn
const walletTransactions = () => {
  WalletApi(getWalletTxn, walletTxnLoader)
}
walletTransactions()
</script>

<template>
  <div class="flex flex-wrap justify-center gap-10 lg:items-center mb-10 ">
    <div
      v-if="store.UserAccount.account_type ==='worker'"
      class="card card-compact bg-base-100 w-64  min-h-[9.5rem] shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Balance
        </h2>
        <p class="text-3xl  text-darkGold satoshiB">
          NGN {{ WalletSummaryData.balance }}
        </p>
      </div>
    </div>

    <div
      v-if="store.UserAccount.account_type ==='worker'"
      class="card card-compact bg-base-100 w-64 min-h-[9.5rem] shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Income
        </h2>
        <p class="text-3xl text-green-600 satoshiB">
          NGN {{ WalletSummaryData.income }}
        </p>
      </div>
    </div>

    <div
      v-if="store.UserAccount.account_type ==='worker'"
      class="card card-compact bg-base-100 w-64 min-h-[9.5rem] shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Withdrawn
        </h2>
        <p class="text-3xl text-red-600 satoshiB">
          NGN {{ WalletSummaryData.withdrawals }}
        </p>
      </div>
    </div>

    <div

      class="card card-compact bg-base-100 w-64 min-h-[9.5rem] shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Escrow Held
        </h2>
        <p class="text-3xl text-[#22292F] satoshiB">
          NGN {{ WalletSummaryData.escrow }}
        </p>
      </div>
    </div>

    <div
      v-if="store.UserAccount.account_type ==='employer'"
      class="card card-compact bg-base-100 w-64 min-h-[9.5rem] shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Amount Spent
        </h2>
        <p class="text-3xl text-[#22292F] satoshiB">
          NGN {{ WalletSummaryData.amount_spent }}
        </p>
      </div>
    </div>
  </div>
  <!-- Table -->
  <div class="card card-compact bg-base-100   shadow-xl ">
    <div class="card-body items-center">
      <div class="w-[300px] table-container  overflow-x-auto ">
        <table class=" w-full table-auto border-collapse">
          <thead class="bg-[#FFE3A8] text-sm font-medium text-[#292929]">
            <tr>
              <th class="p-3 text-left">
                S/N
              </th>
              <th class="p-3 text-left">
                <span>Date</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th class="p-3 text-left">
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th class="p-3 text-left">
                <span>Type</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th class="p-3 text-left">
                <span>Status</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th class="p-3 text-left" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in walletTxnData"
              :key="item?.id"
              class="hover:bg-gray-100 border-b"
            >
              <td class="p-3">
                {{ index + 1 }}
              </td>
              <td class="p-3">
                {{ item?.create_at }}
              </td>
              <td class="p-3">
                NGN {{ item?.amount }}
              </td>
              <td class="p-3">
                {{ item?.type }}
              </td>
              <td
                class="p-3 font-bold"
                :class="{
                  'text-green-600': item?.status === 'success',
                  'text-red-600': item?.status === 'failed',
                  'text-darkGold': item?.status !== 'success' && item?.status !== 'failed',
                }"
              >
                {{ item?.status }}
              </td>
              <td class="p-3">
                <a
                  href="javascript:void(0)"
                  class="inline-block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- pagination -->
  <div class="card card-compact bg-base-100 shadow-xl mt-10">
    <div class="card-body">
      <div class="pagination flex flex-col md:flex-row items-center justify-between text-[#727376]">
        <div class="flex flex-col gap-2 md:flex-row items-center md:w-[28rem] justify-between mb-4 md:mb-0 space-y-2 md:space-y-0">
          <span class="text-sm">Number Of Items displayed per page</span>
          <select class="select select-bordered select-xs w-full md:max-w-14 bg-black text-white">
            <option>16</option>
          </select>
          <span class="text-sm">1-13 of 12,400 items</span>
        </div>
        <div class="join flex  flex-wrap justify-center space-x-1">
          <button class="join-item btn btn-sm mb-2 md:mb-0">
            «
          </button>
          <button class="join-item btn bg-black text-white btn-sm mb-2 md:mb-0">
            1
          </button>
          <button class="join-item btn btn-sm mb-2 md:mb-0">
            2
          </button>
          <button class="join-item btn btn-sm mb-2 md:mb-0">
            3
          </button>
          <button class="join-item btn btn-sm mb-2 md:mb-0">
            4
          </button>
          <span class="join-item btn btn-sm mb-2 md:mb-0">
            ...
          </span>
          <button class="join-item btn btn-sm mb-2 md:mb-0">
            25
          </button>
          <button class="join-item btn btn-sm mb-2 md:mb-0">
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @media (min-width: 445px) {
    .table-container {
      width: 100% !important;
      margin: auto;
    }
  }
</style>
