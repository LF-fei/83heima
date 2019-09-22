<template>
<el-card  v-loading="loading"  element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
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
        <template slot-scope="obj">{{obj.comment_status}}
          <el-button size="small" type="text">修改</el-button>
          <el-button :style="{color:obj.row.comment_status?'#E6A23C' :'#409EFF'}" size="small" type="text" @click='closeOrOpen(obj.row)'>
            {{obj.row.comment_status? '关闭评论':"打开评论"}}
            </el-button>
        </template>
      </el-table-column>

  </el-table>
    <el-row type="flex" justify="center" style="margin-top:20px">
      <el-pagination
      @current-change='changeOpen'
  background
  layout="prev, pager, next"
  :page-size='page.pagesize'
  :current-page='page.currentPage'
  :total="page.total">
</el-pagination>
    </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pagesize: 10
      },
      // 加载
      loading: false
    }
  },
  methods: {
    // 页码发生改变时
    changeOpen (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    // 获取评论列表
    getComment () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pagesize }
      }).then(result => {
        console.log(result)

        this.list = result.data.results // 把返回的数据赋值给list
        this.page.total = result.data.total_count
        this.loading = false
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 修改评论状态
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论?`).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        })
      })
    }

  },
  created () {
    this.getComment()
  }
}
</script>

<style lang="less" scoped>

</style>
