<script setup>

</script>

<template>
  <!-- Services -->
  <section>
    <div class="card card-compact bg-base-100 shadow-xl px-6 py-4 mb-6">
      <div class="card-body">
        <!-- row -->
        <div
          v-for="(items, index) in 15"
          :key="index"
          role="alert"
          class="alert bg-white border-2 text-base text-[rgba(0,0,0,1)] flex justify-between items-center mb-4"
        >
          <span class="font-bold">Tailoring</span>
          <span class="">
            <span>Title</span>
            <span class="font-bold ms-3">Male Suit Top</span>
          </span>

          <span>
            <span>Pricing Type</span>
            <span class="font-bold marker ms-3">Per Unit</span>
          </span>
          <span>
            <span>Price</span>
            <span class="font-bold ms-3">NGN 14000</span>
          </span>
          <a
            href="javascript:void(0)"
            class="font-black text-darkGold"
          >Hire</a>
        </div>
      </div>
    </div>
  </section>
</template>
