<script setup>
import { SettingsController } from '~/services/modules/Admin/settings'
import { useGlobalStore } from '~/store'

const store = useGlobalStore()
const { updateAdmin } = SettingsController()

// selected Image url
const draggedFile = ref(null)
const Image = ref(null)

function handleClick() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = ''
  input.onchange = (e) => {
    const file = (e.target).files?.[0]
    if (file) {
      Image.value = file
      const imgUrl = URL.createObjectURL(file)
      draggedFile.value = imgUrl
    }
  }
  input.click()
}

const adminData = reactive({
  first_name: '',
  last_name: '',
  role: 'admin',
})
const Loading = ref(false)
const updateAdd = async () => {
  Loading.value = true // Set loading to true before making the request
  const formData = new FormData()
  // formData.append('image', Image.value)
  // console.log('this is the image ->', Image.value)
  formData.append('first_name', adminData.first_name)
  formData.append('last_name', adminData.last_name)
  formData.append('email', adminData.email)
  formData.append('role', adminData.role)

  // emit('registerEvent')
  const { data, error, status } = await updateAdmin(formData)
  if (status.value === 'success') {
    Loading.value = false
    handleALert('success', data.value.message)
  }
  if (status.value === 'error') {
    Loading.value = false
    handleALert('error', error.value.data.message)
  }
}
</script>

<template>
  <div>
    <div class="card card-compact bg-base-100 w-2/5 shadow-xl">
      <div class="card-body flex-row gap-8 items-start">
        <div class="avatar">
          <div class="ring-darkGold ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img
              v-if="draggedFile"
              :src="draggedFile"
              alt=""
              class="rounded-full object-contain"
            >
            <img
              v-else
              :src="store.UserAccount.profile_pic"
              @click="handleClick"
            >
            <svg
            class="absolute right-0 top-1"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M12.7156 12.7974H2.24487C2.00637 12.7974 1.80859 12.5996 1.80859 12.3611C1.80859 12.1226 2.00637 11.9248 2.24487 11.9248H12.7156C12.9541 11.9248 13.1519 12.1226 13.1519 12.3611C13.1519 12.5996 12.9541 12.7974 12.7156 12.7974Z"
                fill="#292D32"
              />
              <path
                opacity="0.4"
                d="M11.5642 2.02432C10.4356 0.895807 9.3304 0.866721 8.17281 2.02432L7.46894 2.72818C7.41077 2.78635 7.3875 2.87942 7.41077 2.96086C7.85287 4.50238 9.08608 5.7356 10.6276 6.17769C10.6509 6.18351 10.6741 6.18933 10.6974 6.18933C10.7614 6.18933 10.8196 6.16606 10.8661 6.11952L11.5642 5.41566C12.14 4.84559 12.4193 4.29297 12.4193 3.73453C12.4251 3.15864 12.1459 2.6002 11.5642 2.02432Z"
                fill="#292D32"
              />
              <path
                d="M9.58028 6.70728C9.41158 6.62584 9.2487 6.5444 9.09164 6.45133C8.96367 6.37571 8.84151 6.29427 8.71935 6.20701C8.62046 6.14302 8.50412 6.04995 8.3936 5.95688C8.38196 5.95106 8.34124 5.91616 8.29471 5.86962C8.10274 5.70674 7.88751 5.49733 7.69555 5.26465C7.6781 5.25301 7.64901 5.21229 7.60829 5.15994C7.55012 5.09014 7.45123 4.9738 7.36398 4.84C7.29417 4.75275 7.21273 4.62477 7.13711 4.4968C7.04404 4.33974 6.9626 4.18268 6.88116 4.0198C6.79972 3.84529 6.73574 3.67659 6.67757 3.51953L3.02445 7.17264C2.94883 7.24826 2.87903 7.39369 2.86158 7.49258L2.54745 9.72051C2.48928 10.1161 2.59981 10.4884 2.84412 10.7385C3.05354 10.9421 3.34439 11.0526 3.65851 11.0526C3.72832 11.0526 3.79812 11.0468 3.86793 11.0352L6.10168 10.721C6.20638 10.7036 6.35181 10.6338 6.42161 10.5582L10.0747 6.90506C9.91185 6.84689 9.75479 6.7829 9.58028 6.70728Z"
                fill="#292D32"
              />
            </svg>
          </div>
        </div>
        <!-- form -->
        <form>
          <BaseInput
            label="First Name"
            type="text"
            placeholder="John"
            class="mb-5 "
          />
          <BaseInput
            label="Last Name"
            type="text"
            placeholder="Doe"
            class="mb-5 "
          />
          <BaseInput
            label="Email"
            type="Emal"
            :placeholder="store.UserAccount.email"
            class="mb-5 hidden"
            
          />
          <BaseButton
            :loading="Loading"
            title="Update"
            color="black"
            text-color="rgba(255, 255, 255, 1)"
            :outline="false"
            class="block w-full mb-5"
            @click="updateAdd"
          />
        </form>
      </div>
    </div>
  </div>
</template>
