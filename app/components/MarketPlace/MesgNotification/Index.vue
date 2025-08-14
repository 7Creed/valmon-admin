<script setup>
import conversation from "@/assets/icons/conversation.svg";
import acceptNegotiation from "@/assets/icons/acceptNegotiation.svg";
import rejectNegotiation from "@/assets/icons/rejectNegotiation.svg";
import jobCompleted from "@/assets/icons/jobCompleted.svg";
import NegotiationRequest from "@/assets/icons/NegotiationPrice.svg";

const router = useRouter();

const props = defineProps({
  notifications: Array,
});

const NotificationIcons = [
  {
    name: "New conversation started",
    icon: conversation,
  },
  {
    name: "Negotiation request accepted",
    icon: acceptNegotiation,
  },
  {
    name: "Negotiation request rejected",
    icon: rejectNegotiation,
  },
  {
    name: "jobCompleted",
    icon: jobCompleted,
  },
  {
    name: "New Negotiation Request",
    icon: NegotiationRequest,
  },
];

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const handleNotificationClick = (notificationData) => {
  switch (notificationData.type) {
    case "negotiation":
      const conversation_id = notificationData.meta.conversation_id;
      router.push(`/chat?conversation_id=${conversation_id}`);
      break;
  }
};
</script>

<template>
  <div>
    <ul role="list" class="divide-y divide-gray-200">
      <li
        v-for="notification in props.notifications"
        :key="notification.id"
        class="p-6 hover:bg-gray-50 cursor-pointer"
        @click="handleNotificationClick(notification.data)"
      >
        <div class="flex items-start space-x-4">
          <!-- Notification Type Icon -->
          <div class="flex-shrink-0">
            <span
              v-if="
                NotificationIcons.some(
                  (icon) => icon.name === notification.data.title
                )
              "
              class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#EFE68736]"
            >
              <img
                :src="
                  NotificationIcons.find(
                    (icon) => icon.name === notification.data.title
                  ).icon
                "
                class="h-6 w-6 text-blue-600"
              />
            </span>
          </div>

          <!-- Notification Content -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">
                {{ notification.data.title }}
              </p>
              <!-- Hide x and check buttons -->
              <div class="flex hidden items-center gap-4">
                <a href="javascript:void(0)"
                  ><svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.563 0.902075C19.0986 1.48415 19.1487 2.4911 18.6753 3.1539L8.7413 16.9622C8.62658 17.1218 8.48701 17.2514 8.33086 17.3434C8.17471 17.4355 8.00513 17.4881 7.83215 17.4982C7.65918 17.5083 7.48631 17.4757 7.32376 17.4022C7.16122 17.3288 7.0123 17.216 6.8858 17.0706L0.407073 9.63533C0.157836 9.34651 0.0117239 8.94811 0.000675224 8.52722C-0.0103734 8.10632 0.11454 7.69717 0.348111 7.38919C0.581682 7.08121 0.904912 6.89946 1.24715 6.88367C1.58938 6.86787 1.92278 7.01932 2.17447 7.3049L7.6857 13.6143L16.7386 1.03803C16.8515 0.881031 16.9885 0.752948 17.1416 0.661121C17.2948 0.569294 17.4612 0.515525 17.6314 0.502896C17.8015 0.490267 17.9719 0.519025 18.133 0.587522C18.2941 0.656019 18.4425 0.762911 18.57 0.902075H18.563Z"
                      fill="#473F33"
                    /></svg
                ></a>
                <a href="javascript:void(0)"
                  ><svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.4 14.5L0 13.1L5.6 7.5L0 1.9L1.4 0.5L7 6.1L12.6 0.5L14 1.9L8.4 7.5L14 13.1L12.6 14.5L7 8.9L1.4 14.5Z"
                      fill="#E50B0B"
                    /></svg
                ></a>
              </div>
            </div>
            <p class="mt-1 text-sm text-gray-500">
              {{ notification.data.message }}
            </p>
            <p class="text-sm text-gray-500">
              {{ formatDate(notification.created_at) }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
