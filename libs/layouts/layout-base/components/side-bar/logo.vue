<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="~@/assets/logo.png" alt="" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="~@/assets/logo.png" alt="" class="sidebar-logo">
      </router-link>
    </transition>
  </div>
</template>

<script>
import { title } from '@/config';
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: title
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    margin-top: 60px;
    display: flex !important;
    padding: 24px 0 24px 0;
    align-items: center;
    justify-content: center;

    & .sidebar-logo {
      width: 60px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: rgba(95, 116, 236, 100);
      font-size: 24px;
      font-weight: 600;
      font-family: AlibabaPuHui-black;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
