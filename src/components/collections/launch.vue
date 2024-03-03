<template>
  <div id="launch" v-loading="loading">
      <jy-tab-bar :path-title="pathTitle"></jy-tab-bar>
      <div class="topLine"></div>
      <div class="collections" v-if="status === 0">
        <div class="myCollection">
          <div>
            <img :src="collectionInfo.imgUrl" alt="'collection'+index" class="displayImg">
          </div>
          <div class="collectionContent">
            <p class="collentionText">作品名称：&nbsp;{{collectionInfo.workName}}</p>
            <p class="collentionText" style="margin-top: 10px;">作品名称：&nbsp;{{collectionInfo.workType}}</p>
            <p class="collentionText" style="margin-top: 10px;">作品作品平台编号：&nbsp;{{collectionInfo.workId}}</p>
            <p class="collentionText" style="margin-top: 10px;">创作时间：&nbsp;{{collectionInfo.workCreateTime}}</p>
          </div>
        </div>
        <div class="myCollectionTable" id="launchLabel">
          <form>
            <div style="display: flex;margin-top: 10px;align-items: center;">
              <p class="labelClass">非遗项目</p>
              <el-select v-model="form.showorkId" placeholder="请选择非遗项目" style="width: 400px;" :popper-append-to-body="false" filterable>
                <el-option v-for="(item, index) in projectClass" :label="item.name" :value="item.id" :key="'project' + index"></el-option>
              </el-select>
            </div>
            <div style="display: flex;margin-top: 10px;align-items: center;" v-for="(item, index) in form.collectionTextList" :key="'text' + index">
              <p class="labelClass">{{index===0?"作者介绍":(index===1?"作品介绍":"创作过程")}}</p>
              <el-input v-model="form.collectionTextList[index]" style="width: 410px;" :popper-append-to-body="false" type="textarea" placeholder="请输入文字段落"></el-input>
            </div>
            <div v-for="(item, index) in form.collectionPicList" :key="'img' + index" class="imgsClass">
              <p class="labelClass">图片&nbsp;{{index + 1}}</p>
              <div :id="'launchImg'+index" class="image" @click="uploadImg(index)" v-loading="loadingList[index]">
                <img src="https://fxr-1312386734.cos.ap-beijing.myqcloud.com/icon_%E6%B7%BB%E5%8A%A0.png" alt="add" class="addBtn" v-if="item === ''">
                <img :src="form.collectionPicList[index]" :alt="'imgs'+index" v-if="item !== ''" class="image"></img>
              </div>
              <input type="file"  accept="image/*" :id="'imgFile'+index" @change="($event)=>{getPicture($event, index)}" style="display: none;"></input>
            </div>
          </form>
          <div class="launchBtn" @click="launchMyColl">发布作品</div>
        </div>
      </div>
      <div class="collections" v-if="status === 1">
        <finish-work content="版权交易" marginTop="30px" manageUrl="/userProfile/userInfo/userCollection">发布作品成功</finish-work>
      </div>
  </div>
</template>

<script>
import jyTabBar from '../tabbar/jyTabbar/jyTabBar.vue';
import FinishWork from '../DigitalArtwork/Finish/FinishWork.vue';
import {uploadCollectionFile, launchCollection, getList} from '../../api';
export default{
  name: "launch",
  components: {
    jyTabBar,
    FinishWork
  },
  data() {
    return {
      pathTitle: [
       {name: "创作者家园", url: "/DigitalArtwork/Work"},
       {name: "发布作品", url: ""}
      ],
      loading: false,
      status: 0,
      collectionInfo: {
        workName: this.$route.query.item.workName,
        workType: this.$route.query.item.workType,
        workId: this.$route.query.item.workId,
        workCreateTime: this.$route.query.item.workCreateTime,
        imgUrl: this.$route.query.item.imgUrl
      },
      projectClass: [
        // {
        //   name: "枫香染",
        //   id: 10
        // },
        // {
        //   name: "黄平泥哨",
        //   id: 2
        // },
        // {
        //   name: "绛州澄泥砚",
        //   id: 3
        // },
        // {
        //   name: "东昌毛笔",
        //   id: 4
        // },
        // {
        //   name: "中国皮影戏",
        //   id: 5
        // },
        // {
        //   name: "苏绣",
        //   id: 6
        // },
        // {
        //   name: "北京绢花",
        //   id: 7
        // },
        // {
        //   name: "玉雕",
        //   id: 8
        // },
        // {
        //   name: "竹刻",
        //   id: 9
        // },
        // {
        //   name: "中国剪纸",
        //   id: 1
        // }
      ],
      form: {
        workId: "",
        showorkId: "",
        collectionTextList: ["", "", ""],
        collectionPicList: ["", "", ""]
      },
      sendData: {
        workId: "",
        showorkId: "",
        collectionTextList: "",
        collectionPicList: []
      },
      loadingList: [false, false, false]
    }
  },
  async created() {
    console.log(this.$route.query)
    this.sendData.workId = this.$route.query.item.workId + ""
    let that = this
    await getList(1, 1200).then(res=>{
      if(res.data.code === 200){
        for (let i = 0; i < res.data.data.records.length; i++){
          that.projectClass.push({name: res.data.data.records[i].workType, id: res.data.data.records[i].id})
        }
      }
    })
  },
  methods: {
    uploadImg(index) {
      document.getElementById('imgFile' + index).click()
    },
    async getPicture(e, index) {
      let that = this
      if(e.target.files[0] !== null && e.target.files[0] !== undefined) {
        let param = new FormData()
        param.append("file", e.target.files[0])
        param.append("bucketName", "fxr-work-1301490955")
        this.loadingList[index] = true
        await uploadCollectionFile(param).then(res =>{
          if(res.data.msg === "SUCCESS") {
            that.sendData.collectionPicList[index] = res.data.data.url
            let src = window.URL.createObjectURL(e.target.files[0])
            that.form.collectionPicList.splice(index, 1, src)
            that.loadingList[index] = false
          }else{
            that.loadingList[index] = false
            that.$message.error("上传时发生了一些错误")
          }
        })
      }
    },
    async launchMyColl() {
      let that = this
      let flag = true
      if(this.form.collectionPicList[0] === "") {  // 至少上传一张图片
        flag = false
      }
      for(let i = 0; i < this.form.collectionTextList.length; i++) {  // 所写内容不能为空
        if(this.form.collectionTextList[i] === "") {
          flag = false
          break
        }
      }
      if(this.form.showorkId === "") {
        flag = false
      }else {
        this.sendData.showorkId = this.form.showorkId.toString()
      }
      if(flag) {
        this.sendData.collectionTextList = (this.form.collectionTextList).toString()
        this.sendData.collectionPicList = (this.sendData.collectionPicList).toString()
        this.loading = true
        await launchCollection(this.sendData).then((res)=>{
          if(res.data.code === 200) {
            that.loading = false
            that.status = 1
          }else {
            that.loading = false
            that.$message.error("上传作品时发生了一些错误")
          }
        })
      }else {
        this.$message({
          message: "请将信息填写完整",
          type: "warning"
        })
      }
    }
  }
}
</script>

