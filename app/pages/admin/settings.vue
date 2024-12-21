<script setup>
import { useGlobalStore } from '@/store'

const store = useGlobalStore()

definePageMeta({
  layout: 'dashboard-layout',
})

const Tab = ref('personal')
const toggleTab = (tab) => {
  Tab.value = tab
}
</script>

<template>
  <div class="text-card bg-primary_bg w-full p-10 px-14">
    <div

      class="flex bg-white p-3 rounded-xl w-2/4 items-center justify-evenly mb-6"
    >
      <a
        href="javascript:void(0);"
        class="text-sm font-extrabold text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'personal' }"
        @click="toggleTab('personal')"
      >Personal Information</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'rate' }"
        @click="toggleTab('rate')"
      >Platform Rate</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'reset' }"
        @click="toggleTab('reset')"
      >Reset Password</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'notification' }"
        @click="toggleTab('notification')"
      >Notification Settings</a>
    </div>
    <!-- Transaction  -->
    <DashboardSettings v-if="Tab === 'personal'" />
    <DashboardSettingsRate v-if="Tab === 'rate'" />
    <DashboardSettingsResetPassword v-if="Tab === 'reset'" />
    <DashboardSettingsNotification v-if="Tab === 'notification'" />
  </div>
</template>

<style scoped>
.border_b {
  @apply text-darkGold border-b-darkGold pb-1
}
</style>
