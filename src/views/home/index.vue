<template>
  <div class="home">
    <div class="search-box">
      <div class="inp-box">
        <div class="icon-search"></div>
        <el-input v-model="keyword" class="input-search" placeholder="Height/Transaction/Account Address"></el-input>
      </div>
      <div class="btn-search">Search</div>

    </div>

    <div class="big-card">
      <div class="title">Overview</div>
      <div class="content">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Epoch</span></div>
              <div class="value-box">
                <div class="value">7</div>
                <div class="icon-1"></div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Block Height</span></div>
              <div class="value-box">
                <div class="value">7</div>
                <div class="icon-2"></div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Validators</span></div>
              <div class="value-box">
                <div class="value">7</div>
                <div class="icon-3"></div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Governance Proposals</span></div>
              <div class="value-box">
                <div class="value">7</div>
                <div class="icon-4"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Total Stake</span></div>
              <div class="value-box">
                <div class="value">7</div>
                <div class="icon-5"></div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <div class="card ">
              <div class="sub-title"><span class="bg-yellow"> Chain ID</span></div>
              <div class="value-box">
                <div class="value">7</div>
                <div class="icon-6"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="big-card">
      <div class="title">Top Validators <span class="more">View More >></span></div>
      <div class="content">
        <div class="table"></div>
        <div class="header">
          <div class="td"><span class="bg-yellow">Rank</span></div>
          <div class="td"><span class="bg-yellow">Validator</span></div>
          <div class="td"><span class="bg-yellow">Voting Power</span></div>
          <div class="td"><span class="bg-yellow">Uptime</span></div>
          <div class="td"><span class="bg-yellow">Signed Blocks</span></div>
          <div class="td"><span class="bg-yellow">Last Seen at</span></div>
          <div class="td"><span class="bg-yellow">State</span></div>
        </div>
        <div class="tbody">
          <div class="tr">
            <div class="td">01</div>
            <div class="td">
              <p>Home Decor Range</p>
              <p class="address">tnam1q......pw9rcu</p>
            </div>
            <div class="td">
              <p>111,992,640,198</p>
              <p class="address">0.93%</p>
            </div>
            <div class="td">100 %</div>
            <div class="td">111,130,123</div>
            <div class="td">333,330,123</div>
            <div class="td">Consensus</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ''
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
