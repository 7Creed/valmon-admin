<script setup>
import { useGlobalStore } from '~/store'

definePageMeta({
  layout: 'market-place',
})
const store = useGlobalStore()
const activeTab = ref('personal')

const mobileTabContent = ref(false) // on tab switch update to the isMobile current value

const isMobile = ref(false)

const screenWidth = ref(window.innerWidth)

const handleResize = () => {
  screenWidth.value = window.innerWidth
  isMobile.value = screenWidth.value <= 1024
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // Call handleResize to set initial value
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const toggleTab = (tab) => {
  mobileTabContent.value = isMobile.value
  activeTab.value = tab
}

const token = useCookie('token')

const logOut = async () => {
  token.value.token = null
  token.value.type = null
  store.$patch({
    UserAccount: null,
  })

  await navigateTo('/login')
}

const tabTitle = computed(() => {
  const tabMap = {
    personal: 'Personal Information',
    jobs: 'Active Jobs',
    payment: 'Payment Information',
    password: 'Reset Password',
    notification: 'Notification Settings',
  }
  return tabMap[activeTab.value]
})
</script>

<template>
  <div class="min-h-screen bg-primary_bg">
    <div class="flex gap-8 pb-20 pt-12 w-[90%] mx-auto">
      <!-- Tabs -->
      <aside
        :class="{ hidden: isMobile && mobileTabContent }"
        class="w-full lg:w-auto"
      >
        <div class="card card-compact bg-base-100  w-full lg:w-72 shadow-xl">
          <div class="card-body">
            <!-- Row 1 -->
            <a
              href="javascript:void(0);"
              class="flex items-center  gap-3  alert lg:alert hover:bg-valmon_yellow p-3 mb-2"
              :class="{ 'bg-valmon_yellow': activeTab === 'personal' }"
              @click="toggleTab ('personal')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <span class="text-[#67676D] text-sm">Personal Information</span>
            </a>
            <!-- Row 2 -->
            <a
              href="javascript:void(0);"
              class="flex items-center  gap-3  lg:alert alert hover:bg-valmon_yellow p-3 mb-2"
              :class="{ 'bg-valmon_yellow': activeTab === 'jobs' }"
              @click="toggleTab ('jobs')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>

              <span class="text-[#67676D] text-sm">Active Jobs</span>
            </a>
            <!-- Row 3 -->
            <a
              href="javascript:void(0);"
              class="flex items-center  gap-3  lg:alert alert hover:bg-valmon_yellow p-3 mb-2"
              :class="{ 'bg-valmon_yellow': activeTab === 'payment' }"
              @click="toggleTab ('payment')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                />
              </svg>

              <span class="text-[#67676D] text-sm">Payment Information</span>
            </a>
            <!-- Row 4 -->
            <a
              href="javascript:void(0);"
              class="flex items-center  gap-3  lg:alert alert hover:bg-valmon_yellow p-3 mb-2"
              :class="{ 'bg-valmon_yellow': activeTab === 'password' }"
              @click="toggleTab ('password')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>

              <span class="text-[#67676D] text-sm">Reset Password</span>
            </a>
            <!-- Row 2 -->
            <a
              href="javascript:void(0);"
              class="flex items-center  gap-3  lg:alert alert hover:bg-valmon_yellow p-3 mb-2"
              :class="{ 'bg-valmon_yellow': activeTab === 'notification' }"
              @click="toggleTab ('notification')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>

              <span class="text-[#67676D] text-sm">Notification Settings</span>
            </a>
            <!-- Row 2 -->
            <a
              href="javascript:void(0);"
              class="flex items-center  gap-3  lg:alert alert hover:bg-valmon_yellow p-3 mb-2"
              @click="logOut()"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 22.4975C6.977 22.4975 2.5 18.0205 2.5 12.4975C2.5 6.97447 6.977 2.49747 12.5 2.49747C14.0527 2.4963 15.5842 2.85724 16.9729 3.55161C18.3617 4.24598 19.5693 5.25464 20.5 6.49747H17.79C16.6352 5.47923 15.2112 4.81583 13.6887 4.58687C12.1663 4.35791 10.6101 4.57312 9.20689 5.20668C7.80371 5.84024 6.61315 6.86523 5.77807 8.15866C4.94299 9.45208 4.49887 10.959 4.499 12.4986C4.49913 14.0382 4.9435 15.545 5.77879 16.8383C6.61409 18.1316 7.80482 19.1564 9.2081 19.7897C10.6114 20.423 12.1676 20.638 13.69 20.4088C15.2125 20.1795 16.6364 19.5159 17.791 18.4975H20.501C19.5702 19.7404 18.3624 20.7492 16.9735 21.4436C15.5846 22.1379 14.0528 22.4988 12.5 22.4975ZM19.5 16.4975V13.4975H11.5V11.4975H19.5V8.49747L24.5 12.4975L19.5 16.4975Z"
                  fill="#E60B0B"
                />
              </svg>

              <span
                class="text-[#E60B0B] text-sm "
              >Log Out</span>
            </a>
          </div>
        </div>
      </aside>
      <!-- main -->
      <section
        :class="{ hidden: isMobile && !mobileTabContent }"
        class="flex-1 lg:block"
      >
        <!-- Tab Title for mobile view -->
        <div class="lg:hidden flex justify-center gap-2">
          <svg
            class="cursor-pointer"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            @click="mobileTabContent = !mobileTabContent"
          >
            <path
              d="M14.4377 16L21.0377 22.6L19.1523 24.4853L10.667 16L19.1523 7.51465L21.0377 9.39998L14.4377 16Z"
              fill="#09121F"
            />
          </svg>
          <h1 class="text-[#232323] font-bold text-2xl text-center center mb-5 satoshiM ">
            {{ tabTitle }}
          </h1>
        </div>
        <MarketPlaceEmployerPersonalInfo v-if="activeTab === 'personal'" />
        <MarketPlaceEmployerActiveJobs v-if="activeTab === 'jobs'" />
        <MarketPlaceEmployerPaymentInfo v-if="activeTab === 'payment'" />
        <MarketPlaceEmployerRestPassword v-if="activeTab === 'password'" />
        <MarketPlaceEmployerNotificationSetting v-if="activeTab === 'notification'" />
      </section>
    </div>
  </div>
</template>

<style>
.border_b {
  @apply border-b-darkGold pb-1 text-darkGold font-bold !important;
}
</style>
