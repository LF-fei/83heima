<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form ref='publishForm' :model="formData" :rules="rulesData" style="margin-left:100px" label-width="100px">
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formData.content" type="textarea" :rows="4" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item prop='cover' label="封面">
        <el-radio-group v-model='formData.cover.type'>
          <el-radio :label='1'>单图</el-radio>
          <el-radio :label='3'>三图</el-radio>
          <el-radio :label='0'>无图</el-radio>
          <el-radio :label='-1'>自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select  v-model='formData.channel_id'>
          <el-option
            :model="formData.channel_id"
            v-for=" item in channels"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="publish" type="primary">发布文章</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }
      },
      // 校验规则
      rulesData: {
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 30, message: '标题长度在5-30个字符' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    //   发布文章
    publish () {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/articles',
            method: 'post',
            data: this.formData,
            params: { draft: false }
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 获取有道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
