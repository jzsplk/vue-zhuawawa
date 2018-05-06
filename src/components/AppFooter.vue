<template>
  <div class="footer">
    <div class="bottom-nav">
      <button><img src="/static/pic/home_select.png" alt=""><p>首页</p></button>
      <button><img src="/static/pic/prize_normal.png" alt=""><p>我的娃娃</p></button>
      <button><img src="/static/pic/mine_normal.png" alt=""><p>我的</p></button>
    </div>
    <div>一起抓 <span>&copy;</span>2018 ALL Rights Reserved.</div>
  </div>
</template>
<style scoped lang="scss" type="text/css">
  .bottom-nav {
    position: fixed;
    bottom: -10px;
    width: 100%;
    background-color: #FFF;
    display: flex;
    justify-content: space-around;
    margin-top: 1.0rem;

    button {
      background-color: #FFF;
      border-style:none;
    }
  }
</style>
