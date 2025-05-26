<script setup>
import rectangle from '@/assets/images/UIElements/Rectangle.png'
</script>

<template>
  <div class="bg-stone-950 min-h-screen relative lg:mb-30 pb-[8%]">
    <h1 class="text-3xl lg:text-5xl font-bold text-white text-center pt-20 mb-12 relative w-fit mx-auto z-10">
      Terms Of Services
      <img
        :src="rectangle"
        alt="rectangular-background"
        class="w-16 top-[5rem] left-9 absolute -z-10"
      >
    </h1>
    <div class="max-w-4xl mx-auto mt-8 p-10 border border-darkGold rounded-lg">
      <h2 class="lg:text-xl font-bold mb-5 text-white">
        Terms and Conditions for Valmon
      </h2>
      <section class="mb-6 text-white">
        <h2 class="lg:text-xl font-bold mb-5">
          Effective Date: November 2024
        </h2>
        <p class="text-gray-700">
          Welcome to Valmon! By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          1. Acceptance of Terms
        </h3>
        <p class="text-gray-700">
          By using Valmon, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, you must not use our services.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          2. Services Offered
        </h3>
        <p class="text-gray-700">
          Valmon provides a platform that connects skilled workers with clients for employment opportunities and includes a marketplace for buying and selling products. The specifics of the services may evolve, and we reserve the right to modify or discontinue any service at any time.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          3. User Registration
        </h3>
        <p class="text-gray-700">
          To access certain features of Valmon, you may need to create an account. You agree to provide accurate, current, and complete information and to update this information as necessary. You are responsible for maintaining the confidentiality of your account information.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          4. User Responsibilities
        </h3>
        <ul class="list-disc list-inside text-gray-700">
          <li class="list-none">
            User must:
          </li>
          <li>Use the platform only for lawful purposes.</li>
          <li>Respect the rights of other users and clients.</li>
          <li>Not engage in fraudulent activities or misrepresentation.</li>
          <li>Not post any content that is offensive, defamatory, or violates any laws.</li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          5. Intellectual Property
        </h3>
        <p class="text-gray-700">
          All content, trademarks, and other intellectual property on the Valmon platform are owned by Valmon or its licensors. You may not use, reproduce, or distribute any material without prior written consent.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          6. Dispute Resolution
        </h3>
        <p class="text-gray-700">
          Any disputes arising from or related to your use of Valmon will be resolved by the Valmon resolution team.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          7. Limitation of Liability
        </h3>
        <p class="text-gray-700">
          Valmon is not responsible for any indirect, incidental, or consequential damages arising from your use of the platform. Our liability is limited to the maximum extent permitted by law.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          8. Indemnification
        </h3>
        <p class="text-gray-700">
          You agree to indemnify and hold Valmon harmless from any claims, damages, losses, or expenses arising from your use of the platform or violation of these Terms and Conditions.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold mb-2">
          9. Changes to Terms
        </h3>
        <p class="text-gray-700">
          Valmon reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of the platform constitutes acceptance of the revised terms.
        </p>
      </section>

      <section class="">
        <h3 class="lg:text-xl font-semibold mb-2">
          10. Contact Information
        </h3>
        <p class="text-gray-700">
          For any questions regarding these Terms and Conditions, please contact us at:
        </p>
        <p class="text-gray-700">
          Email: <a
            href="mailto:support@valmonvalues.com"
            class="text-brightGold underline"
          >support@valmonvalues.com</a>
        </p>
      </section>

      <p class="valmon mt-6">
        By using Valmon, you agree to these Terms and Conditions. Thank you for being a part of our community!
      </p>
    </div>
  </div>
</template>

<style scoped>
p, h3, li {
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
.valmon {
  @apply text-brightGold !important
}
</style>
