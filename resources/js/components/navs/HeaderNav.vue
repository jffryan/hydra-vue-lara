<template>
  <div
    class="sticky top-0 z-40 w-full bg-hydra-cinder-800 flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10"
  >
    <div class="max-w-8xl mx-auto">
      <div class="py-4 border-b border-slate-900/10 lg:border-0 mx-4 lg:mx-0">
        <div class="relative flex items-center justify-between">
          <router-link to="/" class="font-bold">Hydra</router-link>

          <!-- Grouped Menu Items Container -->
          <div class="flex items-center space-x-4">
            <!-- Dropdown Menu Section -->
            <div
              class="relative group"
              @mouseenter="clearHideTimeout"
              @mouseleave="setHideTimeout"
            >
              <!-- Dropdown Trigger -->
              <button class="inline-flex items-center">
                Apps
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <!-- Dropdown Menu -->
              <div
                :class="{ hidden: !showDropdown }"
                class="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-hydra-cinder-600 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              >
                <div class="py-1" role="menu" aria-orientation="vertical">
                  <a
                    href="http://127.0.0.1:5000/"
                    target="_blank"
                    class="block px-4 py-2 text-sm hover:text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Pergamum</a
                  >
                  <a
                    href="http://127.0.0.1:8080/"
                    target="_blank"
                    class="block px-4 py-2 text-sm hover:text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Iago</a
                  >
                  <a
                    href="http://127.0.0.1:8000/"
                    target="_blank"
                    class="block px-4 py-2 text-sm hover:text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Hydra</a
                  >
                </div>
              </div>
            </div>

            <router-link :to="{ name: 'about' }">About</router-link>
            <button class="btn btn-primary">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderNav",
  data() {
    return {
      showDropdown: false,
      hideTimeout: null,
    };
  },
  methods: {
    clearHideTimeout() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      this.showDropdown = true;
    },
    setHideTimeout() {
      this.hideTimeout = setTimeout(() => {
        this.showDropdown = false;
      }, 300); // 300ms delay before hiding
    },
  },
};
</script>
