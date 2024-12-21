<script setup>
import image from '@/assets/images/UIElements/Image.jpg'
import { SettingsController } from '~/services/modules/Admin/settings'

const { createAdmin } = SettingsController()

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
  email: '',
  role: 'admin',
})
const Loading = ref(false)
const Add = async () => {
  Loading.value = true // Set loading to true before making the request
  const formData = new FormData()
  formData.append('image', Image.value)
  console.log('this is the image ->', Image.value)
  formData.append('first_name', adminData.first_name)
  formData.append('last_name', adminData.last_name)
  formData.append('email', adminData.email)
  formData.append('role', adminData.role)

  // emit('registerEvent')
  const { data, error, status } = await createAdmin(formData)
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
        <div>
          <div class="avatar mb-3">
            <a
              href="javascript:void(0)"
              class=" w-24 rounded-full"
            >
              <img
                v-if="draggedFile"
                :src="draggedFile"
                alt=""
                class="rounded-full object-contain"
              >
              <img
                v-else
                :src="image"
                @click="handleClick"
              >
            </a>
          </div>
          <p
            v-if="!draggedFile"
            class="text-darkGold font-semibold  text-center"
          >
            Upload Photo
          </p>
        </div>
        <!-- form -->
        <form>
          <BaseInput
            v-model="adminData.first_name"
            label="First Name"
            type="text"
            placeholder="John"
            class="mb-5 "
          />
          <BaseInput
            v-model="adminData.last_name"
            label="Last Name"
            type="text"
            placeholder="Doe"
            class="mb-5 "
          />
          <BaseInput
            v-model="adminData.email"
            label="Email"
            type="Emal"
            placeholder="Johndoe@email.com"
            class="mb-5 "
          />
          <BaseButton
            :loading="Loading"
            title="Add"
            color="black"
            text-color="rgba(255, 255, 255, 1)"
            :outline="false"
            class="block w-full mb-5"
            @click="Add"
          />
        </form>
      </div>
    </div>
  </div>
</template>
