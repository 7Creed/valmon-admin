<script setup>
import masterCard from '@/assets/images/UIElements/masterCard.png'

import { useGlobalStore } from '@/store'
import { WalletController } from '~/services/modules/wallet'
import { MiscController } from '~/services/modules/misc'

const { withdraw, withdrawOtp } = WalletController()
const { getBanks } = MiscController()

const store = useGlobalStore()

const Tab = ref('wallet')
const toggleTab = (tab) => {
  Tab.value = tab
}

const banks = ref([])

const fetchBanks = async () => {
  const { status, data, error } = await getBanks()

  if (status.value === 'success') {
    console.log('banks', data.value)
  
    banks.value = data.value.data
  }
  if (status.value === 'error') {
    console.log(error.value)
  }
}

fetchBanks()

// Withdrawal Otp

const withdrawalOtp = async () => {
  const { status, data, error } = await withdrawOtp()

  if (status.value === 'success') {
    console.log('banks', data.value)
  }
  if (status.value === 'error') {
    console.log(error.value)
  }
}

const selectedBank = ref(null)
const paymentInfo = reactive({
  otp: '',
  amount: '',
  account_number: '',
  bank: '',
  code: '',
})

watch(selectedBank, (newBank) => {
  paymentInfo.bank = newBank?.slug || ''
  paymentInfo.code = newBank?.code || ''
})



const WithdrawToBank = async () => {
  const isFilled = (Object.values(paymentInfo).every(e => e !== ''))

  if (!isFilled) return

  const formdata = new FormData()
  formdata.append('otp', paymentInfo.otp)
  formdata.append('amount', paymentInfo.amount)
  formdata.append('account_number', paymentInfo.account_number)
  formdata.append('bank', paymentInfo.bank)

  console.log(paymentInfo)
  const { status, data, error } = await withdraw(formdata)

  if (status.value === 'success') {
    console.log('banks', data.value)
    handleALert('success', 'Withdrawal success')
    // banks.value = data.value.data
  }
  if (status.value === 'error') {
    handleALert('error', error.value.data.message)
    console.log(error.value)
  }
}
</script>

<template>
  <div class="card card-compact bg-base-100 w-2/4 shadow-xl p-5">
    <div class="card-body p-2">
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text">OTP</span>
        </div>
        <input
          v-model="paymentInfo.otp"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full "
        >
        <button
          class="label-text underline w-fit ms-auto satoshiM"
          @click=" withdrawalOtp"
        >Get OTP</button>

      </label>

      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text">Amount</span>
        </div>
        <input
          v-model="paymentInfo.amount"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full "
        >
      </label>

      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text">Account Number</span>
        </div>
        <input
          v-model="paymentInfo.account_number"

          type="text"
          placeholder="Type here"
          class="input input-bordered w-full "
        >
      </label>
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text">Bank</span>
        </div>

        <select
          v-model="selectedBank"
          class="select select-bordered w-full "
        >
          <option
            v-for="bank in banks"
            :key="bank.id"
            :value="bank"
          >{{ bank.name }}</option>

        </select>
      </label>
      <button
        class="btn btn-neutral bg-black text-white w-full"
        @click="WithdrawToBank"
      >
        Withdraw
      </button>

      <!-- Not in use -->
      <button
        v-for="(item, index) in 3"
        :key="index"
        class="btn btn-block mb-3 hidden"
        onclick="my_modal_1.showModal()"
      >
        <span class="flex flex-row justify-between w-full items-center">
          <img
            :src="masterCard"
            alt="Master Card"
            class="w-[40px] h-[40px]"
          >
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Axis Bank  xxxx68</span>
          <span class="text-darkGold text-base font-bold  hover:text-brightGold">Select</span>
        </span>
      </button>
      <button
        class="btn mb-3 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border w-full mx-auto hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="rgba(118, 127, 140, 1)"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        Add Payment Method
      </button>
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
