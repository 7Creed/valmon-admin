<script>
import { authController } from "~/services/modules/auth";
import { useGlobalStore } from "~/store";

const tokenCookies = useCookie("token", {
  maxAge: 60 * 60 * 24,
  // secure: true,
});
definePageMeta({
  layout: "none",
});

const loader = ref(true)

export default {
  async mounted() {
    const store = useGlobalStore();
    try {
      const { loginGoogle } = authController();

      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get("code");
      const state = queryParams.get("state");

      if (!code) {
        this.$router.push("/login");
        return;
      }

      const decoded = JSON.parse(atob(state));
      const account_type = decoded.account_type;
      const auth_type = decoded.auth_type;

      const { data, error, status } = await loginGoogle(code,state);

      if (status.value === "success") {
        tokenCookies.value = {
          token: data.value.data.token,
          type: "User",
        };
        store.UserAccount = data.value.data.user;

        const newUser = data.value.data.new_user;

        // return
        if(auth_type == 'login') {
          handleALert("success", "Login successful");
          return navigateTo('/home');
        }


        if(auth_type == 'signup' && newUser){
          handleALert("success", "Signup successful");
          switch(account_type){
            case 'worker':
              return navigateTo('/worker?stage=3') // from address section
            case 'employer':
              return navigateTo('/home')
          }
        }

        return navigateTo('/home')
      }
      if (status.value === "error") {
        handleALert("error", error.value.data.message);
        navigateTo("/login");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      navigateTo("/login");
    }
  },
};
</script>

<template>
  <div class="bg-white h-screen flex items-center justify-center flex-col">
    <span class="loading loading-spinner loading-md"></span>
    <p class="mt-4 text-lg poppins-regular">Authenticating</p>
  </div>
</template>
