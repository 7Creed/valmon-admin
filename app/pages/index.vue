<script setup>
import google from "@/assets/icons/google.svg";

import { AdminAuthController } from "~/services/modules/Admin/auth";
import { useGlobalStore } from "~/store";

const store = useGlobalStore();

const tokenCookies = useCookie("token", {
  maxAge: 60 * 60 * 24,
  // secure: true,
});

const { login } = AdminAuthController();
const loading = ref(false);
const userData = reactive({
  email: "",
  password: "",
});

const signIn = async () => {
  loading.value = true;

  try {
    // 1. Attempt login with timeout
    const { data, error, status } = await login(userData);

    // 2. Handle successful response
    if (status.value === "success") {
      tokenCookies.value = { token: data.value.data.token, type: "Admin" };
      store.UserAccount = data.value.data.admin;
      handleALert("success", "Login successful");
      navigateTo("/summary");
    }
    // 3. Handle backend errors (invalid credentials, etc.)
    else if (status.value === "error") {
      handleALert("error", error.value.data?.message || "Login failed");
    }
  } catch (error) {
    // 4. Handle network errors
    if (!window.navigator.onLine) {
      handleALert("error", "You are offline");
    } else if (!error.response) {
      handleALert("error", "Server unavailable");
    } else {
      handleALert("error", "Login error");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="center w-[100%] min-h-screen bg-white">
    <!-- Authentication -->
    <div class="Login w-full lg:w-1/2 center">
      <div class="w-1/2">
        <div class="mb-9">
          <h1 class="text-3xl font-bold text-[rgba(35, 35, 35, 1)] mb-2">
            Sign In
          </h1>
          <p class="text-lg text-[rgba(106, 106, 106, 1)]">
            Please login to continue to your account.
          </p>
        </div>
        <BaseInput
          v-model="userData.email"
          label="Email"
          type="email"
          placeholder="Johndoe@email.com"
          class="mb-6"
        />
        <BaseInput
          v-model="userData.password"
          label="Password"
          type="password"
          :icon="true"
          icon-type="password"
        />
        <div
          class="form-control mb-5 flex flex-row items-center justify-between"
        >
          <!-- <label class="label cursor-pointer justify-start">
            <input
              type="checkbox"
              class="checkbox border-2 border-[rgba(0, 0, 0, 1)]"
            >
            <span class=" ms-2 label-text text-base text-[rgba(35, 35, 35, 1)]">Keep me logged in</span>
          </label> -->
          <NuxtLink
            to="/forgotpassword"
            class="hidden ms-2 label-text text-base text-darkGold hover:underline"
          >
            forgot password
          </NuxtLink>
        </div>
        <BaseButton
          :loading="loading"
          title="Sign In"
          color="#8B6914"
          text-color="rgba(255, 255, 255, 1)"
          :outline="false"
          class="block w-full mb-5"
          @click="signIn"
        />
        <div class="hidden divider mb-5">OR</div>
        <div class="hidden">
          <BaseButton
            title="Sign in with Google"
            color="rgba(255, 255, 255, 1)"
            text-color="rgba(35, 35, 35, 1)"
            border="rgba(230, 232, 231, 1)"
            :outline="true"
            alt="google"
            :src="google"
            class="w-full mb-5"
          />
        </div>
        <p class="hidden text-lg font-semibold text-center">
          Don’t Have account?
          <NuxtLink to="/getstarted" class="text-darkGold"> Sign Up </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
