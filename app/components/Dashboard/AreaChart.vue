<script setup>
const props = defineProps({
  incomeFromSkills: Object,
})
const chartOptions = {
  chart: {
    id: 'area-example',
    type: 'area',
  },
  title: {
    text: 'Platform Income From Skills',
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
      ...props.incomeFromSkills.values
    ],
  },
]
</script>

<template>
  <apexchart type="area" :options="chartOptions" :series="series" height="400" />
</template>
