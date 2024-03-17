<template>
  <div>
    <div class="big-card">
      <div class="title">Transaction</div>
      <div class="content">
        <div class="value-box"> <div class="label">Block Id</div><div class="value">{{ txInfo.block_id }}</div> </div>
        <div class="value-box"> <div class="label">Code</div><div class="value">{{ txInfo.code }}</div> </div>
        <div class="value-box"> <div class="label">Fee amount per gas unit</div><div class="value">{{ txInfo.fee_amount_per_gas_unit }}</div> </div>
        <div class="value-box"> <div class="label">Fee token</div><div class="value">{{ txInfo.fee_token }}</div> </div>
        <div class="value-box"> <div class="label">Gas limit multiplier</div><div class="value">{{ txInfo.gas_limit_multiplier }}</div> </div>
        <div class="value-box"> <div class="label">Hash</div><div class="value">{{ txInfo.hash }}</div> </div>
        <div class="value-box"> <div class="label">Tx type</div><div class="value">{{ txInfo.tx_type }}</div> </div>
        <div class="value-box"> <div class="label">Wrapper Id</div><div class="value">{{ txInfo.wrapper_id }}</div> </div>
        <div class="value-box"> <div class="label">Data</div><div class="value">{{ txInfo.data }}</div> </div>
      </div>
    </div>

  </div>
</template>

<script>
import { tx } from '@/api/namada'

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
      tx(this.height).then(res => {
        this.$set(this, 'txInfo', res)
      }).catch(err => {
        console.log(err)
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
    word-break: break-all;
    width: 400px;
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
