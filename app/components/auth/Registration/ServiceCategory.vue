<script setup>
import { servicesController } from "~/services/modules/services";
import { accountController } from "~/services/modules/account";

import { useGlobalStore } from "~/store";

// Initialize variables
const store = useGlobalStore();
const { getAppServices } = servicesController();
const emits = defineEmits(["nextEvent", "prevEvent"]);

// Comp is Used by Employer Registration
const props = defineProps({
	useType: String,
});

/* ------------------------------- Close modal ------------------------------ */

const BtnModal = ref(null);
const closeModal = (btn) => {
	if (btn.value) {
		btn.value.click();
	}
};

/* ------------------------- Fetch service category ------------------------- */
const loading = ref(false);

const fetchData = ref([]);
const fetchCategory = async () => {
	const { data, status, error } = await getAppServices();
	if (status.value === "success" && data.value.data) {
		console.log("account", data.value.data);
		fetchData.value = data.value.data;
	}
	if (status.value === "error") {
		console.log(error.value);
	}
};

fetchCategory();

// ADD SERVICE CATEGORY

// Hold the category which is passed on the primary category as a props
const categoryData = ref([]);
// Update  categoryData  on component mount
onMounted(() => {
	categoryData.value = store.serviceCategory;
});

//  get the selected category and updates the addCategory data
const fetchedServicesData = ref({});

const addCategoryData = reactive({
	name: "",
	experience: null,
	service_id: null,
});

// For Category on user profile
const addCategoryFromAccount = reactive({
	years_of_experience: null,
	service_id: null,
	primary: false,
});

watch(addCategoryData, (newVal, oldVal) => {
	if (newVal) {
		addCategoryFromAccount.years_of_experience = parseInt(
			newVal.experience
		);
		addCategoryFromAccount.service_id = parseInt(newVal.service_id);
	}
});

watch(fetchedServicesData, (newVal, oldVal) => {
	if (newVal) {
		addCategoryData.name = fetchedServicesData.value.name;
		addCategoryData.service_id = fetchedServicesData.value.id;
	}
});

// This for User Registration
const updateCategoryRegister = () => {
	categoryData.value.push({
		name: addCategoryData.name,
		years_of_experience: addCategoryData.experience,
		service_id: addCategoryData.service_id,
		primary: false,
	});

	// Update the store;
	store.$patch({
		serviceCategory: categoryData.value,
	});
};

const removeSCRegistration = (index) => {
	console.log("delete", index);

	categoryData.value.splice(index, 1);
	// Update the store;
	store.$patch({
		serviceCategory: categoryData.value,
	});
};
// Emit events
const emitEvent = (event) => {
	if (event === "nextEvent" && categoryData.value.length > 0) {
		emits(event, categoryData.value);
	} else {
		emits(event);
	}
};
/* ------------- Handling Service Category from the User Profile ------------ */

// This for  user profile
const serviceData = reactive({
	services: [],
});

if (props.useType === "account") {
	if (getAuth()) {
		store.getAccount();
	}

	// This for  user profile
	serviceData.services = [...(store.UserAccount?.profile?.services || [])];
}

watch(
	() => store.UserAccount?.profile?.services,
	(newVal) => {
		if (newVal) {
			serviceData.services = [...newVal];
		}
	},
	{ deep: true }
);

const { addServiceCategory } = accountController();
const saveCategoryFromAccount = async () => {
	loading.value = true;
	serviceData.services.push(addCategoryFromAccount);
	try {
		const { status, data, error } = await addServiceCategory(serviceData);
		if (status.value === "success") {
			handleALert("success", data.value.message);
			store.$patch({
				callUserAccount: true,
			});
			store.getAccount();
		}
		if (status.value === "error") {
			handleALert("error", error.value.data.message);
		}
	} catch (error) {
		handleError(error);
	} finally {
		loading.value = false;
		store.$patch({
			callUserAccount: false,
		});
		closeModal(BtnModal);
	}
};

const saveEditCategory = (index) => {
	serviceData.services[index].years_of_experience =
		addCategoryFromAccount.years_of_experience;
	serviceData.services[index].service_id = addCategoryFromAccount.service_id;
	serviceData.services[index].primary = addCategoryFromAccount.primary;

	console.log("before update", serviceData);
};

