<script setup>
import { useGlobalStore } from "@/store";
import { accountController } from "~/services/modules/account";
import states from "../../../data/states.json";

const props = defineProps({
	canProceed: Function,
	onUpdate: Function,
	listingData : Object,
});

const store = useGlobalStore();

const { getListingCategories } = accountController();
const ListingCategories = ref(store?.ListingCategories ?? []);
const loading = ref(false);
const stepData = ref({
	listing_category_id : props.listingData?.listing_category_id || "",
	location : props.listingData?.location || "",
});

const fetchListingCategories = async () => {
	loading.value = true;
	const { status, data, error } = await getListingCategories();
	if (status.value === "success") {
		ListingCategories.value = data.value.data;
		loading.value = false;
		store.ListingCategories = data.value.data;
	}
	if (status.value === "error") {
		handleError("error", error.value.data.message);
		loading.value = false;
	}
};
fetchListingCategories();

</script>

<template>
	<div class="forms">
		<label class="form-control w-full mb-4">
			<div class="label">
				<span class="label-text text-base text-labels font-medium mb-1"
					>Select Category</span
				>
				<span class="text-xl text-red-600 satoshiB">*</span>
			</div>
			<select
				v-model="stepData.listing_category_id"
				class="select select-bordered bg-[#EFEFEF]"
				@change="
					(event) => {
						onUpdate({ listing_category_id: event.target.value });
					}
				"
				required
			>
				<option disabled selected value="">Pick one</option>
				<option
					v-for="category in ListingCategories"
					:key="category.id"
					:value="category.id"
				>
					{{ category.name }}
				</option>
			</select>
		</label>
		<label class="form-control w-full">
			<div class="label">
				<span class="label-text text-base text-labels font-medium mb-1"
					>Location</span
				>
				<span class="text-xl text-red-600 satoshiB">*</span>
			</div>
			<select
				v-model="stepData.location"
				class="select select-bordered bg-[#EFEFEF]"
				@change="
					(event) => {
						onUpdate({ location: event.target.value });
					}
				"
				required
			>
				<!-- <option
					v-for="(address, index) in store.UserAccount.profile
						.addresses"
					:key="index"
				>
					{{ address.state }}, {{ address.country }}
				</option> -->
				<option selected disabled value="">Select location</option>
				<option
					v-for="(state, index) in states"
					:key="index"
					:value="state"
				>
					{{ state }}
				</option>
			</select>
		</label>
	</div>
</template>
