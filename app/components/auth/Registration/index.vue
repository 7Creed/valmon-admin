<script setup>
import ChoiceCard from './ChoiceCard.vue'
import ClientSignUp from './ClientSignUp.vue'

const user = ref('')
const navigation = ref(false)

const registrationPath = async (path) => {
  if (path === 'worker') {
    await navigateTo('/worker')
    return
  }
  // path is client
  user.value = path
  navigation.value = true
}

const back = () => {
  user.value = ''
  navigation.value = false
}
</script>

<template>
  <div class="flex justify-items-center flex-row w-[90%] bg-white">
    <!-- Images -->
    <div class=" flex-1">
      <authValmon
        :navigation="navigation"
        @btn-event="back()"
      />
    </div>
    <!-- Authentication -->
    <div

      class="flex-1 center"
    >
      <div
        v-if="user !== 'client'"
        class="w-2/3"
      >
        <h1 class="text-3xl font-bold text-[rgba(30, 30, 30, 1)] mb-5 text-center">
          I am signing up to
        </h1>

        <ChoiceCard
          title="Hire Skilled Workers"
          text="Get The Right Person For The Job"
          class="mb-5 hover:bg-slate-100"
          @click="registrationPath('client')"
        />
        <ChoiceCard
          title="Earn By Selling My Skills"
          text="Expand Your Client Base, Get a Wider Reach"
          class=" hover:bg-slate-100"
          @click="registrationPath('worker')"
        />
      </div>

      <!-- CLient Sign up process -->
      <div
        v-if="user ==='client'"
        class="w-1/2"
      >
        <ClientSignUp account-type="employer" />
      </div>
    </div>
  </div>
</template>

<style>
</style>
