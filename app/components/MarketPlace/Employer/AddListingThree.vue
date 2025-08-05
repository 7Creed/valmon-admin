<script setup>
import { useGlobalStore } from "~/store";

const emit = defineEmits(["BasicProfile"]);

const store = useGlobalStore();

const props = defineProps({
	type: String,
	canProceed: Function,
	onUpdate: Function,
	isEdit: Boolean,
	listingData: Object,
});

const isReplacingImage = ref(false);
const initialListingData = ref(props.type === "BasicProfileSetup" ? null : props?.listingData);

function handleClick(index) {
	if (
		props.isEdit &&
		imageFiles.value.length < index &&
		!isReplacingImage.value
	)
		return;
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "";
	input.onchange = (e) => {
		const file = e.target.files?.[0];
		if (file) {
			ImageContent.value[index] = {
				Image: file,
				image_url: URL.createObjectURL(file),
			};
			if (props.type === "BasicProfileSetup") {
				imageFiles.value.push(file);
			} else {
				if (props.isEdit && isReplacingImage.value) {
					initialListingData.value.images[index] =
						URL.createObjectURL(file);
					isReplacingImage.value = false;
				}
				imageFiles.value[index] = file;

				// if (imageFiles.value.length > index) {
				// 	imageFiles.value[index] = file;
				// } else {
				// 	imageFiles.value.push(file);
				// }

				// store.listingData.images.push(file);
				props.onUpdate({ images: imageFiles.value });
			}
		}
	};
	input.click();
}
const ImageContent = ref([
	...(props.isEdit && initialListingData.value?.images
		? initialListingData?.value.images.map((img) => ({
				image_url: img,
		  }))
		: (props.type === "BasicProfileSetup" && props?.listingData ? props.listingData?.images.map((img) => ({
			Image : img,
			image_url : URL.createObjectURL(img)
		})) : [])),
]);
const imageFiles = ref([
	...(props.isEdit && props.listingData?.images
		? props.listingData.images
		: (props.type === "BasicProfileSetup" && props?.listingData ? props.listingData?.images : [])),
]);

const editImage = (index) => {
	if (props.isEdit) {
		isReplacingImage.value = true;
		handleClick(index);
	} else {
		handleClick(index);
	}
};

const removeImage = (index) => {
	imageFiles.value.pop();
	ImageContent.value.pop();
	initialListingData.value.images.splice(index, 1);
};

watch(
	imageFiles,
	(newVal, oldVal) => {
		if (props.type === "BasicProfileSetup") {
			emit("BasicProfile", { images : newVal });
		}
	},
	{ deep: true }
);
</script>

