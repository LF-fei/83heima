<template>
  <div class="layout-left">
       <div class="nav">
           <img src="../../assets/logo_admin.png" alt="">
       </div>
        <el-menu
        router
      style="width:201px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b">
       <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">文章列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/gradata">图文管理</el-menu-item>
          <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
          <el-menu-item index="/home/fanpic">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/home/account">
        <i class="el-icon-setting"></i>
        <span slot="title" >账户信息</span>
      </el-menu-item>
    </el-menu>
 </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-left{
  background-color: #323745;
  height: 100vh;
  width: 200px;
  .nav{
      text-align: center;
      padding: 15px 0;
      background-color:#2e2f32;
      img{
          height: 30px;
      }
  }
}
</style>
