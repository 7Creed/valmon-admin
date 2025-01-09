<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
      <div class="mb-6">
        <svg
          class="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        Payment Failed
      </h1>
      <p class="text-gray-600 mb-8">
        We couldn't process your payment. Please check your payment details and try again.
      </p>

      <div class="space-y-4">
        <button
          class="w-full bg-darkGold text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          @click="$router.push('/marketplace')"
        >
          Cancel or Continue Shopping
        </button>

        <button
          class="w-full border border-darkGold text-darkGold px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          @click="$router.go(-1)"
        >
          Try Again
        </button>
      </div>

      <p class="mt-6 text-sm text-gray-500">
        If you continue to experience issues, please contact our support team.
      </p>
    </div>
  </div>
</template>
