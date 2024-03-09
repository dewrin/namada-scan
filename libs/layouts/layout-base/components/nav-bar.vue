<template>
  <div class="navbar">
    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <hamburger :is-active="sidebar.opened" class="hamburger-container"
               @toggleClick="toggleSideBar" />
    <div class="right-menu">
      <a href="" target="_blank"><img src="~@/assets/tw.png" class="icon-tw" alt="user-avatar"></a>
      <a href="" target="_blank"><img src="~@/assets/dc.png" class="icon-dc" alt="user-avatar"></a>

      <!-- <template v-if="device!=='mobile'">
        <search class="right-menu-item" />
      </template> -->
      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" alt="user-avatar">
          <span class="user-name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from './hamburger'
// import LangSelect from './lang-select'
// import Search from './header-search'

export default {
  components: {
    Hamburger
    // LangSelect,
    // Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'device',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      location.reload() // 为了重新实例化vue-router对象 避免bug
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #FFFF00;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .icon-tw{
    width: 25px;
    height: 20px;
    margin-right: 10px;
  }
  .icon-dc{
    width: 25px;
    height: 20px;
    margin-right: 10px;
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    padding-right: 30px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .user-name {
          color: rgba(23, 43, 77, 100);
          font-size: 14px;
          font-family: PingFangSC-medium;
          margin-left: 10px;
          &:hover {
            color: #8392ab;
          }
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
