<template>
  <div class="room">
    <div class="img-wraper">
      <div class="img-container">
        <img src="https://www.iqi1.com/uploads/2240dfc1c5dcd3959ff982d4c88385b4698a3685.jpg" alt="蒙奇奇公仔">
        <p class="status">空闲中</p>
      </div>
    </div>

    <div class="info">
      <p>蒙奇奇公仔</p>
      <span>3/次</span>
      <button>去捕获</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room'
}
</script>

<style scoped lang="scss" type="text/css">
.room {
  margin: 0;
  padding: 0;
  width: 500px;
  background-color: #E5E67E;
  display: flex;
  border-radius: 20px;
  border-style:solid;
  border-width:5px;
  .img-container {
    position: relative;
    img {
      display: block;
      width: 220px;
      border-radius: 15px 0 0 15px;
    }
    .status {
      position: absolute;
      background-color: black;
      color: white;
      right: 20px;
      top: 20px;
    }
  }
  .info {
    display: inline-block;
    width: 50%;
    p {
      margin-top: 80px;
    }
    button {
      background-color: red;
      color: white;
      border-radius: 10px;
      font-size: 20px;
    }
  }

}
</style>
