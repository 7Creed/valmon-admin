<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl text-center satoshiM font-bold text-gray-900 mb-8 flex items-center justify-between">
        <span> Notifications</span>
        <a
          href="javascript:void(0);"
          class="text-red-600 text-base satoshiM font-medium"
        >Clear All</a>
      </h1>
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

      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div
          v-if="notifications.length === 0"
          class="p-6 text-center text-gray-500"
        >
          No notifications yet
        </div>
        <!-- Notifications -->
        <MarketPlaceMesgNotification :notifications="notifications"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NotificationsController } from '~/services/modules/notificatons'

definePageMeta({
  layout: 'market-place',
})
const activeTag = ref('all')
const selectTag = (tag) => {
  console.log(tag)
  activeTag.value = tag
  renderApi(tag)
}

const { getAllNotifications, getUnreadNotifications } = NotificationsController()

const notifications = ref([])
const allNotifications = ref([])
const unreadNotifications = ref([])
const readNotifications = ref([])

const renderApi = (type) => {
  switch (type) {
    case 'all':
      notifications.value = allNotifications.value
      break
    case 'read':
      notifications.value = readNotifications.value
      break
    case 'unread':
      notifications.value = unreadNotifications.value
      break
    default:
      notifications.value = allNotifications.value
      break
  }
}

const fetchNotifications = async () => {
  try {
    const { status, data } = await getAllNotifications()
    if (status.value === 'success') {
      console.log('notifications', notifications.value)
      readNotifications.value = data.value.data
      for (const element of data.value.data) {
        allNotifications.value.push(element)
      }
    }
  }
  catch (error) {
    console.error('Error fetching notifications:', error)
  }
}
const fetchUnreadNotifications = async () => {
  try {
    const { status, data } = await getUnreadNotifications()
    if (status.value === 'success') {
      console.log('Unread notifications', data.value.data)
      unreadNotifications.value = data.value.data
      for (const element of data.value.data) {
        allNotifications.value.push(element)
      }
    }
  }
  catch (error) {
    console.error('Error fetching notifications:', error)
  }
}
onMounted(() => {
  fetchNotifications()
  fetchUnreadNotifications()
  renderApi(activeTag.value)
})
</script>

<style scoped>
.activeTag {
 @apply bg-darkGold text-white
}
</style>
