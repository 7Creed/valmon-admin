<script setup>
import productImg from '@/assets/images/UIElements/car.png'
import resolvedbg from '@/assets/images/UIElements/sellOn.png'

import { ListingsController } from '~/services/modules/Admin/listing'
import { ResolutionController } from '~/services/modules/Admin/resolution'

const { getConversation } = ListingsController()

const { getTicketsById, refundMP, refundSkills, payMP, paySkills } = ResolutionController()
const props = defineProps({
  type: String,
  conversationId: Object,
})

const conversations = ref([])
const loader = ref(false)
const fetchConversation = async (id) => {
  loader.value = true
  const { data, status, error } = await getConversation(id)

  if (status.value === 'success') {
    loader.value = false
    console.log(data.value.data)
    conversations.value = data.value.data
  }
  if (status.value === 'error') {
    loader.value = false
    console.log(error.value)
  }
}

fetchConversation(props?.conversationId.conversationId)

const ticketLoaders = ref(false)
const allTickets = ref([])
const getTickets = async (id) => {
  ticketLoaders.value = true
  const { data, status, error } = await getTicketsById(id)

  if (status.value === 'success') {
    ticketLoaders.value = false
    console.log(data.value.data)
    allTickets.value = data.value.data
  }
  if (status.value === 'error') {
    ticketLoaders.value = false
    console.log(error.value)
  }
}

const catalog = computed(() => {
  if (conversations.value.service_id) {
    return 'services'
  }
  else {
    return 'listings'
  }
})

getTickets(props?.conversationId.ticketId)

const refundLoader = ref(false)
const payLoader = ref(false)

// Resolve Tickets
const resolve = async (funcName, id, loader) => {
  loader.value = true
  const { data, status, error } = await funcName(id)

  if (status.value === 'success') {
    loader.value = false
    console.log(data.value.data)
    handleALert('success', data.value.message)
  }
  if (status.value === 'error') {
    loader.value = false
    handleALert('error', 'Action failed')
    console.log(error.value)
  }
}

// pay
const pay = (value) => {
  if (value == 'services') {
    resolve(paySkills, allTickets.value.id, payLoader)
  }
  else {
    resolve(payMP, allTickets.value.id, payLoader)
  }
}

const refund = (value) => {
  if (value == 'services') {
    resolve(refundSkills, allTickets.value.id, refundLoader)
  }
  else {
    resolve(refundMP, allTickets.value.id, refundLoader)
  }
}
</script>

