<script setup>
import { accountController } from '~/services/modules/account'
import { TicketController } from '~/services/modules/Admin/Tickets'
import { useGlobalStore } from '~/store'

const { markJobAsCompleted, getActiveJobs } = accountController()
const { createTicket } = TicketController()

const store = useGlobalStore()
const activeJobs = ref([])
const paginationInfo = ref({})

const closeReportBtn = ref(null)

const closeModal = (btn) => {
  if (btn.value) {
    btn.value.click()
  }
}
const fetchJobsLoader = ref(false)
const fetchActiveJobs = async (page) => {
  fetchJobsLoader.value = true
  const { status, data, error } = await getActiveJobs(page)
  if (status.value === 'success') {
    fetchJobsLoader.value = false
    activeJobs.value = data.value.data.jobs
    paginationInfo.value = data.value.data.pagination
  }
  if (status.value === 'error') {
    fetchJobsLoader.value = false
    console.log(error.value)
  }
}

fetchActiveJobs(store.activeJob)

// selected Image url
const draggedFile = ref(null)
const Image = ref(null)

function handleClick() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = ''

  input.onchange = (e) => {
    const file = (e.target).files?.[0]
    if (file) {
      Image.value = file
      const imgUrl = URL.createObjectURL(file)
      draggedFile.value = imgUrl
    }
  }
  input.click()
}

const markAsCompleted = async (id) => {
  const jobStatus = store.UserAccount.account_type == 'employer' ? 'completed' : 'in review'

  const { status, error } = await markJobAsCompleted(id, {
    status: jobStatus,
  })
  if (status.value === 'success') {
    loader.value = false
    handleALert('success', 'Job marked as completed')
  }
  if (status.value === 'error') {
    handleALert('error', error.value)
  }
}
/* --------------------------------- Report --------------------------------- */
const reportData = reactive({
  user_id: store.UserAccount.id || null,
  reported_id: null,
  reason: '',
  job_id: null,
  description: '',
})

const selectedJob = ref({})
const setSelectedJob = (job) => {
  selectedJob.value = job
}
watch(selectedJob, (newVal) => {
  if (newVal) {
    reportData.reported_id = newVal.user_id
    reportData.job_id = newVal.id
  }
})
const reportLoader = ref(false)
const reportUser = async () => {
  reportLoader.value = true
  const formdata = new FormData()
  formdata.append('image', Image.value)
  formdata.append('user_id', reportData.user_id)
  formdata.append('reported_id', reportData.reported_id)
  formdata.append('reason', reportData.reason)
  formdata.append('job_id', reportData.job_id)
  formdata.append('description', reportData.description)

  const { status, error } = await createTicket(formdata)
  if (status.value === 'success') {
    reportLoader.value = false
    handleALert('success', 'Report sent successfully')
    closeModal(closeReportBtn)
  }
  if (status.value === 'error') {
    handleALert('error', error.value)
    reportLoader.value = false
  }
}

/* ------------------------------- Pagination ------------------------------- */
// set pagination page number
store.Pages['activeJob'] = store.Pages['activeJob'] ? store.Pages['activeJob'] : 1

const pagination = (value) => {
  // Render The pagination contents
  handlePagination(value)
  let currPage = store.Pages.activeJobs
  switch (value) {
    case 'prev':
      if (currPage > 1) {
        currPage--
        fetchActiveJobs(currPage)
        store.updatePages('activeJob', currPage)
      }
      break
    case 'next':
      if (currPage < paginationInfo.value.last_page) {
        currPage++
        fetchActiveJobs(currPage)
        store.updatePages('activeJob', currPage)
      }
      break

    default:
      fetchActiveJobs(value)
      break
  }
}
// Handles Pagination template Rendering
let tempList = [1, 2, 3]
const paginationList = ref([1, 2, 3])
const handlePagination = (value) => {
  const newPaginationList = []
  for (let items of tempList) {
    if (value === 'next') {
      items++
      newPaginationList.push(items)
    }
    else if (value === 'prev' && items > 1) {
      items--
      newPaginationList.push(items)
    }
    else if (typeof value === Number) {
      const derivedPC = (value) - (paginationList[-1])
      const deriveItem = items + (derivedPC)
      newPaginationList.push(deriveItem)
    }
    else {
      return
    }
  }
  const lastItem = paginationInfo.value?.last_page
  if (lastItem > 3 || value == 'prev') {
    tempList = newPaginationList
    paginationList.value = newPaginationList
  }
  else {
    tempList = newPaginationList
    paginationList.value = [1, 2, 3]
  }
}

handlePagination(store.Pages.activeJob)
</script>

