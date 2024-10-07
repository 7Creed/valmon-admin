<script setup>
import image from '@/assets/images/UIElements/Image.jpg'
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
              <img :src="image">
            </a>
          </div>
          <p class="text-darkGold font-semibold  text-center">
            Upload Photo
          </p>
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
            title="Add"
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
