<script setup>
import { MarketplaceController } from "~/services/modules/marketplace";
import { useGlobalStore } from "@/store";
import RangeSlider from "~/components/MarketPlace/Employer/RangeSlider.vue";
import states from "@/data/states.json"

// const { state } = useActiveView()
// const headerTab = computed(() => state.value.marketPlaceHeaderTab)
definePageMeta({
	layout: "market-place",
});

const store = useGlobalStore();

// access product query param via route
const view = ref("viewProduct");
const route = useRoute();
const selectedListingsCategoryId = ref(route.query.id);
const listingRange = ref(null);

if (selectedListingsCategoryId.value) {
	view.value = "";
} else {
	view.value = "viewProduct";
}
// Handles the product information view
function viewProduct(product) {
	view.value = product;
}

const { getPublicListingById, getAppListing } = MarketplaceController();
// Handles the product information view
const marketListings = ref([]);
const loader = ref(false);
const fetchMPListingById = async (id) => {
	loader.value = true;
	const { status, data, error } = await getPublicListingById(id);
	if (status.value === "success") {
		// console.log('product', data.value.data)
		marketListings.value = data.value.data;
		loader.value = false;
	}
	if (status.value === "error") {
		handleALert("error", error.value.data.message);
		loader.value = false;
	}
};

if (store?.listingId) {
	fetchMPListingById(store?.listingId);
}

watch(
	() => store.listingId,
	(newVal) => {
		if (newVal) {
			console.log(newVal);
			view.value = "viewProduct";
			fetchMPListingById(store.listingId);
		}
	}
);
// Get app listings
const MPAppListings = ref([]);
const paginationInfo = ref({});

/* --------------------------------- Filter --------------------------------- */
const brandColors = ["red", "black", "yellow", "white", "blue", "gold"];
// filter
const params = reactive({
	page: store.Pages.product,
	category: selectedListingsCategoryId.value,
	location: "",
	minPrice: "",
	maxPrice: "",
	color: "",
	condition: "",
	per_page: 20,
});


const fetchAppListings = async (params) => {
	const { status, data, error } = await getAppListing(params);
	if (status.value === "success") {
		if (data.value.data.length === 0 || !data.value.data) {
			MFLCloader.value = false;
			return;
		} else {
			MPAppListings.value = data.value.data.data;
			paginationInfo.value = data.value.data;
			listingRange.value = [data.value.data.min, data.value.data.max];
		}
	}
	if (status.value === "error") {
		console.log(error.value);
	}
};

if (selectedListingsCategoryId.value) {
	fetchAppListings({ ...params,category: selectedListingsCategoryId.value });
}

// watch for route query changes and recall the api function
watch(
	() => route.query.id,
	(newVal) => {
		if (newVal) {
			fetchAppListings({ ...params,category: newVal });
			view.value = "";
		} else {
			view.value = "viewProduct";
		}
	}
);

const activeTab = ref("categories");
store.Pages["product"] = store.Pages["product"] ? store.Pages["product"] : 1;


const updateRangeValues = (rangeValues) => {
	params.minPrice = parseInt(rangeValues.min);
	params.maxPrice = parseInt(rangeValues.max);
};

const updatedFilter = (value) => {
	params.color = value;
};

const applyFilter = () => {
	const notAllEmpty = Object.values(params).some((e) => e != "");
	if (!notAllEmpty) return;
	fetchAppListings(params);
};


const resetFilter = () => {
	params.minPrice = "";
	params.maxPrice = "";
	params.color = "";
	params.condition = "";
	params.location = "";
	fetchAppListings(params);
};

// set pagination page number
const pagination = (value) => {
	// Render The pagination contents
	handlePagination(value);
	let currPage = store.Pages.product;
	switch (value) {
		case "prev":
			if (currPage > 1) {
				currPage--;

				fetchAppListings({ page: currPage, ...params });
				store.updatePages("product", currPage);
			}
			break;
		case "next":
			if (currPage < paginationInfo.value.last_page) {
				currPage++;
				fetchAppListings({ page: currPage, ...params });
				store.updatePages("product", currPage);
			}
			break;

		default:
			console.log({ page: value, ...params });
			fetchAppListings({ page: value, ...params });

			break;
	}
};

