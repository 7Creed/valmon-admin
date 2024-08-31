<template>
  <div class="flex gap-10 items-center mb-10">
    <div

      class="card card-compact bg-base-100 w-64 shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Escrow Held
        </h2>
        <p class="text-3xl text-[#22292F] satoshiB">
          $3,945.55
        </p>
      </div>
    </div>

    <div
      class="card card-compact bg-base-100 w-64 shadow-xl"
    >
      <div class="card-body">
        <h2 class="card-title text-sm">
          Amount Spent
        </h2>
        <p class="text-3xl text-[#22292F] satoshiB">
          $9,945.55
        </p>
      </div>
    </div>
  </div>
  <!-- Table -->
  <div class="card card-compact bg-base-100  shadow-xl">
    <div class="card-body">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead class="bg-[#FFE3A8] text-sm font-medium satoshiM text-[#292929]">
            <tr>
              <th>S/N</th>
              <th class="">
                <span>Date</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th class="">
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th class="">
                <span>Type</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th class="">
                <span>Status</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#000"
                  class="size-4 inline-block ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr class="hover">
              <th>1</th>
              <td>23/ july/2024</td>
              <td>NGN 454, 322</td>
              <td>Payment</td>
              <td class="text-[#FA3535] font-bold satoshiB">
                Failed
              </td>
              <td>
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </td>
            </tr>
            <tr
              v-for="(row, index) in 12 "
              :key="index"
              class="hover"
            >
              <th>{{ index + 1 }}</th>
              <td>23/ july/2024</td>
              <td>NGN 454, 322</td>
              <td>Payment</td>
              <td class="text-[#0CA408] font-bold satoshiB">
                Success
              </td>
              <td>
                <a href="javascript:void(0)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- pagination -->
  <div class="card card-compact bg-base-100 shadow-xl mt-10">
    <div class="card-body">
      <div class="pagination flex items-center justify-between text-[#727376]">
        <div class="flex items-baseline w-[28rem] justify-between">
          <span class="text-sm">Number Of Items displayed per page</span>
          <select class="select select-bordered select-xs w-full max-w-14 bg-black text-white">
            <option>16</option>
          </select>
          <span class="text-sm">1-13 of 12,400 items</span>
        </div>
        <div class="join">
          <button class="join-item btn btn-sm">
            «
          </button>
          <button class="join-item btn bg-black text-white  btn-sm">
            1
          </button>
          <button class="join-item btn  btn-sm">
            2
          </button>
          <button class="join-item btn  btn-sm">
            3
          </button>
          <button class="join-item btn  btn-sm">
            4
          </button>
          <span
            class="join-item btn  btn-sm"
          >
            ...
          </span>
          <button class="join-item btn  btn-sm">
            25
          </button>
          <button class="join-item btn  btn-sm">
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
