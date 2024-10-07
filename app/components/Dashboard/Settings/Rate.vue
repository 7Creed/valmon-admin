<template>
  <div class="card card-compact bg-base-100 w-2/4 shadow-xl">
    <div class="card-body">
      <div class="mb-10">
        <div class="text-black font-bold mb-4 flex justify-between items-center">
          <span> Skill Charge Percentage</span>
          <span class="text-brightGold font-bold satoshiM">16%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value="1"
          class="range range-sm range-warning mb-2"
          step="1"
        >
        <div class="flex w-full justify-between px-2 text-xs">
          <span
            v-for="(item) in 11 "
            :key="item"
          >{{ (item * 10) - 10 }}%</span>
        </div>
      </div>
      <div class="mb-16">
        <div class="text-black font-bold mb-4 flex justify-between items-center">
          <span> Listing Sale Percentage</span>
          <span class="text-brightGold satoshiM">16%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value="1"
          class="range range-sm range-warning mb-2"
          step="1"
        >
        <div class="flex w-full justify-between px-2 text-xs">
          <span
            v-for="(item) in 11 "
            :key="item"
          >{{ (item * 10) - 10 }}%</span>
        </div>
      </div>
      <BaseButton
        title="Save Changes"
        color="black"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full mb-5"
      />
    </div>
  </div>
</template>
