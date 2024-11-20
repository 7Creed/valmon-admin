<script setup>
import masterCard from '@/assets/images/UIElements/masterCard.png'
import { useGlobalStore } from '@/store'

import { chatController } from '@/services/modules/chat'

const { createConversation, getConversation, getMessages, sendMessages, sendProposal, rejectProposal, acceptProposal, markAsRead } = chatController()

const props = defineProps({
  chatType: String,
})
// Initialize store
const store = useGlobalStore()

// active tag
const activeTab = ref('job')

// Function to toggle  the tag
const toggleTab = (tab) => {
  activeTab.value = tab
}

// Tag
const activeTag = ref('all')
const selectTag = (tag) => {
  activeTag.value = tag
}

// Refs for buttons
const selectCardBtn = ref(null)
const paymentBtn = ref(null)
const otpBtn = ref(null)
const paymentSuccessBtn = ref(null)
const awaitBtn = ref(null)

// Job status
const jobStatus = ref('')

// Function to complete the job
const completed = () => {
  jobStatus.value = ''

  // Array of button refs
  const buttons = [selectCardBtn, paymentBtn, otpBtn, paymentSuccessBtn, awaitBtn]

  // click each button
  buttons.forEach((btn) => {
    if (btn.value) {
      btn.value.click()
    }
  })
}

/* --------------------------- Chat api management -------------------------- */

// define const

const conversationLoader = ref(false)
const defaultLoader = ref(false)
const getMessagesLoader = ref(false)
const proposalLoader = ref(false)
const readLoader = ref(false)

const message = ref('')
const allMessages = ref([])
const conversations = ref([])

