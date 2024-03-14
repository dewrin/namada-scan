<template>
  <div class="home">
    <div class="search-box">
      <div class="inp-box">
        <div class="icon-search"></div>
        <el-input v-model="keyword" class="input-search" placeholder="Height/Transaction"></el-input>
      </div>
      <div class="btn-search" @click="search">Search</div>

    </div>

    <div class="big-card">
      <div class="title">Blocks </div>
      <div class="content">
        <div class="table-box">

          <table class="table">
            <tr class="th">
              <th class="td"><span class="bg-yellow">HEIGHT</span></th>
              <th class="td"><span class="bg-yellow">TXS</span></th>
              <th class="td"><span class="bg-yellow">TIME</span></th>
              <!-- <th class="td"><span class="bg-yellow">Uptime</span></th>
              <th class="td"><span class="bg-yellow">Signed Blocks</span></th>
              <th class="td"><span class="bg-yellow">Last Seen at</span></th>
              <th class="td"><span class="bg-yellow">State</span></th> -->
            </tr>
            <tbody class="tbody">
              <tr v-for="item,i in validatorsList" :key="i" class="tr">
                <td class="td">{{ item.height }}</td>
                <td class="td">
                  <!-- <p>Home Decor Range</p> -->
                  {{ item.txs }}
                </td>
                <td class="td">
                  {{ item.time }}

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
import { last, block } from '@/api/namada'
export default {
  data() {
    return {
      keyword: '',
      lastInfo: {},
      validatorsList: [],
      voting_power: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.last()
    },
    shortStr(text) {
      return text.slice(0, 8) + '...' + text.slice(-7);
    },
    last() {
      last().then(async res => {
        const height = res.header?.height || 0
        for (let index = height; index > height - 20; index--) {
          await this.getBlock(index)
        }
      })
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
    formatPrice(price) {
      return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    async  getBlock(height) {
      await block(height).then(res => {
        this.validatorsList.push({
          height: res.header?.height,
          txs: res.tx_hashes?.length,
          time: res.header?.time
        })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
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
          cursor: pointer;
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
    border-radius: 10px;
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
