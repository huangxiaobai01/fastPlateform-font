<template>
  <div class="content">
    <div v-for="item in files" :key="item.id" class="item">
      <i class="el-icon-document"></i>
      <span @click="downloadFile(item)">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Specification',
  components: {
  },
  data() {
    return {
      files: [
        {
          id: 'css',
          name: 'css和less规范',
          url: 'css和less规范.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        // {
        //   id: 'eslint',
        //   name: 'eslint规范',
        //   url: '.eslintrc.js',
        //   type: 'application/javascript'
        // },
        {
          id: 'git',
          name: 'git代码提交规范',
          url: 'git代码提交规范.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        {
          id: 'javascript',
          name: 'javaScript规范',
          url: 'javaScript规范.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        {
          id: 'vue',
          name: 'vue项目规范',
          url: 'vue项目规范.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        },
        {
          id: 'test',
          name: '单元测试/组件测试规范',
          url: '单元测试、组件测试规范.docx',
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
      ]
    }
  },
  methods: {
    downloadFile(file) {
      let options = {
        fileName: file.url
      }
      this.api.common.downloadSpecification(options).then(res => {
        if (res.code === 200) {
          let blob = new Blob([res.data], {type: file.type});
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
            // downloadElement.download = fileName; //下载后文件名
          downloadElement.download = file.url; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  margin-top: 10rem;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 4rem;
    font-size: 1.6rem;
    span {
      color: #1989fa;
      cursor: pointer;
    }
    i {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #ddd
    }
  }
}
</style>