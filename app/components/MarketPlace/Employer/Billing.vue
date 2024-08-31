<template>
  <div class="card card-compact bg-base-100 w-2/4 shadow-xl">
    <div class="card-body">
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text font-medium text-[#6E7191]">Full Name</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        >
      </label>
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text font-medium text-[#6E7191]">Country</span>
        </div>
        <select class="select select-bordered">
          <option>Nigeria</option>
        </select>
      </label>
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text font-medium text-[#6E7191]">State</span>
        </div>
        <select class="select select-bordered">
          <option>Rivers</option>
        </select>
      </label>
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text font-medium text-[#6E7191]">City</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        >
      </label>
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text font-medium text-[#6E7191]">Address</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        >
      </label>
      <label class="form-control w-full mb-3">
        <div class="label">
          <span class="label-text font-medium text-[#6E7191]">Post Code</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        >
      </label>

      <button class="btn btn-neutral bg-black text-white">
        Save
      </button>
    </div>
  </div>
</template>