<template>
  <div class="flex gap-10 w-4/5">
    <!-- card 2 -->
    <div class="card bg-base-100 shadow-xl flex-1">
      <div class="card-body">
        <!-- chat Header -->
        <div class="flex justify-between border-b pb-5">
          <!-- Buyer -->
          <div class="flex items-center gap-4 ">
            <!-- avatar -->
            <div class="avatar">
              <div class="w-14 rounded-full">
                <img :src="conversations?.user?.profile_pic">
              </div>
            </div>
            <div>
              <div class="text-xs text-darkGold font-extrabold">
                Buyer
              </div>
              <div class="text-[#101011] gap-8 mb-1">
                <span class="text-sm  satoshiB">{{ conversations?.user?.first_name }} {{ conversations?.user?.last_name }}</span>
                <div class="flex items-center gap-2">
                  <div class="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star"
                    >
                  </div>
                  <span class="text-sm font-bold satoshiB">{{ conversations?.user?.ratings_count }}</span>
                  <span class="text-sm">(631 Ratings)</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Seller -->
          <div class="flex items-center gap-4">
            <!-- avatar -->
            <div class="avatar">
              <div class="w-14 rounded-full">
                <img :src="conversations?.recipient?.profile_pic">
              </div>
            </div>
            <div>
              <div class="text-xs text-darkGold font-extrabold">
                Seller
              </div>
              <div class="text-[#101011] gap-8 mb-1">
                <span class="text-sm  satoshiB">{{ conversations?.recipient?.first_name }} {{ conversations?.recipient?.last_name }}</span>
                <div class="flex items-center gap-2">
                  <div class="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star"
                    >
                  </div>
                  <span class="text-sm font-bold satoshiB">{{ conversations?.user?.ratings_count }}</span>
                  <span class="text-sm">(631 Ratings)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="text-[#4A4A4E] text-sm text-center mt-5 flex-grow-0 hidden">
          Your conversation with Daniel starts here
        </p>

        <!-- divider -->
        <div class="divider text-sm satoshiB text-black">
          {{ formatDate(conversations.created_at) }}
        </div>
        <!-- Chat container -->
        <div class="h-96 overflow-auto">
          <!-- User A :chat-start UserB : chat-end -->
          <p
            v-if="conversations.messages === 0"
            class="text-[#4A4A4E] text-sm text-center mt-5"
          >
            No Conversation
          </p>
          <div v-else>
            <div
              v-for="(mesg, index) in conversations?.messages"
              :key="mesg.id"
              class="chat  "
              :class="mesg.user_id == conversations?.user_id ? 'chat-start flex' : 'chat-end'"
            >
              <div
                v-if="mesg.type === 'text'"
                class="chat-bubble  text-black chat_adjustment"
                :class="mesg.user_id == conversations?.user_id? 'bg-[#F0F2F5]' : 'bg-[#FEFDDA]'"
              >
                {{ mesg.content }}
                <div class="hidden text-darkGold text-xs satoshiB mt-2">
                  3 Replies
                </div>
                <div class=" text-[10px] flex justify-between items-center mt-2 text-[#2D2D30] satoshiM relative">
                  <span class="text-darkGold hidden">Edited</span>
                  <span class="ms-auto"> {{ getTimeDiff(mesg.created_at).time }} {{
                    getTimeDiff(mesg.created_at).amPm }} </span>
                  <!-- Emoji -->
                  <span class="text-sm ml-2 hidden">😄</span>
                </div>
              </div>
              <!-- User A (SERVICE REQUEST) -->
              <div
                v-if="mesg.type === 'negotiation'"
                class="chat chat-start w-full "
                :class="mesg.user_id == conversations?.user_id ? 'chat-start' : 'chat-end'"
              >
                <div class="chat-bubble bg-brightGold text-black chat_adjustment text-sm rounded-none">
                  {{ mesg.user_id == conversations?.user_id ? 'Client' : 'Service Provider' }} is Requesting
                  <div class="mt-2 satoshiB">
                    NGN {{ mesg.negotiation.price_offer }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Button and chat box -->
        <div
          v-show="type !== 'marketplace'"
          class="flex items-center gap-4"
        >
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
              type="text"
              class="grow"
              placeholder="New Message"
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
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffff"
              class="size-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>

          </a>
        </div>
      </div>
    </div>
    <!-- card 3 -->
    <template v-if="props.type === 'resolution'">
      <div>
        <!-- Card  -->
        <div class="card bg-base-100 w-96 shadow-xl flex-2 h-fit mb-3">
          <div class="card-body">
            <h2 class="card-title text-black text-lg">
              Service Cost
            </h2>
            <div

              role="alert"
              class="alert block bg-[#F0F2F5] mb-3"
            >
              <div class="text-3xl text-black satoshiB">
                NGN  {{ catalog == 'services' ? conversations?.last_job?.amount : conversations?.orders?.amount }}
              </div>
            </div>
            <!-- Completed Button -->
            <button
              class="btn bg-neutral mb-3 text-white"
              @click="pay(catalog)"
            >
              <span
                v-if="payLoader"
                class="loading loading-spinner loading-xs"
              />
              <span v-else>{{ catalog == 'services' ? 'Pay Service Provider' : 'Pay Seller' }}</span>
            </button>

            <button
              class="btn btn-outline"
              @click="refund(catalog)"
            >
              <span
                v-if="refundLoader"
                class="loading loading-spinner loading-xs"
              />

              <span v-else>  {{ catalog == 'services' ? 'Refund Employer' : 'Refund Buyer' }}</span>
            </button>
          </div>
        </div>
        <div class="card bg-base-100 w-96 shadow-xl flex-2 h-fit pb-10">
          <div class="card-body">
            <h2 class="card-title text-black text-lg mb-4">
              Reasons
            </h2>
            <h3 class="font-bold">
              {{ allTickets.reason }}
            </h3>
            <p class="mb-1 text-sm">
              {{ allTickets.description }}
            </p>
            <figure>
              <img
                :src="resolvedbg"
                alt=""
              >
            </figure>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>
        <div class="card bg-base-100 w-96 shadow-xl flex-2 h-fit mb-5">
          <div
            v-if="conversations.orders"
            class="card-body"
          >
            <figure
              v-if="conversations?.orders[0]?.listing"
              class="w-[320px] mx-auto p-1"
            >
              <img
                :src="conversations?.orders[0]?.listing?.images[0]"
                alt=""
                class=" w-full  rounded-lg"
              >
            </figure>
            <p class=" text-valmon_menu mb-3">
              {{ conversations?.orders[0]?.listing?.title }}
            </p>
            <p class=" text-valmon_menu font-semibold ">
              Listing Cost
            </p>
            <div

              role="alert"
              class="alert block bg-[#F0F2F5] mb-3"
            >
              <div class="text-3xl text-black satoshiB">
                NGN {{ conversations?.orders[0]?.amount }}
              </div>
            </div>
          </div>
        </div>

        <!-- Delivery -->
        <div class="card bg-base-100 w-96 shadow-xl flex-2 h-fit">
          <div class="card-body">
            <p class=" text-black mb-3 text-lg satoshiM">
              Proof Of Delivery
            </p>
            <p class=" text-gray-500 text-sm">
              Seller Proof of delivery
            </p>
            <figure class="w-[320px] h-[174px] mx-auto p-1">
              <img
                :src="productImg"
                alt=""
                class=" w-full  rounded-lg"
              >
            </figure>
          </div>
        </div>
      </div>
    </template>
  </div>
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
