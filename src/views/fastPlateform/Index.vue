<template>
  <el-row class="fast-content" :gutter="40">
    <el-col :span="16">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="组件库" name="components">
          <div class="components-library-content">
            <div v-for="item in componentsLibrary" :key="item.id" class="item" @click="addComponents(item)">
              <img :src="item.img"/>
              <span>{{item.label}}</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图表库" name="charts">
          <div class="components-library-content">
            <div v-for="item in chartsLibrary" :key="item.id" class="item" @click="addComponents(item)">
              <img :src="item.img"/>
              <span>{{item.label}}</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="js工具库" name="jsLibrary">
          <div class="components-library-content">
            <div v-for="item in jsLibrary" :key="item.id" class="item" @click="addComponents(item)">
              <img :src="item.img"/>
              <span>{{item.label}}</span>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="样式美化库" name="styleibrary">
          <div class="components-library-content">
            <div v-for="item in styleibrary" :key="item.id" class="item" @click="addComponents(item)">
              <img :src="item.img"/>
              <span>{{item.label}}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-col>
    <el-col :span="8" class="right-contant">
      <div class="block">
        <span class="label">项目名：</span>
        <el-input v-model="projectName" placeholder="请输入" class="projectName"></el-input>
      </div>
      <div>
        <span class="label">已选配置：</span>
        <div class="selected-librarys-content">
          <div v-for="(item, index) in selectLibrarys" :key="item.id" class="item">
            <span class="name">{{item.label}}</span>
            <i class="el-icon-error delete-icon" @click="deleteLibary(item.id, index)"></i>
          </div>
        </div>
      </div>
      <div class="btn-content">
        <el-button type="primary" @click="sureDownload">确定</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'FastPlateform',
  components: {
  },
  data() {
    return {
      projectName: '',
      activeNames: ['components', 'charts', 'jsLibrary', 'styleibrary'],
      selectLibrarys: [],
      selectLibrarysObj: {},
      componentsLibrary: [
        {
          id: 'element',
          label: 'Element UI',
          img: require('@/static/images/fastPlateform/icon/element.png')
        }
      ],
      chartsLibrary: [
        {
          id: 'echarts',
          label: 'Echarts',
          img: require('@/static/images/fastPlateform/icon/echarts.png')
        },
        {
          id: 'html2canvas',
          label: 'Html2canvas',
          img: require('@/static/images/fastPlateform/icon/html2canvas.png')
        },
        {
          id: 'jsPDF',
          label: 'JsPDF',
          img: require('@/static/images/fastPlateform/icon/jspdf.png')
        }
      ],
      jsLibrary: [
        {
          id: 'lodash',
          label: 'lodash.js',
          img: require('@/static/images/fastPlateform/icon/lodash.png')
        }
      ],
      styleibrary: [
        {
          id: 'vuescroll',
          label: 'Vuescroll.js',
          img: require('@/static/images/fastPlateform/icon/vurscroll.png')
        }
      ]
    }
  },
  methods: {
    sureDownload() {
      let options = {
        list: this.selectLibrarys,
        fileName: this.projectName
      }
      this.api.common.downloadProject(options).then(res => {
        console.log(res)
        if (res.code === 200) {
          let blob = new Blob([res.data], {type: 'application/x-compressed-tar'});
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
            // downloadElement.download = fileName; //下载后文件名
          downloadElement.download = res.fileName + '.tgz'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }
      })
    },
    /**
     * 选择组件库
     */
    addComponents(library) {
      if (!this.selectLibrarysObj[library.id]) {
        this.selectLibrarys.push(library)
        this.selectLibrarysObj[library.id] = true
      }
    },
    /**
     * 删除组件库
     */
    deleteLibary(id, index) {
      this.selectLibrarysObj[id] = false
      this.selectLibrarys.splice(index)
    }
  }
}
</script>

<style scoped lang="scss">
.fast-content {
  height: 100%;
  padding-top: 2rem;
}
.label {
  font-size: 2rem;
}
.block {
  margin-bottom: 3rem
}
.tips {
  color:red;
  font-size: 1.4rem;
  margin-top: 1rem;
}
.right-contant {
  position: relative;
  height: 100%;
  padding: 2rem 0 0 0;
  // background-color: rgba(25, 137, 250, 0.1);
  border-radius: 1rem;;
  .btn-content {
    position:absolute;
    bottom: 2rem;
    left: 0;
    padding: 0 2rem
  }
}
.components-library-content {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 12rem;
    height: 12rem;
    cursor: pointer;
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
    color: #aaa;
    background-color: rgba(25, 137, 250, 0.1);
    border-radius: 50%;
    &:hover {
      background-color: rgba(25, 137, 250, 0.2);
      color: #000;
    }
    img {
      width: 5rem;
    }
  }
}
.selected-librarys-content {
  margin-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  .item {
    position: relative;
    margin: 0 3rem 3rem 0;
    font-size: 2rem;
    .delete-icon {
      position: absolute;
      top: -16px;
      right: -16px;
      color: #aaa;
      font-size: 16px;
      cursor: pointer;
    }
    .name {
      color: #1989fa
    }
  }
}
.projectName {
  margin-top: 1rem
}
</style>