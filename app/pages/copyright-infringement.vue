<script setup>
import rectangle from "@/assets/images/UIElements/Rectangle.png";
</script>

<template>
	<div class="bg-stone-950 min-h-screen relative mb-20 pb-20 lg:mb-30">
		<h1
			class="text-3xl lg:text-5xl font-bold text-white text-center pt-20 mb-12 relative w-fit mx-auto z-10"
		>
			Copyright Infringement
			<img
				:src="rectangle"
				alt="rectangular-background"
				class="w-16 top-[5rem] left-9 absolute -z-10"
			/>
		</h1>
		<div
			class="max-w-4xl mx-auto mt-8 p-10 border border-darkGold rounded-lg"
		>
			<h2 class="lg:text-xl font-bold mb-5 text-white">
				Copyright Infringement for Valmon
			</h2>

			<!-- 

      <section class="mb-6 text-white">
        <h2 class="lg:text-xl font-bold mb-5">
          Effective Date: November 2024
        </h2>
        <p class="text-gray-700">
          Welcome to Valmon! By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.
        </p>
      </section> -->

			<section class="mb-6">
				<h3 class="lg:text-xl font-semibold mb-2">
					1. ⁠User-Generated Content
				</h3>
				<p class="text-gray-700">
					<b>Original Work:</b> Users may post original works (e.g.,
					designs, articles) without proper rights. <br />
					<b>Infringement:</b>
					If a user uploads copyrighted material (like music or
					images) without permission, it constitutes infringement.
				</p>
			</section>

			<section class="mb-6">
				<h3 class="lg:text-xl font-semibold mb-2">
					2. Terms of Service
				</h3>
				<p class="text-gray-700">
					<b>User Agreements:</b> Ensure that users agree not to
					infringe on third-party copyrights. . <br />
					<b>Liability Clauses</b>
					Clearly outline the responsibilities of users regarding
					copyright.
				</p>
			</section>

			<section class="mb-6">
				<h3 class="lg:text-xl font-semibold mb-2">
					3. DMCA Compliance
				</h3>
				<p class="text-gray-700">
					<b>Takedown Procedures:</b> Implement a Digital Millennium
					Copyright Act (DMCA) takedown process for reporting
					infringement.
					<br />
					<b>Counter-Notification:</b>
					Provide a way for users to contest takedown notices.
				</p>
			</section>

			<section class="mb-6">
				<h3 class="lg:text-xl font-semibold mb-2">
					4. Monitoring Content
				</h3>
				<p class="text-gray-700">
					<b>Proactive Measures:</b> Regularly monitor uploaded
					content to prevent infringement.
					<br />
					<b>User Education:</b>
					Educate users about copyright laws and the importance of
					using original content.
				</p>
			</section>

			<section class="mb-6">
				<h3 class="lg:text-xl font-semibold mb-2">
					5. Licensing and Permissions
				</h3>
				<p class="text-gray-700">
					<b>Encourage Licensing:</b> Promote the use of licensed
					content and provide resources for obtaining permissions.
					<br />
					<b>Creative Commons:</b>
					Suggest using Creative Commons licenses for sharing work
					legally.
				</p>
			</section>

			<section class="mb-6">
				<h3 class="lg:text-xl font-semibold mb-2">
					6. Consequences of Infringement
				</h3>
				<p class="text-gray-700">
					<b>Legal Action:</b> Users may face lawsuits for copyright
					infringement.

					<br />
					<b>Account Suspension:</b>
					Repeated infringement can lead to account termination.
				</p>
			</section>

			<p class="valmon mt-6">
				By using Valmon, you agree to these Terms and Conditions. Thank
				you for being a part of our community!
			</p>
		</div>
	</div>
</template>

<style scoped>
p,
h3,
li {
	color: white !important;
}
p,
li {
	font-weight: 500;
	font-size: 18px;
}
h3 {
	font-weight: 700;
	font-size: 20px;
}
.valmon {
	@apply text-brightGold !important;
}
</style>