<template>
  <SharedLoader v-if="fetchJobsLoader" />
  <div v-else>
    <SharedAvailable
      v-if="!activeJobs.length > 0"
      message="Active Jobs"
    />
    <div
      v-for="(item, index) in activeJobs"
      :key="index"
      class="card card-compact bg-base-100 lg:w-4/5 shadow-xl mb-5"
    >
      <div class="card-body flex-row items-center gap-5 flex-wrap">
        <!-- avatar -->
        <div class="avatar">
          <div class="ring-darkGold ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
            <img :src="item.image">
          </div>
        </div>
        <h3 class="mb-1 text-[#24242] font-semibold text-sm satoshiM">
          {{ item.name }}
        </h3>
        <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
          <span class="text-black">{{ item.service_name }}</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="rating w-4">
            <input
              type="radio"
              name="rating-1"
              class="mask mask-star"
            >
          </div>

          <span class="text-xs font-bold satoshiM">{{ item.ratings.rating }}</span>
          <span class="text-black text-xs">( {{ item.ratings.ratings_count }} Ratings )</span>
        </div>
        <div class="bg-[#F0F2F5]  center p-2">
          <span class="text-lg font-semibold text-black satoshiM">NGN  {{ item.amount }}</span>
        </div>
        <button
          class="btn btn-active border-gray-300 border-2 satoshiM  bg-white text-red-600 text-sm font-medium rounded-2xl px-5"
          onclick="my_modal_7.showModal()"
          @click="setSelectedJob(item)"
        >
          Report
        </button>
        <button
          class="btn btn-active border-gray-300 border-2 satoshiM  bg-white text-black text-sm font-medium rounded-2xl px-5"
          @click="goToChat => navigateTo('/chat')"
        >
          View Chat
        </button>
        <button
          class="btn btn-active btn-neutral rounded-2xl"
          @click="markAsCompleted(item.id)"
        >
          Mark As complete
        </button>
      </div>
    </div>
    <div class="divider mb-1" />
    <div class="pagination flex flex-wrap gap-4 lg:gap-0 items-center justify-between text-[#727376] ">
      <div class="flex flex-wrap items-baseline lg:w-[28rem] justify-between">
        <span class="text-sm">Number Of Items displayed per page</span>
        <select class="select select-bordered select-xs w-full max-w-14 bg-black text-white">
          <option>{{ paginationInfo?.per_page }}</option>
        </select>
        <span class="text-sm">{{ paginationInfo?.current_page }}-{{ activeJobs?.length }} of {{ paginationInfo?.total }} items</span>
      </div>
      <div class="join">
        <button
          class="join-item btn btn-sm"
          @click="pagination('prev')"
        >
          «
        </button>
        <button
          v-for="(item, index) of paginationList?.slice(0, paginationInfo?.last_page)"
          :key="index"

          class="join-item btn bg-black text-white  btn-sm"
          @click="pagination(item)"
        >
          {{ item }}
        </button>

        <span

          class="join-item btn-sm"
        >
          ...
        </span>
        <button

          class="join-item btn  btn-sm"
          @click="pagination(paginationInfo?.last_page)"
        >
          {{ paginationInfo?.last_page }}
        </button>
        <button
          class="join-item btn  btn-sm"
          @click="pagination('next')"
        >
          »
        </button>
      </div>
    </div>
  </div>
  <!-- Report Worker -->
  <dialog
    id="my_modal_7"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Report {{ store.UserAccount.account_type === 'employer' ? 'Client' : 'Worker' }}
        </h2>
        <p class="text-sm text-black">
          Report an issue you might have experienced, and our admin
          would reach out to both parties and resolve the complaint
        </p>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Compliant type</span>
          </div>
          <select
            v-model="reportData.reason"
            class="select select-bordered"
          >
            <!-- Further information should be provided -->
            <option>Terrible services</option>

          </select>

        </label>
        <label class="form-control">
          <div class="label">
            <span class="label-text">Details</span>
          </div>
          <textarea
            v-model="reportData.description"
            class="textarea textarea-bordered h-24"
            placeholder="Comment"
          />

        </label>
        <!-- Attachment -->
        <div class="text-[#6E7191]">
          <h1 class="mb-2">
            Upload Attachment
          </h1>
          <div
            class="border-dashed border-2 flex flex-col items-center justify-between p-4"
            @click="handleClick"
          >
            <div
              v-if="!draggedFile"
              class="flex flex-col items-center justify-between"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-20 mb-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <div class="text-sm text-[#5B5B5B] mb-1">
                <span class="text-[#030359]">Select</span> Image you want to upload
              </div>
              <div class="text-[#949CA9]">
                Png and Jpg Allowed
              </div>
            </div>
            <!-- image uploaded -->
            <img
              v-if="draggedFile"
              :src="draggedFile"
              alt=""
            >
          </div>
        </div>
        <button
          class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
          @click="reportUser"
        >
          <span
            v-if="reportLoader"
            class="loading loading-spinner loading-md"
          />
          <span else> Send Report</span>
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            ref="closeReportBtn"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
