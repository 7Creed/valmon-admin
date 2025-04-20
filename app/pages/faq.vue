<script setup>
import { ref } from 'vue'
import rectangle from '@/assets/images/UIElements/Rectangle.png'

const accordion = ref(null)

const openAcc = (accIndex) => {
  accordion.value = accIndex === accordion.value ? null : accIndex
}

const faqSections = [
  {
    title: '🔧 Skill Marketplace (Services) FAQs',
    faqs: [
      {
        q: 'What is Valmon’s Skill Marketplace?',
        a: 'Valmon’s Skill Marketplace is a platform where freelancers and professionals can showcase their skills, create gigs, and connect with potential clients. Clients can browse profiles, communicate directly, and securely pay for services through our platform.',
      },
      {
        q: 'How do I post my services on valmon?',
        a: 'Start by creating an account, on the first screen, select “Earn by selling my skill”. Complete the simple setup process, Fill in your details, pricing, and upload relevant media to showcase your work. After the setup process, your account would appear on the platform after our admin has reviewed the information provided.',
      },
      {
        q: 'How does payment work?',
        a: 'Once a client agrees to hire you, they pay into Valmon’s escrow system. Funds are safely held until the work is completed and both parties mark it as "complete." Then, the funds are released to the freelancer.',
      },
      {
        q: 'Why should I use the Valmon chat?',
        a: 'Using the Valmon chat keeps your communication safe and secure. It also helps us track agreements in case of disputes and is required for escrow protection.',
      },
      {
        q: 'What if there\'s a dispute about the work?',
        a: 'In the event of a disagreement, Valmon offers a dispute resolution process. Click “Report” on the chat screen for that transaction, and provide all necessary information. Our support team will review the chat, job details, and submitted work to make a fair decision.',
      },
      {
        q: 'When do I get paid as a freelancer?',
        a: 'Once the client marks the job as completed, and you confirm delivery, the money held in escrow will be released to your Valmon wallet.',
      },
      {
        q: 'What are gigs?',
        a: 'Gigs are custom services you create on the platform with a fixed price, and clearly defined deliverables (e.g., a tailor might create a gig for sewing a single dress). Gigs make it easy for service providers to offer skills and simplify hiring.',
      },
      {
        q: 'Are there service fees?',
        a: 'Yes, Valmon charges a small fee on every successful transaction to cover operational and payment processing costs. Exact rates will be visible during payout.',
      },
    ],
  },
  {
    title: '🛒 Marketplace (Products) FAQs',
    faqs: [
      {
        q: 'What is the Valmon Marketplace?',
        a: 'It’s a digital marketplace where users can list and discover items for sale. Sellers post their products and buyers can contact them to negotiate and finalize a deal.',
      },
      {
        q: 'How do I sell an item?',
        a: 'Log in to your account, click on “Add Listing” to get started, add images, descriptions, pricing, and contact preferences. Once posted, interested buyers can reach you via Valmon chat.',
      },
      {
        q: 'Is there a secure way to buy and sell?',
        a: 'Yes. Valmon offers an escrow service for product sales. The buyer pays into escrow. Once the product is received and marked as delivered by both parties, the money is released to the seller.',
      },
      {
        q: 'Can I meet the seller in person?',
        a: 'Yes, but we recommend using Valmon chat to arrange any in-person meetings and finalize terms. Always meet in a public, safe location.',
      },
      {
        q: 'How do I confirm delivery or receipt of an item?',
        a: 'Once the product has been exchanged, both buyer and seller must go to the transaction page and mark the item as “delivered” or “received” to complete the transaction.',
      },
      {
        q: 'What if I don’t receive my item?',
        a: 'If a buyer does not receive an item or it\'s not as described, they can file a dispute by clicking on the “Report Seller”, and providing all necessary information. Valmon’s support team will step in to help resolve the issue.',
      },
      {
        q: 'Does Valmon take a commission on product sales?',
        a: 'No, the marketplace is completely free to use.',
      },
    ],
  },
  {
    title: '💡 General FAQs',
    faqs: [
      {
        q: 'Is Valmon free to use?',
        a: 'Creating an account and browsing the platform is free. Fees only apply to successful transactions.',
      },
      {
        q: 'How do I create an account?',
        a: 'Click on “Sign Up,” fill in your details, and verify your email to get started.',
      },
      {
        q: 'Is my money safe with Valmon?',
        a: 'Absolutely. We use an escrow system to hold funds securely until both parties agree the transaction is complete.',
      },
      {
        q: 'What types of services or products can I offer?',
        a: 'You can offer any legal service or product that aligns with our community guidelines. Examples include graphic design, writing, fashion items, electronics, and more.',
      },
      {
        q: 'How do I contact support?',
        a: 'You can reach our support team through the “Help” or “Contact Us” section on the platform.',
      },
    ],
  },
]
</script>

<template>
  <div class="bg-stone-950 min-h-[800px] relative mb-20 lg:mb-30">
    <div class="hero min-h-auto">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1
            class="text-3xl lg:text-5xl font-bold text-white text-center pt-20 mb-12 relative w-fit mx-auto z-10 satoshiM"
          >
            Valmon FAQs
            <img
              :src="rectangle"
              alt="rectangular-background"
              class="w-16 top-[5rem] right-[3rem] absolute -z-10"
            >
          </h1>
          <h6 class="py-6 text-2xl text-white">
            All concerns should be emailed to
            <span class="text-brightGold">support@valmonvalues.com</span> and we will get back to you
          </h6>
          <a
            href="mailto:support@valmonvalues.com"
            class="btn btn-outline border-white text-white"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-8 p-8 rounded-lg flex flex-wrap gap-4 container">
      <div class="accordion_wrapper w-full xl:w-4/5 mx-auto">
        <div
          v-for="(section, sIndex) in faqSections"
          :key="sIndex"
          class="mb-12"
        >
          <h2 class="text-white text-2xl font-semibold mb-6">
            {{ section.title }}
          </h2>

          <div
            v-for="(item, index) in section.faqs"
            :key="`${sIndex}-${index}`"
            class="border border-darkGold p-4 px-6 rounded-2xl mb-4 w-full"
            @click="openAcc(`${sIndex}-${index}`)"
          >
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-white text-lg font-bold">
                {{ item.q }}
              </h3>
              <span>
                <a
                  v-if="accordion !== `${sIndex}-${index}`"
                  href="javascript:void(0)"
                  @click.prevent="openAcc(`${sIndex}-${index}`)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#CFB159"
                    viewBox="0 0 24 24"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  v-if="accordion === `${sIndex}-${index}`"
                  href="javascript:void(0)"
                  @click.prevent="openAcc(`${sIndex}-${index}`)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#CFB159"
                    viewBox="0 0 24 24"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </span>
            </div>
            <p
              v-if="accordion === `${sIndex}-${index}`"
              class="text-white w-[95%]"
            >
              {{ item.a }}
            </p>
          </div>
        </div>
      </div>
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

.card-title {
  margin-bottom: 15px;
}
</style>
