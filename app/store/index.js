import { defineStore } from "pinia";
import { watch } from "vue";
// import Favorites from "~/pages/favorites.vue";
import { accountController } from "~/services/modules/account";

const { userAccount } = accountController();

// Define which state properties should be persisted
const PERSISTED_KEYS = {
  // Should persist across sessions
  session: [
    "UserAccount",
    "listingId",
    "userIdForProfileCheck",
    "recipientObjNegotiation",
    "activeHeaderTab",
    "listingData",
    "adminUserId",
    "viewAdminChatId",
    "selectedCurrency",
  ],
  // Should clear on component unmount
  component: [
    "usersByServices",
    "recipientObjNegotiation",
    "adminUserId",
    "viewAdminChatId",
    "fetchListing",
  ],
  // Should clear on logout
  auth: ["UserAccount", "userIdForProfileCheck", "listingId", "Pages"],
};

export const useStore = defineStore("valmon_app_store", {
  state: () => ({
    selectedCurrency: "NGN",
    activeSideMenu: "summary",
    viewParentSubCategory: false,
    viewSkills: false,
    /* ---------------------------------- Admin --------------------------------- */
    adminUserId: null,
    profileChoice: "user",
    // end
    serviceCategory: [],
    userOnline: ref(false),
    UserAccount: null,
    AuthSetup: {
      addresses: [],
      workingHours: [],
    },
    // Services information used under skills page
    usersByServices: ref(null),
    userIdForProfileCheck: null,
    // Hold selected Service
    selectedService: null,
    // Add Listings
    listingData: reactive({
      listing_category_id: "",
      location: "",
      title: "",
      color: "",
      price: "",
      negotiable: 1,
      condition: "",
      description: "",
      images: [],
    }),
    // fetch  market  Listings component after Upload.
    fetchListing: false,

    globalLoader: false,

    callUserAccount: false,
    profileSetupProcess: false,

    // For Creating new Conversation
    newConversationDetails: reactive({
      recipient_id: null,
      service_id: null,
      listing_id: null,
      gig: null,
    }),
    listingId: null,
    marketPlaceTab: false,
    similarListing: false,
    // Add recipientObjNegotiation to state
    recipientObjNegotiation: null,

    // Admin
    adminListingId: null,
    viewAdminChatId: null,
    Transaction: {
      key: "",
      id: null,
    },

    NewSubCategory: false,
    /* ----------------------------- Filter section ----------------------------- */

    // Home ( parent category and services)
    ServicesSearchedTerm: "",

    /* ------------------------------- Pagination ------------------------------- */
    Pages: {},

    // Favorites for Marketplace product description // Not working fix this
    // Favorites: ref([]),
    editListingData: null,
  }),
  actions: {
    updatePages(page, value) {
      this.Pages[page] = value;
    },
    updateHeader(value) {
      this.marketPlaceHeaderTab = value;
    },
    // function to save the state to the local storage
    saveState() {
      const stateToPersist = {};
      // Combine all keys from different categories
      Object.values(PERSISTED_KEYS)
        .flat()
        .forEach((key) => {
          if (this[key] !== undefined) {
            stateToPersist[key] = this[key];
          }
        });
      localStorage.setItem("valmon", JSON.stringify(stateToPersist));
    },
    // Retrieves the state from localStorage and update the state
    loadState() {
      const saved = localStorage.getItem("valmon");
      if (saved) {
        const parsedState = JSON.parse(saved);
        // Only patch the properties we want to persist
        const stateToPatch = {};
        Object.values(PERSISTED_KEYS)
          .flat()
          .forEach((key) => {
            if (parsedState[key] !== undefined) {
              stateToPatch[key] = parsedState[key];
            }
          });
        this.$patch(stateToPatch);
      }
    },
    // Fetch user acc
    async getAccount() {
      // this.globalLoader = true
      try {
        const { status, data } = await userAccount();
        if (status.value === "success") {
          this.UserAccount = data.value.data;
          console.log(data.value.data);
        }

        if (status.value === "error") {
          handleALert("error", "Unable to fetch Account Information");
        }
      } catch (error) {
        handleError(error);
      }
      // finally {
      //   this.globalLoader = false
      // }
    },
    // update new conversation details
    updateNewConversationDetails(RId, SId = null, LId = null) {
      this.newConversationDetails.recipient_id = RId;
      this.newConversationDetails.service_id = SId;
      this.newConversationDetails.listing_id = LId;
    },

    // Update the selected service from the Main Marketplace

    updateSelectedService(service) {
      this.selectedService = service;
    },
    updateGig(title, price) {
      this.newConversationDetails.gig = {
        title,
        price,
      };
    },
    updateTx(key, id) {
      this.Transaction.key = key;
      this.Transaction.id = id;
    },
    // Add method to clear specific state
    clearState(key) {
      if (key) {
        if (this[key] === undefined) {
          console.warn(`Attempting to clear non-existent state key: ${key}`);
          return;
        }
        const initialState = this.$state;
        this[key] = initialState[key];
      } else {
        this.$reset();
      }
      this.saveState();
    },

    // Clear state by category
    clearStateByCategory(category) {
      PERSISTED_KEYS[category].forEach((key) => {
        this.clearState(key);
      });
    },

    // Clear all non-persistent state
    clearTemporaryState() {
      const persistentKeys = new Set(PERSISTED_KEYS.session);
      Object.keys(this.$state).forEach((key) => {
        if (!persistentKeys.has(key)) {
          this.clearState(key);
        }
      });
    },

    // Add method to clear persisted state
    clearPersistedState() {
      localStorage.removeItem("valmon");
    },

    // Add an action to update recipientObjNegotiation
    updateRecipientObjNegotiation(data) {
      this.recipientObjNegotiation = data;
    },
  },
});

// Custom composable for persistence
export const useGlobalStore = () => {
  const store = useStore();

  // Load state when store is initialized
  store.loadState();

  // Watch for changes in the store and save to localStorage
  watch(
    () => store.$state,
    () => {
      store.saveState();
    },
    { deep: true }
  );
  // Save state on page unload
  window.addEventListener("beforeunload", () => {
    store.saveState();
  });
  return store;
};