const selectedConversation = ref(null)
const fetchConversation = async () => {
  try {
    const { status, data, error } = await getConversation()
    if (status.value === 'success') {
      console.log('fetched convorsations->', data.value.data)
      conversations.value = data.value.data
      selectedConversation.value = data.value.data[0]
    }
    if (status.value === 'error') {
      handleError('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
}

const renderConversation = ({ user, recipient, user_id }) => {
  const realRecipient = user_id == store.UserAccount.id ? recipient : user
  return realRecipient
}

const chatApiWithParams = async (func, userData, id, loader) => {
  loader.value = true
  try {
    const { status, data, error } = await func(userData, id)
    if (status.value === 'success') {
      console.log('fetched messages->', data.value.data)

      if (func.name === 'sendMessages') {
        // Get Messages
        chatApiWithParam(getMessages, selectedConversation.value.id, getMessagesLoader)
      }
    }

    if (status.value === 'error') {
      handleError('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loader.value = false
  }
}
const chatApiWithParam = async (func, userData, loader) => {
  loader.value = true
  try {
    const { status, data, error } = await func(userData)
    if (status.value === 'success') {
      console.log(` ${func.name}->`, data.value.data)

      if (func.name === 'createConversation') {
        fetchConversation()
      }
      if (func.name === 'getMessages') {
        allMessages.value = data.value.data
      }
    }
    if (status.value === 'error') {
      handleError('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loader.value = false
  }
}

// Handle sending Messages
const sendMessage = () => {
  const formData = new FormData()
  formData.append('content', message.value)
  formData.append('type', 'text')
  console.log(selectedConversation.value.id)

  chatApiWithParams(sendMessages, formData, selectedConversation.value.id, defaultLoader)
  message.value = ''
}

// Creating conversation for Employer and fetch conversation for Worker
if (store.UserAccount.account_type === 'employer') {
  chatApiWithParam(createConversation, store.newConversationDetails, conversationLoader)
}

fetchConversation()

setInterval(() => {
  fetchConversation()
}, 300000)

const Chat = (conv) => {
  selectedConversation.value = conv
  MarkAsRead()
}

watch(selectedConversation, (newVal) => {
  if (newVal) chatApiWithParam(getMessages, newVal.id, getMessagesLoader)
})

// Last message
const lastMessages = ref('')
watch(allMessages, (newVal) => {
  if (newVal.length === 0) {
    lastMessages.value = null
    return
  }

  // Case 1: When message.user_id is not equal to store.UserAccount.id (real recipient) picks initiator last message
  const recipientMessages = newVal.filter(message => message.type === 'text' && message.user_id != store.UserAccount.id)

  const recipientObj = recipientMessages[recipientMessages.length - 1]

  // Case 2: When message.user_id is equal to store.UserAccount.id (initiator) -> picks real recipient last message
  const userMessages = newVal.filter(message => message.type === 'text' && message.user_id == store.UserAccount.id)
  const userObj = userMessages[userMessages.length - 1]

  // Debugging: Log the last message objects
  console.log('Recipient Last Message:', recipientMessages)
  console.log('User Last Message:', userObj)

  // Update lastMessages based on the available messages
  if (recipientMessages.length && recipientObj) {
    lastMessages.value = recipientObj.content
  }
  else if (userMessages.length && userObj) {
    lastMessages.value = userObj.content
  }
  else {
    lastMessages.value = null
  }
})

/* --------------------------- Handle Negotiations -------------------------- */
const negotiationPrice = ref('')

const sendNewProposal = () => {
  chatApiWithParam(sendProposal, {
    conversation_id: selectedConversation.value.id,
    price: negotiationPrice.value,
  }, proposalLoader)
}

const rejectProposa = () => {
  chatApiWithParam(rejectProposal, {
    negotiation_id: 1,
  }, proposalLoader)
}

const MarkAsRead = () => {
  chatApiWithParam(markAsRead, {
    conversation_id: selectedConversation.value.id,

  }, readLoader)
}
</script>

<template>
  <SharedLoader v-if="conversationLoader" />
  <div
    v-else
    class="flex gap-10 pt-10"
  >
    <!-- card 1 -->
    <div class="card bg-base-100 w-[400px] shadow-xl flex-2 text-[#93939A]">
      <div class="card-body">
        <!-- tab -->
        <div class="flex items-center justify-between mb-5">
          <a
            href="javascript:void(0)"
            class="center gap-1  pb-3 "
            :class="{ activeClass: activeTab === 'job' }"
            @click="toggleTab('job')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="text-sm">Jobs</span>
          </a>
          <a
            href="javascript:void(0)"
            class="center gap-1 pb-3"
            :class="{ activeClass: activeTab === 'marketPlace' }"
            @click="toggleTab('marketPlace')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="text-sm">MarketPlace</span>
          </a>
          <a
            href="javascript:void(0)"
            class="center gap-1 pb-3"
            :class="{ activeClass: activeTab === 'admin' }"
            @click="toggleTab('admin')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                clip-rule="evenodd"
              />
              <path
                d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"
              />
            </svg>

            <span class="text-sm">Admin</span>
          </a>
        </div>
        <!-- search -->
        <label class="input input-bordered flex items-center gap-2 mb-3">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            class="grow"
            placeholder="Search"
          >
        </label>

        <!-- tags -->
        <div class="flex items-center gap-4 mb-5">
          <a
            href="javascript:void(0)"
            class="bg-white border text-sm font-semibold w-fit  text-[#909090] satoshiM py-[6px] px-[10px] rounded-md"
            :class="{ activeTag: activeTag === 'all' }"
            @click="selectTag('all')"
          >
            <span>ALL</span>
          </a>
          <a
            href="javascript:void(0)"
            class="bg-white border text-sm font-semibold w-fit text-[#909090] satoshiM  py-[6px] px-[10px] rounded-md"
            :class="{ activeTag: activeTag === 'unread' }"
            @click="selectTag('unread')"
          >
            <span>Unread</span>
          </a>
          <a
            href="javascript:void(0)"
            class="text-sm bg-white font-semibold w-fit border text-[#909090] satoshiM  py-[6px] px-[10px] rounded-md"
            :class="{ activeTag: activeTag === 'read' }"
            @click="selectTag('read')"
          >
            <span>Read</span>
          </a>
        </div>

        <!-- Users -->
        <MarketPlaceEmployerJobs
          v-if="conversations.length > 0"
          :UserC="conversations"
          :last-message="lastMessages"
          @open-chat="Chat($event)"
        />
      </div>
    </div>
    <!-- card 2 -->
    <div

      class="card bg-base-100 w-96 shadow-xl flex-1"
    >
      <div class="card-body">
        <!-- chat Header -->
        <div
          v-if="selectedConversation"
          class="flex items-center gap-4 border-b pb-5"
        >
          <!-- avatar -->
          <div class="avatar">
            <div class="w-14 rounded-full">
              <img

                :src="renderConversation(selectedConversation).profile_pic"
                :alt="renderConversation(selectedConversation).first_name"
              >
            </div>
          </div>
          <div>
            <div class="flex items-center text-[#101011] gap-8 mb-1">
              <span class="text-sm  satoshiB">{{ renderConversation(selectedConversation).first_name }} {{
                renderConversation(selectedConversation).last_name }}</span>
              <div class="flex items-center gap-2">
                <div class="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                  >
                </div>
                <span class="text-sm font-bold satoshiB">4.7</span>
                <span class="text-sm">(631 Ratings)</span>
              </div>
            </div>
            <div
              v
              class="text-sm"
            >
              {{ selectedConversation?.service.name }}
            </div>
          </div>
        </div>
        <!-- Pop Up -->
        <div
          role="alert"
          class="alert bg-neutral-800 text-white justify-center flex p-3"
        >
          <span class="text-center w-full  block">Keep all dealings on valmon to ensure safety</span>
        </div>
        <p
          v-if="selectedConversation"
          class="text-[#4A4A4E] text-sm text-center mt-5"
        >
          Your conversation with {{ renderConversation(selectedConversation).first_name }} starts here
        </p>

        <!-- divider -->
        <div class="divider text-sm satoshiB text-black">
          June 1, 2020
        </div>
        <!-- Chat container -->
        <div class="h-96 overflow-auto">
          <!-- User A :chat-start UserB : chat-end -->
          <div
            v-for="(mesg, index) in allMessages"
            :key="mesg.id"
            class="chat  "
            :class="mesg.user_id == store.UserAccount.id ? 'chat-start' : 'chat-end'"
          >
            <div
              v-if="mesg.type === 'text'"
              class="chat-bubble  text-black chat_adjustment"
              :class="mesg.user_id == store.UserAccount.id ? 'bg-[#F0F2F5]' : 'bg-[#FEFDDA]'"
            >
              {{ mesg.content }}
              <div class="hidden text-darkGold text-xs satoshiB mt-2">
                3 Replies
              </div>
              <div class="hidden text-[10px] flex justify-between items-center mt-2 text-[#2D2D30] satoshiM relative">
                <span class="text-darkGold ">Edited</span>
                <span class="ms-auto">9:34 AM </span>
                <!-- Emoji -->
                <span class="text-sm ml-2">😄</span>
              </div>
            </div>
          </div>
          <!-- User A (SERVICE REQUEST) -->
          <div
            v-for="(mesg, index) in allMessages"
            :key="mesg.id"
          >
            <div
              v-if="mesg.type === 'negotiation'"
              class="chat chat-start"
              :class="mesg.user_id == store.UserAccount.id ? 'chat-start' : 'chat-end'"
            >
              <div class="chat-bubble bg-brightGold text-black chat_adjustment text-sm rounded-none">
                Service Provider is Requesting
                <div class="mt-2 satoshiB">
                  NGN {{ mesg.negotiation.price_offer }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Button and chat box -->
        <div class="flex items-center gap-4">
          <!-- chat box -->
          <label class="input input-bordered flex items-center gap-2 grow">
            <a
              href="javascript:void(0)"
              class="w-fit p-1 bg-darkGold rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffff"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <input
              v-model.trim="message"
              type="text"
              class="grow"
              placeholder="New Message"
              @keyup.enter="sendMessage"
            >
            <a href="javascript:void(0)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </a>

          </label>
          <!-- Send button -->
          <a
            href="javascript:void(0)"
            class="w-fit p-2 bg-darkGold rounded-full"
            @click="sendMessage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffff"
              class="size-6"
            >
              <path
                d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
              />
            </svg>

          </a>
        </div>
      </div>
    </div>
    <!-- card 3 -->
    <div class="card bg-base-100 w-96 shadow-xl flex-2 h-fit pb-10">
      <div class="card-body">
        <h2 class="card-title ">
          Service Cost
        </h2>
        <div
          v-show="jobStatus === 'Completed'"
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-3xl text-black satoshiB">
            NGN 195,799
          </div>
        </div>
        <label
          v-show="jobStatus === ''"
          class="form-control w-full max-w-xs mb-3"
        >
          <div class="label">
            <span
              v-show="store.isEmployer"
              class="label-text"
            >Worker is asking for?</span>
            <span
              v-show="store.isEmployee"
              class="label-text"
            >Ask Client To Pay?</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
          >

        </label>
        <button
          v-if="jobStatus === ''"
          class="btn bg-darkGold mb-3 text-white"
          onclick="my_modal_1.showModal()"
        >
          Accept & Hire
        </button>
        <!-- Completed Button -->
        <button
          v-if="jobStatus === 'Completed'"
          class="btn bg-darkGold mb-3 text-white"
          onclick="my_modal_5.showModal()"
        >
          Completed
        </button>
        <button
          v-show="jobStatus === ''"
          class="btn btn-neutral mb-3"
          onclick="my_modal_6.showModal()"
        >
          Negotiate Cost
        </button>
        <!-- onclick="my_modal_7.showModal()" -->
        <button
          class="btn btn-outline btn-error"
          type="button"
          @click="rejectProposa"
        >
          <span
            v-if="proposalLoader"
            class="loading loading-spinner loading-md"
          />
          <span v-else>{{ jobStatus === 'Completed' ? 'Report Worker' : '  Reject & Close Chat' }}</span>
        </button>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <!-- Open the modal using ID.showModal() method -->
  <dialog
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Select Card
        </h2>
        <div
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-sm text-black mb-2">
            Payment Amount.
          </div>
          <div class="text-3xl text-black satoshiB">
            NGN 195,799
          </div>
        </div>
        <button
          v-for="(item, index) in 3"
          :key="index"
          class="btn btn-block mb-3"
          onclick="my_modal_2.showModal()"
        >
          <span class="flex flex-row justify-between w-full items-center">
            <img
              :src="masterCard"
              alt="Master Card"
              class="w-[40px] h-[40px]"
            >
            <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Axis Bank xxxx68</span>
            <span class="text-darkGold text-base font-bold  hover:text-brightGold">Select</span>
          </span>
        </button>

        <button class="btn mb-3 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border w-full mx-auto">
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
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button ref="selectCardBtn" />
        </form>
      </div>
    </div>
  </dialog>

  <!-- Payment -->
  <dialog
    id="my_modal_2"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Payment
        </h2>
        <div
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-sm text-black mb-2">
            Payment Amount.
          </div>
          <div class="text-3xl text-black satoshiB">
            NGN 195,799
          </div>
        </div>
        <button class="btn btn-block mb-3">
          <span class="flex flex-row justify-between w-full items-center">
            <img
              :src="masterCard"
              alt="Master Card"
              class="w-[40px] h-[40px]"
            >
            <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Axis Bank xxxx68</span>
            <span class="text-darkGold text-base font-bold  hover:text-brightGold">Select</span>
          </span>
        </button>
        <label class="form-control w-full mb-2">
          <div class="label">
            <span class="label-text">Password</span>
          </div>
          <input
            type="password"
            class="input input-bordered w-full"
          >
        </label>
        <button
          class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
          onclick="my_modal_3.showModal()"
        >
          Confirm
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button ref="paymentBtn" />
        </form>
      </div>
    </div>
  </dialog>

  <!-- OTP -->
  <dialog
    id="my_modal_3"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          OTP
        </h2>
        <div
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-sm text-black mb-2">
            Payment Amount.
          </div>
          <div class="text-3xl text-black satoshiB">
            NGN 195,799
          </div>
        </div>
        <p class="text-sm text-black mb-3">
          Enter OTP Sent To Favo****@gmail.com
        </p>
        <label class="form-control w-full mb-2">
          <div class="label">
            <span class="label-text">OTP</span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full"
          >
        </label>
        <button
          class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
          onclick="my_modal_4.showModal()"
        >
          Complete Payment
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button ref="otpBtn" />
        </form>
      </div>
    </div>
  </dialog>
  <!-- Payment successful -->
  <dialog
    id="my_modal_4"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Payment Success
        </h2>

        <p
          v-show="store.isEmployer"
          class=" text-black mb-3"
        >
          Payment was successful, worker would be paid
          once you mark job as completed
        </p>
        <p
          v-show="store.isEmployee"
          class=" text-black mb-3"
        >
          Client has paid for this service, mark job as completed when done
          to receive payment
        </p>
      </div>
      <button
        v-show="store.isEmployer"
        class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
        @click="completed"
      >
        Done
      </button>
      <button
        v-show="store.isEmployee"
        class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
        onclick="my_modal_8.showModal()"
      >
        Done
      </button>
      <div class="modal-action w-full">
        <form
          method="dialog"
          class="w-full"
        >
          <!-- if there is a button in form, it will close the modal -->

          <button ref="paymentSuccessBtn" />
        </form>
      </div>
    </div>
  </dialog>

  <!-- Await Confirmation  for worker flow -->
  <dialog
    v-show="store.isEmployee"
    id="my_modal_8"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Awaiting Confirmation
        </h2>

        <p class=" text-black mb-3">
          You have marked this job as completed, please wait for client to
          confirm completion so you can be paid
        </p>
      </div>
      <button
        class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
        @click="completed"
      >
        Close
      </button>
      <div class="modal-action w-full">
        <form
          method="dialog"
          class="w-full"
        >
          <!-- if there is a button in form, it will close the modal -->

          <button ref="awaitBtn" />
        </form>
      </div>
    </div>
  </dialog>

  <!-- Success and Rating -->
  <dialog
    id="my_modal_5"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Success
        </h2>

        <p class="text-sm text-black mb-3">
          You have marked this job as completed, Please Rate Worker Below
        </p>
        <!-- Rating -->
        <div class="rating rating-lg mb-3">
          <input
            type="radio"
            name="rating-1"
            class="mask mask-star"
            checked=""
          >
          <input
            type="radio"
            name="rating-1"
            class="mask mask-star"
          >
          <input
            type="radio"
            name="rating-1"
            class="mask mask-star"
          >
          <input
            type="radio"
            name="rating-1"
            class="mask mask-star"
          >
          <input
            type="radio"
            name="rating-1"
            class="mask mask-star"
          >
        </div>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Comment On The Service Received</span>
          </div>
          <textarea
            class="textarea textarea-bordered h-24"
            placeholder="Comment"
          />

        </label>
        <button class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto">
          Submit Review
        </button>
      </div>
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

  <!-- Negotiate Chat -->
  <dialog
    id="my_modal_6"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Negotiate Cost
        </h2>

        <label class="form-control w-full mb-2">
          <div class="label">
            <span
              v-show="store.isEmployer"
              class="label-text"
            >What are you willing to pay</span>
            <span
              v-show="store.isEmployee"
              class="label-text"
            >Ask Client To Pay</span>
          </div>
          <input
            v-model="negotiationPrice"
            type="text"
            class="input input-bordered w-full"
          >
        </label>
        <div
          v-show="store.isEmployee"
          class="text-center"
        >
          <p class="mb-3">
            Valmon Service charge: 8%
          </p>
          <p class="mb-3">
            You Get <span class="font-extrabold"> NGN 47,000</span>
          </p>
        </div>

        <button
          class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
          @click="sendNewProposal"
        >
          <span
            v-if="proposalLoader"
            class="loading loading-spinner loading-md"
          />
          <span v-else> Send Proposal</span>
        </button>
      </div>
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

  <!-- Repport Worker -->
  <dialog
    id="my_modal_7"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Report Worker
        </h2>
        <p class="text-sm text-black">
          Report an issue you might have experienced, and our admin
          would reach out to both parties and resolve the complaint
        </p>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Compliant type</span>
          </div>
          <select class="select select-bordered">
            <option>Star Wars</option>

          </select>

        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Details</span>
          </div>
          <textarea
            class="textarea textarea-bordered h-24"
            placeholder="Comment"
          />

        </label>
        <!-- Attachment -->
        <div class="text-[#6E7191]">
          <h1 class="mb-2">
            Upload Attachment
          </h1>
          <div class="border-dashed border-2 flex flex-col items-center justify-between p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-20 mb-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <div class="text-sm text-[#5B5B5B] mb-1">
              <span class="text-[#030359]">Select</span> Image you want to upload
            </div>
            <div class="text-[#949CA9]">
              Png and Jpg Allowed
            </div>
          </div>
        </div>
        <button class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto">
          Send Report
        </button>
      </div>
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

<style scoped>
.activeClass {
  @apply border-darkGold text-darkGold border-b-4
}

.activeTag {
  @apply bg-darkGold text-white
}

.chat_adjustment {
  word-wrap: anywhere;
  max-width: 50%;
}

.modal-box {
  max-height: fit-content;
}
</style>
