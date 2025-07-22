<script setup>
import { useGlobalStore } from '~/store'
import { accountController } from '~/services/modules/account'

const store = useGlobalStore()
// Comp is Used by Employer Registration
const props = defineProps({
  useType: String,

})

const hourBtn = ref(null)

const closeModal = (btn) => {
  if (btn.value) {
    btn.value.click()
  }
}
const emits = defineEmits(['nextEvent', 'prevEvent'])

const IWork24Hrs = ref(false)
const applyTo = ref(false)

const updateWorkingTime = (event, value) => {
  console.log('Hors ->', event, value)
  if (value == '24') {
    IWork24Hrs.value = event.target.checked
  }
  else {
    applyTo.value = event.target.checked
  }
}
// Handles the check box via the click of the button
const workingHours = ref([
  { day: 'Monday', from: '12:00 AM', to: '11:59PM', open: false },
  { day: 'Tuesday', from: '12:00 AM', to: '11:59PM', open: false },
  { day: 'Wednesday', from: '12:00 AM', to: '11:59PM', open: false },
  { day: 'Thursday', from: '12:00 AM', to: '11:59PM', open: false },
  { day: 'Friday', from: '12:00 AM', to: '11:59PM', open: false },
  { day: 'Saturday', from: '12:00 AM', to: '11:59PM', open: false },
  { day: 'Sunday', from: '12:00 AM', to: '11:59PM', open: false },
])

// Updates the Workings if it is already set
const UserWorkingHours = ref(store.UserAccount?.profile?.working_hours)
onMounted(() => {
  if (UserWorkingHours.value?.length) {
    workingHours.value = UserWorkingHours.value
    return;
  }
  if (store.AuthSetup.workingHours?.length) {
    workingHours.value = store.AuthSetup.workingHours
  }
  else {
    // Set default working hours if not set
    workingHours.value = [
      { day: 'Monday', from: '12:00 AM', to: '11:59PM', open: false },
      { day: 'Tuesday', from: '12:00 AM', to: '11:59PM', open: false },
      { day: 'Wednesday', from: '12:00 AM', to: '11:59PM', open: false },
      { day: 'Thursday', from: '12:00 AM', to: '11:59PM', open: false },
      { day: 'Friday', from: '12:00 AM', to: '11:59PM', open: false },
      { day: 'Saturday', from: '12:00 AM', to: '11:59PM', open: false },
      { day: 'Sunday', from: '12:00 AM', to: '11:59PM', open: false },
    ]
  }
})

// Set availability
const setAvailability = (id) => {
  console.log(id)
  workingHours.value[id].open = !workingHours.value[id].open
}

// Editing Working Hours
const WorkingId = ref()
const workingDay = ref('')
const editWorkingHours = (id, day) => {
  // saveButton.value = 'save'
  WorkingId.value = id
  workingDay.value = day
}

// Computed the working hours set time into PM Or AM
const from = ref('0:00 AM')
const to = ref('23:59PM')

const FromComputed = computed(() => {
  const [Hr, min] = from.value.split(':')
  let selectedTime
  if (parseInt(Hr) > 12) {
    selectedTime = `${from.value} PM`
  }
  else {
    selectedTime = `${from.value} AM`
  }
  return selectedTime
})

const ToComputed = computed(() => {
  const [Hr, min] = to.value.split(':')
  let selectedTime
  if (parseInt(Hr) > 12) {
    selectedTime = `${to.value} PM`
  }
  else {
    selectedTime = `${to.value} AM`
  }
  return selectedTime
})

// Apply a set or selected working hours to all days

const applyToAllDays = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  // reset the workingHours;
  workingHours.value = []
  for (const day of days) {
    workingHours.value.push({
      day: day,
      from: FromComputed.value,
      to: ToComputed.value,
      open: true,
    })
  }
  closeModal(hourBtn)
}

// The EditWorkHours function
const EditWorkHours = () => {
  if (applyTo.value === false) {
    workingHours.value.forEach((e, index) => {
      if (index === WorkingId.value) {
        e.from = FromComputed.value ?? '00:00 AM'
        e.to = ToComputed.value ?? '23:59 PM'
      }
    })
    closeModal(hourBtn)
  }
  else {
    applyToAllDays()
  }
}

const workHours = reactive({
  working_hours: [],
})

const updateWorkingHours = () => {
  store.AuthSetup.workingHours = workingHours.value;
  workingHours.value.forEach((e) => {
    workHours.working_hours.push({
      day: e.day,
      from: e.from,
      to: e.to,
      open: e.open,
    })
  })
}

