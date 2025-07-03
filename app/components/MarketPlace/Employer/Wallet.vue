<script setup>
import { useGlobalStore } from '@/store'
import { WalletController } from '~/services/modules/wallet'

const store = useGlobalStore()
const { getWalletSummary, getWalletTxn } = WalletController()

// Wallet Summary
const WSLoader = ref(false)
const WalletSummaryData = ref({})

// get Wallet Txns
const walletTxn = ref([])
const walletTxnData = ref([])
const walletTxnLoader = ref(false)

// Wallet api management
const WalletApi = async (func, loader, page) => {
  loader.value = true
  const { status, data, error } = page ? await func(page) : await func()

  if (status.value === 'success') {
    loader.value = false
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
const walletTransactions = (page) => {
  WalletApi(getWalletTxn, walletTxnLoader, page)
}
walletTransactions(store.walletTxn)

/* ------------------------------- Pagination ------------------------------- */
// set pagination page number
store.Pages['walletTx'] = store.Pages['walletTx'] ? store.Pages['walletTx'] : 1

const pagination = (value) => {
  // Render The pagination contents
  handlePagination(value)
  let currPage = store.Pages.walletTxs
  switch (value) {
    case 'prev':
      if (currPage > 1) {
        currPage--
        walletTransactions(currPage)
        store.updatePages('walletTx', currPage)
      }
      break
    case 'next':
      if (currPage < walletTxn.value.last_page) {
        currPage++
        walletTransactions(currPage)
        store.updatePages('walletTx', currPage)
      }
      break

    default:
      walletTransactions(value)
      break
  }
}
// Handles Pagination template Rendering
let tempList = [1, 2, 3]
const paginationList = ref([1, 2, 3])
const handlePagination = (value) => {
  const newPaginationList = []
  for (let items of tempList) {
    if (value === 'next') {
      items++
      newPaginationList.push(items)
    }
    else if (value === 'prev' && items > 1) {
      items--
      newPaginationList.push(items)
    }
    else if (typeof value === Number) {
      const derivedPC = (value) - (paginationList[-1])
      const deriveItem = items + (derivedPC)
      newPaginationList.push(deriveItem)
    }
    else {
      return
    }
  }
  const lastItem = paginationInfo.value?.last_page
  if (lastItem > 3 || value == 'prev') {
    tempList = newPaginationList
    paginationList.value = newPaginationList
  }
  else {
    tempList = newPaginationList
    paginationList.value = [1, 2, 3]
  }
}

handlePagination(store.Pages.walletTx)
</script>

<template>
  <div class="flex flex-wrap justify-center lg:justify-start  gap-10 lg:items-center mb-10 ">
    <div
      v-if="store.UserAccount.account_type ==='worker'"
      class="card card-compact bg-base-100 w-64  min-h-[9.5rem] shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Balance
        </h2>
        <p class="text-3xl  text-darkGold satoshiB">
          <span
            v-if="WSLoader"
            class="loading loading-spinner "
          />
          <span v-else>{{ store.selectedCurrency }} {{ WalletSummaryData.balance }}</span>
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
          <span
            v-if="WSLoader"
            class="loading loading-spinner "
          />
          <span v-else>{{ store.selectedCurrency }} {{ WalletSummaryData.income }}</span>
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
          <span
            v-if="WSLoader"
            class="loading loading-spinner "
          />
          <span v-else> {{ store.selectedCurrency }} {{ WalletSummaryData.withdrawals }}</span>
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
          <span
            v-if="WSLoader"
            class="loading loading-spinner "
          />
          <span v-else>{{ store.selectedCurrency }} {{ WalletSummaryData.escrow }}</span>
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
          <span
            v-if="WSLoader"
            class="loading loading-spinner "
          />
          <span v-else>{{ store.selectedCurrency }} {{ WalletSummaryData.amount_spent }}</span>
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
                {{ formatDate(item?.created_at) }}
              </td>
              <td class="p-3">
                {{ store.selectedCurrency }} {{ item?.amount }}
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
  <div class="divider mb-1" />
  <div class="pagination flex flex-wrap gap-4 lg:gap-0 items-center justify-between text-[#727376] ">
    <div class="flex flex-wrap items-baseline lg:w-[28rem] justify-between">
      <span class="text-sm">Number Of Items displayed per page</span>
      <select class="select select-bordered select-xs w-full max-w-14 select-gradient text-white">
        <option>{{ walletTxn.per_page }}</option>
      </select>
      <span class="text-sm">{{ walletTxn?.current_page }}-{{ walletTxn.data?.length }} of {{ walletTxn?.total }} items</span>
    </div>
    <div class="join">
      <button
        class="join-item btn btn-sm"
        @click="pagination('prev')"
      >
        «
      </button>
      <button
        v-for="(count, index) of paginationList?.slice(0, walletTxn?.last_page)"
        :key="index"

        class="join-item btn bg-black text-white  btn-sm select-gradient"
        @click="pagination(count)"
      >
        {{ count }}
      </button>

      <span

        class="join-item btn-sm"
      >
        ...
      </span>
      <button

        class="join-item btn  btn-sm"
        @click="pagination(walletTxn?.last_page)"
      >
        {{ walletTxn?.last_page }}
      </button>
      <button
        class="join-item btn  btn-sm"
        @click="pagination('next')"
      >
        »
      </button>
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
