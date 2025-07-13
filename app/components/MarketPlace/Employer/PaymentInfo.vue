<script setup>
import { useGlobalStore } from '@/store'

const store = useGlobalStore()

const Tab = ref('wallet')
const toggleTab = (tab) => {
  Tab.value = tab
}
</script>

<template>
  <div>
    <!-- Tab -->
    <div class="flex justify-between ">
      <div

        class="flex bg-white p-3 rounded-xl w-full sm:w-fit gap-12 px-4 sm:px-12 items-center justify-evenly mb-6"
      >
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'wallet' }"
          @click="toggleTab('wallet')"
        >Wallet</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent hidden"
          :class="{ border_b: Tab === 'billing' }"
          @click="toggleTab('billing')"
        >Billing Information</a>
        <a
          v-show="store.UserAccount.account_type === 'worker'"
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'payment' }"
          @click="toggleTab('payment')"
        >Withdraw</a>
      </div>
      <button
        v-show="Tab === 'payment' && store.UserAccount.account_type == 'worker'"
        class="btn btn-neutral hidden"
        onclick="my_modal_2.showModal()"
      >
        Withdraw
      </button>
    </div>
    <!-- Content -->
    <div class="text-[#516778]">
      <!-- Card Items -->
      <MarketPlaceEmployerWallet v-if="Tab === 'wallet'" />
      <!-- <MarketPlaceEmployerBilling v-if="Tab === 'billing'" /> -->
      <MarketPlaceEmployerPaymentMethod v-if="Tab === 'payment'" />
    </div>
  </div>
</template>
