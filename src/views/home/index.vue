<template>
  <el-container>
    <el-aside>
       左侧内容
    </el-aside>
      <el-container>
        <el-header>头部</el-header>
          <el-main>容器
            <!-- 二级容器 -->
          <router-view></router-view>
          </el-main>
      </el-container>

  </el-container>

</template>

<script>

export default {
  components: {

  }
}
</script>

<style>

</style>
