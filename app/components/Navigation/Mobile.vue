<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = (event) => {
  if (event.target.classList.contains('overlay')) {
    showMenu.value = false
  }
}

// Watch for menu visibility and toggle `no-scroll` class on <body>
watch(showMenu, (isVisible) => {
  if (isVisible) {
    document.body.style.overflow = 'hidden' // Disable scrolling
  }
  else {
    document.body.style.overflow = '' // Re-enable scrolling
  }
})

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
  document.body.style.overflow = '' // Ensure scrolling is re-enabled on unmount
})
</script>

<template>
  <div class="mobile-navbar bg-black fixed top-0 left-0 right-0 z-50">
    <div
      v-if="!showMenu"
      class="navbar bg-black"
    >
      <div class="navbar-start">
        <div
          class="dropdown"
          @click="toggleMenu"
        >
          <img
            src="../../assets//images/UIElements/menu.svg"
            alt=""
            class="w-[30px]"
          >
        </div>
      </div>
      <div class="navbar-center">
        <img
          src="../../assets/images/Logo/valmon.svg"
          alt=""
          class="w-[40px]"
        >
      </div>
      <div class="navbar-end">
        <div class="flex justify-center items-center">
          <NuxtLink
            to="/login"
            class="btn btn-ghost btn-circle"
          >
            <span class="text-white satoshiM text-xs sm:text-base">Sign In</span>
          </NuxtLink>
          <span class="text-white satoshiM text-xs">|</span>
          <NuxtLink
            to="/getstarted"
            class="btn btn-ghost btn-circle"
          >
            <span class="text-white satoshiM text-xs sm:text-base">Sign Up</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-show="showMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-[1000] overlay transition-opacity duration-300 ease-in-out"
      >
        <div
          class="w-4/5 bg-[#151212] h-full p-8 text-lg transform transition-transform duration-300 ease-in-out"
          @click.stop
        >
          <img
            src="../../assets/images/Logo/valmon.svg"
            alt=""
            class="w-2/6 mb-10"
          >

          <div class="font-semibold bg-[#1E1E1E] box-shadow-md rounded-lg p-4 mb-8">
            <p class="text-white font-semibold mb-3">
              Select Currency
            </p>
            <div class="flex flex-col gap-4">
              <button class="btn bg-[#FF8C48] border border-[#FF8C48] text-white font-semibold text-lg">
                <img
                  src="../../assets/icons/Nigeria.svg"
                  alt=""
                >
                <span>Nigeria Naira</span>
              </button>
              <button class="btn font-semibold text-lg">
                <img
                  src="../../assets/icons/pound.svg"
                  alt=""
                >
                <span>Pound Sterling</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col group">
            <NuxtLink
              to="/notification"
              class="text-white font-semibold"
            >
              Notifications
            </NuxtLink>
            <div class="divider h-[1px] bg-gray-500" />
            <NuxtLink
              to="/notification"
              class="text-white font-semibold"
            >
              Contact Us
            </NuxtLink>
            <div class="divider h-[1px] bg-gray-500" />
            <NuxtLink
              to="/notification"
              class="text-white font-semibold"
            >
              Order Tracking
            </NuxtLink>
            <div class="divider h-[1px] bg-gray-500" />
            <NuxtLink
              to="/notification"
              class="text-white font-semibold"
            >
              Logout
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.no-scroll {
  overflow: hidden;
  height: 100vh;
}
</style>
