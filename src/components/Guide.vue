<template>
<div class="guide">
<!--   <div class="nav">
      新手教学
  </div> -->
  <div class="head">
<!--     <el-steps :active="active" finish-status="finish" direction="vertical" :align-center="true" :space="90">
      <el-step title="步骤1" description="点击选择你心仪的娃娃"></el-step>
      <el-step title="步骤2" description="进入房间后，点击立即预约"></el-step>
      <el-step title="步骤3" description="预约成功后，控制方向键使得机械爪悬停合适位置（控制时间为30秒哦）"></el-step>
      <el-step title="步骤4" description="选择合适娃娃，立即点击抓取"></el-step>
      <el-step title="步骤5" description="抓到娃娃后，记得到我的娃娃里申请发货哦！"></el-step>
    </el-steps> -->
<!--     <timeline>
      <timeline-item>
        <h4 class="recent">【步骤1】</h4>
        <p class="recent">点击选择你心仪的娃娃</p>
      </timeline-item>
      <timeline-item>
        <h4> 【步骤2】</h4>
        <p>进入房间后，点击立即预约</p>
      </timeline-item>
      <timeline-item>
        <h4> 【步骤3】</h4>
        <p>预约成功后，控制方向键使得机械爪悬停合适位置（控制时间为30秒哦）</p>
      </timeline-item>
      <timeline-item>
        <h4> 【步骤4】</h4>
        <p>选择合适娃娃，立即点击抓取</p>
      </timeline-item>
      <timeline-item>
        <h4> 【步骤5】</h4>
        <p>抓到娃娃后，记得到我的娃娃里申请发货哦！</p>
      </timeline-item>
    </timeline> -->
    <div class="guide-img">
      <img src="../../static/pic/game-steps1.png" alt="" style="width: 100%;">
    </div>
  </div>
</div>
</template>
<script>
import { Timeline, TimelineItem, XButton } from 'vux'
export default {
  data () {
    return {
      active: 5
    }
  },
  components: {
    Timeline,
    TimelineItem,
    XButton
  },
  methods: {
    next () { // 下一步
      if (this.active++ > 4) {
        this.active = 0
      }
    },
    showGuide () { // 增加一个帮助界面
    }
  }
}
</script>
<style  scoped lang="scss" type="text/css">
.el-step {
  color: #FFFFFF;
}
.guide {
  display: block;
  height: 100%;
  width: 100%;
  background-color: #F7CB54;
  position: absolute;
  overflow-y: scroll;
  .nav {
    color: #000000;
    font-weight: bold;
    font-size: 1.3rem;
  }
  .head {
  }
}
</style>
