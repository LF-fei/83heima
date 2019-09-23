<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">列表</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form>
      <!-- 文章状态 -->
      <el-form-item label="文章状态">
        <el-radio-group @change='changeCondition' v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表">
        <el-radio-group>
          <el-select @change="changeCondition" v-model='formData.channel_id'>
            <el-option v-for='item in channels' :key='item.id' :label='item.name' :value='item.id'></el-option>
          </el-select>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="时间列表">
        <el-radio-group>
          <el-date-picker
           v-model="formData.date"
            type="daterange"
            range-separator="-"
            value-format='yyyy-MM-dd'
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- 文章列表 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <div v-for='(item,index) in list' :key='index' class="header">
      <!-- 左侧 -->
      <div class="left">
        <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt />
        <div class="info">
          <span class="title">{{item.title}}</span>
          <el-tag :type='item.status |statusType' class="status">{{item.status | statusText}}</el-tag>
          <span class="date">{{item.pubdate}}</span>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <span>
          <i class="el-icon-edit"></i>修改
       </span>
        <span>
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <el-row type="flex" justify='center' style="margin-top:20px">
      <el-pagination
  background
  layout="prev, pager, next"
  @current-change="changePage"
  :page-size="page.pageSize"
  :current-page="page.currentPage"
  :total="page.total">
</el-pagination>
    </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        date: []
      },
      list: [],
      defaultImg: require('../../assets/01.jpeg'),
      channels: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 状态变化时件
    changeCondition () {
      this.page.currentPage = 1
      this.quwryArticles()
    },
    // 切换页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.quwryArticles()
    },
    //  获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.page.total = result.data.total_count
        this.list = result.data.results
      })
    },
    quwryArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.date.length ? this.formData.date.length[0] : null,
        end_pubdate: this.formData.date.length > 1 ? this.formData.date.length[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    // 获取频道列表的内容
    getchannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },

  created () {
    this.getArticles()
    this.getchannels()
  },
  // 过滤器
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scope>
 .total{
  line-height: 50px;
   height: 50px;
   border-bottom: 1px dashed #ccc;
 }
.header {
  display: flex;
  justify-content: space-between;
  padding:20px 10px;
   border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;

    img {
      width: 150px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      height: 100px;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      justify-content: space-around;
      .title {
        font-size: 14px;
      }
      .status {
        text-align: center;
        width: 80px;
      }
      .date {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .right{
    span{
      font-size: 14px;
      margin-right: 8px;
    }
  }
}
</style>
