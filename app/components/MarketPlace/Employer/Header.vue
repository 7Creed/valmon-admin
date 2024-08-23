<script setup>
</script>

<template>
  <div
    class="hero h-48 rounded-2xl header_wrapper relative"
  >
    <sharedButton
      color="rgba(0, 0, 0, 1)"
      class="left-[12px] top-[12px] absolute"
    />
    <div class="hero-overlay bg-opacity-0 rounded-2xl bg-gray-800 " />

    <div class="hero-content text-white text-center ">
      <div class="w-full">
        <h1 class="mb-4 text-2xl font-semibold satoshiM">
          Browse Job Categories
        </h1>
        <p class="mb-5 font-medium text-lg satoshiM">
          Look through our large collection of service providers. find the right match
        </p>
        <!-- search input -->
        <div class="rounded-lg ring-1 ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold bg-white">
          <label class="h-10 input input-bordered flex items-center gap-2 bg-inherit search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#020617"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clip-rule="evenodd"
              />
            </svg>

            <input
              type="text"
              class="text-base text-slate-950"
              placeholder="Search"
            >
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.header_wrapper {
  background-image: url('@/assets/images/UIElements/goldbg.png');
}
</style>
