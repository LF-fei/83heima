<template>
  <div class="cover-image" >
    <div v-for="(item,index) in image" :key="index" style="border:1px solid #ccc;padding:10px;" >
      <img :src="item? item : defaultImg" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: ['image'],
  data () {
    return {
      defaultImg: require('../../assets/pic_bg.png')
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image{
    display: flex;
    margin:15px 0;
    margin-left: 100px;
}

</style>
