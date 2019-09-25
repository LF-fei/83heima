<template>
   <el-card>
       <bread-crumb slot="header">
         <template slot="title">账户信息</template>
       </bread-crumb>
       <el-form>
           <el-form-item  label="用户名称" label-width="100px">
               <el-input v-model="formData.name" style="width:300px"></el-input>
           </el-form-item>
            <el-form-item  label="简介" label-width="100px">
               <el-input v-model="formData.intro" style="width:300px"></el-input>
           </el-form-item>
            <el-form-item label="邮箱" label-width="100px">
               <el-input v-model="formData.email" style="width:300px"></el-input>
           </el-form-item>
            <el-form-item label="手机号" label-width="100px">
               <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
           </el-form-item>
           <el-form-item>
              <el-button type='primary'>保存信息</el-button>
          </el-form-item>
       </el-form>
        <img class="head-img" :src="formData.photo ? formData.photo :defaultImg" alt="">
   </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/avatar.jpg'),
      formData: {}
    }
  },
  methods: {
    getUser () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style scoped>
 .head-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      position: absolute;
      top:120px;
      right:400px;
  }
</style>
