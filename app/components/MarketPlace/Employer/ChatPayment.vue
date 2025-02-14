<script setup>
import { Utilities } from '@vue-leaflet/vue-leaflet'
import masterCard from '@/assets/images/UIElements/masterCard.png'
import { useGlobalStore } from '@/store'
import { accountController } from '~/services/modules/account'
import { chatController } from '@/services/modules/chat'
import { TicketController } from '~/services/modules/Admin/Tickets'

const { createConversation, getConversation, getMessages, sendMessages, sendProposal, rejectProposal, acceptProposal, markAsRead, initiatePayment, markAsDelivered, orderCompleted } = chatController()
const { createReview, getReviews, markJobAsCompleted } = accountController()
const { createTicket } = TicketController()
const route = useRoute()

const props = defineProps({
  chatType: String,
})
// Initialize store
const store = useGlobalStore()

// active tag
const activeTab = ref('job')

onMounted(() => {
  if (route.query.name == 'marketplace') {
    activeTab.value = 'marketPlace'
  }
})
// Function to toggle  the tag
const toggleTab = (tab) => {
  activeTab.value = tab
  fetchConversation()
}

// Tag
const activeTag = ref('all')
const selectTag = (tag) => {
  activeTag.value = tag
  conservationTab()
}

// Refs for buttons
const selectCardBtn = ref(null)
const paymentBtn = ref(null)
const otpBtn = ref(null)
const paymentSuccessBtn = ref(null)
const awaitBtn = ref(null)

// Job status
const jobStatus = ref('')

// Function to complete the job
const completed = () => {
  jobStatus.value = ''

  // Array of button refs
  const buttons = [selectCardBtn, paymentBtn, otpBtn, paymentSuccessBtn, awaitBtn]

  // click each button
  buttons.forEach((btn) => {
    if (btn.value) {
      btn.value.click()
    }
  })
}

/* --------------------------- Chat api management -------------------------- */

// define const

const conversationLoader = ref(false)
const defaultLoader = ref(false)
const getMessagesLoader = ref(false)
const proposalLoader = ref(false)
const RejectProposalLoader = ref(false)
const proposalResponse = ref(null)
const readLoader = ref(false)
const initiatePaymentLoader = ref(false)
const message = ref('')
const allMessages = ref([])
const conversations = ref([])
const activeConversation = ref(null)

/* -------------------------- close modal function -------------------------- */
const ModalBtn = ref(null) // negotiation button
const reviewModalBtn = ref(null)
const sendReportBtn = ref(null)
const submitProofBtn = ref(null)

const closeModal = (btn) => {
  if (btn.value) {
    btn.value.click()
  }
}
/* ---------------------------- Get conversations --------------------------- */
const conservationTab = () => {
  if (conversations.value.length > 0) {
    if (activeTag.value === 'all') {
      activeConversation.value = conversations.value
    }
    else if (activeTag.value === 'unread') {
      activeConversation.value = conversations.value.filter(conv => conv.unread_count > 0)
    }
    else {
      activeConversation.value = conversations.value.filter(conv => conv.unread_count == 0)
    }
  }
  else {
    activeConversation.value = []
  }
}

