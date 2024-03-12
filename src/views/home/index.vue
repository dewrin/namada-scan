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
      <div class="title"></div>
      <div class="content">

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
      &::v-deep{
        .el-input__inner{
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
  }
}
</style>
