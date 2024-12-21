<script setup>
const props = defineProps({
  marketplaceSales: Object,
})
const chartOptions = {
  chart: {
    id: 'line-example',
    type: 'line',
  },
  title: {
    text: 'MarketPlace Sales',
  },
  subtitle: {
    text: 'Income Over Time',
  },
  xaxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
  },

}
const series = [
  {
    name: 'Income from Skills',
    data: [
      ...props.marketplaceSales.values
    ],
  },
]
</script>

<template>
  <apexchart type="line" :options="chartOptions" :series="series" height="300" />
</template>
