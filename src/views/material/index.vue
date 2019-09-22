<template>
   <el-card>
       <bread-crumb slot="header">
          <template slot="title">
              素材管理
          </template>
       </bread-crumb>
        <el-tabs v-model="activeName" @tab-click="getImg">
    <el-tab-pane label="全部" name="all" >
      <div class="img-list">
            <el-card v-for="item in list" :key="item.id" class="img-item">
             <img :src="item.url" alt="">
                <div class="Icon">
                    <i class="el-icon-star-on" :style="{color:item. is_collected ? 'red' :'#000'}"></i>
                     <i class="el-icon-delete-solid"></i>
                </div>
        </el-card>
      </div>
    </el-tab-pane>
    <el-tab-pane label="收藏" name="collect">
        <div class="img-list">
            <el-card v-for="item in list" :key="item.id" class="img-item">
             <img :src="item.url" alt="">

        </el-card>
      </div>
    </el-tab-pane>

  </el-tabs>
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {

    //   获取素材全部图片
    getImg (collect) {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
 .img-list {
     display: flex;
     flex-wrap: wrap;
     justify-content: center;
      .img-item{

          width: 150px;
          height: 150px;
          border-radius: 6px;
          margin:30px;
          position: relative;

          img{
              width: 100%;
              height: 100%;
          }
          .Icon{
             position: absolute;
             left: 0;
             bottom: 0;
             width: 100%;
             height: 30px;
             background-color: #f4f5f6;
             display: flex;
             justify-content:space-around;
             align-items: center;
             i{
               font-size: 18px;
             }
          }
      }
 }
</style>
