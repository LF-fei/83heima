<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>
    <!-- 表单 -->
    <el-form
      ref="publishForm"
      :model="formData"
      :rules="rulesData"
      style="margin-left:100px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor v-model="formData.content"  style="height:300px"></quill-editor>
      </el-form-item>
      <el-form-item prop="cover" label="封面" style="margin-top:120px">
        <el-radio-group v-model="formData.cover.type"  @change="changeType">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
        <cover-image @selectImg='changeImg' :image='formData.cover.images'></cover-image>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
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
        <el-button @click="publish(false)" type="primary">发布文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
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
        title: [
          { required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题长度在5-30个字符' }
        ],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 接受子组件传来的值
    changeImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
    },
    // 封面类型发生改变时
    changeType () {
      // 封面类型 -1:自动，0-无图，1-1张，3-3张
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    //   根据id获取文章信息
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    //   发布文章
    publish (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            data: this.formData,
            params: { draft }
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
    // console.log(3)
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }

}
</script>

<style>
</style>
