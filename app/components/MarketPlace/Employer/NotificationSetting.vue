<script setup>
import { NotificationsController } from '~/services/modules/notificatons'

const { getNotifications, createNotifications } = NotificationsController()

const notification = reactive({
  email_notification: true,
  message_notification: false,
  push_notification: true,
  payment_notification: true,

})

const updateNotification = (id) => {
  notification[id] = !notification[id]
}

const loading = ref(false)
const sendNotification = async () => {
  loading.value = true
  const { status, error } = await createNotifications({
    email_notification: notification.email_notification,
    message_notification: notification.message_notification,
    push_notification: notification.push_notification,
    payment_notification: notification.payment_notification,
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
    const { status, data, error } = await getNotifications()
    if (status.value === 'success') {
      console.log(data.value.data)
      notification.email_notification = data.value.data.email_notification
      notification.message_notification = data.value.data.message_notification
      notification.push_notification = data.value.data.push_notification
      notification.payment_notification = data.value.data.payment_notification
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
          <span class="label-text text-[#67676D] satoshiM">Push Notifications</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.push_notification"
            @change="updateNotification('push_notification')"
          >

        </label>
      </div>
      <div class="form-control mb-3">
        <label class="label cursor-pointer">
          <span class="label-text text-[#67676D] satoshiM ">Message Notifications</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.message_notification"
            @change="updateNotification('message_notification')"
          >
        </label>
      </div>
      <div class="form-control mb-3">
        <label class="label cursor-pointer">
          <span class="label-text text-[#67676D] satoshiM">Payment Notifications</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.payment_notification"
            @change="updateNotification('payment_notification')"
          >
        </label>
      </div>
      <div class="form-control mb-3">
        <label class="label cursor-pointer">
          <span class="label-text text-[#67676D] satoshiM">Email Notifications</span>
          <input
            type="checkbox"
            class="toggle"
            :checked="notification.email_notification"
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
