<script setup>
// Define Data
const activeStep = ref(1)

// Function to update steps
const updateStep = (step) => {
  if (step === 'increase' && activeStep.value < 3) activeStep.value++
  if (step === 'decrease' && activeStep.value > 1) activeStep.value--
}
</script>

<template>
  <div class="min-h-screen center">
    <div class="card bg-base-100 shadow-xl rounded-sm w-2/6">
      <div class="card-body">
        <h3 class="text-xl font-bold text-center text-[#171616] mb-4 satoshiM">
          Add Listing ({{ activeStep }} of 3)
        </h3>

        <!-- Listing one -->
        <MarketPlaceEmployerAddListingOne
          v-if="activeStep === 1"
        />
        <MarketPlaceEmployerAddListingTwo
          v-if="activeStep === 2"
        />
        <MarketPlaceEmployerAddListingThree
          v-if="activeStep === 3"
          class="center"
        />
        <div class="flex items-center justify-between mt-4">
          <button
            v-if="activeStep > 1"
            class="btn btn-outline border-darkGold hover:bg-darkGold w-24"
            @click="updateStep('decrease')"
          >
            Back
          </button>

          <button
            v-if="activeStep < 3"
            class="btn btn-neutral text-white w-24 ms-auto"
            @click="updateStep('increase')"
          >
            Next
          </button>
          <button
            v-if="activeStep === 3"
            class="btn btn-neutral text-white w-24 ms-auto"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
