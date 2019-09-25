<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form ref="accountForm" :model="formData" :rules="rules">
      <el-form-item prop="name" label="用户名称" label-width="100px">
        <el-input v-model="formData.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="简介" label-width="100px">
        <el-input v-model="formData.intro" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item prop='email' label="邮箱" label-width="100px">
        <el-input v-model="formData.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="手机号" label-width="100px">
        <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveUser" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
    <el-upload action='' :show-file-list='false' :http-request="uploadImg ">
            <img class="head-img" :src="formData.photo ? formData.photo :defaultImg" alt />
    </el-upload>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      defaultImg: require('../../assets/avatar.jpg'),
      formData: {},
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名控制在1-7个字符' }
        ],
        email: [{ required: true, message: '邮箱不能为空' }, { paeetrn: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        this.formData.photo = result.data.photo
      })
    },
    // 保存个人信息
    saveUser () {
      this.$refs.accountForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    //   获取个人账户信息
    getUser () {
      this.loading = true
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
        this.loading = false
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
  top: 120px;
  right: 400px;
}
</style>