// Handles Pagination template Rendering
let tempList = [1, 2, 3];
const paginationList = ref([1, 2, 3]);
const handlePagination = (value) => {
	const newPaginationList = [];
	for (let items of tempList) {
		if (value === "next") {
			items++;
			newPaginationList.push(items);
		} else if (value === "prev" && items > 1) {
			items--;
			newPaginationList.push(items);
		} else if (typeof value === Number) {
			const derivedPC = value - paginationList[-1];
			const deriveItem = items + derivedPC;
			newPaginationList.push(deriveItem);
		} else {
			return;
		}
	}
	const lastItem = paginationInfo.value?.last_page;
	if (lastItem > 3 || value == "prev") {
		tempList = newPaginationList;
		paginationList.value = newPaginationList;
	} else {
		tempList = newPaginationList;
		paginationList.value = [1, 2, 3];
	}
};
</script>

<template>
	<div class="pb-14">
		<!-- The Header -->
		<NavigationMarketplaceHeader />
		<div
			v-if="view === ''"
			role="tablist"
			class="tabs tabs-boxed pt-[90px] mb-10 gap-2 lg:hidden w-[90%] mx-auto"
		>
			<a
				role="tab"
				class="tab"
				:class="{
					'tab-active': activeTab === 'categories',
					'border-2': activeTab !== 'categories',
				}"
				@click="activeTab = 'categories'"
			>
				<span class="mr-2">Categories</span>
				<span>
					<svg
						v-if="activeTab === 'categories'"
						width="20"
						height="20"
						viewBox="0 0 23 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.5 0.5C5.152 0.5 0 5.652 0 12C0 18.348 5.152 23.5 11.5 23.5C17.848 23.5 23 18.348 23 12C23 5.652 17.848 0.5 11.5 0.5ZM11.5 15.45L6.9 10.85H16.1L11.5 15.45Z"
							fill="white"
						/>
					</svg>
					<svg
						v-else
						width="20"
						height="20"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="10.9997"
							cy="10.2141"
							r="7.85714"
							fill="#F9F9F9"
						/>
						<path
							d="M11 0C4.87143 0 0 4.87143 0 11C0 17.1286 4.87143 22 11 22C17.1286 22 22 17.1286 22 11C22 4.87143 17.1286 0 11 0ZM15.2429 16.5L11 12.2571L6.75714 16.5L5.5 15.2429L9.74286 11L5.5 6.75714L6.75714 5.5L11 9.74286L15.2429 5.5L16.5 6.75714L12.2571 11L16.5 15.2429L15.2429 16.5Z"
							fill="#FE3535"
						/>
					</svg>
				</span>
			</a>
			<a
				role="tab"
				class="tab"
				:class="{
					'tab-active': activeTab === 'filter',
					'border-2': activeTab !== 'filter',
				}"
				@click="activeTab = 'filter'"
			>
				<span class="mr-2">Filter</span>
				<span>
					<svg
						v-if="activeTab === 'filter'"
						width="16"
						height="18"
						viewBox="0 0 16 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5 2.00001C4.73478 2.00001 4.48043 2.10537 4.29289 2.2929C4.10536 2.48044 4 2.73479 4 3.00001C4 3.26523 4.10536 3.51958 4.29289 3.70712C4.48043 3.89465 4.73478 4.00001 5 4.00001C5.26522 4.00001 5.51957 3.89465 5.70711 3.70712C5.89464 3.51958 6 3.26523 6 3.00001C6 2.73479 5.89464 2.48044 5.70711 2.2929C5.51957 2.10537 5.26522 2.00001 5 2.00001ZM2.17 2.00001C2.3766 1.41448 2.75974 0.907443 3.2666 0.548799C3.77346 0.190154 4.37909 -0.00244141 5 -0.00244141C5.62091 -0.00244141 6.22654 0.190154 6.7334 0.548799C7.24026 0.907443 7.6234 1.41448 7.83 2.00001H15C15.2652 2.00001 15.5196 2.10537 15.7071 2.2929C15.8946 2.48044 16 2.73479 16 3.00001C16 3.26523 15.8946 3.51958 15.7071 3.70712C15.5196 3.89465 15.2652 4.00001 15 4.00001H7.83C7.6234 4.58554 7.24026 5.09258 6.7334 5.45122C6.22654 5.80986 5.62091 6.00246 5 6.00246C4.37909 6.00246 3.77346 5.80986 3.2666 5.45122C2.75974 5.09258 2.3766 4.58554 2.17 4.00001H1C0.734784 4.00001 0.48043 3.89465 0.292893 3.70712C0.105357 3.51958 0 3.26523 0 3.00001C0 2.73479 0.105357 2.48044 0.292893 2.2929C0.48043 2.10537 0.734784 2.00001 1 2.00001H2.17ZM11 8.00001C10.7348 8.00001 10.4804 8.10537 10.2929 8.2929C10.1054 8.48044 10 8.73479 10 9.00001C10 9.26523 10.1054 9.51958 10.2929 9.70712C10.4804 9.89465 10.7348 10 11 10C11.2652 10 11.5196 9.89465 11.7071 9.70712C11.8946 9.51958 12 9.26523 12 9.00001C12 8.73479 11.8946 8.48044 11.7071 8.2929C11.5196 8.10537 11.2652 8.00001 11 8.00001ZM8.17 8.00001C8.3766 7.41448 8.75974 6.90744 9.2666 6.5488C9.77346 6.19015 10.3791 5.99756 11 5.99756C11.6209 5.99756 12.2265 6.19015 12.7334 6.5488C13.2403 6.90744 13.6234 7.41448 13.83 8.00001H15C15.2652 8.00001 15.5196 8.10537 15.7071 8.2929C15.8946 8.48044 16 8.73479 16 9.00001C16 9.26523 15.8946 9.51958 15.7071 9.70712C15.5196 9.89465 15.2652 10 15 10H13.83C13.6234 10.5855 13.2403 11.0926 12.7334 11.4512C12.2265 11.8099 11.6209 12.0025 11 12.0025C10.3791 12.0025 9.77346 11.8099 9.2666 11.4512C8.75974 11.0926 8.3766 10.5855 8.17 10H1C0.734784 10 0.48043 9.89465 0.292893 9.70712C0.105357 9.51958 0 9.26523 0 9.00001C0 8.73479 0.105357 8.48044 0.292893 8.2929C0.48043 8.10537 0.734784 8.00001 1 8.00001H8.17ZM5 14C4.73478 14 4.48043 14.1054 4.29289 14.2929C4.10536 14.4804 4 14.7348 4 15C4 15.2652 4.10536 15.5196 4.29289 15.7071C4.48043 15.8947 4.73478 16 5 16C5.26522 16 5.51957 15.8947 5.70711 15.7071C5.89464 15.5196 6 15.2652 6 15C6 14.7348 5.89464 14.4804 5.70711 14.2929C5.51957 14.1054 5.26522 14 5 14ZM2.17 14C2.3766 13.4145 2.75974 12.9074 3.2666 12.5488C3.77346 12.1902 4.37909 11.9976 5 11.9976C5.62091 11.9976 6.22654 12.1902 6.7334 12.5488C7.24026 12.9074 7.6234 13.4145 7.83 14H15C15.2652 14 15.5196 14.1054 15.7071 14.2929C15.8946 14.4804 16 14.7348 16 15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8947 15.2652 16 15 16H7.83C7.6234 16.5855 7.24026 17.0926 6.7334 17.4512C6.22654 17.8099 5.62091 18.0025 5 18.0025C4.37909 18.0025 3.77346 17.8099 3.2666 17.4512C2.75974 17.0926 2.3766 16.5855 2.17 16H1C0.734784 16 0.48043 15.8947 0.292893 15.7071C0.105357 15.5196 0 15.2652 0 15C0 14.7348 0.105357 14.4804 0.292893 14.2929C0.48043 14.1054 0.734784 14 1 14H2.17Z"
							fill="#FDFDFD"
						/>
					</svg>
					<svg
						v-else
						width="20"
						height="20"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="10.9997"
							cy="10.2141"
							r="7.85714"
							fill="#F9F9F9"
						/>
						<path
							d="M11 0C4.87143 0 0 4.87143 0 11C0 17.1286 4.87143 22 11 22C17.1286 22 22 17.1286 22 11C22 4.87143 17.1286 0 11 0ZM15.2429 16.5L11 12.2571L6.75714 16.5L5.5 15.2429L9.74286 11L5.5 6.75714L6.75714 5.5L11 9.74286L15.2429 5.5L16.5 6.75714L12.2571 11L16.5 15.2429L15.2429 16.5Z"
							fill="#FE3535"
						/>
					</svg>
				</span>
			</a>
		</div>
		<div
			class="Product-view pt-[100px] px-5 md:px-10 flex gap-10 bg-primary_bg"
		>
			<!-- Filter  -->
			<div
				v-if="view === ''"
				class="filter-container w-full lg:w-80 text-black"
				:class="{ 'hidden lg:block': activeTab !== 'filter' }"
			>
				<h1 class="text-xl font-extrabold mb-3">Filter List</h1>
				<!-- Price -->
				<div class="price-container mb-3">
					<div
						class="flex justify-between bg-white shadow-sm p-2 border-[1.5px]"
					>
						<h2 class="font-semibold">Price</h2>
						<div class="bg-black center p-1 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#ffff"
								class="size-4"
							>
								<path
									fill-rule="evenodd"
									d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</div>
					<!-- Price Range with Min and Max Sliders -->
					<RangeSlider @range-values="updateRangeValues" :range="listingRange"/>
				</div>

				<!-- Price -->
				<div class="price-container mb-3">
					<div
						class="flex justify-between bg-white shadow-sm p-2 border-[1.5px]"
					>
						<h2 class="font-semibold">Color</h2>
						<div class="bg-black center p-1 rounded-full">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="#ffff"
								class="size-4"
							>
								<path
									fill-rule="evenodd"
									d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</div>
					<!-- Radio Button Group -->
					<div
						class="flex flex-col justify-between bg-white shadow-sm p-5"
					>
						<div
							v-for="(color, index) in brandColors"
							:key="index"
							class="form-control mb-4"
						>
							<label class="label cursor-pointer justify-start">
								<input
									type="radio"
									name="color"
									class="radio"
									@change="
										updatedFilter(
											color.toLowerCase(),
											'color'
										)
									"
								/>
								<span class="label-text ms-3">{{
									color.charAt(0).toUpperCase() +
									color.slice(1, color.length)
								}}</span>
							</label>
						</div>
					</div>
				</div>
				<!-- Location Select -->
				<div
					class="flex justify-between items-center bg-white shadow-sm p-2 border-[1.5px] mb-3"
				>
					<span class="font-semibold">Location</span>
					<div class="relative w-40">
						<select
							id="location"
							v-model="params.location"
							class="block appearance-none w-full bg-white text-gray-700 py-1 px-3 pr-8 rounded focus:outline-none"
						>
							<option selected disabled>Select location</option>

							<option v-for="(state, index) in states" :key="index" :value="state">{{ state }}</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10 13L14 9H6L10 13ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20Z"
									fill="black"
								/>
							</svg>
						</div>
					</div>
				</div>

				<!-- Condition Select -->
				<div
					class="flex justify-between items-center bg-white shadow-sm p-2 border-[1.5px] mb-3"
				>
					<span class="font-semibold">Condition</span>
					<div class="relative w-40">
						<select
							id="condition"
							v-model="params.condition"
							class="block appearance-none w-full bg-white text-gray-700 py-1 px-3 pr-8 rounded focus:outline-none"
						>
							<option selected disabled>Select condition</option>
							<option>New</option>
							<option>Used</option>
							<option>Refurbished</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10 13L14 9H6L10 13ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20Z"
									fill="black"
								/>
							</svg>
						</div>
					</div>
				</div>

				<!-- Brand Select -->
				<div
					class="hidden justify-between items-center bg-white shadow-sm p-2 border-[1.5px] mb-3"
				>
					<span class="font-semibold">Brand</span>
					<div class="relative w-40">
						<select
							id="brand"
							class="block appearance-none w-full bg-white text-gray-700 py-1 px-3 pr-8 rounded focus:outline-none"
						>
							<option selected disabled>Select brand</option>
							<option>Apple</option>
							<option>Samsung</option>
							<option>Sony</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M10 13L14 9H6L10 13ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88334 18.6867 3.825 17.9743 2.925 17.075C2.025 16.1757 1.31267 15.1173 0.788001 13.9C0.263335 12.6827 0.000667933 11.3827 1.26582e-06 10C-0.000665401 8.61733 0.262001 7.31733 0.788001 6.1C1.314 4.88267 2.02633 3.82433 2.925 2.925C3.82367 2.02567 4.882 1.31333 6.1 0.788C7.318 0.262667 8.618 0 10 0C11.382 0 12.682 0.262667 13.9 0.788C15.118 1.31333 16.1763 2.02567 17.075 2.925C17.9737 3.82433 18.6863 4.88267 19.213 6.1C19.7397 7.31733 20.002 8.61733 20 10C19.998 11.3827 19.7353 12.6827 19.212 13.9C18.6887 15.1173 17.9763 16.1757 17.075 17.075C16.1737 17.9743 15.1153 18.687 13.9 19.213C12.6847 19.739 11.3847 20.0013 10 20Z"
									fill="black"
								/>
							</svg>
						</div>
					</div>
				</div>
				<a
					href="javascript:void(0)"
					class="btn btn-outline text-lg font-extrabold mb-3 w-full"
					@click="applyFilter"
				>
					Apply Filter</a
				>
				<a
					href="javascript:void(0)"
					class="btn btn-outline border-red-400 text-lg text-red-500 font-extrabold mb-3 w-full"
					@click="resetFilter"
				>
					Reset Filter
				</a>
			</div>
			<!-- PRODUCTS -->
			<div
				v-if="view === ''"
				class="product flex-1"
				:class="{ 'hidden lg:block': activeTab !== 'categories' }"
			>
				<!-- Component -->
				<div>
					<h1 class="mb-4 text-xl font-extrabold">
						{{ route.query.name }}
					</h1>
					<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-6">
						<MarketPlaceEmployerMarket
							type="featuredListings"
							:other-listings="MPAppListings"
							@click="viewProduct('viewProduct')"
						/>
					</div>
					<div class="divider mb-1 mt-10" />
					<div
						class="pagination flex flex-wrap gap-4 lg:gap-0 items-center justify-between text-[#727376]"
					>
						<div
							class="flex flex-wrap items-baseline lg:w-[28rem] justify-between"
						>
							<span class="text-sm"
								>Number Of Items displayed per page</span
							>
							<select
								class="select select-bordered select-xs w-full max-w-14 bg-black text-white"
							>
								<option>{{ paginationInfo.per_page }}</option>
							</select>
							<span class="text-sm"
								>{{ paginationInfo.current_page }}-{{
									MPAppListings.length
								}}
								of {{ paginationInfo.total }} items</span
							>
						</div>
						<div class="join">
							<button
								class="join-item btn btn-sm"
								@click="pagination('prev')"
							>
								«
							</button>
							<button
								v-for="(count, index) of paginationList.slice(
									0,
									paginationInfo?.last_page
								)"
								:key="index"
								class="join-item btn bg-black text-white btn-sm"
								@click="pagination(count)"
							>
								{{ count }}
							</button>

							<span class="join-item btn-sm"> ... </span>
							<button
								class="join-item btn btn-sm"
								@click="pagination(paginationInfo.last_page)"
							>
								{{ paginationInfo.last_page }}
							</button>
							<button
								class="join-item btn btn-sm"
								@click="pagination('next')"
							>
								»
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- PRODUCT VIEW -->
			<MarketPlaceMarketProductInformation
				v-if="view === 'viewProduct'"
				:products="marketListings"
			/>
		</div>
	</div>
</template>

<style scoped>
.tab-active {
	@apply bg-black text-white transition-colors duration-300 ease-in-out !important;
}
</style>
