<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="!isInIframe" class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div v-if="!isInIframe" :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from './components/right-panel'
import { Navbar, Sidebar, AppMain, TagsView, Settings } from './components'
import ResizeMixin from './mixin/resize-handler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    RightPanel,
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    Settings
  },
  mixins: [ResizeMixin],
  data() {
    return {
      isInIframe: window.self !== window.top
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  padding: 0px 0 0px 0px;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: calc(100% + 24px);
  left: -24px;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0px;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth} - 15px );
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 24px - 24px );
}

.mobile .fixed-header {
  width: calc(100% );
}
</style>
