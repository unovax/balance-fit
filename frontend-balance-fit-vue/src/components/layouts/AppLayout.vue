<template>
  <div class="app-layout">
    <Sidebar 
      :show="showSidebar"
      @click="toggleSidebar"  />
    <div class="main-container">
      <Topbar>
        <template v-if="!showSidebar" v-slot:title>
          <div class="flex space-x-2 items-center">
            <MenuIcon @click="toggleSidebar" />
            <span>BalanceFit</span>
          </div>
        </template>
      </Topbar>
      <div class="view-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../Sidebar.vue';
import MenuIcon from '../Icons/Menu.vue';
import Topbar from '../Topbar.vue';

export default {
  components: {
    Sidebar,
    MenuIcon,
    Topbar,
  },
  name: 'AppLayout',
  data() {
    return {
      showSidebar: localStorage.getItem('showSidebar') === 'true',
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
      localStorage.setItem('showSidebar', this.showSidebar);
    },
  },
};
</script>