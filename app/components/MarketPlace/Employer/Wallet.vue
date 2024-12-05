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
  <div class="flex gap-10 items-center mb-10">
    <div
      v-if="store.UserAccount.account_type ==='worker'"
      class="card card-compact bg-base-100 w-64  min-h-[9.5rem] shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Balance
        </h2>
        <p class="text-3xl text-darkGold satoshiB">
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
  <div class="card card-compact bg-base-100  shadow-xl">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead class="bg-[#FFE3A8] text-sm font-medium satoshiM text-[#292929]">
            <tr>
              <th>S/N</th>
              <th class="">
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
              <th class="">
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
              <th class="">
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
              <th class="">
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
              <th />
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr
              v-for="(item, index) in walletTxnData"
              :key="item?.id"
              class="hover"
            >
              <th>{{ index + 1 }}</th>
              <td>{{ item?.create_at }}</td>
              <td>NGN {{ item?.amount }}</td>
              <td>{{ item?.type }}</td>
              <td
                class="text-darkGold font-bold satoshiB"
                :class="{ 'text-red-600': item?.status === 'success', 'text-green-600': item?.status === 'failed' }"
              >
                {{ item?.status }}
              </td>
              <td>
                <a href="javascript:void(0)">
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
      <div class="pagination flex items-center justify-between text-[#727376]">
        <div class="flex items-baseline w-[28rem] justify-between">
          <span class="text-sm">Number Of Items displayed per page</span>
          <select class="select select-bordered select-xs w-full max-w-14 bg-black text-white">
            <option>16</option>
          </select>
          <span class="text-sm">1-13 of 12,400 items</span>
        </div>
        <div class="join">
          <button class="join-item btn btn-sm">
            «
          </button>
          <button class="join-item btn bg-black text-white  btn-sm">
            1
          </button>
          <button class="join-item btn  btn-sm">
            2
          </button>
          <button class="join-item btn  btn-sm">
            3
          </button>
          <button class="join-item btn  btn-sm">
            4
          </button>
          <span
            class="join-item btn  btn-sm"
          >
            ...
          </span>
          <button class="join-item btn  btn-sm">
            25
          </button>
          <button class="join-item btn  btn-sm">
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
