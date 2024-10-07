<script setup>
</script>

<template>
  <div>
    <div class="card card-compact bg-base-100 w-2/5 shadow-xl">
      <div class="card-body flex-row gap-8 items-start">
        <div class="avatar">
          <div class="ring-darkGold ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">
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
            placeholder="Johndoe@email.com"
            class="mb-5 "
          />
          <BaseButton
            title="Update"
            color="black"
            text-color="rgba(255, 255, 255, 1)"
            :outline="false"
            class="block w-full mb-5"
          />
        </form>
      </div>
    </div>
  </div>
</template>
