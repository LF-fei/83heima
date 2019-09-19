<template>
  <el-container>
    <el-aside>
        <layout-left></layout-left>
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
import layoutLeft from '../../components/home/layout-left'
export default {
  components: {
    'layout-left': layoutLeft
  }
}
</script>

<style>

</style>