<style>
#launch{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 1400px;
}
.topLine{
  margin-top: 60px;
  width: 490px;
  height:1px;
  background-color: #A5A5A5
}
.collections{
  margin-top: 100px;
  position: absolute;
  width: 100%;
  background: #F1F1F1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-width: 1400px;
}
.myCollection{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 5px;
  background-color: #FFFFFF;
  border-radius: 7px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 880px;
}
.myCollectionTable{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 5px;
  background-color: #FFFFFF;
  border-radius: 7px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 880px;
}
.displayImg{
  width: 300px;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}
.collectionContent{
  width: 500px;
  height: 180px;
  margin-left: 20px;
  padding: 10px 10px;
}
.collentionText{
  font-family: sans-serif;
  font-size: 16px;
}
.collectionTable{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 5px;
  background-color: #FFFFFF;
  border-radius: 7px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 880px;
}
.labelClass{
  font-family: sans-serif;
  font-size: 16px;
  color: #000000;
  width: 120px;
}
.imgsClass{
  display: flex;
  margin-top: 10px;
}
.image{
  width: 350px;
  height: 200px;
  background-color: #dddddd;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
}
.el-input__inner{
  box-sizing: border-box;

  width: 410px;
  height: 43px;
  border: 1px solid #848484;
  border-radius: 6px;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

}
.el-input__inner::placeholder{
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #A0A0A0;
}
.el-select-dropdown{
  margin: 0;
  width: 410px;
  max-height: 274px;

  background: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #8C8C8C;
}
.el-popper .popper__arrow{
  display: none;
}
.el-select-dropdown__item{
  width: 410px;
  height: 35px;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #000000;

  display: flex;
  align-items: center;

}.selected{
   font-family: 'Inter',sans-serif;
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 19px;

   color: #000000;
 }
.el-select-dropdown__item:hover{
  background-color: #DBDBDB;
}
.el-select-dropdown__item.hover{
  background-color: #DBDBDB;
}
.el-select-dropdown__item.selected{
  color: #000000;
}
.el-avatar .el-cascader-panel .el-radio .el-radio--medium.is-bordered .el-radio__label .el-radio__label{
  font-size: 16px;
}
.el-cascader-menu{
  color: #070707;
  border-right: 1px solid #848484;
}
.el-popper[x-placement^=bottom]{
  margin-top: 1px;
}
.el-cascader__dropdown{
  font-size: 16px;
  background-color: #FFFFFF;
  border-color: #848484;
}
.el-cascader-node.in-active-path, .el-cascader-node.is-active, .el-cascader-node.is-selectable.in-checked-path{
  color: #848484;
  font-weight: 500;
}
.el-input.is-disabled .el-input__inner{
  background-color: #FFFFFF;
  color: #000000;
  border-color: #848484;
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
.el-input__prefix{
  display: none;
}
.el-input__suffix-inner{
  display: none;
}
.el-input::-webkit-scrollbar-thumb {
  width: 410px;
  height: 43px;
}
textarea{
  font-size: 15px;
  font-family: sans-serif;
}
textarea::placeholder{
  font-family: sans-serif;
  font-size: 15px;
  color: #A0A0A0;
}
.el-textarea__inner{
  border: 1px solid #000000;
}
input{
  border: 1px solid #000000;
}
.addBtn{
  width: 80px;
  height: 80px;
  object-fit: cover;
}
.launchBtn{
  height: 40px;
  width: 200px;
  background-color: #326CC2;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 16px;
}
</style>