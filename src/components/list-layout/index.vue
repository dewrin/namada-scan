<template>
  <div class="list-layout" :class=" [device,hasTree?'has-tree':'']">
    <div class="layout-tree">
      <slot name="tree"></slot>
    </div>
    <div class="list-base-container">
      <div v-if="hasSearchHeader" class="search-container">

        <div v-if="hasContent" class="search-items" :class="{'show-more':!!showMore}">
          <slot name="search-content"></slot>
        </div>
        <div class="btn-box">
          <div class="create-btn-container">
            <slot name="create-btn-content"></slot>
          </div>
          <div class="search-btn-box">
            <div v-if="hasMore" class="open-btn" @click="changeShowMore">
              {{ showMore?'收起更多':'展开更多' }}
            </div>
            <slot name="search-btn"></slot>
          </div>

        </div>
      </div>
      <div class="table-container">
        <slot name="table-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    hasSearchHeader: {
      type: Boolean,
      default: false
    },
    hasTree: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showMore: false,
      hasMore: false,
      hasContent: true
    }
  },
  computed: {
    ...mapGetters(['device'])
  },
  watch: {
    device(v, o) {
      this.$emit('setDevice', v)
    }
  },
  mounted() {
    window.addEventListener('resize', this.getTableHeight)
    this.$nextTick(() => {
      this.checkSearchContentHeight()
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.getTableHeight)
  },
  methods: {

    checkSearchContentHeight() {
      const searchContent = document.querySelector('.search-items') && document.querySelector('.search-items').children[0]
      if (!searchContent) {
        this.hasContent = false
      } else {
        const searchContentHeight = searchContent.offsetHeight
        if (searchContentHeight > 60) {
          this.hasMore = true
        }
      }
      this.$nextTick(() => {
        this.getTableHeight()
      })
    },
    changeShowMore() {
      this.showMore = !this.showMore
      this.$nextTick(() => {
        this.getTableHeight()
      })
    },
    getTableHeight() {
      this.tableHeight = document.querySelector('.table-container').offsetParent.offsetHeight - document.querySelector('.table-container').offsetTop - 48 - 16
      console.log(this.tableHeight, document.querySelector('.table-container').offsetParent.offsetHeight, document.querySelector('.table-container').offsetTop, ' this.tableHeight')
      this.$emit('setTableHeight', this.tableHeight)
    }
  }

}
</script>

<style lang="scss" scoped>
.list-layout {
  display: flex;
  height: 100%;

  &::v-deep {
    .el-menu {
      border-right: solid 0px;
      .el-menu-item.is-active {
        background: #f6f9fc;
        border-right: 1px solid;
      }
    }
  }
  .layout-tree {
    display: none;
  }
  .list-base-container {
    width: 100%;
  }
}

.has-tree {
  .layout-tree {
    display: block;
    background: #fff;
    padding: 20px 5px;
    width: 264px;
    margin-right: 24px;
    height: 100%;
  }
  .list-base-container {
    overflow-y: auto;
    width: calc(100% - 264px - 24px);
  }
}
.mobile {
  .has-tree {
    .layout-tree {
      display: block;
      background: #fff;
      padding: 20px 5px;
      width: 72px;
      margin-right: 24px;
    }
    .list-base-container {
      width: calc(100% - 72px - 24px);
    }
  }
}
.search-container {
  background: #fff;
  padding: 10px 24px 12px;
  margin-bottom: 14px;
  .btn-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-btn-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .open-btn {
      margin-right: 24px;
      color: rgba(95, 116, 236, 100);
      font-size: 14px;
      cursor: pointer;
    }
  }
  .search-row {
    .el-col {
      margin-bottom: 22px;
    }
  }
  .search-items {
    margin-top: 22px;
    height: 52px;
    overflow: hidden;
  }
  .show-more {
    height: auto;
    overflow: hidden;
  }
}
.table-container {
  background: #fff;
  padding: 12px 24px;
  .lit-pagination {
    text-align: right;
    margin-top: 12px;
  }
}
</style>
