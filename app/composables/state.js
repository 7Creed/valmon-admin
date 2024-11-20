export const useActiveView = () => {
  // Initialize the state and return a ref
  const state = useState('activeView', () => ({
    isProfileEnabled: false,
    isContactEnabled: false,
    isProfileName: '',
    chatId: '',
    GeneralHistory: false,
  }))

  // Function to update the isProfileEnabled  and profileName state
  const updateProfileView = async (value) => {
    state.value.isProfileEnabled = !state.value.isProfileEnabled
    state.value.isProfileName = value
    // navigate to profile page
    navigateTo('/profile')
  }

  // Function to update the isContactEnabled state
  const updateContactView = () => {
    state.value.isContactEnabled = !state.value.isContactEnabled
    // navigate to contact/chat page
    navigateTo('/chat')
  }

  // Open Chat from marketPlace
  const setMarketPlaceChatId = (id) => {
    state.value.chatId = id
    console.log(id)
  }

  // Handle General History
  const handleGeneralHistory = () => {
    state.value.GeneralHistory = !state.value.GeneralHistory
  }
  // Return the state and the functions
  return {
    state,
    updateProfileView,
    updateContactView,
    setMarketPlaceChatId,
    handleGeneralHistory
  }
}
