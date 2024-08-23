<script setup>
import rectangle from '@/assets/images/UIElements/Rectangle.png'
</script>

<template>
  <div class="  bg-stone-950 min-h-screen pb-28 relative">
    <h1 class="text-5xl font-bold text-white text-center pt-20 mb-12 relative w-fit mx-auto z-10">
      Terms Of Services
      <img
        :src="rectangle"
        alt="rectangular-background"
        class="w-16 top-[5rem] left-9 absolute -z-10"
      >
    </h1>
    <div class="max-w-4xl mx-auto mt-8 p-10 border border-darkGold rounded-lg">
      <section class="mb-6 text-white">
        <h2 class="text-xl font-bold mb-5">
          Introduction
        </h2>
        <p class="text-gray-700">
          We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our services.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-2">
          What personal information do we collect?
        </h3>
        <p class="text-gray-700 mb-2">
          We collect the following types of personal information from you:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>Contact information: This includes your name, email address, phone number, and mailing address.</li>
          <li>Account information: This includes your username, password, and security questions.</li>
          <li>Transaction information: This includes information about the services you purchase and the payments you make.</li>
          <li>Usage information: This includes information about how you use our services, such as the pages you visit and the ads you click on.</li>
          <li>Location information: This includes information about your physical location, such as your IP address and GPS coordinates.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-2">
          How do we use your personal information?
        </h3>
        <p class="text-gray-700 mb-2">
          We use your personal information to provide the services you have requested, to improve our services, to communicate with you, and to protect our rights and interests.
        </p>
        <p class="text-gray-700 mb-2">
          Specifically, we use your personal information for the following purposes:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>To provide the services you have requested.</li>
          <li>To improve our services.</li>
          <li>To communicate with you.</li>
          <li>To protect our rights and interests.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-2">
          Who do we share your personal information with?
        </h3>
        <p class="text-gray-700 mb-2">
          We may share your personal information with the following third parties:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>Our service providers.</li>
          <li>Our partners.</li>
          <li>Law enforcement.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-2">
          How do we protect your personal information?
        </h3>
        <p class="text-gray-700">
          We take steps to protect your personal information, including storing it securely, encrypting it, and limiting access to authorized personnel.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-2">
          What are your rights?
        </h3>
        <p class="text-gray-700 mb-2">
          You have the following rights with respect to your personal information:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>Access.</li>
          <li>Correction.</li>
          <li>Deletion.</li>
          <li>Portability.</li>
          <li>Objection.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="text-xl font-semibold mb-2">
          How can you contact us?
        </h3>
        <p class="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us at: <a
            href="mailto:[email protected]"
            class="text-blue-500 underline"
          >[email protected]</a>
        </p>
      </section>

      <section class="">
        <h3 class="text-xl font-semibold mb-2">
          Changes to this Privacy Policy
        </h3>
        <p class="text-gray-700">
          We may update this Privacy Policy from time to time. The most current version of the Privacy Policy will always be posted on our website. If we make any material changes to this Privacy Policy, we will notify you by email or through a prominent notice on our website.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
p, h3, li{
  color: white !important;
}
p, li {
  font-weight: 500;
  font-size: 18px;
}

h3 {
  font-weight: 700;
  font-size: 20px;
}
/* img {
  z-index: -1;
} */
</style>