/* ---------------------- Manage selected Conversation ---------------------- */
const selectedConversation = ref(null)
const fetchConversation = async () => {
  try {
    const { status, data, error } = await getConversation()
    if (status.value === 'success') {
      console.log('fetched convorsations->', data.value.data)
      // Check if conversation falls under Job or marketplace or admin
      const marketplace = data.value.data.filter(conv => conv.listing_id != null)
      const job = data.value.data.filter(conv => conv.service_id != null)
      // Set conversations
      if (activeTab.value === 'job') {
        console.log('job')
        conversations.value = job
      }
      if (activeTab.value === 'marketPlace') {
        console.log('marketplace')
        conversations.value = marketplace
      }
      conservationTab()
    }
    if (status.value === 'error') {
      handleError('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
}
// Render conversations
const renderConversation = ({ user, recipient, user_id }) => {
  const realRecipient = user_id == store.UserAccount.id ? recipient : user
  return realRecipient
}

/* ------------------------- Multiple param for api ------------------------- */
const chatApiWithParams = async (func, userData, id, loader) => {
  loader.value = true
  try {
    const { status, data, error } = await func(userData, id)
    switch (status.value) {
      case 'success':
        console.log('fetched messages->', data.value.data)
        switch (func.name) {
          case 'sendMessages':
            // Get Messages
            chatApiWithParam(getMessages, selectedConversation.value.id, getMessagesLoader)
            break
          case 'createReview':
            closeModal(reviewModalBtn)
            fetchConversation()
            break
        }
        break
      case 'error':
        handleError('error', error.value.data.message)
        break
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loader.value = false
  }
}

/* ---------------- Functional call for api wih single param ---------------- */
const chatApiWithParam = async (func, userData, loader) => {
  loader.value = true

  try {
    const { status, data, error } = await func(userData)

    if (status.value === 'success') {
      console.log(`${func.name} ->`, data.value.data)

      // Handle specific actions based on the function name
      const actions = {
        createConversation: () => fetchConversation(),
        getMessages: () => {
          allMessages.value = data.value.data
          fetchConversation()
        },
        markAsRead: () => fetchConversation(),
        sendProposal: () => {
          chatApiWithParam(getMessages, selectedConversation.value.id, getMessagesLoader)
          closeModal(ModalBtn)
        },
        createTicket: () => {
          closeModal(sendReportBtn)
          handleALert('success', 'Ticket Created')
        },
        acceptProposal: () => {
          proposalResponse.value = data.value.data
          if (store.UserAccount?.account_type === 'employer') {
            const paymentUrl = data.value.data.payment.data.authorization_url
            window.open(paymentUrl, '_blank') // Open in new tab
          }
        },
        initiatePayment: () => {
          handleALert('success', 'Payment Initiated')
          const paymentUrl = data.value.data.payment.data.authorization_url
          window.open(paymentUrl, '_blank') // Open in new tab
        },
      }

      // Execute the action if it exists
      if (actions[func.name]) {
        actions[func.name]()
      }
    }

    if (status.value === 'error') {
      handleError('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loader.value = false
  }
}

// Handle sending Messages
const sendMessage = () => {
  if (message.value.trim() === '') {
    console.error('Message cannot be empty or contain only whitespace characters.')
    return
  }

  const formData = new FormData()
  formData.append('content', message.value.trim())
  formData.append('type', 'text')
  console.log(selectedConversation.value.id)

  chatApiWithParams(sendMessages, formData, selectedConversation.value.id, defaultLoader)
  message.value = ''
}

// Creating conversation for Employer and fetch conversation for Worker
if (store.UserAccount.account_type === 'employer') {
  chatApiWithParam(createConversation, store.newConversationDetails, conversationLoader)
}

fetchConversation()

setInterval(() => {
  fetchConversation()
}, 30000)

/* ------------------------------ Mobile Width ------------------------------ */
const isMobile = ref(false)

const screenWidth = ref(window.innerWidth)
const isMobileChat = ref(false)
const handleResize = () => {
  screenWidth.value = window.innerWidth
  isMobile.value = screenWidth.value <= 1024
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // Call handleResize to set initial value
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

/* -------------------------- Manage User Location -------------------------- */
const userLocation = (address) => {
  if (address === null || address === undefined) return 'NA'
  const userAddress = JSON.parse(address)
  return userAddress[0]
}
/* ---------------------------- Open Conversation --------------------------- */

const Chat = (conv) => {
  isMobileChat.value = isMobile.value // open chat in mobile view format
  selectedConversation.value = conv
  MarkAsRead()
}

watch(selectedConversation, (newVal) => {
  if (newVal) chatApiWithParam(getMessages, newVal.id, getMessagesLoader)
})

// after payment successful redirect should open the active chat
onMounted(() => {
  if (route.query.id && conversations.value.length > 0) {
    console.log(route.query, conversations.value)
    selectedConversation.value = conversations.value.find(conv => conv.id == route.query.id)
    Chat(selectedConversation.value)
  }
})

const conversationType = computed(() => {
  if (selectedConversation.value?.service_id && store.UserAccount.account_type === 'employer') {
    return 'employerService'
  }
  if (selectedConversation.value?.listing_id && store.UserAccount.account_type === 'employer') {
    return 'employerListing'
  }
  if (selectedConversation.value?.service_id && store.UserAccount.account_type === 'worker') {
    return 'workerService'
  }
  if (selectedConversation.value?.listing_id && store.UserAccount.account_type === 'worker') {
    return 'workerListing'
  }
  return '' // Add default return value
})
/* ---------------------------- FOR  NEGOTIATIONS --------------------------- */
// Define reactive variables
const latestOffer = ref(null)
const latestOfferUserId = ref(null)
// Initiator Latest Negotiation
const initiatorLatestNeg = ref(null)

const latestOfferNegotiationId = ref(null)
watch(allMessages, (newVal) => {
  if (newVal.length === 0) {
    latestOffer.value = null
    return
  }

  // Filter negotiation messages
  const recipientMessages = newVal.filter(message => message.type === 'negotiation' && message.user_id != store.UserAccount.id)

  // Get the latest negotiation messages
  const recipientLatest = recipientMessages[recipientMessages.length - 1] || null
  latestOfferNegotiationId.value = recipientLatest ? recipientLatest.negotiation_id : null

  // Debugging: Log latest negotiation messages
  console.log('Recipient Last Negotiation Message:', recipientLatest, recipientMessages, recipientLatest ? recipientLatest.negotiation_id : null)

  // Update offers based on account type
  latestOffer.value = recipientLatest ? recipientLatest.negotiation?.price_offer : null

  latestOfferUserId.value = recipientLatest ? recipientLatest.user.id : null

  // Get the employer's or buyer's latest negotiation message
  const initiatorMessages = newVal.filter(message => message.type === 'negotiation' && message.user_id == store.UserAccount.id)
  initiatorLatestNeg.value = initiatorMessages[initiatorMessages.length - 1] || null
  console.log('Initiator Last Negotiation Message:', initiatorMessages)
})

/* --------------------------- Handle Negotiations -------------------------- */

const negotiationPrice = ref('')

// calculate client charge
const clientCharge = ref(0)
watch(negotiationPrice, (newVal) => {
  if (newVal) {
    const serviceChargePercentage = 0.07
    const serviceCharge = negotiationPrice.value - (newVal * serviceChargePercentage)
    clientCharge.value = parseFloat(serviceCharge.toFixed(2))
  }
})

const sendNewProposal = () => {
  chatApiWithParam(sendProposal, {
    conversation_id: selectedConversation.value.id,
    price: negotiationPrice.value,
  }, proposalLoader)
}

const rejectProposa = () => {
  chatApiWithParam(rejectProposal, {
    negotiation_id: latestOfferNegotiationId.value,
  }, RejectProposalLoader)
}

const MarkAsRead = () => {
  console.log(selectedConversation.value.id)
  chatApiWithParam(markAsRead, selectedConversation.value.id, readLoader)
}

/* ---------------------------- Proposal Section & Payment ---------------------------- */
const acceptNegotiation = () => {
  if (initiatorLatestNeg.value && initiatorLatestNeg.value.negotiation.accepted) {
    console.log('Initiate Payment')
    InitiatePayment()
  }
  else {
    console.log('accept Payment')
    acceptNewProposal()
  }
}

const acceptNewProposal = () => {
  chatApiWithParam(acceptProposal, {
    negotiation_id: latestOfferNegotiationId.value,
  }, proposalLoader)
}

// Initiate payment
const InitiatePayment = () => {
  chatApiWithParam(initiatePayment, {
    negotiation_id: initiatorLatestNeg.value.negotiation_id,
  }, proposalLoader)
}

const latestOrder = ref(null)
watch(selectedConversation, (newVal) => {
  if (newVal.orders && newVal.orders.length > 0) {
    jobStatus.value = 'Completed'
    latestOrder.value = newVal.orders[newVal.orders.length - 1]
  }
  else if (newVal.last_job_id) {
    jobStatus.value = 'Completed'
    latestOrder.value = newVal.last_job
  }
  else {
    jobStatus.value = ''
  }
}, {
  deep: true,
})

/* -------------------- Computed Properties Or Utilities -------------------- */
// check if there is an offer and if an offer is accepted base on the account type
const disableNegotiationBtn = computed(() => {
  if (activeTab.value === 'job') {
    return allMessages.value?.length === 0 && !selectedConversation.value
  }
  return !(selectedConversation.value?.listing?.negotiable)
})

// const disableAcceptHireBtn = computed(() => {
//   if (store.UserAccount.account_type === 'employer') {
//     // Use optional chaining and nullish coalescing to avoid null errors
//     if (initiatorLatestNeg.value?.negotiation && initiatorLatestNeg.value?.negotiation?.accepted) {
//       return true
//     }
//     else {
//       return !!latestOffer.value
//     }
//   }
//   else {
//     return !!latestOffer.value
//   }
// })
// render chat time
const getTimeDifference = timestamp => getTimeDiff(timestamp)

/* ----------------------------- for marketplace ---------------------------- */
const _shippingStatus = computed(() => {
  if (conversationType.value === 'employerListing') {
    return latestOrder.value.shipping_status === 'delivered' ? 'Product Received' : 'Awaiting shipment'
  }
  return conversationType.value === 'workerListing' && latestOrder.value.shipping_status === 'pending' ? 'Product Delivered' : 'Completed'
})

// For Rendering review or proof delivery Ui (modal sections)
const review = ref(false)

const submitReview = () => {
  toggle(review)
}

const modal5 = ref(null)

/* ----------------------------- Managing Orders ---------------------------- */
// mark as as delivered
const orderLoading = ref(false)
// v-if="_shippingStatus === 'Product Received' || _shippingStatus === 'Completed' || _shippingStatus === 'Product Delivered'"

const productDelivered = async (id) => {
  if (Image.value == null) {
    handleALert('error', 'Upload an Image')
  }
  else {
    review.value = true
    orderLoading.value = true

    const formData = new FormData()
    formData.append('shipping_proof', Image.value)
    try {
      const { status, error } = await markAsDelivered(id, formData)
      if (status.value === 'success') {
        closeModal(submitProofBtn)
        modal5.value.click()
        await fetchConversation()
        return
      }
      handleError('error', error.value.data.message)
    }
    catch (err) {
      handleError('error', err.message)
    }
    finally {
      orderLoading.value = false
    }
  }
}

const ordersCompleted = async (id) => {
  orderLoading.value = true
  try {
    const { status, error } = await orderCompleted(id)
    if (status.value === 'success') {
      await fetchConversation()
      submitReview()
      return
    }
    handleError('error', error.value.data.message)
  }
  catch (err) {
    handleError('error', err.message)
  }
  finally {
    orderLoading.value = false
  }
}

const reviewData = reactive({
  rating: 5,
  content: '',
})

// get recipient id and user id for jobs
const latestJobOfferUserId = computed(() => {
  if (store.UserAccount.account_type === 'employer' && activeTab.value == 'job') {
    return selectedConversation.value.recipient_id
  }
  else if (store.UserAccount.account_type === 'worker' && activeTab.value == 'job') {
    return selectedConversation.value.user_id
  }
  else {
    return null
  }
})
const reviewLoader = ref(false)
const sendReviews = () => {
  chatApiWithParams(createReview,
    reviewData, (latestOfferUserId.value || latestJobOfferUserId.value), reviewLoader)
}

// selected Image url
const draggedFile = ref(null)
const Image = ref(null)

function handleClick() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
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

const reportData = reactive({
  user_id: store.UserAccount.id || null,
  reported_id: latestOfferUserId.value || null,
  reason: '',
  order_id: null,
  job_id: null,
  description: '',
})

// Watch for changes in relevant values and update reportData accordingly
watch([activeTab, selectedConversation], ([newTab, newConversation]) => {
  if (newTab === 'marketPlace' && newConversation?.orders?.[0]) {
    reportData.order_id = newConversation.orders[0].id
    reportData.job_id = null
  }
  else if (newConversation?.last_job_id) {
    reportData.job_id = newConversation.last_job_id
    reportData.order_id = null
  }
})

// Also watch latestOfferUserId to keep reported_id in sync
watch(latestOfferUserId, (newUserId) => {
  reportData.reported_id = newUserId || null
})

if (activeTab.value === 'marketPlace') {
  reportData.order_id = selectedConversation.value?.orders[0].id
}
else {
  reportData.job_id = selectedConversation.value?.job_id
}

const reportLoader = ref(false)
const report = () => {
  const formdata = new FormData()
  formdata.append('image', Image.value)
  formdata.append('user_id', reportData.user_id)
  formdata.append('reported_id', reportData.reported_id)
  formdata.append('reason', reportData.reason)
  reportData.order_id ? formdata.append('order_id', reportData.order_id) : formdata.append('job_id', reportData.job_id)
  formdata.append('description', reportData.description)

  chatApiWithParam(createTicket, formdata, reportLoader)
}

const MCloading = ref(false)
const MarkCompleted = async () => {
  MCloading.value = true
  const JobStatus = store.UserAccount.account_type == 'employer' ? 'completed' : 'in review'
  try {
    const { status, error } = await markJobAsCompleted(latestOrder.value.id, {
      status: JobStatus,
    })
    if (status.value === 'success') {
      await fetchConversation()
      submitReview()
      modal5.value.click()
      return
    }
    handleError('error', error.value.data.message)
  }
  catch (err) {
    handleError('error', err.message)
  }
  finally {
    MCloading.value = false
  }
}

const conversationStarts = () => {
  const now = new Date()
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  return now.toLocaleString('en-US', options)
}

</script>

<template>
  <SharedLoader v-if="conversationLoader" />
  <div
    v-else
    class="flex gap-2 xl:gap-10 lg:pt-10 w-full "
  >
    <!-- card 1 -->
    <div
      :class="{ hidden: isMobileChat && isMobile }"
      class=" card bg-base-100 h-screen lg:h-auto mb-4 lg:mb-0 w-full lg:w-[400px] shadow-xl flex-2 text-[#93939A]"
    >
      <div class="card-body">
        <!-- tab -->
        <div class="flex items-center justify-between mb-5">
          <a
            href="javascript:void(0)"
            class="center gap-1  pb-3 "
            :class="{ activeClass: activeTab === 'job' }"
            @click="toggleTab('job')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="text-sm">Jobs</span>
          </a>
          <a
            href="javascript:void(0)"
            class="center gap-1 pb-3"
            :class="{ activeClass: activeTab === 'marketPlace' }"
            @click="toggleTab('marketPlace')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="text-sm">MarketPlace</span>
          </a>
          <a
            href="javascript:void(0)"
            class="center gap-1 pb-3"
            :class="{ activeClass: activeTab === 'admin' }"
            @click="toggleTab('admin')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-5"
            >
              <path
                fill-rule="evenodd"
                d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                clip-rule="evenodd"
              />
              <path
                d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z"
              />
            </svg>

            <span class="text-sm">Admin</span>
          </a>
        </div>
        <!-- search -->
        <label class="input input-bordered flex items-center gap-2 mb-3">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            class="grow"
            placeholder="Search"
          >
        </label>

        <!-- tags -->
        <div class="flex items-center gap-4 mb-5">
          <a
            href="javascript:void(0)"
            class="bg-white border text-sm font-semibold w-fit  text-[#909090] satoshiM py-[6px] px-[10px] rounded-md"
            :class="{ activeTag: activeTag === 'all' }"
            @click="selectTag('all')"
          >
            <span>ALL</span>
          </a>
          <a
            href="javascript:void(0)"
            class="bg-white border text-sm font-semibold w-fit text-[#909090] satoshiM  py-[6px] px-[10px] rounded-md"
            :class="{ activeTag: activeTag === 'unread' }"
            @click="selectTag('unread')"
          >
            <span>Unread</span>
          </a>
          <a
            href="javascript:void(0)"
            class="text-sm bg-white font-semibold w-fit border text-[#909090] satoshiM  py-[6px] px-[10px] rounded-md"
            :class="{ activeTag: activeTag === 'read' }"
            @click="selectTag('read')"
          >
            <span>Read</span>
          </a>
        </div>

        <!-- Users -->
        <MarketPlaceEmployerJobs
          v-if="conversations.length > 0"
          :UserC="activeConversation"
          :last-message="lastMessages"
          @open-chat="Chat($event)"
        />
      </div>
    </div>
    <!-- card 2 -->
    <div
      :class="{ 'hidden lg:flex': !isMobileChat }"
      class=" card bg-base-100 w-full lg:w-96 shadow-xl flex-1"
    >
      <div class="card-body p-4">
        <!-- chat Header -->
        <div
          v-if="selectedConversation"
          class="flex items-center gap-4 border-b pb-5"
        >
          <!-- Navigation icon -->
          <a
            href="javascript:void(0)"
            class="lg:hidden"
            @click="isMobileChat = false"
          >
            <svg
              width="12"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.43766 8.99998L11.0377 15.6L9.15233 17.4853L0.666992 8.99998L9.15233 0.514648L11.0377 2.39998L4.43766 8.99998Z"
                fill="#09121F"
              />
            </svg>
          </a>
          <!-- avatar -->
          <div class="avatar">
            <div class="w-12 lg:w-14 rounded-full">
              <img
                :src="renderConversation(selectedConversation).profile_pic"
                :alt="renderConversation(selectedConversation).first_name"
              >
            </div>
          </div>
          <div>
            <div class="flex items-center text-[#101011] gap-2 lg:gap-8 mb-1">
              <span class="text-sm  satoshiB">{{ renderConversation(selectedConversation).first_name }} {{
                renderConversation(selectedConversation).last_name }}</span>
              <!-- <span class="font-medium text-[rgba(0,0,0,1)]">{{ userLocation(userInfo?.profile?.addresses).city }}, {{
                userLocation(userInfo?.profile?.addresses).country }}</span> -->
              <div class="hidden lg:flex items-center gap-2">
                <div class="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                  >
                </div>
                <span class="text-sm font-bold satoshiB">4.7</span>
                <span class="text-sm">(631 Ratings)</span>
              </div>
            </div>
            <div class="text-sm">
              {{ selectedConversation?.service ? selectedConversation.service.name : selectedConversation?.listing.title
              }}
            </div>
          </div>
        </div>
        <!-- Pop Up -->
        <div
          role="alert"
          class="hidden alert bg-neutral-800 text-white justify-center lg:flex p-3"
        >
          <span class="text-center text-sm lg:base w-full  block">Keep all dealings on valmon to ensure safety</span>
        </div>

        <!-- This is for mobile -->
        <div
          v-if="isMobile"
          class="lg:hidden card bg-base-100 shadow-xl"
        >
          <div class="px-2 py-6">
            <h2 class="card-title mb-1">
              Service Cost
            </h2>
            <div class="flex items-center my-3 gap-4">
              <!-- Listing Image -->
              <figure v-if="selectedConversation?.listing?.images && selectedConversation?.listing?.images.length > 0">
                <img
                  :src="selectedConversation?.listing?.images[0]"
                  :alt="selectedConversation?.listing?.title"
                  class="w-12"
                >
              </figure>
              <!-- Offer amount -->
              <div class="">
                <p class="text-sm satoshiB">
                  {{ selectedConversation?.listing?.title }}
                </p>

                <!-- Job Offer Amount -->
                <p
                  v-show="jobStatus === '' && activeTab === 'job'"
                  class=""
                >
                  NGN {{ latestOffer || 0 }}
                </p>

                <!-- Completed Job Amount -->
                <p
                  v-show="jobStatus === 'Completed'"
                  class="text-black satoshiB"
                >
                  NGN {{ latestOrder?.amount ?? 'N/A' }}
                </p>

                <!-- Marketplace Offer Amount -->
                <p
                  v-if="selectedConversation?.listing_id && jobStatus != 'Completed'"
                >
                  NGN {{ latestOffer || 0 }}
                </p>
              </div>
            <!-- Offer Amount End -->
            </div>
            <!-- Action buttons -->
            <div class="card-actions flex flex-wrap gap-3 items-center">
              <!-- Accept Proposal -->
              <button
                v-if="jobStatus === ''"
                id="start-payment-button"
                :disabled="!latestOffer"
                type="button"
                class="btn bg-darkGold text-white"
                @click="acceptNegotiation"
              >
                <span
                  v-if="proposalLoader"
                  class="loading loading-spinner loading-sm"
                />

                <span v-else>{{ conversationType === 'employerService' ? 'Accept & Hire' : conversationType === 'employerListing'
                  ? 'Accept & Buy' : conversationType === 'workerListing' ? 'Accept offer' : conversationType
                    === 'workerService' ? 'Accept Proposal' : 'Accept ' }}</span>
              </button>

              <!-- Services -->
              <div
                v-if="activeTab == 'job'"
                class="flex justify-center"
              >
                <button
                  v-if="jobStatus === 'Completed'"
                  :disabled="latestOrder.status != 'in review' && store.UserAccount.account_type == 'employer' || latestOrder.status == 'completed'"
                  class="btn bg-darkGold text-white"
                  @click="MarkCompleted"
                >
                  <span
                    v-if="MCloading"
                    class="loading loading-spinner loading-sm"
                  />
                  <span v-else>{{ latestOrder.status == 'completed' ? 'Completed' : 'Mark Job as Completed' }}</span>
                </button>
              </div>

              <!-- MarketPlace Buttons -->
              <div
                v-else
                class="flex justify-center"
              >
                <button
                  v-if="jobStatus === 'Completed' && (_shippingStatus === 'Completed' || _shippingStatus === 'Product Delivered')"
                  :disabled="_shippingStatus === 'Completed'"
                  class="btn bg-darkGold text-white"
                  onclick="my_modal_8.showModal()"
                >
                  <span>{{ _shippingStatus }}</span>
                </button>

                <!-- Buyer View -->
                <button
                  v-if="jobStatus === 'Completed' && conversationType ==='employerListing'"
                  class="btn bg-darkGold text-white"
                  onclick="my_modal_5.showModal()"
                  :disabled="_shippingStatus === 'Awaiting shipment'"
                >
                  <span
                    v-if="orderLoading && _shippingStatus !== 'Completed'"
                    class="loading loading-spinner loading-sm"
                  />
                  <span v-else>{{ _shippingStatus }}</span>
                </button>
              </div>

              <!-- Negotiate Cost -->
              <button
                v-if="jobStatus === ''"
                class="btn btn-neutral"
                onclick="my_modal_6.showModal()"
                :disabled="disableNegotiationBtn"
              >
                Negotiate Cost
              </button>

              <!-- Reject Offer or Report -->
              <div
                v-if="jobStatus === 'Completed'"
                class="flex justify-center"
              >
                <!-- Report -->
                <button
                  v-if="jobStatus === 'Completed'"
                  class="btn btn-outline btn-error"
                  type="button"
                  onclick="my_modal_7.showModal()"
                >
                  <span v-if="activeTab === 'job'">{{ store.UserAccount.account_type !== 'employer' ? 'Report Client'
                    : 'Report Worker' }}</span>
                  <span v-if="activeTab === 'marketPlace'">{{ store.UserAccount.account_type !== 'employer' ? 'Report Buyer'
                    : 'Report Seller' }}</span>
                </button>
                <button
                  v-else
                  class="btn btn-outline btn-error"
                  type="button"
                  @click="rejectProposa()"
                >
                  <span
                    v-if="RejectProposalLoader"
                    class="loading loading-spinner loading-md"
                  />
                  <span v-else>Reject Offer</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <p
          v-if="selectedConversation"
          class="text-[#4A4A4E] text-xs text-center mt-5 sticky-2"
        >
          Your conversation with {{ renderConversation(selectedConversation).first_name }} starts here
        </p>

        <!-- divider -->
        <div class="divider text-sm satoshiB text-black">
          {{ conversationStarts() }}
        </div>
        <!-- Chat container -->
        <div class="h-96 overflow-auto">
          <!-- User A :chat-start UserB : chat-end -->
          <p
            v-if="allMessages.length === 0"
            class="text-[#4A4A4E] text-xs lg:text-sm text-center mt-5"
          >
            Start A Conversation
          </p>
          <div
            v-for="(mesg, index) in allMessages"
            :key="mesg.id"
            class="chat  "
            :class="mesg.user_id == store.UserAccount.id ? 'chat-start flex' : 'chat-end'"
          >
            <div
              v-if="mesg.type === 'text'"
              class="chat-bubble  text-black chat_adjustment "
              :class="mesg.user_id == store.UserAccount.id ? 'bg-[#F0F2F5]' : 'bg-[#FEFDDA]'"
            >
              {{ mesg.content }}
              <div class="hidden text-darkGold text-xs satoshiB mt-2">
                3 Replies
              </div>
              <div class=" text-[10px] flex justify-between items-center mt-2 text-[#2D2D30] satoshiM relative">
                <span class="text-darkGold hidden">Edited</span>
                <span class="ms-auto"> {{ getTimeDifference(mesg.created_at).time }} {{
                  getTimeDifference(mesg.created_at).amPm }} </span>
                <!-- Emoji -->
                <span class="text-sm ml-2 hidden">😄</span>
              </div>
            </div>
            <!-- User A (SERVICE REQUEST) -->
            <div
              v-if="mesg.type === 'negotiation'"
              class="chat chat-start w-full "
              :class="mesg.user_id == store.UserAccount.id ? 'chat-start' : 'chat-end'"
            >
              <div class="chat-bubble bg-brightGold text-black chat_adjustment text-sm rounded-none">
                <span v-if="mesg.negotiation.user_id == store.UserAccount.id">You are requesting</span>
                <span v-else>
                  <span v-if="activeTab == 'marketPlace'"> {{ store.UserAccount.account_type !== 'employer' ? 'Buyer'
                    : 'Seller' }} is Requesting</span>
                  <span v-else> {{ store.UserAccount.account_type !== 'employer' ? 'Client' : 'Service Provider' }} is
                    Requesting</span>
                </span>
                <div class="mt-2 satoshiB">
                  NGN {{ mesg.negotiation.price_offer }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Button and chat box -->
        <div
          v-if="selectedConversation"
          class="flex items-center gap-4 lg:auto w-[90%]"
        >
          <!-- chat box -->
          <label class="w-fullff input px-3 lg:px-4 input-bordered flex items-center gap-1 grow">
            <a
              href="javascript:void(0)"
              class="w-fit p-1 bg-darkGold rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffff"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <input
              v-model.trim="message"
              type="text"
              class="grow "
              placeholder="New Message"
              @keyup.enter="sendMessage"
            >
            <a href="javascript:void(0)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 relative "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </a>

          </label>
          <!-- Send button -->
          <a
            href="javascript:void(0)"
            class="w-fit p-2 bg-darkGold rounded-full absolute right-[12px]"
            @click="sendMessage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffff"
              class="lg:size-6 size-3"
            >
              <path
                d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z"
              />
            </svg>

          </a>
        </div>
      </div>
    </div>

    <!-- card 3 -->
    <div class="hidden lg:card bg-base-100 w-96 shadow-xl flex-2 h-fit pb-10">
      <div class="card-body">
        <!-- For Marketplace listings -->
        <div v-if="selectedConversation?.listing?.images && selectedConversation?.listing?.images.length > 0 ">
          <figure class="mb-3">
            <img
              :src="selectedConversation.listing.images[0]"
              :alt="selectedConversation.listing.title"
              class="w-2/3 rounded-lg"
            >
          </figure>
          <p class="text-black text-3xl satoshiB ">
            {{ selectedConversation.listing.title }}
          </p>
        </div>
        <!-- Service Cost Section -->
        <h2 class="card-title">
          <span v-if="selectedConversation?.service_id">Service Cost:</span>
        </h2>

        <!-- Job Offer Label -->
        <div class="label">
          <span
            v-if="activeTab === 'job'"
            class="label-text"
            v-text="store.UserAccount.account_type !== 'employer' ? 'Client is asking for?' : 'Worker is Asking for?'"
          />
        </div>

        <!-- Job Offer Amount -->
        <div
          v-show="jobStatus === '' && activeTab === 'job'"
          class="input input-bordered w-full max-w-xs center"
        >
          NGN {{ latestOffer || 0 }}
        </div>

        <!-- Completed Job Amount -->
        <div
          v-show="jobStatus === 'Completed'"
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-3xl text-black satoshiB">
            NGN {{ latestOrder?.amount ?? 'N/A' }}
          </div>
        </div>

        <!-- Marketplace Offer Label -->
        <label
          v-show="jobStatus === ''&& activeTab !== 'job'"
          class="form-control w-full max-w-xs mb-3"
        >
          <div class="label">
            <span
              v-if="activeTab !== 'job'"
              class="label-text"
              v-text="store.UserAccount.account_type !== 'employer' ? 'Buyer is Asking for?' : 'Seller is Asking for?'"
            />
          </div>

          <!-- Marketplace Offer Amount -->
          <div
            v-if="selectedConversation?.listing_id "
            class="input input-bordered w-full max-w-xs center"
          >
            NGN {{ latestOffer || 0 }}
          </div>
        </label>

        <!-- accept proposal  -->
        <!-- This disable check if there is offer or latest offer for the client or if both cases exist due to a new gig offer if the previous offer has be concluded -->
        <button
          v-if="jobStatus === ''"
          id="start-payment-button"
          :disabled="!latestOffer"
          type="button"
          class="btn bg-darkGold mb-3 text-white w-full"
          @click="acceptNegotiation"
        >
          <span
            v-if="proposalLoader"
            class="loading loading-spinner loading-md"
          />
          <span v-else>{{ conversationType === 'employerService' ? 'Accept & Hire' : conversationType === 'employerListing'
            ? 'Accept & Buy' : conversationType === 'workerListing' ? 'Accept offer' : conversationType
              === 'workerService' ? 'Accept Proposal' : 'Accept ' }}  </span>
        </button>

        <!-- Services -->
        <div
          v-if="activeTab == 'job'"
          class="w-full center"
        >
          <button
            v-if="jobStatus === 'Completed'"
            :disabled="latestOrder.status != 'in review' && store.UserAccount.account_type == 'employer' || latestOrder.status == 'completed'"
            class="btn bg-darkGold mb-3 text-white w-full"
            @click="MarkCompleted"
          >
            <span
              v-if="MCloading"
              class="loading loading-spinner loading-sm"
            />
            <span v-else>{{ latestOrder.status == 'completed' ? 'Completed' : 'Mark Job as Completed' }}</span>
          </button>
        </div>
        <!-- MarketPlace: Completed/product delivered Button for seller view -->
        <div
          v-else
          class="w-full center"
        >
          <button
            v-if="jobStatus === 'Completed' && (_shippingStatus === 'Completed' || _shippingStatus === 'Product Delivered')"
            :disabled="_shippingStatus === 'Completed'"
            class="btn bg-darkGold mb-3 text-white w-full"
            onclick="my_modal_8.showModal()"
          >
            <span>{{ _shippingStatus }}</span>
          </button>

          <!-- For buyer view -->
          <button
            v-if="jobStatus === 'Completed' && conversationType ==='employerListing'"
            class="btn bg-darkGold mb-3 text-white w-full"
            onclick="my_modal_5.showModal()"
            :disabled="_shippingStatus === 'Awaiting shipment'"
          >
            <!-- <span
              v-if="orderLoading && _shippingStatus !== 'Completed'"
              class="loading loading-spinner loading-sm"
            /> -->
            <span>{{ _shippingStatus }}</span>
          </button>
        </div>

        <button
          v-if="jobStatus === ''"
          class="btn btn-neutral mb-3"
          onclick="my_modal_6.showModal()"
          :disabled="disableNegotiationBtn"
        >
          Negotiate Cost
        </button>

        <!-- Reject offer or report -->
        <div
          v-if="jobStatus === 'Completed'"
          class="w-full"
        >
          <!-- Report -->
          <button
            v-if="jobStatus === 'Completed'"
            class="btn btn-outline btn-error w-full"
            type="button"
            onclick="my_modal_7.showModal()"
          >
            <span v-if="activeTab === 'job'">{{ store.UserAccount.account_type !== 'employer' ? 'Report Client'
              : 'Report Worker' }}</span>
            <span v-if="activeTab === 'marketPlace'">{{ store.UserAccount.account_type !== 'employer' ? 'Report Buyer'
              : 'Report Seller' }}</span>
          </button>
          <button
            v-else
            class="btn btn-outline btn-error w-full"
            type="button"
            @click="rejectProposa()"
          >
            <span
              v-if="RejectProposalLoader"
              class="loading loading-spinner loading-md"
            />
            <span v-else>Reject Offer</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->

  <!-- Success and Rating -->
  <dialog
    id="my_modal_5"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <!-- Product delivered -->
        <div
          v-if="!review && activeTab != 'job'"
          class=""
        >
          <h1 class="text-2xl font-bold mb-4">
            Confirm Delivery
          </h1>
          <p class="text-black mb-4">
            Seller has marked this product as delivered, have you received this?
          </p>
          <p class="text-gray-600 mb-6">
            Seller Proof Of Delivery
          </p>
          <div class="w-full center">
            <img
              :src="selectedConversation?.listing?.images[0]"
              :alt="selectedConversation?.listing?.title"
              class="rounded-xl mb-6 w-full h-80 object-fit"
            >
          </div>
          <div class="center gap-4">
            <button class="btn bg-red-600 btn-lg text-white">
              Not Received
            </button>
            <button
              class="btn bg-darkGold btn-lg text-white"
              @click="ordersCompleted(latestOrder.id)"
            >
              <span
                v-if="orderLoading"
                class="loading loading-spinner loading-xs"
              />
              <span v-else> Received</span>
            </button>
          </div>
        </div>

        <!-- if Job is success -->
        <div
          v-if="review || activeTab == 'job'"
          class="success"
        >
          <h2 class="card-title text-black font-bold text-2xl text-center center">
            Success
          </h2>

          <p class="text-sm text-black mb-3">
            You have marked this job as completed, Please Rate Worker Below
          </p>
          <!-- Rating -->
          <div class="rating rating-lg mb-3">
            <input
              v-for="rating in 5"
              :key="rating"
              v-model="reviewData.rating"
              type="radio"
              :name="'rating'"
              class="mask mask-star"
              :value="rating"
            >
          </div>
          <label class="form-control mb-4">
            <div class="label">
              <span class="label-text">Comment On The Service Received</span>
            </div>
            <textarea
              v-model="reviewData.content"
              class="textarea textarea-bordered h-24"
              placeholder="Comment"
            />

          </label>
          <button
            class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
            @click="sendReviews"
          >
            <span
              v-if="reviewLoader"
              class="loading loading-spinner loading-xs"
            />
            <span v-else> Submit Review</span>
          </button>
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            ref="reviewModalBtn"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>

  <!-- Negotiate Chat -->
  <dialog
    id="my_modal_6"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Negotiate Cost
        </h2>

        <label class="form-control w-full mb-2">
          <div class="label">
            <span
              v-show="store.UserAccount.account_type == 'employer'"
              class="label-text"
            >What are you willing to pay</span>
            <span
              v-show="store.UserAccount.account_type == 'worker'"
              class="label-text"
            >Ask Client To Pay</span>
          </div>
          <input
            v-model.number="negotiationPrice"
            type="number"
            minlength="10000"
            class="input input-bordered w-full"
          >
        </label>
        <div
          class="text-center"
        >
          <p class="mb-3">
            Valmon Service charge: 7%
          </p>
          <p class="mb-3">
            You Get <span class="font-extrabold"> NGN {{ clientCharge }}</span>
          </p>
        </div>

        <button
          class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
          @click="sendNewProposal"
        >
          <span
            v-if="proposalLoader"
            class="loading loading-spinner loading-md"
          />
          <span v-else> Send Proposal</span>
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            ref="ModalBtn"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>

  <!-- Proof of delivery -->
  <dialog
    id="my_modal_8"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Confirm Delivery
        </h2>

        <p class=" text-black mb-3">
          You have marked this product as delivered, please upload proof for seller to confirm
        </p>
        <!-- Attachment -->
        <div class="text-[#6E7191]">
          <h1 class="mb-2">
            Upload Attachment (max 8mb)
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
      </div>
      <button
        class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
        @click="productDelivered(latestOrder.id)"
      >
        <span
          v-if="orderLoading"
          class="loading loading-spinner loading-sm"
        />
        Submit Proof
      </button>
      <!-- Modal trigger for when marked as delivered is successful  -->
      <span
        ref="modal5"
        onclick="my_modal_5.showModal()"
      />
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            ref="submitProofBtn"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>

  <!-- Repport Worker -->
  <dialog
    id="my_modal_7"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          <span v-if="activeTab === 'job'">{{ store.UserAccount.account_type !== 'employer' ? 'Report Client'
            : 'Report Worker' }}</span>
          <span v-if="activeTab === 'marketPlace'">{{ store.UserAccount.account_type !== 'employer' ? 'Report Buyer'
            : 'Report Seller' }}</span>
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
          @click="report"
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
            ref="sendReportBtn"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>

  <!-- The Modals below are not in use -->

  <!-- Open the modal using ID.showModal() method -->
  <!-- Await Confirmation  for worker flow -->
  <dialog
    v-show="store.UserAccount.account_type == 'worker'"
    id="my_modal_88"
    class="modal hidden"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Awaiting Confirmation
        </h2>

        <p class=" text-black mb-3">
          You have marked this job as completed, please wait for client to
          confirm completion so you can be paid
        </p>
      </div>
      <button
        class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
        @click="completed"
      >
        Close
      </button>
      <div class="modal-action w-full">
        <form
          method="dialog"
          class="w-full"
        >
          <!-- if there is a button in form, it will close the modal -->

          <button ref="awaitBtn" />
        </form>
      </div>
    </div>
  </dialog>

  <dialog
    id="my_modal_1"
    class="modal hidden"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Select Card
        </h2>
        <div
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-sm text-black mb-2">
            Payment Amount.
          </div>
          <div class="text-3xl text-black satoshiB">
            NGN 195,799
          </div>
        </div>
        <button
          v-for="(item, index) in 3"
          :key="index"
          class="btn btn-block mb-3"
          onclick="my_modal_2.showModal()"
        >
          <span class="flex flex-row justify-between w-full items-center">
            <img
              :src="masterCard"
              alt="Master Card"
              class="w-[40px] h-[40px]"
            >
            <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Axis Bank xxxx68</span>
            <span class="text-darkGold text-base font-bold  hover:text-brightGold">Select</span>
          </span>
        </button>

        <button class="btn mb-3 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border w-full mx-auto">
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

          Add Payment Method
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            ref="selectCardBtn"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>

  <!-- Payment -->
  <dialog
    id="my_modal_2"
    class="modal hidden"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          Payment
        </h2>
        <div
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-sm text-black mb-2">
            Payment Amount.
          </div>
          <div class="text-3xl text-black satoshiB">
            NGN 195,799
          </div>
        </div>
        <button clasinitiatePaymentLoaders="btn btn-block mb-3">
          <span class="flex flex-row justify-between w-full items-center">
            <img
              :src="masterCard"
              alt="Master Card"
              class="w-[40px] h-[40px]"
            >
            <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Axis Bank xxxx68</span>
            <span class="text-darkGold text-base font-bold  hover:text-brightGold">Select</span>
          </span>
        </button>
        <label class="form-control w-full mb-2">
          <div class="label">
            <span class="label-text">Password</span>
          </div>
          <input
            type="password"
            class="input input-bordered w-full"
          >
        </label>
        <button
          class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
          onclick="my_modal_3.showModal()"
        >
          Confirm
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button ref="paymentBtn" />
        </form>
      </div>
    </div>
  </dialog>

  <!-- OTP -->
  <dialog
    id="my_modal_3"
    class="modal hidden"
  >
    <div class="modal-box">
      <div class="card-body p-2">
        <h2 class="card-title text-black font-bold text-2xl text-center center">
          OTP
        </h2>
        <div
          role="alert"
          class="alert block bg-[#F0F2F5] mb-3"
        >
          <div class="text-sm text-black mb-2">
            Payment Amount.
          </div>
          <div class="text-3xl text-black satoshiB">
            NGN 195,799
          </div>
        </div>
        <p class="text-sm text-black mb-3">
          Enter OTP Sent To Favo****@gmail.com
        </p>
        <label class="form-control w-full mb-2">
          <div class="label">
            <span class="label-text">OTP</span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full"
          >
        </label>
        <button
          class="btn btn-neutral mb-3 text-base font-bold text-white border-2 _border w-full mx-auto"
          onclick="my_modal_4.showModal()"
        >
          Complete Payment
        </button>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button ref="otpBtn" />
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.activeClass {
  @apply border-darkGold text-darkGold border-b-4
}

.activeTag {
  @apply bg-darkGold text-white
}

.chat_adjustment {
  word-wrap: anywhere;
  max-width: 50%;
}

.modal-box {
  max-height: fit-content;
}
</style>
