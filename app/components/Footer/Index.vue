<script setup>
import youtube from '@/assets/icons/YouTube.svg'
import IG from '@/assets/icons/Instagram.svg'
import brandLogo from '@/assets/images/Logo/valmon.svg'
</script>

<template>
  <footer class="bg-[#151212] text-base-content p-10 px-20 ">
    <nav class="flex justify-between">
      <a class=""><img
        :src="brandLogo"
        alt="brand logo"
      ></a>
      <div class="text-white gap-4 flex items-center w-1/3 justify-between text-base">
        <a class="link link-hover">About Us</a>
        <a class="link link-hover">Our Team</a>
        <a class="link link-hover">Support</a>
        <a class="link link-hover">FAQ</a>
      </div>
      <div class="center gap-3">
        <a class="link link-hover"><svg
          width="30"
          height="31"
          viewBox="0 0 30 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7534 23C18.3572 23 21.9692 17.2286 21.9692 12.2236C21.9692 12.0597 21.9692 11.8965 21.9587 11.734C22.6614 11.1979 23.268 10.534 23.75 9.77352C23.0948 10.08 22.3996 10.2808 21.6878 10.3694C22.4374 9.89614 22.9983 9.15164 23.2663 8.27454C22.5615 8.71575 21.7905 9.02667 20.9864 9.19387C20.4451 8.58666 19.7291 8.18458 18.9493 8.04985C18.1695 7.91513 17.3694 8.05526 16.6727 8.44857C15.976 8.84188 15.4216 9.46645 15.0953 10.2256C14.769 10.9848 14.689 11.8362 14.8677 12.6482C13.4402 12.5726 12.0438 12.1813 10.769 11.4996C9.49417 10.8178 8.36952 9.86095 7.468 8.69101C7.00886 9.5248 6.86824 10.5118 7.07476 11.4512C7.28128 12.3905 7.81942 13.2115 8.5796 13.7469C8.00819 13.7293 7.44922 13.5667 6.95 13.2729V13.3209C6.95023 14.1953 7.23718 15.0428 7.7622 15.7195C8.28721 16.3962 9.01796 16.8605 9.8305 17.0336C9.30191 17.1857 8.7473 17.2079 8.2093 17.0986C8.43882 17.8511 8.88552 18.5091 9.48695 18.9807C10.0884 19.4523 10.8145 19.7139 11.5637 19.7288C10.8193 20.3461 9.96679 20.8024 9.05501 21.0718C8.14323 21.3412 7.19005 21.4183 6.25 21.2987C7.89196 22.4102 9.80244 22.9998 11.7534 22.997"
            fill="#868686"
          />
        </svg></a>
        <a class="link link-hover"><svg
          width="30"
          height="31"
          viewBox="0 0 30 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.3927 8H8.60729C8.31362 8 8.03198 8.11666 7.82432 8.32432C7.61666 8.53198 7.5 8.81362 7.5 9.10729V21.8927C7.5 22.1864 7.61666 22.468 7.82432 22.6757C8.03198 22.8833 8.31362 23 8.60729 23H21.3927C21.6864 23 21.968 22.8833 22.1757 22.6757C22.3833 22.468 22.5 22.1864 22.5 21.8927V9.10729C22.5 8.81362 22.3833 8.53198 22.1757 8.32432C21.968 8.11666 21.6864 8 21.3927 8ZM11.9708 20.7781H9.71563V13.6146H11.9708V20.7781ZM10.8417 12.6219C10.5859 12.6204 10.3362 12.5432 10.1242 12.4001C9.91222 12.2569 9.7474 12.0541 9.65055 11.8173C9.5537 11.5805 9.52915 11.3204 9.58002 11.0697C9.63088 10.8189 9.75488 10.5889 9.93635 10.4086C10.1178 10.2283 10.3486 10.1058 10.5997 10.0565C10.8507 10.0073 11.1107 10.0335 11.3468 10.1319C11.583 10.2302 11.7847 10.3964 11.9265 10.6093C12.0684 10.8222 12.144 11.0723 12.1438 11.3281C12.1462 11.4994 12.1141 11.6694 12.0494 11.828C11.9847 11.9866 11.8887 12.1306 11.7672 12.2513C11.6457 12.372 11.5012 12.4671 11.3421 12.5307C11.1831 12.5944 11.0129 12.6254 10.8417 12.6219ZM20.2833 20.7844H18.0292V16.8708C18.0292 15.7167 17.5385 15.3604 16.9052 15.3604C16.2365 15.3604 15.5802 15.8646 15.5802 16.9V20.7844H13.325V13.6198H15.4938V14.6125H15.5229C15.7406 14.1719 16.5031 13.4188 17.6667 13.4188C18.925 13.4188 20.2844 14.1656 20.2844 16.3531L20.2833 20.7844Z"
            fill="#868686"
          />
        </svg></a>
        <a class="link link-hover"><img
          :src="IG"
          alt="Youtube icon"
        ></a>
        <a class="link link-hover ms-2"><img
          :src="youtube"
          alt="Youtube icon"
        ></a>
      </div>
    </nav>
    <div class="border border-darkGold my-5" />
    <nav class="flex items-center justify-between">
      <p class="text-sm text-white">
        © 2024 Valmon. All rights reserved.
      </p>
      <div class="text-sm w-1/2 flex justify-between">
        <a
          href=""
          class="link link-hover text-gray-600"
        >Copyright Infringement</a>
        <a
          href=""
          class="link link-hover text-gray-600"
        >Code of Conduct</a>
        <a
          href=""
          class="link link-hover  text-gray-600"
        >Privacy Policy</a>
        <a
          href=""
          class="link link-hover  text-gray-600"
        >Terms of Service</a>
      </div>
    </nav>
    <div />
  </footer>
</template>
