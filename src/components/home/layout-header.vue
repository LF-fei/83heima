<template>
  <el-row type="flex" justify="space-between" class="layout-header">
    <el-col :span="6" style="margin-top:10px">
        <i class="el-icon-s-unfold"></i>
        <span class="title">江苏传智播客教育科股份有限公司</span></el-col>
    <el-col :span="4">
        <img :src="user.photo ? user.photo  : userImg "  class="layout-img" alt="">
         <el-dropdown trigger="click" @command="CommandClick">
       <span class="el-dropdown-link">
        {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item icon="el-icon-s-check" command="account">个人信息</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-promotion" command="git">git地址</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button" command="dropout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>

  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: {},
      userImg: require('../../assets/avatar.jpg')
    }
  },
  methods: {
    getUser () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        this.user = result.data.data
      })
    },
    CommandClick (key) {
      if (key === 'account') {
        console.log(1)
      } else if (key === 'git') {
        window.location.href = 'http://www.baidu.com'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUser()
  }

}
</script>

<style lang="less" scoped>
.layout-header{
    height: 50px;
    .el-icon-s-unfold{
         font-size: 22px;
    }
    .title{
        vertical-align: top;
        margin-left:5px;
    }
    .layout-img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 7px;
    vertical-align: middle;
}
}
</style>
