<script setup>
import { useGlobalStore } from '@/store'

// Initialization
const store = useGlobalStore()
const pathColor = ref('#A3A3A8')
const activePathColor = ref('#232222')
const activeMenu = computed(() => store.activeSideMenu)

// Updating the store with the active menu
function changeActiveMenu(menu) {
  store.$patch({
    activeSideMenu: menu,
    // Rerender the skill tab
    viewParentSubCategory: false,
  })
}
</script>

<template>
  <div class="bg-[#232222] text-white w-[250px] relative px-3 py-20">
    <div>
      <!-- Summary -->
      <nuxt-link
        to="dashboard"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'summary' }"
        @click="changeActiveMenu('summary')"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.88892 12.2234C1.88892 11.2606 1.88892 10.7792 2.10562 10.4256C2.22688 10.2277 2.39325 10.0613 2.59112 9.94008C2.94475 9.72339 3.42614 9.72339 4.38892 9.72339C5.35169 9.72339 5.83308 9.72339 6.18671 9.94008C6.38458 10.0613 6.55095 10.2277 6.67221 10.4256C6.88892 10.7792 6.88892 11.2606 6.88892 12.2234C6.88892 13.1861 6.88892 13.6676 6.67221 14.0212C6.55095 14.2191 6.38458 14.3855 6.18671 14.5067C5.83308 14.7234 5.35169 14.7234 4.38892 14.7234C3.42614 14.7234 2.94475 14.7234 2.59112 14.5067C2.39325 14.3855 2.22688 14.2191 2.10562 14.0212C1.88892 13.6676 1.88892 13.1861 1.88892 12.2234Z"
            :stroke="activeMenu ==='summary' ? activePathColor : pathColor"
            stroke-width="1.25"
          />
          <path
            d="M9.38892 12.2234C9.38892 11.2606 9.38892 10.7792 9.6056 10.4256C9.72685 10.2277 9.89323 10.0613 10.0911 9.94008C10.4447 9.72339 10.9262 9.72339 11.8889 9.72339C12.8517 9.72339 13.3331 9.72339 13.6867 9.94008C13.8846 10.0613 14.051 10.2277 14.1722 10.4256C14.3889 10.7792 14.3889 11.2606 14.3889 12.2234C14.3889 13.1861 14.3889 13.6676 14.1722 14.0212C14.051 14.2191 13.8846 14.3855 13.6867 14.5067C13.3331 14.7234 12.8517 14.7234 11.8889 14.7234C10.9262 14.7234 10.4447 14.7234 10.0911 14.5067C9.89323 14.3855 9.72685 14.2191 9.6056 14.0212C9.38892 13.6676 9.38892 13.1861 9.38892 12.2234Z"
            :stroke="activeMenu ==='summary' ? activePathColor : pathColor"

            stroke-width="1.25"
          />
          <path
            d="M1.88892 4.72339C1.88892 3.76061 1.88892 3.27923 2.10562 2.92559C2.22688 2.72772 2.39325 2.56135 2.59112 2.44009C2.94475 2.22339 3.42614 2.22339 4.38892 2.22339C5.35169 2.22339 5.83308 2.22339 6.18671 2.44009C6.38458 2.56135 6.55095 2.72772 6.67221 2.92559C6.88892 3.27923 6.88892 3.76061 6.88892 4.72339C6.88892 5.68616 6.88892 6.16755 6.67221 6.52118C6.55095 6.71906 6.38458 6.88543 6.18671 7.00668C5.83308 7.22339 5.35169 7.22339 4.38892 7.22339C3.42614 7.22339 2.94475 7.22339 2.59112 7.00668C2.39325 6.88543 2.22688 6.71906 2.10562 6.52118C1.88892 6.16755 1.88892 5.68616 1.88892 4.72339Z"
            :stroke="activeMenu ==='summary' ? activePathColor : pathColor"

            stroke-width="1.25"
          />
          <path
            d="M9.38892 4.72339C9.38892 3.76061 9.38892 3.27923 9.6056 2.92559C9.72685 2.72772 9.89323 2.56135 10.0911 2.44009C10.4447 2.22339 10.9262 2.22339 11.8889 2.22339C12.8517 2.22339 13.3331 2.22339 13.6867 2.44009C13.8846 2.56135 14.051 2.72772 14.1722 2.92559C14.3889 3.27923 14.3889 3.76061 14.3889 4.72339C14.3889 5.68616 14.3889 6.16755 14.1722 6.52118C14.051 6.71906 13.8846 6.88543 13.6867 7.00668C13.3331 7.22339 12.8517 7.22339 11.8889 7.22339C10.9262 7.22339 10.4447 7.22339 10.0911 7.00668C9.89323 6.88543 9.72685 6.71906 9.6056 6.52118C9.38892 6.16755 9.38892 5.68616 9.38892 4.72339Z"
            :stroke="activeMenu ==='summary' ? activePathColor : pathColor"

            stroke-width="1.25"
          />
        </svg>
        <span>    Summary</span>
      </nuxt-link>

      <!-- Manage User -->
      <nuxt-link
        to="user"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'user' }"
        @click="changeActiveMenu('user')"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.6434 9.77082C10.5601 9.76248 10.4601 9.76248 10.3684 9.77082C8.38506 9.70415 6.81006 8.07915 6.81006 6.07915C6.81006 4.03748 8.46006 2.37915 10.5101 2.37915C12.5517 2.37915 14.2101 4.03748 14.2101 6.07915C14.2017 8.07915 12.6267 9.70415 10.6434 9.77082Z"
            :stroke="activeMenu ==='user' ? activePathColor : pathColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.47661 12.8457C4.45994 14.1957 4.45994 16.3957 6.47661 17.7373C8.76828 19.2707 12.5266 19.2707 14.8183 17.7373C16.8349 16.3873 16.8349 14.1873 14.8183 12.8457C12.5349 11.3207 8.77661 11.3207 6.47661 12.8457Z"
            :stroke="activeMenu ==='user' ? activePathColor : pathColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>  Manage Users</span>
      </nuxt-link>

      <!-- Skills -->
      <nuxt-link
        to="skills"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'skills' }"
        @click="changeActiveMenu('skills')"
      >
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.40576 11.3559C7.40576 10.2112 7.40576 9.28717 9.47451 9.28717H12.2328C14.3016 9.28717 14.3016 8.59759 14.3016 7.21842V5.83926C14.3016 4.46009 14.3016 3.77051 12.2328 3.77051H11.5433"
            :stroke="activeMenu ==='skills' ? activePathColor : pathColor"

            stroke-width="0.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.78494 1.70166H6.0266C5.57837 3.04635 5.57837 4.49447 6.0266 5.83916H8.78494C9.23316 4.49447 9.23316 3.04635 8.78494 1.70166Z"
            :stroke="activeMenu ==='skills' ? activePathColor : pathColor"
            stroke-width="0.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.02664 1.70166H5.33706C3.95789 1.70166 3.26831 2.39124 3.26831 3.77041C3.26831 5.14958 3.95789 5.83916 5.33706 5.83916H6.02664C5.33706 4.45999 5.33706 3.08083 6.02664 1.70166Z"
            :stroke="activeMenu ==='skills' ? activePathColor : pathColor"
            stroke-width="0.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.4745 1.70166H8.78491C9.4745 3.08083 9.4745 4.45999 8.78491 5.83916H9.4745C10.8537 5.83916 11.5432 5.14958 11.5432 3.77041C11.5432 2.39124 10.8537 1.70166 9.4745 1.70166Z"
            :stroke="activeMenu ==='skills' ? activePathColor : pathColor"
            stroke-width="0.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.06099 15.4935H7.75057C8.78494 15.4935 8.78494 14.8039 8.78494 14.4591V12.3903C8.78494 12.0455 8.78494 11.356 7.75057 11.356H7.06099C6.02661 11.356 6.02661 12.0455 6.02661 12.3903V14.4591C6.02661 14.8039 6.02661 15.4935 7.06099 15.4935Z"
            :stroke="activeMenu ==='skills' ? activePathColor : pathColor"
            stroke-width="0.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span> Skills</span>
      </nuxt-link>

      <!-- MarketPlace -->
      <nuxt-link
        to="market"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'marketplace' }"
        @click="changeActiveMenu('marketplace')"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4267 19.8913H7.92672C3.81006 19.8913 2.06006 18.133 2.06006 14.0246V10.283C2.06006 9.94129 2.34339 9.65796 2.68506 9.65796C3.02673 9.65796 3.31006 9.94129 3.31006 10.283V14.0246C3.31006 17.433 4.51839 18.6413 7.92672 18.6413H12.4184C15.8267 18.6413 17.0351 17.433 17.0351 14.0246V10.283C17.0351 9.94129 17.3184 9.65796 17.6601 9.65796C18.0017 9.65796 18.2851 9.94129 18.2851 10.283V14.0246C18.2934 18.133 16.5351 19.8913 12.4267 19.8913Z"
            :stroke="activeMenu ==='marketplace' ? activePathColor : pathColor"
          />
          <path
            d="M10.1767 11.5579C9.26001 11.5579 8.42668 11.1996 7.83501 10.5413C7.24334 9.88294 6.96834 9.02461 7.06001 8.10794L7.61834 2.54128C7.65168 2.22461 7.91834 1.97461 8.24334 1.97461H12.135C12.46 1.97461 12.7267 2.21628 12.76 2.54128L13.3183 8.10794C13.41 9.02461 13.135 9.88294 12.5433 10.5413C11.9267 11.1996 11.0933 11.5579 10.1767 11.5579ZM8.80168 3.22461L8.30168 8.23294C8.24334 8.79128 8.41001 9.31628 8.76001 9.69961C9.46834 10.4829 10.885 10.4829 11.5933 9.69961C11.9433 9.30794 12.11 8.78294 12.0517 8.23294L11.5517 3.22461H8.80168Z"
            :stroke="activeMenu ==='marketplace' ? activePathColor : pathColor"
          />
          <path
            d="M15.435 11.5579C13.7433 11.5579 12.235 10.1913 12.06 8.50794L11.4767 2.66628C11.46 2.49128 11.5183 2.31628 11.635 2.18294C11.7517 2.04961 11.9183 1.97461 12.1017 1.97461H14.6433C17.0933 1.97461 18.235 2.99961 18.5767 5.51628L18.81 7.83294C18.91 8.81628 18.61 9.74961 17.9683 10.4579C17.3267 11.1663 16.4267 11.5579 15.435 11.5579ZM12.7933 3.22461L13.31 8.38294C13.4183 9.42461 14.385 10.3079 15.435 10.3079C16.0683 10.3079 16.635 10.0663 17.0433 9.62461C17.4433 9.18294 17.6267 8.59128 17.5683 7.95794L17.335 5.66628C17.0767 3.78294 16.4683 3.22461 14.6433 3.22461H12.7933Z"
            :stroke="activeMenu ==='marketplace' ? activePathColor : pathColor"
          />
          <path
            d="M4.87678 11.5579C3.88511 11.5579 2.98511 11.1663 2.34344 10.4579C1.70178 9.74961 1.40178 8.81628 1.50178 7.83294L1.72678 5.54128C2.07678 2.99961 3.21844 1.97461 5.66844 1.97461H8.21011C8.38511 1.97461 8.55177 2.04961 8.67677 2.18294C8.80177 2.31628 8.85178 2.49128 8.83511 2.66628L8.25177 8.50794C8.07677 10.1913 6.56844 11.5579 4.87678 11.5579ZM5.66844 3.22461C3.84344 3.22461 3.23511 3.77461 2.96844 5.68294L2.74344 7.95794C2.67678 8.59128 2.86844 9.18294 3.26844 9.62461C3.66844 10.0663 4.23511 10.3079 4.87678 10.3079C5.92678 10.3079 6.90178 9.42461 7.00178 8.38294L7.51844 3.22461H5.66844Z"
            :stroke="activeMenu ==='marketplace' ? activePathColor : pathColor"
          />
          <path
            d="M12.2602 19.8913H8.09351C7.75184 19.8913 7.46851 19.6079 7.46851 19.2663V17.1829C7.46851 15.4329 8.42684 14.4746 10.1768 14.4746C11.9268 14.4746 12.8852 15.4329 12.8852 17.1829V19.2663C12.8852 19.6079 12.6018 19.8913 12.2602 19.8913ZM8.71851 18.6413H11.6352V17.1829C11.6352 16.1329 11.2268 15.7246 10.1768 15.7246C9.12684 15.7246 8.71851 16.1329 8.71851 17.1829V18.6413Z"
            :stroke="activeMenu ==='marketplace' ? activePathColor : pathColor"
          />
        </svg>
        <span>Marketplace</span>
      </nuxt-link>

      <!-- Valmon Wallet -->

      <nuxt-link
        to="wallet"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'wallet' }"
        @click="changeActiveMenu('wallet')"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.42676 12.0012C8.42676 12.8096 9.05177 13.4596 9.81844 13.4596H11.3851C12.0517 13.4596 12.5934 12.8929 12.5934 12.1846C12.5934 11.4262 12.2601 11.1513 11.7684 10.9763L9.26009 10.1012C8.76842 9.92625 8.4351 9.65959 8.4351 8.89292C8.4351 8.19292 8.97675 7.61792 9.64342 7.61792H11.2101C11.9768 7.61792 12.6018 8.26792 12.6018 9.07625"
            :stroke="activeMenu ==='wallet' ? activePathColor : pathColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.51 6.79297V14.293"
            :stroke="activeMenu ==='wallet' ? activePathColor : pathColor"

            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.8434 10.5431C18.8434 15.1431 15.1101 18.8764 10.5101 18.8764C5.91009 18.8764 2.17676 15.1431 2.17676 10.5431C2.17676 5.94305 5.91009 2.20972 10.5101 2.20972"
            :stroke="activeMenu ==='wallet' ? activePathColor : pathColor"

            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.8433 5.54305V2.20972H15.51"
            :stroke="activeMenu ==='wallet' ? activePathColor : pathColor"

            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.6768 6.37638L18.8434 2.20972"
            :stroke="activeMenu ==='wallet' ? activePathColor : pathColor"

            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Valmon Wallet</span>
      </nuxt-link>

      <!-- Conflict Resolution -->

      <nuxt-link
        to="resolution"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'resolution' }"
        @click="changeActiveMenu('resolution')"
      >
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9929 8.08419C14.9929 4.99568 14.9929 3.45143 14.0334 2.49195C13.0739 1.53247 11.5296 1.53247 8.44113 1.53247C5.35262 1.53247 3.80836 1.53247 2.84888 2.49195C1.8894 3.45143 1.8894 4.99568 1.8894 8.08419C1.8894 11.1727 1.8894 12.717 2.84888 13.6765C3.77197 14.5995 5.23631 14.6345 8.0963 14.6358"
            :stroke="activeMenu ==='resolution' ? activePathColor : pathColor"

            stroke-width="1.03448"
            stroke-linecap="round"
          />
          <path
            d="M1.8894 4.98071H14.9929"
            :stroke="activeMenu ==='resolution' ? activePathColor : pathColor"

            stroke-width="1.03448"
            stroke-linejoin="round"
          />
          <path
            d="M7.40657 11.1876H8.44105M4.64795 11.1876H5.3376M7.40657 8.42896H11.5445M4.64795 8.42896H5.3376"
            :stroke="activeMenu ==='resolution' ? activePathColor : pathColor"

            stroke-width="1.03448"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.1745 10.4095C14.553 9.71533 14.1801 9.75664 13.7659 9.88064C13.4759 9.92195 12.4815 11.0788 12.0672 11.4473C11.387 12.1172 10.7036 12.8069 10.6586 12.8969C10.5298 13.1056 10.41 13.4754 10.352 13.8886C10.2443 14.5084 10.0302 15.1749 10.2857 15.2658C10.41 15.4311 11.0314 15.2108 11.6529 15.1199C12.0672 15.0455 12.3572 14.9628 12.5644 14.8389C12.8544 14.6653 13.393 14.0538 14.321 13.1448C14.903 12.534 15.4645 12.1118 15.6302 11.6986C15.7959 11.0788 15.5474 10.7483 15.1745 10.4095Z"
            :stroke="activeMenu ==='resolution' ? activePathColor : pathColor"

            stroke-width="1.03448"
          />
        </svg>
        <span>Conflict Resolution</span>
      </nuxt-link>

      <!-- Settings -->

      <nuxt-link
        to="settings"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'settings' }"
        @click="changeActiveMenu('settings')"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.78506 10.9374C9.9276 10.9374 10.8538 10.0112 10.8538 8.86868C10.8538 7.72614 9.9276 6.79993 8.78506 6.79993C7.64252 6.79993 6.71631 7.72614 6.71631 8.86868C6.71631 10.0112 7.64252 10.9374 8.78506 10.9374Z"
            :stroke="activeMenu ==='settings' ? activePathColor : pathColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.88916 9.47548V8.26182C1.88916 7.54465 2.47531 6.95161 3.19937 6.95161C4.44751 6.95161 4.95781 6.06894 4.33029 4.9863C3.9717 4.36567 4.18547 3.55886 4.81299 3.20028L6.00597 2.51759C6.55074 2.19348 7.25412 2.38657 7.57822 2.93134L7.65408 3.06236C8.2747 4.145 9.29528 4.145 9.92281 3.06236L9.99866 2.93134C10.3228 2.38657 11.0261 2.19348 11.5709 2.51759L12.7639 3.20028C13.3914 3.55886 13.6052 4.36567 13.2466 4.9863C12.6191 6.06894 13.1294 6.95161 14.3775 6.95161C15.0947 6.95161 15.6877 7.53775 15.6877 8.26182V9.47548C15.6877 10.1926 15.1016 10.7857 14.3775 10.7857C13.1294 10.7857 12.6191 11.6684 13.2466 12.751C13.6052 13.3785 13.3914 14.1784 12.7639 14.537L11.5709 15.2197C11.0261 15.5438 10.3228 15.3507 9.99866 14.806L9.92281 14.6749C9.30218 13.5923 8.2816 13.5923 7.65408 14.6749L7.57822 14.806C7.25412 15.3507 6.55074 15.5438 6.00597 15.2197L4.81299 14.537C4.18547 14.1784 3.9717 13.3716 4.33029 12.751C4.95781 11.6684 4.44751 10.7857 3.19937 10.7857C2.47531 10.7857 1.88916 10.1926 1.88916 9.47548Z"
            :stroke="activeMenu ==='settings' ? activePathColor : pathColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Settings</span>
      </nuxt-link>

      <!-- Account Managers -->
      <nuxt-link
        to="account"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'account' }"
        @click="changeActiveMenu('account')"
      >
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.74381 1.74163L4.3028 3.03114C3.50978 3.32767 2.86157 4.26549 2.86157 5.11368V10.2373C2.86157 11.051 3.39945 12.1198 4.05456 12.6094L7.01976 14.823C7.99207 15.554 9.59189 15.554 10.5642 14.823L13.5294 12.6094C14.1845 12.1198 14.7224 11.051 14.7224 10.2373V5.11368C14.7224 4.26549 14.0742 3.32767 13.2812 3.03114L9.84015 1.74163C9.25401 1.52786 8.31617 1.52786 7.74381 1.74163Z"
            :stroke="activeMenu ==='account' ? activePathColor : pathColor"

            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.78508 7.73411C8.75749 7.73411 8.72301 7.73411 8.69543 7.73411C8.04722 7.71342 7.53003 7.17554 7.53003 6.52044C7.53003 5.85154 8.07481 5.30676 8.7437 5.30676C9.4126 5.30676 9.95738 5.85154 9.95738 6.52044C9.95048 7.18244 9.43328 7.71342 8.78508 7.73411Z"
            :stroke="activeMenu ==='account' ? activePathColor : pathColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.41276 9.6649C6.75076 10.1062 6.75076 10.8303 7.41276 11.2716C8.16441 11.775 9.39876 11.775 10.1504 11.2716C10.8124 10.8303 10.8124 10.1062 10.1504 9.6649C9.40566 9.1615 8.1713 9.1615 7.41276 9.6649Z"
            :stroke="activeMenu ==='account' ? activePathColor : pathColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span> Account Managers</span>
      </nuxt-link>

      <!-- Logout -->
      <nuxt-link
        to="logout"
        class="flex items-center gap-4 font-medium p-4 mb-6"
        :class="{ activeMenu: activeMenu === 'logout' }"
        @click="changeActiveMenu('logout')"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5364 10.8958L14.3017 9.13045L12.5364 7.36511"
            :stroke="activeMenu ==='logout' ? activePathColor : pathColor"

            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.24023 9.13049H14.2533"
            :stroke="activeMenu ==='logout' ? activePathColor : pathColor"

            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.61945 14.6057C5.57149 14.6057 3.10278 12.537 3.10278 9.08905C3.10278 5.64114 5.57149 3.57239 8.61945 3.57239"
            :stroke="activeMenu ==='logout' ? activePathColor : pathColor"

            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Logout</span>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.activeMenu {
  @apply bg-darkGold text-valmon_menu
}
</style>
