import swal from 'sweetalert'

// for toggling reactive variables
export const toggle = (param) => {
  param.value = !param.value
}

export const handleALert = (icon, text, title = '', time = 3000) => {
  swal({
    icon: `${icon}`,
    text: `${text}`,
    title: `${title}`,
    timer: time,
  })
}

export const handleError = (error) => {
  handleALert('error', 'An error occurred while processing your request')
  console.log(error)
}

// Modals
export const closeModal = (val) => {
  if (val.value) {
    val.value.click()
  }
}

// Data and Time

export function getTimeDiff(timestamp) {
  console.log('time stamp', timestamp)
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date

  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHrs = Math.floor(diffMin / 60)
  const diffDays = Math.floor(diffHrs / 24)

  // Determine AM/PM based on the chat parameter

  const hour = date.getHours() % 12 == 0 ? 12 : date.getHours() % 12
  const amPm = date.getHours() < 12 ? 'AM' : 'PM'

  if (diffSec < 60) {
    return {
      value: diffSec,
      unit: 'sec',
      time: hour,
      amPm: amPm,
    }
  }
  else if (diffMin < 60) {
    return {
      value: diffMin,
      unit: 'mins',
      time: hour,
      amPm: amPm,
    }
  }
  else if (diffHrs < 24) {
    return {
      value: diffHrs,
      unit: 'hrs',
      time: hour,
      amPm: amPm,
    }
  }
  else {
    return {
      value: diffDays,
      unit: 'days',
      time: hour,
      amPm: amPm,
    }
  }
}

export const formatDate = (data) => {
  const date = new Date(data)
  return date.toLocaleDateString()
}
