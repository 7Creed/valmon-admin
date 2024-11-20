<script setup>
import { useGlobalStore } from '~/store'

const store = useGlobalStore()
const props = defineProps({
  UserC: Array,
  lastMessage: String,
})
const emit = defineEmits(['openChat'])

const renderConversation = ({ user, recipient, user_id }) => {
  const realRecipient = user_id == store.UserAccount.id ? recipient : user
  return realRecipient
}

// Function to parse ISO timestamp and calculate difference
function getTimeDifference(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHrs = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHrs / 24)

  if (diffSec < 60) {
    return {
      value: diffSec,
      unit: 'sec',
    }
  }
  else if (diffMin < 60) {
    return {
      value: diffMin,
      unit: 'mins',
    }
  }
  else if (diffHrs < 24) {
    return {
      value: diffHrs,
      unit: 'hrs',
    }
  }
  else {
    return {
      value: diffDays,
      unit: 'days',
    }
  }
}

function openChat(convItem) {
  emit('openChat', convItem)
}
</script>

<template>
  <p v-if="!props.UserC || props.UserC.length === 0">
    No Conversation
  </p>
  <div
    v-else
    class="overflow-auto h-96"
  >
    <div
      v-for="(item, index) in props?.UserC"
      :key="index"
      class="flex items-center gap-4 mb-4 hover:bg-[#FEFDDA]"
      @click="openChat(item)"
    >
      <!-- Avatar -->
      <div class="avatar">
        <div class="w-12 rounded-full self-start">
          <img
            :src="renderConversation(item).profile_pic"
            :alt="renderConversation(item).first_name"
          >
        </div>
      </div>
      <!-- Chat preview -->
      <div class="text-[rgba(0,0,0,1)] grow">
        <div class="flex items-baseline justify-between mb-1">
          <span class="text-sm satoshiM">{{ renderConversation(item).first_name }} {{ renderConversation(item).last_name }}</span>
          <span class="text-xs">{{ getTimeDifference(item.last_message.created_at).value }} {{ getTimeDifference(item.last_message.created_at).unit }}</span>
        </div>
        <div class="flex items-baseline justify-between">
          <span
            class="text-xs  "
            :class="item.unread_count > 0 ? 'satoshiM' : 'text-gray-400'"
          >
            {{ props?.lastMessage.slice(0, 20) }} ...
          </span>
          <span
            class="w-5 h-5 p-1 center bg-darkGold text-white text-[12px] rounded-full"
          ><span>{{ item.unread_count }}</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
