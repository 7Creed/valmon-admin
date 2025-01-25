<script setup>
import { chatController } from '@/services/modules/chat'

definePageMeta({
  layout: 'market-place',
})

const { getConversation } = chatController()

// Get the full URL from the window object
const url = window.location.href

// Parse the query parameters
const params = new URLSearchParams(window.location.search)

// Extract the 'conversation' parameter
const conversation = params.get('conversation')

const lastJobConversation = ref(null)
const fetchConversation = async () => {
  const { status, data } = await getConversation(conversation)
  if (status.value === 'success') {
    lastJobConversation.value = data.value.data.find(conv => conv.id == conversation)
  }
  if (status.value === 'error') {
    handleError('error', 'Error fetching conversation Refresh or proceed to delivery')
  }
  console.log(lastJobConversation)
}

fetchConversation()

// Log the value
console.log(conversation)

const paymentSuccess = async () => {
  const redirectUrl = `${window.location.origin}/chat?id=${conversation}`
  navigateTo(redirectUrl, { external: true })
}
</script>

<template>
  <!-- Payment successful -->

  <div

    class="min-h-screen center bg-white"
  >
    <span
      v-if="!lastJobConversation "
      class="loading loading-spinner loading-lg"
    />
    <div
      v-else
      class="modal-box"
    >
      <div class="card-body p-2 mb-5">
        <h2 class="card-title text-black font-bold text-2xl text-center center mb-5">
          Payment Success
        </h2>

        <p class=" text-black mb-3 ">
          Buyer has paid NGN {{ lastJobConversation?.last_job?.amount || lastJobConversation?.orders[0]?.amount }} for this product. Please proceed
          to delivery
        </p>
      </div>
      <button
        class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
        @click="paymentSuccess"
      >
        Done
      </button>
    </div>
  </div>
</template>