const addCategoryBtn = ref(null);
const edit = ref(false);
const editIndex = ref(null);
const EditServiceCategory = (index) => {
	addCategoryBtn.value.click();
	console.log("called", index);
	edit.value = true;
	editIndex.value = index;
};
// Update service category
const updateCategoryFromAccount = async () => {
	console.log("before update 1", serviceData);

	loading.value = true;
	try {
		if (edit.value) {
			saveEditCategory(editIndex.value);
		}
		console.log("before update 2", serviceData);
		const { status, data, error } = await addServiceCategory(serviceData);
		if (status.value === "success") {
			handleALert("success", data.value.message);
			store.getAccount();
			store.$patch({
				callUserAccount: true,
			});
		}
		if (status.value === "error") {
			handleALert("error", error.value.data.message);
		}
	} catch (error) {
		handleError(error);
	} finally {
		loading.value = false;
		closeModal(BtnModal);
	}
};

onMounted(() => {
	store.$patch({
		callUserAccount: true,
	});
});

// Updates the CategoryData Object
const saveCategory = () => {
	const isDataComplete = Object.values(addCategoryData).every(
		(value) => value !== ""
	);

	if (!isDataComplete) return;

	if (props.useType === "registration") {
		updateCategoryRegister();
		closeModal(BtnModal);
	} else if (props.useType === "account") {
		edit.value ? updateCategoryFromAccount() : saveCategoryFromAccount();
	}
};

// Delete  Category
const removeServiceCategory = (index) => {
	console.log("delete", index);
	serviceData.services.splice(index, 1);
	serviceData.services[0].primary = true;
	updateCategoryFromAccount();
};
</script>

