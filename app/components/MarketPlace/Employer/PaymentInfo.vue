<script setup>
const Tab = ref('wallet')
const toggleTab = (tab) => {
  Tab.value = tab
}
</script>

<template>
  <div>
    <!-- Tab -->
    <div

      class="flex bg-white p-3 rounded-xl w-2/6 items-center justify-evenly mb-6"
    >
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'wallet' }"
        @click="toggleTab('wallet')"
      >Wallet</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'billing' }"
        @click="toggleTab('billing')"
      >Billing Information</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'payment' }"
        @click="toggleTab('payment')"
      >Payment Method</a>
    </div>
    <!-- Content -->
    <div class="text-[#516778]">
      <!-- Card Items -->
      <MarketPlaceEmployerWallet v-if="Tab === 'wallet'" />
      <MarketPlaceEmployerBilling v-if="Tab === 'billing'" />
      <MarketPlaceEmployerPaymentMethod v-if="Tab === 'payment'" />
    </div>
  </div>
</template>
