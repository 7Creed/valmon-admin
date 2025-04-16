import swal from 'sweetalert'

// for toggling reactive variables
export const toggle = (param) => {
  param.value = !param.value
}

export const handleALert = (icon, text, title = '', time = 300000) => {
  swal({
    icon: `${icon}`,
    text: `${text}`,
    title: `${title}`,
    timer: time,
  })
}

export const handleError = (error) => {
  handleALert('error', 'An error occurred while processing your request, Try again')
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

export const formatDate = (data, lastSeen = false) => {
  let processedData = data

  if (lastSeen) {
    const splitData = data.split(',')
    processedData = splitData[0] // Assuming you want the first part after splitting
    console.log(processedData)
  }

  const date = new Date(processedData)
  return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString()
}

export const formatDateTime = (datetime) => {
  const date = new Date(datetime)

  // Format the date as YYYY-MM-DD
  const formattedDate = date.toISOString().split('T')[0]

  // Format the time as HH:mm
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  })

  return {
    date: formattedDate,
    time: formattedTime,
  }
}

export const getHours = (startTime, endTime) => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const diff = end.getTime() - start.getTime()
  return Math.ceil(diff / (1000 * 60 * 60))
}
