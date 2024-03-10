<template>
  <el-dialog :visible.sync="createImageDialog" title="正在生成中..." :modal-append-to-body='false' :before-close="closeDialog">
    <div>
      <el-container>
        <el-main class="imgageShowDialogBox">
          <el-image  :src="generateImageSrc" :preview-src-list="generateImageSrcList" style="box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);border-radius: 2%;" >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-main>
        <el-progress :text-inside="true" :stroke-width="26" class="progresscss" :percentage="processCount" :format="processTabFormat" />
      </el-container>
    </div>
  </el-dialog>
</template>
<style scoped>

.progresscss {
  position: absolute;
  bottom: 0;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}

.imgageShowDialogBox {
  color: #854040;
  border-radius: 20px;
  border: 2px dashed #ccc;
  background-color: #f2f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

</style>
<script>


const processTabFormat = (percentage) => (percentage === 100 ? '完成' : `${percentage}%`)

//:before-close="handleCloseCreateImage"
const handleCloseCreateImage = (done) => {
  // ElMessageBox.confirm('Are1 you sure you want to close this?')
  //     .then(() => {
  //         done()
  //     })
  //     .catch(() => {
  //         // catch error
  //     })
}
export default {
  data() {
    return {
      createImageDialog: false,
      handleCloseCreateImage: handleCloseCreateImage,
      processTabFormat: processTabFormat,
      processCount: 100,
      createImageCloseBtn: false,
      createRunning: false,
      generateImageSrc: "",
      generateImageSrcList: [],
      processTimer: null,
    }
  },
  created() {
  },
  setup(props) {
  },
  mounted: function () {
    this.$bus1.$on('generateDialogShowHidden', (data) => {
      if (data.show) {
        this.createImageDialog = true
        this.processCount = 0
        this.processStart()
      } else {
        this.createImageDialog = false
        this.processDestroy()
      }
    });
    this.$bus1.$on('generateDialogPushSrcList', (data) => {
      this.generateImageSrcList.push(data.imageUrl)  //多图像列表
    });

    this.$bus1.$on('generateDialogDone', (data) => {
      this.processCount = data.processCount //进度
      this.generateImageSrc = data.imageUrl //最终生成图像
      // console.log(this.generateImageSrc)
    });
    this.$bus1.$on('generateDialogProcessDestroy', (data) => {
      this.processDestroy()
    });



  }, methods: {
    processGet() {
      let data = {
        "id_task": "task(9frna2krmb6q5l9)",
        "id_live_preview": -1
      }
      if (this.createRunning) {
        return
      }

      this.createRunning = true
      this.$myFetch("/api/process", 'POST', null)
          .then((rtndata) => {
            this.createRunning = false
            // 活动中，循环检查
            if (rtndata.eta_relative > 0) {
              console.log("activeactiveactive")
              this.processCount = parseInt(rtndata.progress * 100)
              this.generateImageSrc = "data:image/png;base64," + rtndata.current_image
            } else {
              //沒活動
              this.processDestroy()
            }
          })
          .catch(error => {
            console.log(error);
            this.processDestroy()
          });

    }, processStart() {
      this.generateImageSrcList = []
      this.generateImageSrc = ""
      this.processDestroy()
      this.processTimer = setInterval(() => {
        this.processGet();
      }, 1000);
    },
    processDestroy() {
      this.createRunning = false
      clearInterval(this.processTimer);
      this.processTimer = null
    },
    closeDialog() {
      this.createImageDialog = false
      this.processDestroy()
    }
  }
}
</script>