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

export const closeModal = (val) => {
  if (val.value) {
    val.value.click()
  }
}
