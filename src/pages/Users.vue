<template>
  <div>
    <div class="px-3">
      <div class="mb-18 flex justify-between items-center bg-white rounded-8">
        <div class="table-header-left">
          <span class="text-gray-600 font-semibold">Manage users</span>
          <h2 class="text-2xl font-bold mt-4 text-gray-800">Users</h2>
        </div>

        <div class="flex items-center mt-10">
          <div class="font-medium text-gray-600 mr-6">
            {{ listUsers?.length }} users
          </div>
          <div class="mr-6">
            <div class="relative">
              <input
                type="text"
                class="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:bg-white"
                placeholder="Search by name, email..."
                v-model="query"
              />
              <div class="absolute top-1 left-0 ml-3 mt-2">
                <svg
                  class="w-4 h-4 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.5 17l4.5 4.5"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="tool-filter">
            <select
              v-model="selectedStatus"
              @change="FilterChange"
              class="min-w-[120px] px-4 py-2 rounded-lg"
            >
              <option value="All">All</option>
              <option value="true">Activated</option>
              <option value="false">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex flex-col pt-10">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100 border border-gray-300">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative"
                    >
                      Name
                      <button
                        class="border-none bg-transparent h-4 ml-1 absolute"
                      >
                        <svg
                          v-if="sortUser === 'DES'"
                          class="w-4 h-4 text-gray-600 transform"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          @click="handleSortUser('DES')"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                        <svg
                          v-if="sortUser === 'ASC'"
                          class="w-4 h-4 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          @click="handleSortUser('ASC')"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          />
                        </svg>
                      </button>
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Level
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="user in listUsers" :key="user.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ user.firstName }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        {{ user.email }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">1</td>
                    <td class="px-6 py-4 whitespace-nowrap w-32 text-center">
                      <div class="text-sm text-gray-900">
                        <p
                          v-if="user.activated"
                          class="flex justify-center items-center text-center text-sm tracking-wide px-4 py-2 rounded-md text-white bg-[#2ec4b6]"
                        >
                          activated
                        </p>
                        <p
                          v-else
                          class="flex justify-center items-center text-center text-sm tracking-wide px-4 py-2 rounded-md text-white bg-[#4a4e69]"
                        >
                          disabled
                        </p>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900 text-center">
                        <button class="w-5 h-5">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.6517 14.591C16.3588 14.2981 15.8839 14.2981 15.591 14.591C15.2981 14.8839 15.2981 15.3588 15.591 15.6517L16.6517 14.591ZM19.8337 19.8943C20.1266 20.1872 20.6014 20.1872 20.8943 19.8943C21.1872 19.6014 21.1872 19.1265 20.8943 18.8336L19.8337 19.8943ZM15.591 18.8336C15.2981 19.1265 15.2981 19.6014 15.591 19.8943C15.8839 20.1872 16.3588 20.1872 16.6517 19.8943L15.591 18.8336ZM20.8943 15.6516C21.1872 15.3588 21.1872 14.8839 20.8943 14.591C20.6014 14.2981 20.1266 14.2981 19.8337 14.591L20.8943 15.6516ZM14 13.75C14.4142 13.75 14.75 13.4142 14.75 13C14.75 12.5858 14.4142 12.25 14 12.25V13.75ZM14 21.75C14.4142 21.75 14.75 21.4142 14.75 21C14.75 20.5858 14.4142 20.25 14 20.25V21.75ZM14.25 6C14.25 7.79493 12.7949 9.25 11 9.25V10.75C13.6234 10.75 15.75 8.62335 15.75 6H14.25ZM11 9.25C9.20507 9.25 7.75 7.79493 7.75 6H6.25C6.25 8.62335 8.37665 10.75 11 10.75V9.25ZM7.75 6C7.75 4.20507 9.20507 2.75 11 2.75V1.25C8.37665 1.25 6.25 3.37665 6.25 6H7.75ZM11 2.75C12.7949 2.75 14.25 4.20507 14.25 6H15.75C15.75 3.37665 13.6234 1.25 11 1.25V2.75ZM15.591 15.6517L19.8337 19.8943L20.8943 18.8336L16.6517 14.591L15.591 15.6517ZM16.6517 19.8943L20.8943 15.6516L19.8337 14.591L15.591 18.8336L16.6517 19.8943ZM8 13.75H14V12.25H8V13.75ZM14 20.25H8V21.75H14V20.25ZM8 20.25C6.20507 20.25 4.75 18.7949 4.75 17H3.25C3.25 19.6234 5.37665 21.75 8 21.75V20.25ZM8 12.25C5.37665 12.25 3.25 14.3766 3.25 17H4.75C4.75 15.2051 6.20507 13.75 8 13.75V12.25Z"
                              fill="#9b2226"
                            />
                          </svg>
                        </button>
                        <button
                          class="w-5 h-5 ml-4"
                          @click="RedirectDetailUser(user)"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.02486 7.10448L3.69218 7.44681L3.02486 7.10448ZM3.2728 6.67504L3.90293 7.08179L3.2728 6.67504ZM7.23677 20.2499L6.86177 20.8995L7.23677 20.2499ZM3.2728 17.3248L3.90293 16.9181L3.2728 17.3248ZM3.02486 16.8954L3.69218 16.5531L3.02486 16.8954ZM16.7631 20.2499L17.1381 20.8995L16.7631 20.2499ZM12.2478 22.2203L12.285 22.9694L12.2478 22.2203ZM11.752 22.2203L11.7148 22.9694L11.752 22.2203ZM20.975 16.8954L20.3076 16.5531L20.975 16.8954ZM20.727 17.3248L20.0969 16.9181L20.727 17.3248ZM20.727 6.67504L20.0969 7.08179L20.727 6.67504ZM20.975 7.10448L20.3076 7.44681L20.975 7.10448ZM12.2478 1.77959L12.285 1.03051L12.2478 1.77959ZM11.752 1.77959L11.7148 1.03051L11.752 1.77959ZM18.8359 18.8627L18.1168 19.0756L18.1226 19.0951L18.1294 19.1144L18.8359 18.8627ZM5.15685 18.8868L4.43636 18.6784L4.42666 18.712L4.42012 18.7463L5.15685 18.8868ZM5.13528 18.9999L4.7297 19.6308L5.13528 18.9999ZM15.2499 8.99993C15.2499 10.7949 13.7948 12.2499 11.9999 12.2499V13.7499C14.6233 13.7499 16.7499 11.6233 16.7499 8.99993H15.2499ZM11.9999 12.2499C10.205 12.2499 8.74991 10.7949 8.74991 8.99993H7.24991C7.24991 11.6233 9.37656 13.7499 11.9999 13.7499V12.2499ZM8.74991 8.99993C8.74991 7.20501 10.205 5.74993 11.9999 5.74993V4.24993C9.37656 4.24993 7.24991 6.37658 7.24991 8.99993H8.74991ZM11.9999 5.74993C13.7948 5.74993 15.2499 7.20501 15.2499 8.99993H16.7499C16.7499 6.37658 14.6233 4.24993 11.9999 4.24993V5.74993ZM3.22363 11.9999C3.22363 10.7131 3.22432 9.7968 3.28956 9.06668C3.35352 8.35086 3.4761 7.86803 3.69218 7.44681L2.35755 6.76215C2.0224 7.41546 1.86936 8.10672 1.79551 8.93318C1.72294 9.74533 1.72363 10.7394 1.72363 11.9999H3.22363ZM6.86177 3.10042C5.77015 3.73066 4.90888 4.22712 4.24182 4.69604C3.56301 5.17323 3.04089 5.65139 2.64268 6.26829L3.90293 7.08179C4.15967 6.68405 4.51653 6.33648 5.10446 5.92318C5.70414 5.50162 6.49738 5.04285 7.61177 4.39945L6.86177 3.10042ZM3.69218 7.44681C3.75635 7.32173 3.82668 7.1999 3.90293 7.08179L2.64268 6.26829C2.53952 6.4281 2.44436 6.59292 2.35755 6.76215L3.69218 7.44681ZM1.72363 11.9999C1.72363 13.2604 1.72294 14.2545 1.79551 15.0667C1.86936 15.8931 2.0224 16.5844 2.35755 17.2377L3.69218 16.5531C3.4761 16.1318 3.35352 15.649 3.28956 14.9332C3.22432 14.2031 3.22363 13.2867 3.22363 11.9999H1.72363ZM3.90293 16.9181C3.82668 16.8 3.75635 16.6781 3.69218 16.5531L2.35755 17.2377C2.44436 17.407 2.53952 17.5718 2.64268 17.7316L3.90293 16.9181ZM16.3881 19.6004C15.2737 20.2438 14.4797 20.7014 13.8148 21.01C13.1629 21.3125 12.6835 21.4477 12.2107 21.4712L12.285 
