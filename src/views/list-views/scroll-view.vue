<template>
  <div class="list-container">
    <listLayout :has-search-header="false" :has-tree="false" @setTableHeight="setTableHeight"
                @setDevice="setDevice">

      <template slot="create-btn-content">
        <el-button type="primary">新建</el-button>
      </template>

      <template slot="search-btn">
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" plain @click="onSubmit">查询</el-button>
      </template>
      <template slot="table-content">
        <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 50, 100]"
                       :page-size="pageSize" small :pager-count="5" class="lit-pagination"
                       :layout="pageLayout" :total="total" @size-change="handleSizeChange"
                       @current-change="handleCurrentChange">
        </el-pagination>
        <el-table ref="table" :class="cellHeightClass" :data="tableData"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column fixed prop="date" label="日期" min-width="150">
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="120">
          </el-table-column>
          <el-table-column prop="province" label="省份" min-width="120">
          </el-table-column>
          <el-table-column prop="city" label="市区" min-width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="zip" label="邮编" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="操作" width="150">
            <template slot-scope="scope">
              <ListBtnGroup :btns="getBtns(scope.row)" @handleClick="handleOperateClick">
              </ListBtnGroup>
            </template>
          </el-table-column>
        </el-table>

      </template>

    </listLayout>

  </div>
</template>

<script>
// import { MDWIDTH, SMWIDTH } from '@/config'
import ListBtnGroup from '@libs/components/list-btn-group'
import listLayout from '@/components/list-layout'
export default {
  components: {
    listLayout,
    ListBtnGroup
  },
  data() {
    return {
      currentPage: 1,
      total: 400,
      pageSize: 10,
      pageLayout: 'total, sizes, prev, pager, next, jumper',
      isCollapse: false,
      keyword: '',
      cellHeightClass: '',
      searchForm: {},
      drawer: false,
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.checkWidth)
  },
  methods: {
    handleOperateClick({ key, row }) {
      console.log(key, row)
      this.drawer = true
    },
    getBtns(row) {
      return [{
        label: '查看',
        key: 'detail',
        row: row
      }, {
        label: '编辑',
        key: 'edit',
        row: row,
        disabled: row.status === 5 || row.status === 3 || row.status === 4
      },
      {
        label: '设计',
        key: 'design',
        row: row,
        disabled: row.status === 5 || row.status === 3 || row.status === 4
      },
      {
        label: '发布',
        key: 'publish',
        row: row,
        disabled: row.status === 5 || row.status === 3 || row.status === 4
      },
      {
        label: '删除',
        key: 'delete',
        row: row,
        disabled: row.isConnect === 1
      }]
    },
    setDevice(device) {
      switch (device) {
        case 'desktop':
          this.pageLayout = 'total, sizes, prev, pager, next, jumper'
          this.isCollapse = false
          break;
        case 'pad':
          this.pageLayout = 'prev, pager, next, jumper'
          this.isCollapse = false
          break;
        case 'mobile':
          this.pageLayout = 'prev, pager, next'
          this.isCollapse = true
          break;

        default:
          break;
      }
    },
    setTableHeight() {
      this.getCellHeight()
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    search() {
      console.log('search')
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onReset() {

    },
    onSubmit() {

    },
    getCellHeight() {
      /**
       * 计算table每行高度
       */
      let cellHeight = 60
      cellHeight = cellHeight > 60 ? cellHeight = 60 : 40
      console.log(cellHeight, 'cellHeight')
      this.cellHeightClass = 'table-cell-' + cellHeight
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getCellHeight()
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }

}
</script>

<style lang="scss" scoped>
.list-container {
  height: 100%;
}
.search-row {
  .el-col {
    margin-bottom: 22px;
  }
}
.tree-search-input {
  padding: 0 10px;
}
</style>
