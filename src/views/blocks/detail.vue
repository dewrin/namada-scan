<template>
  <div>
    <div class="big-card">
      <div class="title">Block header #{{ txInfo.header?.height }}</div>
      <div class="content">
        <div class="value-box"> <div class="label">Time</div><div class="value">{{ txInfo.header?.time }}</div> </div>
        <div class="value-box"> <div class="label">Height</div><div class="value">{{ txInfo.header?.height }}</div> </div>
        <div class="value-box"> <div class="label">Number of transactions</div><div class="value">{{ txInfo.tx_hashes?.length }}</div> </div>
        <div class="value-box"> <div class="label">Block hash</div><div class="value">{{ txInfo.header?.last_block_id?.hash }}</div> </div>
      </div>
    </div>
    <div class="big-card">
      <div class="title">Transactions </div>
      <div class="content">
        <div class="table-box">

          <table class="table">
            <tr class="th">
              <th class="td"><span class="bg-yellow">Tx Hash</span></th>
              <th class="td"><span class="bg-yellow">Tx Type</span></th>
              <!-- <th class="td"><span class="bg-yellow">Voting Power</span></th> -->
              <!-- <th class="td"><span class="bg-yellow">Uptime</span></th>
              <th class="td"><span class="bg-yellow">Signed Blocks</span></th>
              <th class="td"><span class="bg-yellow">Last Seen at</span></th>
              <th class="td"><span class="bg-yellow">State</span></th> -->
            </tr>
            <tbody class="tbody">
              <tr v-for="item,i in txInfo.tx_hashes" :key="i" class="tr">
                <td class="td">{{ shortStr(item.hash_id) }}</td>
                <td class="td">
                  <!-- <p>Home Decor Range</p> -->
                  <p class="">{{ (item.tx_type) }}</p>
                </td>
                <!-- <td class="td">
                  <p>{{ formatPrice(item.voting_power) }}</p>
                  <p>{{ ((item.voting_power/voting_power)*100).toFixed(2) }}%</p>
                </td> -->
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
import { block } from '@/api/namada'

export default {
  data() {
    return {
      height: this.$route.params.id,
      txInfo: {}
    }
  },
  mounted() {
    this.getBlock()
  },
  methods: {
    shortStr(text) {
      return text.slice(0, 8) + '...' + text.slice(-7);
    },
    getBlock() {
      block(this.height).then(res => {
        this.$set(this, 'txInfo', res)
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
.value-box{
  padding-bottom: 20px;
  display: flex;
  margin: 10px 0;
  align-items: center;
  .label{
    font-size: 18px;
    font-weight: 500;
    width: 220px;
    margin-right: 10px;
  }
  .value{
    font-size: 16px;

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
