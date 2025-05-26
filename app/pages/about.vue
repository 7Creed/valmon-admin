<script setup>
import rectangle from '@/assets/images/UIElements/Rectangle.png'
</script>

<template>
  <div class="  bg-stone-950 min-h-screen pb-28 relative">
    <div
      class="hero about"
    >
      <div class="hero-overlay bg-opacity-1" />
      <div class="hero-content text-neutral-content text-center">
        <div class="">
          <p class="mb-5 heroTitle text-2xl lg:text-4xl font-bold satoshiM">
            Valmon: Empowering Employment and Connecting Communities
          </p>
        </div>
      </div>
    </div>
    <div class="max-w-4xl mx-auto mt-8 p-10 border border-darkGold rounded-lg">
      <section class="mb-6 text-white">
        <div class="bg-black text-white py-8 px-4 sm:px-6 lg:px-8">
          <div class="max-w-7xl mx-auto">
            <p class="lg:text-lg mb-8">
              Valmon is a forward-thinking company dedicated to addressing the challenges of unemployment and underemployment in today's dynamic job market. With a mission to create meaningful job opportunities for the unemployed and those seeking side gigs, Valmon is reshaping the landscape of work by providing a platform that connects skilled workers with clients in need of their expertise.
            </p>

            <div class="space-y-8">
              <div class="mb-8">
                <h2 class="text-xl lg:text-2xl  font-bold mb-2">
                  Job Creation and Workforce Empowerment
                </h2>
                <p class="lg:text-lg">
                  At the heart of Valmon's mission is the commitment to uplift individuals by helping them find rewarding employment. The platform caters to a diverse audience, including recent graduates, skilled tradespeople, and individuals looking for flexible work arrangements. By facilitating connections between job seekers and employers, Valmon not only helps fill job vacancies but also empowers individuals to leverage their skills and talents in various industries.
                </p>
              </div>

              <div class="mb-8">
                <h2 class="text-xl lg:text-2xl  font-bold mb-2">
                  Connecting Skilled Workers with Clients
                </h2>
                <p class="lg:text-lg">
                  Valmon's innovative approach enables skilled workers to showcase their abilities and connect with potential clients seamlessly. Whether a user is a graphic designer, a handyman, or a digital marketer, Valmon provides a user-friendly interface where they can create profiles, list their skills, and highlight their previous work. Clients can easily search for and hire professionals who meet their specific needs, fostering a mutually beneficial relationship.
                </p>
              </div>

              <div class="mb-8">
                <h2 class="text-xl lg:text-2xl  font-bold mb-2">
                  A Marketplace for Buying and Selling
                </h2>
                <p class="lg:text-lg">
                  In addition to job creation, Valmon features a robust marketplace where users can buy and sell products. This platform allows individuals to list items they no longer need or create new products for sale. Users can browse through various categories, making it easy to find what they need or discover unique offerings from local sellers. This marketplace not only encourages entrepreneurship but also helps build a sense of community by supporting local businesses and artisans.
                </p>
                <p class="lg:text-lg satoshiM mt-6">
                  Valmon stands out as a multifaceted platform that not only addresses employment challenges but also fosters community engagement through its marketplace. By connecting skilled workers with clients and providing a space for buying and selling, Valmon is committed to creating a vibrant ecosystem where individuals can thrive, contribute, and find economic opportunities. As Valmon continues to grow, its impact on the job market and local economies will undoubtedly be profound, paving the way for a brighter future for those seeking work and community connection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="flex max-w-4xl mx-auto gap-4">
      <div class="flex-1 mx-auto mt-8 p-6 border border-darkGold rounded-lg">
        <div class=" text-white text-center">
          <h2 class="text-xl lg:text-2xl  font-bold mb-2">
            Motto
          </h2>
          <p class="md:text-2xl font-bold">
            Adding value to people's lives
          </p>
        </div>
      </div>
      <div class="flex-1 mx-auto mt-8 p-6 border border-darkGold rounded-lg">
        <div class=" text-white text-center">
          <h2 class="text-xl md:text-2xl  font-bold mb-2">
            Our Core Values
          </h2>
          <ul class="ml-[5%] text-sm md:text-2xl font-bold grid grid-cols-2 text-left flex-wrap gap-4 list-disc list-inside">
            <li>Empowerment</li>
            <li>Value</li>
            <li>Positivity</li>
            <li>Trust</li>
            <li>Integrity</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto mt-8 p-6 border border-darkGold rounded-lg">
      <div class="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-8">
        <div class="mr-8">
          <img
            src="../assets/images/UIElements/dusin.jpeg"
            alt="Oluwadunsin Ajibade"
            class="w-48"
          >
        </div>
        <div class="flex-1">
          <h1 class="text-2xl lg:text-3xl font-bold mb-2 text-white">
            Oluwadunsin Ajibade
          </h1>
          <p class="lg:text-lg font-medium mb-4">
            Founder and CEO
          </p>
          <p class="lg:text-lg">
            Oluwadunsin, affectionately known as "Dunsin," is the visionary founder and CEO of Valmon. His mission with the platform is to tackle unemployment and enhance the quality of life for individuals. With extensive experience using various freelancing platforms, Dunsin has personally benefited from their positive impacts. He envisions a thriving community where young individuals can become their own bosses and take charge of their financial futures.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p, h3, li{
  color: white !important;
}
p:not(.heroTitle), li {
  font-weight: 500;
  font-size: 22px;
}

h2 {
  font-weight: 700;
  font-size: 16px;
}

h3 {
  font-weight: 700;
  font-size: 20px;
}
/* img {
  z-index: -1;
} */
</style>
