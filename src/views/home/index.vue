<template>
  <el-container>
    <el-aside style="width:200px;overflow:hidden;background-color:#323745">
        <layout-left></layout-left>
    </el-aside>
      <el-container>
        <el-header>
          <layout-header></layout-header>

        </el-header>
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
