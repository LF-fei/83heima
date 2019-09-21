<template>
<el-card>
  <!-- 面包屑 -->
  <bread-crumb slot="header">
    <template slot="title">评论列表</template>
  </bread-crumb>
  <!-- 表格 -->
  <el-table :data='list'>
      <el-table-column label="标题" width="600px" prop="title"></el-table-column>
      <el-table-column :formatter="stateFormatter" label="评论状态" prop="comment_status" align="center"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count" align="center"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
          <el-button size="small" type="text">修改</el-button>
          <el-button size="small" type="text">关闭评论</el-button>
      </el-table-column>

  </el-table>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    // 获取评论列表
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        console.log(result.data)

        this.list = result.data.results // 把返回的数据赋值给list
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment() // 获取第一个页 每页十条数据
  }
}
</script>

<style lang="less" scoped>

</style>
