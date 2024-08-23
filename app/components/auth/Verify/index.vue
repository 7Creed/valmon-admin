<script setup>
import OTP from '@/components/auth/Verify/OTP.vue'
import UploadPicture from '@/components/auth/Verify/UploadPicture.vue'

const emit = defineEmits(['nextEvent', 'prevEvent'])

const uploadPicture = ref(false)

const router = useRouter()

const uploadPictureCom = () => {
  // emits nextEvent during worker sign up process
  if (router.hasRoute('worker')) {
    emitEvent('nextEvent')
    // Client Sign up process
    uploadPicture.value = !uploadPicture.value
  }
}
// emit general events
const emitEvent = (event) => {
  emit(event)
}
</script>

<template>
  <div class="w-1/2 xxl:w-1/3">
    <OTP
      v-if="!uploadPicture"
      @next-event="uploadPictureCom"
      @prev-event="emitEvent('prevEvent')"
    />
    <UploadPicture
      v-if="uploadPicture"
      @prev-event="uploadPictureCom"
    />
  </div>
</template>
