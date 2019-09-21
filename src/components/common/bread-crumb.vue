<template>

 <el-breadcrumb separator=">">
  <el-breadcrumb-item :to="{ path: '/' }" style="font-size:14px">首页</el-breadcrumb-item>
  <el-breadcrumb-item style="font-size:14px">
    <slot name="title"></slot>
  </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