22.9694C13.0184 22.9329 13.6936 22.7199 14.4462 22.3706C15.1859 22.0274 16.0464 21.5297 17.1381 20.8995L16.3881 19.6004ZM6.86177 20.8995C7.95339 21.5297 8.81397 22.0274 9.5536 22.3706C10.3063 22.7199 10.9814 22.9329 11.7148 22.9694L11.7892 21.4712C11.3163 21.4477 10.8369 21.3125 10.185 21.01C9.52009 20.7014 8.72616 20.2438 7.61177 19.6004L6.86177 20.8995ZM12.2107 21.4712C12.0702 21.4782 11.9296 21.4782 11.7892 21.4712L11.7148 22.9694C11.9048 22.9788 12.0951 22.9788 12.285 22.9694L12.2107 21.4712ZM20.7762 11.9999C20.7762 13.2867 20.7755 14.2031 20.7103 14.9332C20.6463 15.649 20.5237 16.1318 20.3076 16.5531L21.6423 17.2377C21.9774 16.5844 22.1305 15.8931 22.2043 15.0667C22.2769 14.2545 22.2762 13.2604 22.2762 11.9999H20.7762ZM20.3076 16.5531C20.2435 16.6781 20.1731 16.8 20.0969 16.9181L21.3571 17.7316C21.4603 17.5718 21.5555 17.407 21.6423 17.2377L20.3076 16.5531ZM16.3881 4.39945C17.5024 5.04285 18.2957 5.50162 18.8954 5.92318C19.4833 6.33648 19.8402 6.68405 20.0969 7.08179L21.3571 6.26829C20.9589 5.65139 20.4368 5.17323 19.758 4.69604C19.0909 4.22712 18.2297 3.73066 17.1381 3.10042L16.3881 4.39945ZM22.2762 11.9999C22.2762 10.7394 22.2769 9.74533 22.2043 8.93318C22.1305 8.10672 21.9774 7.41546 21.6423 6.76215L20.3076 7.44681C20.5237 7.86803 20.6463 8.35086 20.7103 9.06668C20.7755 9.7968 20.7762 10.7131 20.7762 11.9999H22.2762ZM20.0969 7.08179C20.1731 7.1999 20.2435 7.32173 20.3076 7.44681L21.6423 6.76215C21.5555 6.59292 21.4603 6.42809 21.3571 6.26829L20.0969 7.08179ZM17.1381 3.10042C16.0464 2.47017 15.1859 1.97252 14.4462 1.62929C13.6936 1.28001 13.0184 1.06692 12.285 1.03051L12.2107 2.52867C12.6835 2.55214 13.1629 2.6874 13.8148 2.98992C14.4797 3.29848 15.2737 3.75606 16.3881 4.39945L17.1381 3.10042ZM7.61177 4.39945C8.72616 3.75606 9.52009 3.29848 10.185 2.98992C10.8369 2.6874 11.3163 2.55214 11.7892 2.52867L11.7148 1.03051C10.9814 1.06692 10.3063 1.28001 9.5536 1.62929C8.81397 1.97252 7.95339 2.47017 6.86177 3.10042L7.61177 4.39945ZM12.285 1.03051C12.0951 1.02108 11.9048 1.02108 11.7148 1.03051L11.7892 2.52867C11.9296 2.52169 12.0702 2.52169 12.2107 2.52867L12.285 1.03051ZM8.99991 16.7499H14.9999V15.2499H8.99991V16.7499ZM14.9999 16.7499C16.4727 16.7499 17.7186 17.7302 18.1168 19.0756L19.5551 18.6498C18.9735 16.6848 17.1552 15.2499 14.9999 15.2499V16.7499ZM17.1381 20.8995C17.9935 20.4055 18.7046 19.9952 19.2873 19.6197L18.4747 18.3589C17.9296 18.7102 17.2547 19.1001 16.3881 19.6004L17.1381 20.8995ZM19.2873 19.6197C20.2005 19.0312 20.8719 18.4834 21.3571 17.7316L20.0969 16.9181C19.7836 17.4035 19.3232 17.8121 18.4747 18.3589L19.2873 19.6197ZM18.1294 19.1144L18.1745 19.2409L19.5875 18.7376L19.5425 18.6111L18.1294 19.1144ZM8.99991 15.2499C6.83419 15.2499 5.00879 16.6987 4.43636 18.6784L5.87733 19.0951C6.26922 17.7398 7.51994 16.7499 8.99991 16.7499V15.2499ZM7.61177 19.6004C6.75368 19.105 6.08339 18.7178 5.54085 18.369L4.7297 19.6308C5.30901 20.0032 6.0145 20.4103 6.86177 20.8995L7.61177 19.6004ZM5.54085 18.369C4.68236 17.8171 4.21826 17.4066 3.90293 
16.9181L2.64268 17.7316C3.13094 18.488 3.80768 19.038 4.7297 19.6308L5.54085 18.369ZM4.42012 18.7463L4.39855 18.8594L5.872 19.1404L5.89357 19.0273L4.42012 18.7463Z"
                              fill="#001d3d"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import router from "../router";
