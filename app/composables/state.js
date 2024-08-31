export const useActiveView = () => {
  // Initialize the state and return a ref
  const state = useState('activeView', () => ({
    isProfileEnabled: false,
    isContactEnabled: false,
    isProfileName: '',
  }))

  // Function to update the isProfileEnabled  and profileName state
  const updateProfileView = (value) => {
    state.value.isProfileEnabled = !state.value.isProfileEnabled
    state.value.isProfileName = value
    // console.log(state.isProfileEnabled)
  }

  // Function to update the isContactEnabled state
  const updateContactView = () => {
    state.value.isContactEnabled = !state.value.isContactEnabled
  }

  // Return the state and the functions
  return {
    state,
    updateContactView,
    updateProfileView,
  }
}
