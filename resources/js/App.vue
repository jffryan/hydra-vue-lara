<template>
  <div class="relative max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
    <HeaderNav />
    <div>
      <SidebarNav
        class="fixed z-20 inset-0 top-[4.7rem] left-[max(0px,calc(50%-45rem))] right-auto w-[20rem] py-6 px-8 overflow-y-auto"
      />
      <RouterView class="py-6 pl-[20rem] w-full" />
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/navs/HeaderNav.vue";
import SidebarNav from "@/components/navs/SidebarNav.vue";

export default {
  name: "App",
  components: {
    HeaderNav,
    SidebarNav,
  },
};
</script>
