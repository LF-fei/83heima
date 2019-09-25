<template>
  <el-tabs>
    <el-tab-pane label="素材库">
      <div class="image-select">
        <el-card
          v-for="item in list"
          :key="item.id"
          :body-style="{ padding: '5px'}"
          class="image-card"
        >
          <img  @click='clickImg(item)' :src="item.url" alt />
        </el-card>
        <el-pagination
          style="margin-top:10px"
          background
          layout="prev, pager, next"
          :total="parge.total"
          :current-page="parge.currentParge"
          :page-size="parge.pargeSize"
          @current-change="changeParge"
        ></el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="上传图片"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      parge: {
        total: 0,
        currentPage: 1,
        pargeSize: 12
      }
    }
  },
  methods: {
    //   点击素材图片是触发
    clickImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    // 页码发生改变时
    changeParge (newPage) {
      this.parge.currentPage = newPage
      this.getAllImg()
    },
    //   获取全部图片
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: { collect: false, page: this.parge.currentPage, per_page: this.parge.pargeSize }
      }).then(result => {
        this.list = result.data.results
        this.parge.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.image-select {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .image-card {
    width: 120px;
    height: 100px;
    margin: 15px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
