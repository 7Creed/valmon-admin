<script setup>
import rectangle from '@/assets/images/UIElements/Rectangle.png'
</script>

<template>
  <div class="bg-stone-950 min-h-screen mb-20 lg:mb-30 relative">
    <h1 class="text-3xl lg:text-5xl font-bold text-white text-center pt-20 mb-12 relative w-fit mx-auto z-10">
      Privacy Policy
      <img
        :src="rectangle"
        alt="rectangular-background"
        class="w-16 top-[5rem] left-9 absolute -z-10"
      >
    </h1>
    <div class="max-w-4xl mx-auto mt-8 p-10 border border-darkGold rounded-lg">
      <h2 class="lg:text-xl font-bold mb-5 text-white">
        Valmon Privacy Policy
        </h2>
                <h2 class="lg:text-xl font-bold mb-5 text-white">
          Effective Date: November 2024
        </h2>
      <section class="mb-6 text-white">
        <h2 class="lg:text-xl font-bold mb-5">
          Introduction
        </h2>
        <p class="text-gray-700">
          At Valmon, we are committed to protecting your privacy and ensuring that your personal information is handled responsibly.
          This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform, services, and website.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold text-white  mb-2">
          Information We Collect
        </h3>
        <h4 class="font-semibold text-white  mb-1 ">
          Personal Information
        </h4>
        <p class="text-gray-700">
          When you register or use our services, we may collect personal information that can identify you, including but not limited to:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Payment information</li>
          <li>Profile details (skills, experience, etc.)</li>
        </ul>
        <h4 class="font-semibold text-white  mt-4 mb-1">
          Non-Personal Information
        </h4>
        <p class="text-gray-700">
          We may also collect non-personal information about your interactions with our platform, such as:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>Device information (e.g., IP address, browser type)</li>
          <li>Usage data (e.g., pages visited, time spent on the site)</li>
          <li>Cookies and tracking technologies</li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold text-white  mb-2">
          How We Use Your Information
        </h3>
        <p class="text-gray-700">
          We use the information we collect for various purposes, including:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>To provide, maintain, and improve our services</li>
          <li>To facilitate job connections between workers and clients</li>
          <li>To process transactions and manage your account</li>
          <li>To communicate with you about your account or services</li>
          <li>To send you marketing communications (you can opt-out at any time)</li>
          <li>To analyze usage patterns and improve user experience</li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold text-white  mb-2">
          Sharing Your Information
        </h3>
        <p class="text-gray-700">
          We do not sell or rent your personal information to third parties. However, we may share your information in the following circumstances:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>
            <strong>With Service Providers:</strong> We may employ third-party companies and individuals to facilitate our services, process payments, or provide customer support.
            These third parties will have access to your personal information only to perform tasks on our behalf.
          </li>
          <li>
            <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
          </li>
          <li>
            <strong>Business Transfers:</strong> If Valmon is involved in a merger, acquisition, or asset sale, your personal information may be transferred as part of that transaction.
          </li>
        </ul>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold text-white  mb-2">
          Data Security
        </h3>
        <p class="text-gray-700">
          We take the security of your personal information seriously and implement appropriate technical and organizational measures
          to protect it from unauthorized access, loss, or destruction. However, no method of transmission over the Internet or method
          of electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect your
          information, we cannot guarantee its absolute security.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold text-white  mb-2">
          Your Rights
        </h3>
        <p class="text-gray-700">
          Depending on your jurisdiction, you may have the following rights regarding your personal information:
        </p>
        <ul class="list-disc list-inside text-gray-700">
          <li>The right to access, update, or delete the personal information we hold about you.</li>
          <li>The right to object to or restrict the processing of your data.</li>
          <li>The right to data portability.</li>
          <li>The right to withdraw consent at any time where we rely on your consent to process your personal information.</li>
        </ul>
        <p class="text-gray-700">
          To exercise these rights, please contact us using the information provided below.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold text-white  mb-2">
          Changes to This Privacy Policy
        </h3>
        <p class="text-gray-700">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on
          this page and updating the effective date. We encourage you to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section class="mb-6">
        <h3 class="lg:text-xl font-semibold text-white  mb-2">
          Contact Us
        </h3>
        <p class="text-gray-700">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p class="text-gray-700">
          Email: <a
            href="mailto:support@valmonvalues.com"
            class="text-brightGold underline"
          >support@valmonvalues.com</a>
        </p>
        <p class="text-gray-700 mt-6 valmon">
          Thank you for choosing Valmon! Your trust, is important to us, and we are committed to protecting your privacy.
        </p>
      </section>
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