<template>
	<!-- Attachment -->
	<div class="flex flex-wrap gap-10">
		<div v-for="(item, index) in 6" :key="index" class="text-[#6E7191]">
			<div
				class="flex justify-center border-[2px] border-[rgba(38,44,63,0.48)] border-dotted relative"
				v-if="(initialListingData?.images ?? []).length > index"
			>
				<img
					class="max-h-[200px]"
					:src="initialListingData?.images[index]"
				/>
				<div
					v-if="index == imageFiles.length - 1"
					class="absolute opacity-[0] w-[100%] h-[100%] hover:bg-[rgba(0,0,0,0.6)] hover:opacity-[1]"
				>
					<div class="flex gap-1 absolute right-[3px] top-[3px]">
						<button
							class="bg-white p-1 rounded-sm transition-transform duration-400 hover:scale-[1.2]"
							@click="editImage(index)"
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 14 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									opacity="0.4"
									d="M12.2156 12.7975H1.74487C1.50637 12.7975 1.30859 12.5997 1.30859 12.3612C1.30859 12.1227 1.50637 11.925 1.74487 11.925H12.2156C12.4541 11.925 12.6519 12.1227 12.6519 12.3612C12.6519 12.5997 12.4541 12.7975 12.2156 12.7975Z"
									fill="#292D32"
								/>
								<path
									opacity="0.4"
									d="M11.0642 2.02433C9.93564 0.895822 8.8304 0.866737 7.67281 2.02433L6.96894 2.7282C6.91077 2.78637 6.8875 2.87944 6.91077 2.96088C7.35287 4.5024 8.58608 5.73561 10.1276 6.17771C10.1509 6.18353 10.1741 6.18934 10.1974 6.18934C10.2614 6.18934 10.3196 6.16608 10.3661 6.11954L11.0642 5.41568C11.64 4.8456 11.9193 4.29298 11.9193 3.73455C11.9251 3.15866 11.6459 2.60022 11.0642 2.02433Z"
									fill="#292D32"
								/>
								<path
									d="M9.08028 6.70706C8.91158 6.62563 8.7487 6.54419 8.59164 6.45111C8.46367 6.37549 8.34151 6.29405 8.21935 6.2068C8.12046 6.14281 8.00412 6.04974 7.8936 5.95666C7.88196 5.95085 7.84124 5.91595 7.79471 5.86941C7.60274 5.70653 7.38751 5.49712 7.19555 5.26443C7.1781 5.2528 7.14901 5.21208 7.10829 5.15973C7.05012 5.08992 6.95123 4.97358 6.86398 4.83979C6.79417 4.75253 6.71273 4.62456 6.63711 4.49658C6.54404 4.33952 6.4626 4.18246 6.38116 4.01958C6.29972 3.84507 6.23574 3.67638 6.17757 3.51932L2.52445 7.17243C2.44883 7.24805 2.37903 7.39348 2.36158 7.49237L2.04745 9.7203C1.98928 10.1159 2.09981 10.4882 2.34412 10.7383C2.55354 10.9419 2.84439 11.0524 3.15851 11.0524C3.22832 11.0524 3.29812 11.0466 3.36793 11.035L5.60168 10.7208C5.70638 10.7034 5.85181 10.6336 5.92161 10.558L9.57473 6.90484C9.41185 6.84667 9.25479 6.78269 9.08028 6.70706Z"
									fill="#292D32"
								/>
							</svg>
						</button>
						<button
							class="bg-white p-1 rounded-sm transition-transform duration-400 hover:scale-[1.2]"
							@click="removeImage(index)"
						>
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M15.8023 3.9225C14.5948 3.8025 13.3873 3.7125 12.1723 3.645V3.6375L12.0073 2.6625C11.8948 1.9725 11.7298 0.9375 9.97475 0.9375H8.00975C6.26225 0.9375 6.09725 1.9275 5.97725 2.655L5.81975 3.615C5.12225 3.66 4.42475 3.705 3.72725 3.7725L2.19725 3.9225C1.88225 3.9525 1.65725 4.23 1.68725 4.5375C1.71725 4.845 1.98725 5.07 2.30225 5.04L3.83225 4.89C7.76225 4.5 11.7223 4.65 15.6973 5.0475C15.7198 5.0475 15.7348 5.0475 15.7573 5.0475C16.0423 5.0475 16.2898 4.83 16.3198 4.5375C16.3423 4.23 16.1173 3.9525 15.8023 3.9225Z"
									fill="#FA3535"
								/>
								<path
									opacity="0.3991"
									d="M14.4228 6.105C14.2428 5.9175 13.9953 5.8125 13.7403 5.8125H4.2603C4.0053 5.8125 3.7503 5.9175 3.5778 6.105C3.4053 6.2925 3.3078 6.5475 3.3228 6.81L3.7878 14.505C3.8703 15.645 3.9753 17.07 6.5928 17.07H11.4078C14.0253 17.07 14.1303 15.6525 14.2128 14.505L14.6778 6.8175C14.6928 6.5475 14.5953 6.2925 14.4228 6.105Z"
									fill="#FA3535"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M7.18457 12.75C7.18457 12.4393 7.43641 12.1875 7.74707 12.1875H10.2446C10.5552 12.1875 10.8071 12.4393 10.8071 12.75C10.8071 13.0607 10.5552 13.3125 10.2446 13.3125H7.74707C7.43641 13.3125 7.18457 13.0607 7.18457 12.75Z"
									fill="#FA3535"
								/>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M6.5625 9.75C6.5625 9.43934 6.81434 9.1875 7.125 9.1875H10.875C11.1857 9.1875 11.4375 9.43934 11.4375 9.75C11.4375 10.0607 11.1857 10.3125 10.875 10.3125H7.125C6.81434 10.3125 6.5625 10.0607 6.5625 9.75Z"
									fill="#FA3535"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div v-else>
				<h1 class="mb-2 satoshiM text-center">
					Select previous relevant work images
				</h1>
				<a
					href="javascript:void(0);"
					:class="
						'border-dashed border-2 flex flex-col items-center justify-between p-4 border-[rgba(38,44,63,0.48)] ' +
						(index == imageFiles.length
							? ''
							: 'bg-[#f2f2f2] cursor-auto')
					"
					@click="handleClick(index)"
				>
					<img
						v-if="ImageContent[index]?.image_url"
						:src="ImageContent[index]?.image_url"
						alt=""
						class="max-h-[200px]"
					/>

					<svg
						v-if="!ImageContent[index]?.image_url"
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
					<div
						v-if="!ImageContent[index]?.image_url"
						class="text-sm text-[#5B5B5B] mb-1"
					>
						<span class="text-[#030359]">Select</span> Image you
						want to upload
					</div>
					<div
						v-if="!ImageContent[index]?.image_url"
						class="text-[#949CA9]"
					>
						Png and Jpg Allowed
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