import store from "../store";

const sortUser = ref("ASC");

const selectedStatus = ref("All");

const initListUser = computed(() => store.state.listUsers.dataFilter);

const listUsers = computed(() => store.state.listUsers.data);

const query = ref("");

watch(query, (newQuery, oldQuery) => {
  SearchUsers(newQuery);
});

function SearchUsers(query) {
  const filteredUsers = initListUser.value.filter((user) =>
    user.email.includes(query)
  );
  store.dispatch("SearchUser", filteredUsers);
}

function FilterChange() {
  if (selectedStatus.value !== "All") {
    const filteredUsers = initListUser.value.filter(
      (user) => user.activated.toString() === selectedStatus.value
    );
    store.dispatch("SearchUser", filteredUsers);
  } else {
    store.dispatch("SearchUser", initListUser.value);
  }
}

function RedirectDetailUser(user) {
  router.push(`/users/${user.id}`);
}

function handleSortUser(sortBy) {
  if (sortBy === "ASC") {
    // a -> z
    const sortedArray = [...listUsers.value].sort((a, b) => {
      return a.firstName.localeCompare(b.firstName);
    });
    sortUser.value = "DES";
    store.dispatch("SearchUser", sortedArray);
  } else {
    // z -> a
    const sortedArray = [...listUsers.value]
      .sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
      })
      .reverse();
    sortUser.value = "ASC";
    store.dispatch("SearchUser", sortedArray);
  }
}

onMounted(async () => {
  await store.dispatch("getListUsers");
});
</script>
