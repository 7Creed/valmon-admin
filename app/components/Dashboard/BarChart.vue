<script setup>
const props = defineProps({
  skilledEmployments: Object,
})
const chartOptions = {
  chart: {
    id: 'bar-example',
    type: 'bar',
  },
  title: {
    text: 'Skilled Employments',
  },
  subtitle: {
    text: 'Number Of employments on the platform',
  },
  fill: {
    colors: ['#E79E1F'],
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
      ...props.skilledEmployments.values,
    ],
  },
]
</script>

<template>
  <apexchart
    type="bar"
    :options="chartOptions"
    :series="series"
    height="300"
  />
</template>
