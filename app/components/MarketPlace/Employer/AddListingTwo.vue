<script setup>
import { useGlobalStore } from "@/store";

const props = defineProps({
	canProceed: Function,
	onUpdate: Function,
	listingData : Object,
});

const store = useGlobalStore();

const stepData = ref({
	title: props?.listingData.title || "",
	color: props?.listingData.color || "",
	price: props?.listingData.price || "",
	condition : props?.listingData.condition || "",
	description : props?.listingData.description || ""
});

const isNegotiable = ref(true);

watch(isNegotiable, (newVal, oldVal) => {
	if (newVal === true) {
		stepData.negotiable = 1;
	} else {
		stepData.negotiable = 0;
	}
});
</script>

<template>
	<div class="forms">
		<label class="form-control w-full mb-4">
			<div class="label">
				<span class="label-text text-base text-labels font-medium mb-1"
					>Title</span
				>
				<span class="text-xl text-red-600 satoshiB">*</span>
			</div>
			<input
				v-model="stepData.title"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full bg-[#EFEFEF]"
				@change="
					(event) => {
						onUpdate({ title: event.target.value });
					}
				"
			/>
		</label>
		<label class="form-control w-full mb-4">
			<div class="label">
				<span class="label-text text-base text-labels font-medium mb-1"
					>Colour</span
				>
				<span class="text-xl text-red-600 satoshiB">*</span>
			</div>
			<input
				v-model="stepData.color"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full bg-[#EFEFEF]"
				@change="
					(event) => {
						onUpdate({ color: event.target.value });
					}
				"
			/>
		</label>
		<label class="form-control w-full mb-4">
			<div class="label">
				<span class="label-text text-base text-labels font-medium mb-1"
					>Price</span
				>
				<span class="text-xl text-red-600 satoshiB">*</span>
			</div>
			<input
				v-model="stepData.price"
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full bg-[#EFEFEF]"
				@change="
					(event) => {
						onUpdate({ price: event.target.value });
					}
				"
			/>
		</label>
		<div class="form-control">
			<label class="label cursor-pointer justify-start gap-4">
				<input
					type="checkbox"
					checked="checked"
					class="checkbox"
					@change="
						(event) => {
							isNegotiable = !isNegotiable;
							onUpdate({ negotiable: isNegotiable ? 1 : 0 });
						}
					"
				/>
				<span class="label-text">This Price Can Be Negotiated</span>
			</label>
		</div>
		<label class="form-control w-full mb-4">
			<div class="label">
				<span class="label-text text-base text-labels font-medium mb-1"
					>Condition</span
				>
				<span class="text-xl text-red-600 satoshiB">*</span>
			</div>
			<select
				v-model="stepData.condition"
				class="select select-bordered bg-[#EFEFEF]"
				@change="
					(event) => {
						onUpdate({ condition: event.target.value });
					}
				"
				required
			>
				<option disabled selected value="" >Item condition</option>
				<option value="used" selected>Used</option>
				<option value="new">Brand New</option>
			</select>
		</label>
		<label class="form-control">
			<div class="label">
				<span class="label-text">Description</span>
			</div>
			<textarea
				v-model="stepData.description"
				class="textarea textarea-bordered h-28 bg-[#EFEFEF]"
				placeholder="Type here"
				@change="
					(event) => {
						onUpdate({ description: event.target.value });
					}
				"
			></textarea>
		</label>
	</div>
</template>
