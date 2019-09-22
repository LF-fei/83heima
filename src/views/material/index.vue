<template>
  <el-card v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"

    style="width: 100%">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传文件 -->
    <el-upload class="too-upload" action='' :http-request="uploadImg"  :show-file-list= 'false'>
        <el-button type="primary">点我上传</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeTeb">
      <el-tab-pane label="全部" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
            <div class="Icon">
              <i class="el-icon-star-on" :style="{color:item. is_collected ? 'red' :'#000'}"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
        <el-row  type="flex" justify='center'>
        <el-pagination background layout="prev, pager, next" :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
          </el-card>
        </div>
         <el-row  type="flex" justify='center'>
        <el-pagination background layout="prev, pager, next" :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        @current-change="changePage"
        ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {

      loading: false,
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    //   上传素材
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getImg()
      })
    },
    //   分页改变时
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getImg()
    },
    changeTeb () {
      this.page.currentPage = 1
      this.getImg()
    },
    //   获取素材全部图片
    getImg () {
      this.loading = true
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.too-upload{
 position: absolute;
 right: 20px;
 margin-top:-10px;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-item {
    width: 150px;
    height: 150px;
    border-radius: 6px;
    margin: 30px;
    position: relative;

    img {
      width: 100%;
      height: 100%;
    }
    .Icon {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      background-color: #f4f5f6;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
      }
    }
  }
}
</style>
