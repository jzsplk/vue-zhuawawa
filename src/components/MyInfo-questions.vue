<template>
  <div class="UserQues_wrapper">
    <div class="imgheader">
      <img src="../../static/pic/helpLogo.png" alt="">
    </div>
    <div class="info-wrapper" style="    width: 90%;
    border-radius: 10px;
    background-color: #FEF0BC;">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item>
          <template slot="title" style="color: red;">
           1.发什么快递？
          </template>
          <div>
            <p style="margin-left: 10px;">您的娃娃默认发送中通快递哦</p>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            2.多久发货？
          </template>
          <div>
            <p style="margin-left: 10px;">申请发货后，3个工作日内审核并发出，可随时到娃娃详情里查看物流信息。</p>
          </div>
        </el-collapse-item>
        <el-collapse-item disable="true">
          <template slot="title">
            3.娃娃怎么申请发货，包邮吗？
          </template>
          <div>
            <p style="margin-left: 10px;">在我的娃娃列表里选择你需要的娃娃，点击申请发货即可，两个以上包邮哦，否则将收取110金币作为邮费。</p>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
           4.娃娃如果不及时申请发货，可以寄存多久？
          </template>
          <div>
            <p style="margin-left: 10px;">系统会寄存15日，此期间您可以随时将娃娃兑换相应的金币。如若超过15天，系统会自动帮你兑换相应的金币。在账单可查看兑换记录。</p>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            5.代抓是什么意思？
          </template>
          <div>
            <p style="margin-left: 10px;">
              代抓就是该房间内的物品不适合娃娃机爪子抓取，因此使用了一个容易抓的物品代替，您在抓中该物品后将发出相应的真实物品。
            </p>
          </div>
        </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
             6.一次抓中两只娃娃怎么办？
            </template>
            <div>
              <p style="margin-left: 10px;">如果有次状况，请及时联系客服。目前系统判定为成功抓取一只，因此发货也只发一只。另一个娃娃将在我们审核游戏记录后兑换等同的金币放入您的账户中。</p>
            </div>
          </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import AppFooter from './AppFooter'

export default {
  components: {
    'app-footer': AppFooter
  },
  data () {
    return {
      userInfo: {balance: ''},
      activeName: 1,
      input5: '',
      select: ''
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss" type="text/css">
.el-collapse {
  background-color: #FEF0BC;
  overflow: hidden;
  color: red;
}
.el-collapse-item {
  color: green;
}
.UserQues_wrapper {
  background-color: #FACE3F;
  height: 100%;
  .imgheader {
    width: 80%;
    margin: 0 auto;
  }
  .info-wrapper {
    width: 95%;
    margin: 0 auto;
    border-radius: 50%;
    background-color: #FEF0BC;
    padding: 3px;
  }
}
</style>
