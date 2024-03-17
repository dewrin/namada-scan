<template>
  <div class="home">
    <div class="search-box">
      <div class="inp-box">
        <div class="icon-search"></div>
        <el-input v-model="keyword" class="input-search" placeholder="Height/Transaction"></el-input>
      </div>
      <div class="btn-search" @click="search">Search</div>

    </div>
    <div class="page-box">
      <div class="total">Showing {{ (currentPage-1)*pageSize+1 }} - {{ showCount }} out of {{ total }}</div>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>

    <div class="big-card">
      <div class="title">Validators </div>
      <div class="content">
        <div class="table-box">

          <table class="table">
            <tr class="th">
              <th class="td"><span class="bg-yellow">Rank</span></th>
              <th class="td"><span class="bg-yellow">Validator</span></th>
              <th class="td"><span class="bg-yellow">Voting Power</span></th>
              <!-- <th class="td"><span class="bg-yellow">Uptime</span></th>
              <th class="td"><span class="bg-yellow">Signed Blocks</span></th>
              <th class="td"><span class="bg-yellow">Last Seen at</span></th>
              <th class="td"><span class="bg-yellow">State</span></th> -->
            </tr>
            <tbody class="tbody">
              <tr v-for="item,i in validatorsList" :key="i" class="tr">
                <td class="td">{{ (currentPage-1)*pageSize +i+1 }}</td>
                <td class="td">
                  <!-- <p>Home Decor Range</p> -->
                  <p class="">{{ shortStr(item.address) }}</p>
                </td>
                <td class="td">
                  <p>{{ formatPrice(item.voting_power) }}</p>
                  <p>{{ ((item.voting_power/voting_power)*100).toFixed(2) }}%</p>
                </td>
                <!-- <td class="td">100 %</td>
                <td class="td">111,130,123</td>
                <td class="td">333,330,123</td>
                <td class="td">Consensus</td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BigNumber from 'bignumber.js';
import { last, validators } from '@/api/namada'
export default {
  data() {
    return {
      keyword: '',
      lastInfo: {},
      validatorsList: [],
      voting_power: 0,
      currentPage: 1,
      pageSize: 10,
      total: 0

    }
  },
  computed: {
    showCount() {
      return (this.currentPage) * this.pageSize <= this.total ? (this.currentPage) * this.pageSize : this.total
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.validators()
    },
    search() {
      if (!this.keyword) {
        return
      }
      if (isNaN(this.keyword)) { // tx
        this.$router.push('/tx/' + this.keyword)
      } else { // height
        this.$router.push('/block/' + this.keyword)
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.validators()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.validators()
    },
    shortStr(text) {
      return text.slice(0, 8) + '...' + text.slice(-7);
    },
    last() {
      last().then(res => {
        this.$set(this, 'lastInfo', res)
      })
    },
    gotoVlist() {
      this.$route.push('/validators')
    },
    formatPrice(price) {
      return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    validators() {
      validators({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(res => {
        this.validatorsList = res.result.validators
        this.total = Number(res.result.total)
        this.voting_power = BigNumber(0)
        res.result.validators.map(item => item.voting_power).forEach((item) => (this.voting_power = this.voting_power.plus(BigNumber(item))))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  .total{
    color: #C4C4C4;
    font-size: 16px;
  }
}
.big-card {
  background: #fff;
  margin: 20px 0;
  padding: 20px 20px 0;
  border-radius: 4px;

  .title {
    font-size: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .more {
      color: #979797;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .card {
    border: 1px solid #000;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .sub-title {
      font-size: 16px;
      margin-bottom: 20px;

      .bg-yellow {
        background: #ffff00;
      }
    }

    .value-box {
      display: flex;
      justify-content: space-between;

      .value {}

      .icon-1 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-1.png);
        background-size: 100% 100%;
      }

      .icon-2 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-2.png);
        background-size: 100% 100%;
      }

      .icon-3 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-3.png);
        background-size: 100% 100%;
      }

      .icon-4 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-4.png);
        background-size: 100% 100%;
      }

      .icon-5 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-5.png);
        background-size: 100% 100%;
      }

      .icon-6 {
        width: 45px;
        height: 45px;
        background: url(~@/assets/icon-6.png);
        background-size: 100% 100%;
      }
    }
  }
}

.table-box {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 20px;

  .table {
    display: table;
    width: 100%;
    min-width: 800px;
    .th {
      height: 40px;
      text-align: left;
    }

    .bg-yellow {
      background: #ffff00;
    }

    .header {
      height: 40px;
    }

    .tr {
      border-bottom: 1px solid #000;
      padding-bottom: 10px;
      height: 80px;
      .td {
        display: table-cell;
        text-align: left;
        line-height: 30px;
        .address{
          color: #00FFFF;
          // cursor: pointer;
        }
        p {
          line-height: 1.5;
        }
      }
    }
  }
}

.search-box {
  border: 1px solid #000;
  border-radius: 4px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0 20px;
  background: #fff;

  .inp-box {
    display: flex;
    align-items: center;
    flex: 1;

    .icon-search {
      width: 19px;
      height: 19px;
      background: url(~@/assets/icon-search.png);
      margin-right: 10px;
    }

    .input-search {
      width: 80%;

      &::v-deep {
        .el-input__inner {
          border: 0;
        }
      }
    }
  }

  .btn-search {
    background: #000;
    border-radius: 4px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 32px;
    color: #ffff00;
    cursor: pointer;
  }
}
</style>