<template>
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2
				class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-2xl lg:text-3xl justify-center lg:justify-start"
			>
				Service Category
			</h2>
			<p
				class="text-[rgba(106, 106, 106, 1)] text-lg mb-10 text-center lg:text-left"
			>
				Please add your service category so clients can find you
			</p>
			<button
				v-for="(item, index) in categoryData"
				:key="index"
				class="btn btn-block mb-5"
			>
				<span class="flex flex-row justify-between w-full">
					<span
						class="text-[rgba(105, 102, 113, 1)] text-sm font-bold"
						>{{ item.name }}</span
					>
					<span
						class="text-[rgba(105, 102, 113, 1)] text-xs sm:text-sm font-medium"
					>
						Years Of Experience {{ item.years_of_experience }}</span
					>
					<span
						class="text-red-600 text-base font-bold hover:text-red-400 hidden"
						>Edit</span
					>
					<span
						class="text-darkGold text-sm lg:text-base font-bold hover:text-brightGold"
						@click.self="removeSCRegistration(index)"
						>Delete</span
					>
				</span>
			</button>
			<!--  Handling Service Category from the User Profile -->
			<div v-if="props.useType === 'account'">
				<button
					v-for="(item, index) in store.UserAccount?.profile
						?.services"
					:key="index"
					class="btn btn-block mb-5"
				>
					<span class="flex flex-row justify-between w-full">
						<span
							class="text-[rgba(105, 102, 113, 1)] text-sm font-bold"
							>{{ item.service.name }}</span
						>
						<span
							class="text-[rgba(105, 102, 113, 1)] text-sm font-medium"
						>
							Years Of Experience
							{{ item.years_of_experience }}</span
						>
						<span
							class="text-red-600 text-base font-bold hover:text-red-400"
							@click="EditServiceCategory(index)"
							>Edit</span
						>
						<span
							class="text-darkGold text-sm lg:text-base font-bold hover:text-brightGold"
							@click="removeServiceCategory(index)"
							>Delete</span
						>
					</span>
				</button>
				<p
					v-if="store.UserAccount.profile.services?.length === 0"
					class="text-[rgba(105, 102, 113, 1)] text-sm font-bold text-pink-700 text-center mb-2"
				>
					No Services Available!
				</p>
			</div>

			<!-- This is for registration -->
			<p
				v-if="
					categoryData.length === 0 &&
					props.useType === 'registration'
				"
				class="text-[rgba(105, 102, 113, 1)] text-sm font-bold text-pink-700 text-center mb-2"
			>
				No Services Available!
			</p>

			<button
				ref="addCategoryBtn"
				class="btn mb-10 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border w-full md:w-1/2"
				:class="{ 'mx-auto': props?.useType !== 'account' }"
				onclick="my_modal_9.showModal()"
				@click="fetchCategory"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="rgba(118, 127, 140, 1)"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>

				Add Category
			</button>
			<div
				v-if="props?.useType !== 'account'"
				class="card-actions justify-between"
			>
				<BaseButton
					title="Back"
					color="rgba(255, 255, 255, 1)"
					text-color="#8B6914"
					border="#8B6914"
					:outline="true"
					class="block mb-5 w-[20%]"
					@click="emitEvent('prevEvent')"
				/>
				<BaseButton
					:loading="loading"
					title="Next"
					color="rgba(33, 31, 31, 1)"
					text-color="rgba(255, 255, 255, 1)"
					border="#8B6914"
					:outline="false"
					class="block mb-5 w-[20%]"
					@click="emitEvent('nextEvent')"
				/>
			</div>
		</div>
		<!-- Open the modal using ID.showModal() method -->
		<!-- Add Category -->
		<dialog id="my_modal_9" class="modal">
			<div class="modal-box">
				<h3
					class="text-2xl lg:text-3xl font-bold text-center text-[rgba(35, 35, 35, 1)] mb-4"
				>
					<span v-if="!edit">Add Service Category</span>
					<span v-else class="text-red-600"
						>Edit Service Category</span
					>
				</h3>
				<label class="form-control w-full mb-4">
					<div class="label">
						<span
							class="label-text text-base text-labels font-medium mb-1"
							>Select Category</span
						>
					</div>
					<select
						v-model="fetchedServicesData"
						class="select select-bordered"
					>
						<option disabled selected>Pick one</option>
						<option
							v-for="(item, index) in fetchData"
							:key="index"
							:value="item"
						>
							{{ item?.name }}
						</option>
					</select>
				</label>
				<BaseInput
					v-model="addCategoryData.experience"
					label="Year of Experience"
					type="text"
					:icon="false"
					:required="true"
					class="block mb-4"
				/>
				<p v-if="props.useType === 'account'" class="py-5 text-center">
					You can add a custom category below
				</p>
				<!-- <BaseInput
          v-model="custom"
          label="Add Custom"
          type="text"
          :icon="false"
          :required="true"
          class="block mb-4 "
        /> -->
				<BaseButton
					:loading="loading"
					title="Save Category"
					color="rgba(33, 31, 31, 1)"
					text-color="rgba(255, 255, 255, 1)"
					:outline="false"
					class="block w-full"
					@click="saveCategory"
				/>

				<p
					v-if="props.useType === 'registration'"
					class="py-4 font-medium text-sm text-[rgba(36, 36, 36, 1)]"
				>
					If Your Category does not exist, you can request for it to
					be added below
				</p>
				<BaseButton
					v-if="props.useType === 'registration'"
					title="Request For Category"
					color="rgba(255, 255, 255, 1)"
					text-color="#8B6914"
					border="#8B6914"
					:outline="true"
					class="w-full mb-5"
					onclick="my_modal_2.showModal()"
				/>

				<div class="modal-action">
					<form method="dialog">
						<!-- if there is a button in form, it will close the modal -->
						<button ref="BtnModal" class="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>

		<!-- Custom Category -->
		<dialog id="my_modal_2" class="modal">
			<div class="modal-box">
				<h3
					class="text-3xl font-bold text-center text-[rgba(35, 35, 35, 1)] mb-4"
				>
					Add Custom Category
				</h3>
				<BaseInput
					label="Custom Category Name"
					type="text"
					:icon="false"
					class="block mb-4"
				/>

				<label class="form-control mb-5">
					<div class="label">
						<span
							class="label-text text-base text-labels font-medium mb-1"
							>Custom Description</span
						>
					</div>
					<textarea
						class="textarea textarea-bordered h-24"
						placeholder="Description"
					/>
				</label>
				<BaseButton
					title="Save Category"
					color="rgba(33, 31, 31, 1)"
					text-color="rgba(255, 255, 255, 1)"
					:outline="false"
					class="block w-full"
				/>
				<div class="modal-action">
					<form method="dialog">
						<!-- if there is a button in form, it will close the modal -->
						<button class="btn">Close</button>
					</form>
				</div>
			</div>
		</dialog>
	</div>
</template>
