<script setup>
import { ref, computed } from "vue";

const emits = defineEmits(["rangeValues"]);

const props = defineProps({
	range: Array,
});
/**
 * Reactive variables for the min and max values of the slider.
 * These will store the selected min and max range values.
 */

const minRange = ref(props.range ? props.range[0] : 1); // Default min value
const maxRange = ref(props.range ? props.range[1] : 100); // Default max value

const minValue = ref(props.range ? props.range[0] : 1); // Default starting min value
const maxValue = ref(props.range ? props.range[1] : 100); // Default starting max value


watch(props, async (oldProps, newProps) => {
	if (newProps?.range) {
		if (eval(newProps?.range[0]) != minRange.value) {
			minValue.value = eval(newProps.range[0]);
			maxValue.value = eval(newProps.range[1]);
		}
		minRange.value = eval(newProps.range[0]);
		maxRange.value = eval(newProps.range[1]);
	}
});

/**
 * Minimum gap allowed between the two slider handles.
 * This prevents the sliders from overlapping completely.
 */
const minRangeValueGap = 1000;

/**
 * Function to update the minimum value of the slider.
 * - Ensures the new min value does not exceed (max value - min gap).
 */
const updateMinRange = (value) => {
	if (value >= maxValue.value - minRangeValueGap) {
		minValue.value = maxValue.value - minRangeValueGap;
	} else {
		minValue.value = Math.max(minRange.value, value);
	}
	emits("rangeValues", { min: minValue.value, max: maxValue.value });
};

/**
 * Function to update the maximum value of the slider.
 * - Ensures the new max value does not go below (min value + min gap).
 */
const updateMaxRange = (value) => {
	if (value <= minValue.value + minRangeValueGap) {
		maxValue.value = minValue.value + minRangeValueGap;
	} else {
		maxValue.value = value;
	}
	emits("rangeValues", { min: minValue.value, max: maxValue.value });
};

const handleInputUpdate = () => {
	emits("rangeValues", { min: minValue.value, max: maxValue.value });
}

/**
 * Computed property to dynamically adjust the track (colored range) between min and max handles.
 * - Left position is based on the min value.
 * - Right position is based on the max value.
 */
const trackStyle = computed(() => ({
	left: `${(minValue.value / maxRange.value) * 100}%`, // Adjusts the start of the track
	right: `${Math.max(100 - (maxValue.value / maxRange.value) * 100, 0)}%`, // Adjusts the end of the track
}));
</script>

<template>
	<!-- Main container for the range slider -->
	<div
		class="flex flex-col items-center bg-white shadow-sm p-5 rounded-lg w-full"
	>
		<!-- Range Slider Wrapper -->
		<div class="relative w-full h-2 bg-gray-300 rounded-lg">
			<!-- Active range track (Green part that fills between the min and max values) -->
			<div
				class="absolute h-full bg-[#C09742] rounded-lg"
				:style="trackStyle"
			/>

			<!-- Min Range Slider -->
			<input
				type="range"
				:min="minRange"
				:max="maxRange"
				step="1"
				v-model="minValue"
				class="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto cursor-pointer"
				@input="updateMinRange($event.target.value)"
			/>

			<!-- Max Range Slider -->
			<input
				type="range"
				:min="minRange"
				:max="maxRange"
				step="1"
				:value="maxValue"
				v-model="maxValue"
				class="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto cursor-pointer"
				@input="updateMaxRange($event.target.value)"
			/>
		</div>

		<!-- Display selected min and max values -->
		<div class="flex justify-between w-full mt-3 text-sm font-semibold">
			<div class="flex flex-col w-[45%]">
				<span>Min: {{ minValue }}</span>
				<input class="p-1 w-[70%] border-[1px] border-[#b2b2b2] rounded-[5px]" type="number" :min="minRange" :max="maxRange - minRangeValueGap" v-model="minValue" @change="handleInputUpdate"/>
			</div>
			<div class="flex flex-col w-[45%] items-end">
				<span>Max: {{ maxValue }}</span>
				<input class="p-1 w-[70%] border-[1px] border-[#b2b2b2] rounded-[5px]" type="number" :min="minValue + minRangeValueGap" :max="maxRange" v-model="maxValue" @change="handleInputUpdate"/>
			</div>
		</div>
	</div>
</template>

<style scoped>
/* Custom styles for range inputs */

/* Removes default appearance of range slider */
input[type="range"] {
	-webkit-appearance: none;
	appearance: none;
	background: transparent;
	position: absolute;
	width: 100%;
	top: 0;
}

/* Styling for the slider thumb (draggable circle) */
input[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 20px;
	height: 20px;
	background-color: #c09742;
	border-radius: 50%;
	cursor: pointer;
	position: relative;
	z-index: 2; /* Ensures the thumb stays above the track */
}

input[type="range"]::-moz-range-thumb {
	width: 20px;
	height: 20px;
	background-color: #c09742;
	border-radius: 50%;
	cursor: pointer;
	position: relative;
	z-index: 2;
}
</style>
