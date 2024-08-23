<script setup>
const emits = defineEmits(['nextEvent', 'prevEvent'])

const emitEvent = (event) => {
  emits(event)
}
// Handles the check box via the click of the button
const schedulesId = ref(1)
const workingHours = [
  { day: 'Monday', time: '10:00 AM to 4:00PM', id: 1 },
  { day: 'Tuesday', time: '10:00 AM to 4:00PM', id: 2 },
  { day: 'Wednesday', time: '10:00 AM to 4:00PM', id: 3 },
  { day: 'Thursday', time: '10:00 AM to 4:00PM', id: 4 },
  { day: 'Friday', time: '10:00 AM to 4:00PM', id: 5 },
  { day: 'Saturday', time: '10:00 AM to 4:00PM', id: 6 },
  { day: 'Sunday', time: '10:00 AM to 4:00PM', id: 7 },
]
const check = (id) => {
  schedulesId.value = id
}

// Editing Working Hours
const WorkingId = ref()
const workingDay = ref('')
const editWorkingHours = (id, day) => {
  WorkingId.value = id
  workingDay.value = day
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl">
        Working hours
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-10">
        When would you be available for bookings
      </p>
      <button
        v-for="schedules in workingHours"
        :key="schedules.id"
        class="btn btn-block mb-5"
        @click="check(schedules.id)"
      >
        <span class="flex flex-row justify-between w-full">
          <span class="flex gap-2 items-center"><input
            type="checkbox"
            :checked="schedules.id === schedulesId ?? ''"
            class="checkbox"
          ><span class="text-[rgba(105, 102, 113, 1)] text-lg font-bold">{{ schedules.day }}</span></span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">{{ schedules.time }}</span>
          <span
            class="text-darkGold font-bold hover:text-brightGold"
            onclick="my_modal_1.showModal()"
            @click="editWorkingHours(schedules.id, schedules.day)"
          >Edit Hours</span>
        </span>
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
    <dialog
      id="my_modal_1"
      class="modal"
    >
      <div class="modal-box">
        <h2 class="text-darkGold text-2xl text-right">
          {{ workingDay }}
        </h2>
        <h3 class="text-lg font-bold text-center text-[rgba(30, 30, 30, 1)]">
          Active Hours
        </h3>
        <p class="text-center text-base text-[rgba(30, 30, 30, 1)] mb-6">
          Set business active hours
        </p>
        <div class="center gap-2 mb-5">
          <BaseInput
            label="From"
            type="time"
            class="flex-1 "
          />
          <BaseInput
            label="To"
            type="time"
            class="flex-1 "
          />
        </div>

        <p class="py-2 text-center text-base text-[rgba(30, 30, 30, 1)]">
          Or
        </p>
        <div class="form-control mb-1">
          <label class="label cursor-pointer justify-start">
            <input
              type="checkbox"
              class="checkbox border-2 border-[rgba(0, 0, 0, 1)]"
            >
            <span class=" ms-2 label-text text-base text-[rgba(35, 35, 35, 1)]">I Work 24 Hours</span>
          </label>
        </div>
        <div class="divider mb-1" />
        <div class="form-control mb-7">
          <label class="label cursor-pointer justify-start">
            <input
              type="checkbox"
              class="checkbox border-2 border-[rgba(0, 0, 0, 1)]"
            >
            <span class=" ms-2 label-text text-base text-[rgba(35, 35, 35, 1)]">Apply To All Days</span>
          </label>
        </div>
        <div class="center gap-4 ">
          <BaseButton
            title="Cancel"
            color="rgba(255, 255, 255, 1)"
            text-color="#8B6914"
            border="#8B6914"
            :outline="true"
            class="block mb-5 w-[30%]"
          />
          <BaseButton
            title="Save"
            color="rgba(33, 31, 31, 1)"
            text-color="rgba(255, 255, 255, 1)"
            border="#8B6914"
            :outline="false"
            class="block mb-5 w-[30%]"
          />
        </div>
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