const buttonOption = ref('Verify')
const buttonOption2 = ref('Save')

const { addWorkHours } = accountController()
const loading = ref(false)
const saveWorkHours = async () => {
  loading.value = true;
  updateWorkingHours();
  if (workHours.working_hours.length) {
    const { data, error, status } = await addWorkHours(workHours)
    if (status.value === 'success') {
      if (props.useType === 'account') {
        buttonOption.value = 'save'
      }
      buttonOption.value = 'Next'
      loading.value = false
      handleALert('success', data.value.message)
    }
    if (status.value === 'error') {
      loading.value = false
      console.log(error.value)
      handleALert('error', error.value.data.message)
    }
  }
}

const emitEvent = (event) => {
  if (event === 'Verify' || event === 'save') {
    saveWorkHours()
  }
  else if (event === 'prevEvent') {
    emits('prevEvent')
  }
  else {
    emits('nextEvent')
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-2xl lg:text-3xl justify-center lg:justify-start">
        Working hours
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-10 text-center lg:text-left ">
        When would you be available for bookings
      </p>
      <button
        v-for="(schedules, index) in workingHours"
        :key="index"
        class="btn btn-block mb-5"
        @click="setAvailability(index)"
      >
        <span class="flex flex-row justify-between w-full">
          <span class="flex gap-2 items-center"><input
            type="checkbox"
            :checked="schedules.open"
            class="checkbox"
          ><span class="text-[rgba(105, 102, 113, 1)] text-base sm:text-lg font-bold">{{ schedules.day }}</span></span>
          <span class="text-[rgba(105, 102, 113, 1)] text-xs sm:text-sm font-medium ">{{ schedules.from }} - {{ schedules.to }}</span>
          <span
            class="text-darkGold font-bold hover:text-brightGold text-sm sm:text-base"
            onclick="my_modal_12.showModal()"
            @click="editWorkingHours(index, schedules.day)"
          >Edit Hours</span>
        </span>
      </button>
      <div class="card-actions justify-between ">
        <BaseButton
          v-if="props.useType === 'registration'"
          title="Back"
          color="rgba(255, 255, 255, 1)"
          text-color="#8B6914"
          border="#8B6914"
          :outline="true"
          class="block mb-5 w-[20%]"
          @click="emitEvent('prevEvent')"
        />
        <BaseButton
          :title="props.useType ==='account'? buttonOption2: buttonOption"
          :loading="loading"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          border="#8B6914"
          :outline="false"
          class="block mb-5 w-[20%]"
          @click="emitEvent(buttonOption)"
        />
      </div>
    </div>
    <!-- Open the modal using ID.showModal() method -->
    <dialog
      id="my_modal_12"
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
            v-model="from"
            label="From"
            type="time"
            class="flex-1 "
          />
          <BaseInput
            v-model="to"
            label="To"
            type="time"
            class="flex-1 "
          />
        </div>

        <div class="form-control mb-1">
          <label class="label cursor-pointer justify-start">
            <input
              :checked="applyTo"
              type="checkbox"
              class="checkbox border-2 border-[rgba(0, 0, 0, 1)]"
              @change="updateWorkingTime($event, 'applyAll')"
            >
            <span class=" ms-2 label-text text-base text-[rgba(35, 35, 35, 1)]">Apply To All Days</span>
          </label>
        </div>
        <div class="divider">
          OR
        </div>
        <div class="form-control mb-7">
          <label class="label cursor-pointer justify-start">
            <input
              :checked="IWork24Hrs"
              type="checkbox"
              class="checkbox border-2 border-[rgba(0, 0, 0, 1)]"
              @change="updateWorkingTime($event, '24')"
            >
            <span class=" ms-2 label-text text-base text-[rgba(35, 35, 35, 1)]">I Work 24 Hours</span>
          </label>
        </div>
        <div class="center gap-4 ">
          <!-- <BaseButton
            title="Cancel"
            color="rgba(255, 255, 255, 1)"
            text-color="#8B6914"
            border="#8B6914"
            :outline="true"
            class="block mb-5 w-[30%]"
          /> -->
          <BaseButton
            title="Save"
            color="rgba(33, 31, 31, 1)"
            text-color="rgba(255, 255, 255, 1)"
            border="#8B6914"
            :outline="false"
            class="block mb-5 w-[30%]"
            @click="EditWorkHours"
          />
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              ref="hourBtn"
              class="btn"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
