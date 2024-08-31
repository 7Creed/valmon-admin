<template>
  <div class="forms">
    <label class="form-control w-full mb-4">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Title</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full  bg-[#EFEFEF]"
      >
    </label>
    <label class="form-control w-full mb-4 ">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Colour</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <select class="select select-bordered bg-[#EFEFEF]">
        <option
          disabled
          selected
        >Pick one</option>
        <option>Star Wars</option>
      </select>
    </label>
    <label class="form-control w-full mb-4">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Price</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <input
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full  bg-[#EFEFEF]"
      >
    </label>
    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-4">
        <input
          type="checkbox"
          checked="checked"
          class="checkbox"
        >
        <span class="label-text">This Price Can Be Negotiated</span>
      </label>
    </div>
    <label class="form-control w-full mb-4 ">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Condition</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <select class="select select-bordered bg-[#EFEFEF]">
        <option
          disabled
          selected
        >Pick one</option>
        <option>Star Wars</option>
      </select>
    </label>
    <label class="form-control ">
      <div class="label">
        <span class="label-text">Description</span>
      </div>
      <textarea
        class="textarea textarea-bordered h-28  bg-[#EFEFEF]"
        placeholder="Type here"
      />
    </label>
  </div>
</template>
