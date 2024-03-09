<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="index==levelList.length-1" class="no-redirect leaf">
          {{ generateTitle(item.meta.title) }}
        </span>
        <span v-else-if="item.redirect==='noredirect'||index==0" class="no-redirect">
          {{ generateTitle(item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '../../../../utils/i18n'
import { compile } from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      const matched = this.$route.matched
      console.log(matched, 'matched')
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      const toPath = compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      console.log(redirect, 'item')
      if (redirect) {
        if (redirect.startsWith('/')) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(path + '/' + redirect)
        return
      }
      console.log(this.pathCompile(path), 'item')
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .leaf {
    color: #2d3b56;
    cursor: text;
  }
}
</style>
