<script setup>
import google from '@/assets/icons/google.svg'

const countryCode = ['+234', '+342']
const emit = defineEmits(['registerEvent'])
// Updates sign up title
const router = useRouter()
const worker = ref(true)

onMounted(() => {
  if (router.hasRoute('/worker')) {
    worker.value = false
  }
})

// emit signup event
const signUp = () => {
  emit('registerEvent')
}
</script>

<template>
  <div class="">
    <div class="mb-9 ">
      <h1 class="text-3xl font-bold text-[rgba(35, 35, 35, 1)] mb-2">
        {{ worker ? 'Worker Sign Up': 'Client Sign Up' }}
      </h1>
      <p class="text-lg text-[rgba(106, 106, 106, 1)]">
        Sign up to find the best Man For The Job
      </p>
    </div>
    <div class="center gap-2 mb-5">
      <BaseInput
        label="First Name"
        type="text"
        placeholder="John"
        class="flex-1 "
      />
      <BaseInput
        label="Last Name"
        type="text"
        placeholder="Doe"
        class="flex-1 "
      />
    </div>
    <BaseInput
      label="Email"
      type="email"
      placeholder="Johndoe@email.com"
      class="flex-1 mb-5"
    />
    <div class="center gap-2 mb-5">
      <BaseInput
        label="Country Code"
        type="select"
        :data="countryCode"
        class="flex-1 "
      />
      <BaseInput
        label="Phone Number"
        type="tel"
        placeholder="08123487678"
        class="flex-1 "
      />
    </div>
    <div class="center gap-2 mb-5">
      <BaseInput
        label="Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="flex-1 "
      />
      <BaseInput
        label="Confirm Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="flex-1 "
      />
    </div>

    <BaseButton
      title="Sign Up"
      color="#8B6914"
      text-color="rgba(255, 255, 255, 1)"
      :outline="false"
      class="block w-full mb-5"
      @click="signUp()"
    />
    <div class="divider mb-5">
      OR
    </div>
    <div>
      <BaseButton
        title="Sign up with Google"
        color="rgba(255, 255, 255, 1)"
        text-color="rgba(35, 35, 35, 1)"
        border="rgba(230, 232, 231, 1)"
        :outline="true"
        alt="google"
        :src="google"
        class=" w-full mb-5"
      />
    </div>
    <p class="text-lg font-semibold text-center">
      Already Have account? <NuxtLink
        to="/login"
        class=" text-darkGold"
      >
        Login
      </NuxtLink>
    </p>
  </div>
</template>
