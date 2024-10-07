<script setup>
import 'echarts'

definePageMeta({
  layout: 'dashboard-layout',
})
const option = ref({
  dataset: {
    dimensions: ['Product', '2015', '2016', '2017'],
    source: [
      {
        Product: 'Matcha Latte',
        2015: 54,
        2016: 42,
        2017: 23,
      },
    ],
  },
  xAxis: { type: 'category' },
  yAxis: {},
  series: [{ type: 'bar' }],
})
</script>

<template>
  <div class=" bg-primary_bg w-full p-14">
    <!-- Select -->
    <div class="bg-black w-fit text-sm p-2 px-5 rounded-2xl  text-white  center gap-3">
      <span class=""> Show Result For</span>
      <span class="ring ring-white ring-offset-0 center rounded-sm">
        <select class="select border-2  max-w-xs ml-4 bg-black ">
          <option
            disabled
            selected
          >
            This Year
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </span>
    </div>

    <div class="card card-compact bg-base-100  shadow-xl">
      <div class="card-body">
        <VChart :option="option" />
      </div>
    </div>
  </div>
</template>
