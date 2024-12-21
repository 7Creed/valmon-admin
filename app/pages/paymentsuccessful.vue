<script setup>
definePageMeta({
  layout: 'market-place',
})

// Get the full URL from the window object
const url = window.location.href;

// Parse the query parameters
const params = new URLSearchParams(window.location.search);

// Extract the 'conversation' parameter
const conversation = params.get('conversation');

// Log the value
console.log(conversation);

const paymentSuccess = async () => {
  const redirectUrl = `${window.location.origin}/chat?id=${conversation}`
  navigateTo(redirectUrl, { external: true })
}
</script>

<template>
  <!-- Payment successful -->
  <div class="min-h-screen center bg-white">
    <div class="modal-box">
      <div class="card-body p-2 mb-5">
        <h2 class="card-title text-black font-bold text-2xl text-center center mb-5">
          Payment Success
        </h2>

        <p class=" text-black mb-3 ">
          Buyer has paid NGN 56,778 for this product. Please proceed
          to delivery
        </p>
      </div>
      <button class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
        @click="paymentSuccess">
        Done
      </button>
    </div>
  </div>
</template>
