<script setup>
import { SettingsController } from '~/services/modules/Admin/settings'

const { createNotification, getNotification } = SettingsController()

const notification = reactive({
  notifications: true,
  new_report: false,
  sales_summary: true,
  new_user: true,

})

const updateNotification = (id) => {
  notification[id] = !notification[id]
}

const loading = ref(false)
const sendNotification = async () => {
  loading.value = true
  const { status, error } = await createNotification({
    notifications: notification.notifications,
    new_report: notification.new_report,
    sales_summary: notification.sales_summary,
    new_user: notification.new_user,
  })
  if (status.value === 'success') {
    handleALert('success', 'Notification Updated')
    loading.value = false
  }

  if (status.value === 'error') {
    handleALert('error', error.value)
    loading.value = false
  }
}

const loadingNotify = ref(false)
const fetchNotification = async () => {
  loadingNotify.value = true
  try {
    const { status, data, error } = await getNotification()
    if (status.value === 'success') {
      console.log(data.value.data)
      notification.notifications = data.value.data.notifications
      notification.new_report = data.value.data.new_report
      notification.sales_summary = data.value.data.sales_summary
      notification.new_user = data.value.data.new_user
    }

    if (status.value === 'error') {
      handleALert('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loadingNotify.value = true
  }
}

fetchNotification()
</script>

<template>
  <div class="card card-compact bg-base-100 w-1/3 shadow-xl">
    <div class="card-body">
      <div class="form-control mb-3">
        <label class="label cursor-pointer">
          <span class="label-text text-[#67676D] satoshiM">Notifications</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.notification"
            @change="updateNotification('push_notification')"
          >

        </label>
      </div>
      <div class="form-control mb-3">
        <label class="label cursor-pointer">
          <span class="label-text text-[#67676D] satoshiM ">New Report</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.new_report"
            @change="updateNotification('message_notification')"
          >
        </label>
      </div>
      <div class="form-control mb-3">
        <label class="label cursor-pointer">
          <span class="label-text text-[#67676D] satoshiM">Sales Summary</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.sales_summary"
            @change="updateNotification('payment_notification')"
          >
        </label>
      </div>
      <div class="form-control mb-3">
        <label class="label cursor-pointer">
          <span class="label-text text-[#67676D] satoshiM">New User</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.new_user"
            @change="updateNotification('email_notification')"
          >
        </label>
      </div>

      <button
        class="btn bg-black text-white w-full"
        :disabled="loading"
        @click="sendNotification"
      >
        {{ loading ? 'Sending...' : 'Send Notification' }}
      </button>
    </div>
  </div>
</template>

<style>
.toggle:checked {
  color: #8B6914 !important;
}
</style>
