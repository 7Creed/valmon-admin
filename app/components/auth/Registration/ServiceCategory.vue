<script setup>
import { appServicesController } from '~/services/modules/appServices'

const { getAppServices } = appServicesController()
const emits = defineEmits(['nextEvent', 'prevEvent'])
// Comp is Used by Employer Registration
const props = defineProps({
  useType: String,
})


// Hold the category which is passed on the primary category as a props
const categoryData = ref([])

//  get the selected category and updates the addCategory data
const fetchedServicesData = ref({})

const addCategoryData = reactive({
  name: '',
  experience: null,
  service_id: null,
})

watch(fetchedServicesData, (newVal, oldVal) => {
  if (newVal) {
    addCategoryData.name = fetchedServicesData.value.name
    addCategoryData.service_id = fetchedServicesData.value.service_category_id
  }
})

// Updates the CategoryData Object
const saveCategory = () => {
  const isFilled = Object.values(addCategoryData).every(e => e !== '')
  if (isFilled) {
    categoryData.value.push({
      name: addCategoryData.name,
      years_of_experience: addCategoryData.experience,
      service_id: addCategoryData.service_id,
      primary: false,
    })
  }
}
const fetchData = ref([])
const fetchCategory = async () => {
  const { data, status } = await getAppServices()
  if (status.value === 'success' && data.value.data) {
    console.log(data.value.data)
    fetchData.value = data.value.data
  }
  // if (status.value) {
  //   fetchStatus.value = status.value
  // }
}

fetchCategory()

const emitEvent = (event) => {
  if (event === 'nextEvent' && categoryData.value.length > 0) {
    emits(event, categoryData.value)
  }
  else {
    emits(event)
  }
}
onMounted(() => {
  fetchCategory()
})
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl">
        Service Category
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-10">
        Please add your service category so clients can find you
      </p>
      <button
        v-for="(item, index) in categoryData"
        :key="index"
        class="btn btn-block mb-5"
      >
        <span class="flex flex-row justify-between w-full">
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-bold">{{ item.name }}</span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium"> Years Of Experience {{ item.years_of_experience
          }}</span>
          <span class="text-red-600 text-base font-bold hover:text-red-400">Edit</span>
          <span class="text-darkGold text-base font-bold  hover:text-brightGold">Delete</span>
        </span>
      </button>
      <p
        v-if="categoryData.length === 0"
        class="text-[rgba(105, 102, 113, 1)] text-sm font-bold text-pink-700 text-center mb-2"
      >
        No Services Available!
      </p>

      <button
        class="btn mb-10 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border w-1/2 mx-auto"
        onclick="my_modal_1.showModal()"
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
      <div class="card-actions justify-between ">
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
    <dialog
      id="my_modal_1"
      class="modal"
    >
      <div class="modal-box">
        <h3 class="text-3xl font-bold text-center text-[rgba(35, 35, 35, 1)] mb-4">
          Add Service Category
        </h3>
        <label class="form-control w-full mb-4">
          <div class="label">
            <span class="label-text text-base text-labels font-medium mb-1">Select Category</span>
          </div>
          <select
            v-model="fetchedServicesData"
            class="select select-bordered"
          >
            <option
              disabled
              selected
            >Pick one</option>
            <option
              v-for="(item, index) in fetchData "
              :key="index"
              :value="item"
            >{{ item?.name }}</option>
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
        <BaseButton
          title="Save Category"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          :outline="false"
          class="block w-full"
          @click="saveCategory"
        />
        <p class="py-4 font-medium text-sm text-[rgba(36, 36, 36, 1)]">
          If Your Category does not exist, you can request for it to be added below
        </p>
        <BaseButton
          title="Request For Category"
          color="rgba(255, 255, 255, 1)"
          text-color="#8B6914"
          border="#8B6914"
          :outline="true"
          class=" w-full mb-5"
          onclick="my_modal_2.showModal()"
        />

        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>

    <!-- Custom Category -->
    <dialog
      id="my_modal_2"
      class="modal"
    >
      <div class="modal-box">
        <h3 class="text-3xl font-bold text-center text-[rgba(35, 35, 35, 1)] mb-4">
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
            <span class="label-text text-base text-labels font-medium mb-1">Custom Description</span>
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
            <button class="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
