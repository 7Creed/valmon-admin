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
    <div class="flex justify-between">
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
      <button
        v-show="Tab === 'payment' && store.isEmployee"
        class="btn btn-neutral"
        onclick="my_modal_1.showModal()"
      >
        Withdraw
      </button>
    </div>

    <!-- Content -->
    <div class="text-[#516778]">
      <!-- Card Items -->
      <MarketPlaceEmployerWallet v-if="Tab === 'wallet'" />
      <MarketPlaceEmployerBilling v-if="Tab === 'billing'" />
      <MarketPlaceEmployerPaymentMethod v-if="Tab === 'payment'" />
    </div>
  </div>

  <!-- Add payment -->
  <dialog
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <h1 class="text-center text-[#232323] text-3xl font-bold mb-5">
        Add Payment Method
      </h1>
      <!-- card -->
      <div class="border-brightGold border-2 p-2 rounded-lg">
        <div
          role="alert"
          class="alert border-[#0000007A] p-2 mb-4 rounded-md"
        >
          <div class="form-control">
            <label class="label cursor-pointer flex gap-4">

              <input
                type="radio"
                name="radio-1"
                class="radio"
              >

              <span class="label-text text-lg font-bold text-[#232323]">Card Payment</span>
            </label>
          </div>
        </div>
        <div
          role="alert"
          class="alert border-[#0000007A] p-2 mb-4 rounded-md"
        >
          <div class="form-control">
            <label class="label cursor-pointer flex gap-4">

              <input
                type="radio"
                name="radio-1"
                class="radio"
              >

              <span class="label-text text-lg font-bold text-[#232323]">Paypal</span>
            </label>
          </div>
        </div>
        <label class="form-control w-full mb-3">
          <div class="label">
            <span class="label-text">Card Number</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full "
          >
        </label>
        <label class="form-control w-full mb-3">
          <div class="label">
            <span class="label-text">Expiry Number</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full "
          >
        </label>
        <label class="form-control w-full mb-3">
          <div class="label">
            <span class="label-text">Cvv</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full "
          >
        </label>
        <button class="btn btn-neutral bg-black text-white w-full">
          Save Card
        </button>
      </div>
      <!-- card -->

      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
