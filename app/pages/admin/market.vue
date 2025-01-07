<script setup>
definePageMeta({
  layout: 'dashboard-layout',
})

const toggleTab = (tab) => {
  toggleComp(tab)
}

const activeComp = ref('listing')
const toggleComp = (comp) => {
  activeComp.value = comp
}

// pass the conversation Id and render the chat UI
const ConversationId = ref(null)
const openChat = (conversationId) => {
  activeComp.value = 'viewChat'
  ConversationId.value = conversationId
}

const goBackward = () => {
  activeComp.value = 'listing'
}
</script>

<!-- TODO :Pass Negotiation Id to View Chat  -->
<template>
  <div class="text-card bg-primary_bg w-full p-10 px-14">
    <div
      v-if="activeComp !== 'viewChat' && activeComp !== 'products'"
      class="flex bg-white p-3 rounded-xl w-2/4 items-center justify-evenly mb-6"
    >
      <a
        href="javascript:void(0);"
        class="text-sm font-extrabold text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: activeComp === 'listing' }"
        @click="toggleTab('listing')"
      >Open Listings</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: activeComp === 'approval' }"
        @click="toggleTab('approval')"
      >Awaiting Approval</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: activeComp === 'transaction' }"
        @click="toggleTab('transaction')"
      >Closed Transaction</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: activeComp === 'category' }"
        @click="toggleTab('category')"
      >Categories</a>
    </div>
    <!-- Components -->
    <div class="flex gap-10">
      <BaseBackButton
        v-if="activeComp === 'viewChat' || activeComp === 'products'"
        class="h-fit"
        @click="goBackward(activeComp)"
      />
      <!-- Open List Tab -->
      <DashboardMarketplace
        v-if="activeComp ==='listing'"
        @products="toggleComp('products')"
      />
      <DashboardMarketplaceProduct
        v-if="activeComp === 'products'"
        @view-chat="openChat"
      />
      <DashboardViewChat
        v-if="activeComp == 'viewChat'"
        type="marketplace"
        :conversation-id="ConversationId"
        @view-chat="toggleComp('viewChat')"
      />

      <!-- Approval tab -->
      <DashboardMarketplaceApproval
        v-if="activeComp === 'approval' && activeComp != 'products'"
        @products="toggleComp('products')"
      />

      <!-- Close Transaction -->
      <DashboardMarketplaceCloseTransaction
        v-if="activeComp === 'transaction' && activeComp != 'products'"
        @products="toggleComp('products')"
      />
      <DashboardMarketplaceCategories v-if="activeComp === 'category'" />
    </div>
  </div>
</template>

<style scoped>
  .border_b {
    @apply border-b-darkGold pb-1 !important;
  }
</style>
