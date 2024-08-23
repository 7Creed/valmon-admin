<script setup>
const emits = defineEmits(['nextEvent', 'prevEvent'])

const emitEvent = (event) => {
  emits(event)
}
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
      <button class="btn btn-block mb-5">
        <span class="flex flex-row justify-between w-full">
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-bold">Message Therapy</span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Year of experience 3</span>
          <span class="text-red-600 text-base font-bold hover:text-red-400">Edit</span>
          <span class="text-darkGold text-base font-bold  hover:text-brightGold">Delete</span>
        </span>
      </button>
      <button class="btn btn-block mb-5">
        <span class="flex flex-row justify-between w-full">
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-bold">Message Therapy</span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Year of experience 3</span>
          <span class="text-red-600 text-base font-bold hover:text-red-400">Edit</span>
          <span class="text-darkGold text-base font-bold  hover:text-brightGold">Delete</span>
        </span>
      </button>
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
          <select class="select select-bordered">
            <option
              disabled
              selected
            >Pick one</option>
            <option>Star Wars</option>
          </select>

        </label>
        <BaseInput
          label="Year of Experience"
          type="text"
          :icon="false"
          class="block mb-4"
        />
        <BaseButton
          title="Save Category"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          :outline="false"
          class="block w-full"
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
