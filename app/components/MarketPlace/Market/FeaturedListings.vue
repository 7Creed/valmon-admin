<script setup>
const props = defineProps({
	headerTitle: String,
	type: String,
	listData: Array,
});

const viewMore = async (id, name) => {
	console.log(id, name);
	await navigateTo({
		path: "product",
		query: {
			name,
			id,
		},
	});
};
</script>

<template>
	<div class="featured">
		<h1
			class="font-extrabold text-xl md:text-2xl mb-7 satoshiM flex items-center justify-between"
		>
			<span
				:class="[
					props.type === 'electronics' ? 'text-white' : 'text-black',
				]"
				>{{ props.headerTitle }}</span
			>
			<a
				v-show="
					props?.listData.length !== 0 &&
					props?.listData &&
					props?.headerTitle !== 'Featured Listings'
				"
				href="javascript:void(0)"
				class="text-darkGold  text-lg md:text-2xl"
				@click="
					viewMore(
						props?.listData[0].category.id,
						props?.listData[0].category.name
					)
				"
				>View More</a
			>
		</h1>

		<div
			v-if="
				(!props?.listData || props?.listData.length === 0) &&
				type != 'featuredListings'
			"
			class="flex h-full rounded-lg"
		>
			<p class="text-gray-700 text-lg font-bold mb-2">
				No products under this category.
			</p>
		</div>
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-8 justify-center md:justify-start">
			<MarketPlaceEmployerMarket
				:type="props.type"
				:other-listings="props.listData"
			/>
		</div>
	</div>
</template>
