<template>
  <div class="cover-image" >
    <div @click='openLaye(index)' v-for="(item,index) in image" :key="index" class="image-item" >
      <img :src="item? item : defaultImg" alt />
    </div>
    <!-- 弹层组件 -->
    <el-dialog @close="dialogvisible=false" :visible="dialogvisible">
        <select-image @selectOneImg='receiveImg'></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['image'],
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png'),
      dialogvisible: false,
      selectIndex: -1
    }
  },
  methods: {
    openLaye (index) {
      this.dialogvisible = true
      this.selectIndex = index
    },
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogvisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
    margin:15px 0;
    margin-left: 100px;
    .image-item{
        border:1px solid #ccc;
        padding:5px;
        width: 220px;
        height: 220px;
         img{
             width: 100%;
             height: 100%;
         }
    }
}

</style>
