<template>
  <div class="mobile-navbar  bg-black">
    <div class="navbar bg-black">
      <div class="navbar-start">
        <div class="dropdown">
          <img
            src="../../assets//images/UIElements/menu.svg"
            alt=""
            class=" w-[30px]"
          >
          <ul
            tabIndex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <img
          src="../../assets/images/Logo/valmon.svg"
          alt=""
          class="w-[40px]"
        >
      </div>
      <div class="navbar-end">
        <NuxtLink
          to="/login"
          class-name="btn btn-ghost btn-circle"
        >
          <span class="text-white satoshiM">Sign In</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
