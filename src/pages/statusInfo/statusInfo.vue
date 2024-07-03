<template>
  <div id="statusInfo">
    <jy-tab-bar :is-back="false" :normal-title="normalTitle"></jy-tab-bar>
    <div class="background">
      <div class="pageLeft">
        <info-card :margin-top="30" :number="cardNumber" :card-id="1" id="card1" btn-id="button1" type="basic">
          <p slot="cardTitle">作品基本信息</p>
          <div slot="basic">
            <div style="display: flex">
              <div style="min-width: 250px">
                <p>作品名称：{{workInfo.basic.workName}}</p>
              </div>
              <div style="min-width: 150px;margin-left: 80px">
                <div style="display: flex" v-if="isRight">
                  <p>版权通证：</p>
                  <p class="link" @click="checkRights(workId)">查看详情</p>
                </div>
                <div style="display: flex" v-if="workInfo.right.licenseUrl!==''&&workInfo.right.licenseUrl!==null">
                  <!--&&workInfo.right.licenseUrl!==null-->
                  <p>登记确权证书：</p>
                  <a class="link" :href="workInfo.right.licenseUrl">点击下载</a>
                </div>
              </div>
            </div>
            <p v-if="workInfo.basic.workBlockId!==''">作品存证编号：{{workInfo.basic.workBlockId}}</p>
            <div style="display: flex;margin-top: 20px">
              <div style="min-width: 150px">
                <p>作品类型：{{workInfo.basic.workType}}</p>
                <p>创作城市：{{workInfo.basic.createCity}}</p>
              </div>
              <div style="min-width: 150px;margin-left: 80px">
                <p>作品性质：{{workInfo.basic.createType}}</p>
                <p>创作国家：{{workInfo.basic.createCountry}}</p>
              </div>
              <div style="min-width: 150px;margin-left: 80px">
                <p></p>
                <p>创作时间：{{workInfo.basic.workCreateTime}}</p>
              </div>
            </div>
            <div style="display: flex; align-items: center">
              <p>作品文件：{{workInfo.basic.fileName}}</p>
              <a :href="workInfo.basic.fileUrl" :download="workInfo.basic.fileName" class="downloadBtn" target="_blank">下载</a>
            </div>
          </div>
        </info-card>
        <info-card :number="cardNumber" :card-id="2" id="card2" btn-id="button2" type="basic">
          <p slot="cardTitle">作品存证信息</p>
          <div slot="basic">
            <p class="subTitle">著作权信息</p>
            <p style="margin-top: 20px">著作权产生方式：{{workInfo.deposit.copyrightCreateType}}</p>
            <p style="margin-top: 20px">作者列表：</p>
            <div style="margin-top: 5px" id="authorsInfo">
              <div v-for="(item, index) in workInfo.deposit.depositAuthorVOS" :key="'author'+index" style="display: flex;margin-top: 10px">
                <div style="width: 220px">作者{{index+1}} ：{{item.username}}（{{item.realName}}）</div>
                <div style="width: 300px">证件号码 ：{{item.number}}</div>
                <div>署名 ：{{item.signName}}</div>
              </div>
            </div>
          </div>
          <div slot="tip">
            <div class="line"></div>
            <div class="subTitle" style="margin-top: 10px">暂无该信息</div>
          </div>
          <div slot="status">
            <div class="line"></div>
            <div style="display: flex;align-items: center">
              <div class="subTitle" style="margin-top: 10px">{{status[0]}}</div>
              <div class="time">{{time[0]}}</div>
            </div>
          </div>
        </info-card>
        <info-card :number="cardNumber" :card-id="3" id="card3" btn-id="button3" type="basic">
          <p slot="cardTitle">版权注册信息</p>
          <div slot="basic">
            <div style="margin-top: 10px">
              <p class="subTitle">{{workInfo.copyright.content[0].title}}</p>
              <p style="margin-top: 15px">权利取得方式 ：{{workInfo.copyright.content[0].copyrightGetType}}</p>
              <p style="margin-top: 15px">版权单元</p>
              <div v-for="(item, index) in workInfo.copyright.content[0].unit" :key="'unit'+index" style="margin-top: 10px">
                <div style="display: flex">
                  <div style="width: 220px">用户{{index+1}} ：{{item.username}}（{{item.realName}}）</div>
                  <div style="width: 300px">证件号码 ：{{item.number}}</div>
                  <div class="displayBtn" @click="changeDisplayStatus(index)">{{item.isShow}}</div>
                </div>
                <div v-if="item.isShow==='收起权利信息'">
                  <div style="margin-left: 60px">
                    <div v-for="(obj, pos) in item.unit" :key="'userUnit'+pos" style="display: flex;margin-top: 3px" class="copyrightInfo">
                      <div style="width: 180px">{{obj.name}}</div>
                      <div style="width: 180px;">分账比例 ：{{obj.proportion}}</div>
                      <div>权利说明 ：{{(obj.copyrightExplain==="")?"暂无":obj.copyrightExplain}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-top: 15px">
              <p class="subTitle">{{workInfo.copyright.content[1].title}}</p>
              <div v-for="(item, index) in workInfo.copyright.content[1].content" :key="'limitInfo' + index" style="margin-top: 18px">
                <p>{{item.type}}：</p>
                <div style="display: flex;flex-wrap: wrap;width: 90%">
                  <div v-for="(obj, pos) in item.rights" style="min-width: 230px;margin-top: 5px">{{obj.type}} ：{{obj.res}}&emsp;&emsp;&emsp;</div>
                </div>
              </div>
            </div>
            <div style="margin-top: 15px">
              <p class="subTitle">{{workInfo.copyright.content[2].title}}</p>
              <div v-for="(item, index) in workInfo.copyright.content[2].content" :key="'status' + index" style="margin-top: 18px">
                <p>{{item.group[0].type}}：{{item.group[0].res}}</p>
                <div style="display: flex">
                  <div v-for="(obj, pos) in item.group" v-if="pos!==0&&(obj.res.indexOf('已')!==-1)" style="min-width: 200px">
                    {{item.group[pos].type}} ：{{item.group[pos].res}}&emsp;&emsp;&emsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div slot="tip">
            <div class="line"></div>
            <div class="subTitle" style="margin-top: 10px">暂无该信息</div>
          </div>
          <div slot="status">
            <div class="line"></div>
            <div style="display: flex;align-items: center">
              <div class="subTitle" style="margin-top: 10px">{{status[1]}}</div>
              <div class="time">{{time[1]}}</div>
            </div>
          </div>
        </info-card>
        <info-card :number="cardNumber" :card-id="4" id="card4" btn-id="button4" type="basic">
          <p slot="cardTitle">登记确权信息</p>
          <div slot="basic">
            <div style="margin-top: 10px">
              <p class="subTitle">{{workInfo.right.content[0].title}}</p>
              <div v-for="(item, index) in workInfo.right.content[0].content" :key="'subjects'+index" style="display: flex">
                <div style="min-width: 200px">主体{{index+1}} ：{{item.username}}（{{item.realName}}）</div>
                <div style="margin-left: 20px">权利类别 ：{{item.rights}}</div>
              </div>
            </div>
            <div style="margin-top: 10px">
              <p class="subTitle">{{workInfo.right.content[1].title}}</p>
              <p>新增署名：</p>
              <div v-for="(item, index) in workInfo.right.content[1].content" :key="'object'+index" style="display: flex">
                <div style="min-width: 200px">作者{{index+1}} ：{{item.username}}（{{item.realName}}）</div>
                <div style="min-width: 180px;margin-left: 20px">署名 ：{{item.signName}}</div>
                <div style="margin-left: 20px">署名状态 ：{{item.signStatus}}</div>
              </div>
            </div>
            <div style="margin-top: 10px">
              <p class="subTitle">{{workInfo.right.content[2].title}}</p>
              <div v-for="(item, index) in workInfo.right.content[2].content" :key="'file'+index" style="display: flex;margin-top: 8px">
                <div style="min-width: 280px;max-width: 500px;display: flex;flex-wrap: wrap">{{item.fileName}}</div>
                <a :href="item.fileUrl" :download="item.fileName" class="downloadFileBtn">下载</a>
              </div>
            </div>
          </div>
          <div slot="tip">
            <div class="line"></div>
            <div class="subTitle" style="margin-top: 10px">暂无该信息</div>
          </div>
          <div slot="status">
            <div class="line"></div>
            <div style="display: flex;align-items: center">
              <div class="subTitle" style="margin-top: 10px">{{status[2]}}</div>
              <div class="time">{{time[2]}}</div>
            </div>
          </div>
        </info-card>
        <div style="width: 30px;height: 30px"></div>
      </div>
      <div class="pageRight">
        <div class="statusTitle">{{workInfo.status}}</div>
        <step-bar style="margin-top: 25px" :array="statusArray"></step-bar>
      </div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import infoCard from "@/components/statusInfo/infoCard";
import stepBar from "@/components/stepBar";
import {
  depositRes,
  enrollRes,
  getFileInfo,
  getRegisterRes,
  getUserById,
  getUserInfoByName,
  getWorkByIdNew,
  deleteWork
} from "@/api";
import {CodeToText} from "element-china-area-data";

export default {
  name: "statusInfo",
  components: {
    jyTabBar,
    infoCard,
    stepBar
  },
  data() {
    return {
      normalTitle: [
        {title: "返回", url: "/userProfile/userInfo/worksManager"}
      ],
      status: [],
      time: [],
      workId: 0,
      workInfo: {
        status: "已完成",
        basic: {
          workName: "",
          createType: "", // 创作类型
          workType: "", // 作品性质
          createCountry: "",
          workCreateTime: "",
          fileName: "",
          fileUrl: "",
          workBlockId: "",  // 作品存证编号
          createCity: ""
        },
        deposit: {
          copyrightCreateType: "",// 著作权产生方式
          depositAuthorVOS: [],//作者列表
          status: {
            launch: {
              result: "",
            },
            check: {
              result: "",
              illegalStatus: "",  // 是否合法
              tortStatus: "",  // 侵权行为
              manualStatus: "",  // 人工审核是否通过
            },
            complete: {
              result: ""
            }
          },//状态
          createTime: "",
          updateTime: ""
        },
        copyright: {
          status: "",
          content: [  // 版权注册
            {
              title: "版权信息",
              unit: [],
              copyrightGetType: ""  // 权利取得方式
            },
            {
              title: "约束信息",
              content: [
                {
                  type: "版权限制",
                  rights: [
                    {type: "是否可授权", res: ""},
                    {type: "是否可转让", res: ""},
                  ]
                },
                {
                  type: "授权约束",
                  rights: [
                    {type: "渠道", res: ""},
                    {type: "地域", res: ""},
                    {type: "时间", res: ""},
                    {type: "转让类型", res: ""},
                    {type: "再授权类型", res: ""}
                  ]
                },
                {
                  type: "操作许可约束",
                  rights: [
                    {type: "类型", res: ""},
                    {type: "地域", res: ""},
                    {type: "时间", res: ""}
                  ]
                }
              ]
            },
            {
              title: "版权状态",
              content: [
                {group: [
                    {type: "发表状态", res: ""},
                    {type: "发表城市", res: ""},
                    {type: "发表国家", res: ""},
                    {type: "发表时间", res: ""}
                  ]},
                {
                  group: [
                    {type: "出版状态", res: ""},
                    {type: "出版城市", res: ""},
                    {type: "出版国家", res: ""},
                    {type: "出版时间", res: ""},
                  ]
                },
                {
                  group: [
                    {type: "发行状态", res: ""},
                    {type: "发行城市", res: ""},
                    {type: "发行国家", res: ""},
                    {type: "发行时间", res: ""},
                  ]
                }
              ]
            }
          ]
        },
        right: {
          status: "",
          licenseUrl: "",
          content: [
            // 登记确权信息
            {
              title: "主体列表",
              content: []
            },
            {
              title: "客体信息",
              content: []
            },
            {
              title: "证明材料列表",
              content: []
            }
          ]
        }
      },
      deposit: [  // 文字版本
        {
          copyrightCreateType: "",  // 著作权产生方式
          title: "著作权信息",
          authorList: []
        }
      ],
      copyright: [  // 版权注册
        {
          title: "版权信息",
          unit: []
        },
        {
          title: "约束信息",
          content: [
            {
              type: "版权限制",
              rights: [
                {type: "是否可授权", res: ""},
                {type: "是否可转让", res: ""},
              ]
            },
            {
              type: "授权约束",
              rights: [
                {type: "渠道", res: ""},
                {type: "地域", res: ""},
                {type: "时间", res: ""},
                {type: "转让类型", res: ""},
                {type: "再授权类型", res: ""}
              ]
            },
            {
              type: "操作许可约束",
              rights: [
                {type: "类型", res: ""},
                {type: "地域", res: ""},
                {type: "时间", res: ""}
              ]
            }
          ]
        },
        {
          title: "版权状态",
          content: [
            {type: "发表状态", res: ""},
            {type: "发表城市", res: ""},
            {type: "发表国家", res: ""},
            {type: "发表时间", res: ""},

            {type: "出版状态", res: ""},
            {type: "出版城市", res: ""},
            {type: "出版国家", res: ""},
            {type: "出版时间", res: ""},

            {type: "发行状态", res: ""},
            {type: "发行城市", res: ""},
            {type: "发行国家", res: ""},
            {type: "发行时间", res: ""},
          ]
        }
      ],
      right: [
        // 登记确权信息
        {
          title: "主体列表",
          content: []
        },
        {
          title: "客体信息",
          content: []
        },
        {
          title: "证明材料列表",
          content: []
        }
      ],
      workTypes: [          //作品类型
        {label: "文字", value: 1},
        {label: "口述", value: 2},
        {label: "音乐", value: 3},
        {label: "戏剧", value: 4},
        {label: "曲艺", value: 5},
        {label: "舞蹈", value: 6},
        {label: "杂技", value: 7},
        {label: "美术", value: 8},
        {label: "建筑", value: 9},
        {label: "摄影", value: 10},
        {label: "电影", value: 11},
        {label: "类似摄制电影方法创作作品", value: 12},
        {label: "工程设计图，产品设计图", value: 13},
        {label: "地图，示意图", value: 15},
        {label: "模型", value: 17},
        {label: "录音作品", value: 19},
        {label: "录像作品", value: 20},
        {label: "其他作品", value: 181}
      ],
      createTypes: [                     //创作性质
        {name: "原创", isChoose: false, value: 0},
        {name: "改编", isChoose: false, value: 1},
        {name: "翻译", isChoose: false, value: 2},
        {name: "汇编", isChoose: false, value: 3},
        {name: "注释", isChoose: false, value: 4},
        {name: "整理", isChoose: false, value: 5},
        {name: "其他", isChoose: false, value: 6}
      ],
      copyrightCreateTypes: [
        {name: "个人"},
        {name: "合作"},
        {name: "法人"},
        {name: "职务"},
        {name: "委托"}
      ],
      makeWay: [      //权利取得方式
        "原创", "转让", "继承", "承受", "赠予", "其他"
      ],
      channel: ["全渠道", "网络", "电视"],
      limitTime: ["半年", "一年", "三年", "永久"],
      transferType: ["不可转让", "可转让"],
      reAuthor: ["不可再授权", "可再授权"],
      area: ["中国","亚洲","世界"],
      constraintTypes: ["播放", "输出", "打印", "修改", "分割", "打包", "移动", "复制", "备份", "保存", "撤销"],
      copyUnit: [                             //每个版权单元
        {type: 4, select: false, proportion: "", explain: "", name: "复制权", proportionFlag: false},
        {type: 5, select: false, proportion: "", explain: "", name: "发行权", proportionFlag: false},
        {type: 6, select: false, proportion: "", explain: "", name: "出租权", proportionFlag: false},
        {type: 7, select: false, proportion: "", explain: "", name: "展览权", proportionFlag: false},
        {type: 8, select: false, proportion: "", explain: "", name: "表演权", proportionFlag: false},
        {type: 9, select: false, proportion: "", explain: "", name: "放映权", proportionFlag: false},
        {type: 10, select: false, proportion: "", explain: "", name: "广播权", proportionFlag: false},
        {type: 11, select: false, proportion: "", explain: "", name: "信息网络传播权", proportionFlag: false},
        {type: 12, select: false, proportion: "", explain: "", name: "摄制权", proportionFlag: false},
        {type: 13, select: false, proportion: "", explain: "", name: "改编权", proportionFlag: false},
        {type: 14, select: false, proportion: "", explain: "", name: "翻译权", proportionFlag: false},
        {type: 15, select: false, proportion: "", explain: "", name: "汇编权", proportionFlag: false},
        {type: 16, select: false, proportion: "", explain: "", name: "其他", proportionFlag: false}
      ],
      files: [
        {type: "C1", name: "作品创作说明"},    //必填
        {type: "C2", name: "作品创作过程说明"},//选填
        {type: "C3", name: "作品权利保证书"}, //必填
        {type: "C4", name: "法人创作说明"},    //权利生产方式为法人时必填
        {type: "C5", name: "职务创作协议"},   //权利生产方式为职务时
        {type: "C6", name: "合作创作协议"},   //权利生产方式为合作时
        {type: "C7", name: "委托创作协议"},   //权利生产方式为委托时
        {type: "C8", name: "著作权许可使用合同"}, //作品创作性质为改编/翻译/汇编/注释/整理/其他时，必填
        {type: "C9", name: "作品登记证书"},//已在版权局登记，上传登记证书 选填
        {type: "C10", name: "第三方认证机构的证明"},//选填
        {type: "C11", name: "转让合同"},//权利义务概括性转让合同  著作权取得方式为转让时
        {type: "C12", name: "继承证明"},  //著作权取得方式为继承时
        {type: "C13", name: "承受协议"},  //著作权取得方式为承受时
        {type: "C14", name: "赠予合同"},  //著作权取得方式为赠予时
        {type: "C15", name: "..."},
        {type: "C16", name: "唯一著作权注册平台承诺书"}   //必填
      ],
      statusArray: [],
      workStatus: "",  // 作品状态
      btnArray: [
        {
          name: "发起作品存证",
          url: "/DigitalArtwork/deposit",
        },
        {
          name: "再次发起作品存证",
          url: "/DigitalArtwork/deposit",
        },
        {
          name: "删除作品",
          url: "",
        },
        {
          name: "发起版权注册",
          url: "/DigitalArtwork/enroll",
        },
        {
          name: "再次发起版权注册",
          url: "/DigitalArtwork/enroll",
        },
        {
          name: "发起登记确权",
          url: "/DigitalArtwork/registerRight",
        },
        {
          name: "再次发起登记确权",
          url: "/DigitalArtwork/registerRight",
        }
      ],
      btnStatus: -1,
      cardNumber: 1,
      currentBtn: -1,  // 当前按钮
      isRight: false
    }
  },
  async created() {
    this.workId = this.$route.query.workId
    let status = ""
    let createTime = ""
    let updateTime = ""
    await getWorkByIdNew(this.$route.query.workId).then(res=>{
      if(res.data.code === 200){
        console.log(res.data)
        this.workInfo.basic.workName = res.data.data.basic.content.workName  // 作品名字
        for(let i = 0; i < this.workTypes.length; i++){
          if(res.data.data.basic.content.workType === this.workTypes[i].value){
            this.workInfo.basic.workType = this.workTypes[i].label
            break
          }
        }
        this.workInfo.basic.createType = this.createTypes[res.data.data.basic.content.createType].name
        let date = new Date(res.data.data.basic.content.createDate)  // 时间
        this.workInfo.basic.workCreateTime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        this.workInfo.basic.createCity = CodeToText[res.data.data.basic.content.createCity]
        this.workInfo.basic.createCountry = "中国"
        this.workInfo.basic.fileName = res.data.data.basic.content.fileName
        this.workInfo.basic.fileUrl = res.data.data.basic.content.fileUrl
        status = res.data.data.status
        this.workStatus = status
        createTime = res.data.data.basic.content.workCreateTime  // 发起时间
      }
    })

    if(this.workStatus.indexOf("作品存证")!==-1){
      if(this.workStatus === "作品存证草稿"){
        this.cardNumber = 1
        this.currentBtn = 0
      }else if(this.workStatus === "作品存证审核中"){
        this.cardNumber = 2
        this.status.push("状态 ：审核中")
      }else if(this.workStatus === "作品存证失败"){
        this.cardNumber = 2
        this.status.push("状态 ：未通过")
        this.currentBtn = 1
      }else if(this.workStatus === "作品存证成功"){
        this.cardNumber = 2
        this.status.push("状态 ：已完成")
        this.currentBtn = 3
      }
    }else if(this.workStatus.indexOf("版权注册")!==-1){
      this.isRight = true
      if(this.workStatus === "版权注册审核中"){
        this.cardNumber = 3
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：审核中")
      }else if(this.workStatus === "版权注册失败"){
        this.cardNumber = 3
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：未通过")
        this.currentBtn = 4
      }else if(this.workStatus === "版权注册成功"){
        this.cardNumber = 3
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：已完成")
        this.currentBtn = 5
      }
    }else if(this.workStatus.indexOf("登记确权")!==-1){
      this.isRight = true
      if(this.workStatus === "登记确权审核中"){
        this.cardNumber = 4
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：审核中")
      }else if(this.workStatus === "登记确权失败"){
        this.cardNumber = 4
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：未通过")
        this.currentBtn = 6
      }else if(this.workStatus === "登记确权成功"){
        this.cardNumber = 4
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：已完成")
        this.status.push("状态 ：已完成")
      }
    }

    if(this.workStatus === "作品存证草稿"){
      this.workInfo.status = "作品状态 ：已完成上传"
      let date = new Date(createTime)
      this.statusArray.push({
        status: 1,
        title: "发起作品上传",
        time: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        content: []
      })
    }

    let usernames = []
    if((this.workStatus!=="作品存证草稿"&&this.workStatus.indexOf("作品存证")!==-1)||this.workStatus.indexOf("版权注册") !== -1 || this.workStatus.indexOf("登记确权")!==-1){
      await depositRes(this.workId).then(res=>{  // 作品存证信息
        if(res.data.code === 200){
          this.workInfo.basic.workBlockId = res.data.data.workBlockId
          this.workInfo.deposit.copyrightCreateType = this.copyrightCreateTypes[res.data.data.content.copyrightCreateType].name
          usernames = res.data.data.content.depositAuthorVOS
          this.time.push(res.data.data.recordVOS[res.data.data.recordVOS.length-1].updateTime.substring(0, 10))
          if(res.data.data.status === "作品存证失败"){
            this.workInfo.status = "作品审核状态 ：未通过"
            this.statusArray.push({
              status: 1,
              title: "发起作品存证",
              time: res.data.data.recordVOS[res.data.data.recordVOS.length-1].createTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 2,
              title: "审核：未通过",
              time: res.data.data.recordVOS[res.data.data.recordVOS.length-1].updateTime.substring(0, 10),
              content: [
                "违法状态：" + res.data.data.recordVOS[res.data.data.recordVOS.length-1].illegalStatus||"未知",
                "侵权状态：" + res.data.data.recordVOS[res.data.data.recordVOS.length-1].tortStatus||"未知",
                "人工审核：" + res.data.data.recordVOS[res.data.data.recordVOS.length-1].manualStatus||"未知"
              ]
            })
            this.statusArray.push({
              status: 0,
              title: "完成作品存证",
              time: "",
              content: []
            })
          }else if(res.data.data.status === "作品存证成功"){
            this.workInfo.status = "作品审核状态 ：已完成"
            this.statusArray.push({
              status: 1,
              title: "发起作品存证",
              time: res.data.data.recordVOS[res.data.data.recordVOS.length-1].createTime.substring(0, 10),
              content: []
            })
            let date = new Date(res.data.data.content.saveTimeStamp)
            this.statusArray.push({
              status: 1,
              title: "审核：已完成",
              time: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
              content: [
                "违法状态：" + res.data.data.recordVOS[res.data.data.recordVOS.length-1].illegalStatus||"合法",
                "侵权状态：" + res.data.data.recordVOS[res.data.data.recordVOS.length-1].tortStatus||"不存在侵权",
                "人工审核：" + res.data.data.recordVOS[res.data.data.recordVOS.length-1].manualStatus||"通过"
              ]
            })
            this.statusArray.push({
              status: 1,
              title: "完成作品存证",
              time: "",
              content: []
            })
          }else if(res.data.data.status === "作品存证审核中"){
            this.workInfo.status = "审核中"
            this.statusArray.push({
              status: 1,
              title: "发起作品存证",
              time: res.data.data.recordVOS[res.data.data.recordVOS.length-1].createTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 1,
              title: "审核：审核中",
              time: res.data.data.recordVOS[res.data.data.recordVOS.length-1].updateTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 0,
              title: "完成作品存证",
              time: "",
              content: []
            })
          }
        }
      })
      for(let i = 0; i < usernames.length; i++){
        await getUserInfoByName(usernames[i].username, {}).then(res=>{
          if(res.data.code === 200){
            this.workInfo.deposit.depositAuthorVOS.push({
              username: res.data.data.username,
              realName: "**" + res.data.data.name,
              number: "**************" + res.data.data.identificationNumber,
              signName: usernames[i].signName
            })
          }
        })
      }
    }
    let copyrights = []
    if(this.workStatus.indexOf("版权注册") !== -1 || this.workStatus.indexOf("登记确权")!==-1){
      await enrollRes(this.workId).then(res=>{
        console.log(res.data)
        if(res.data.code === 200){
          // 传参
          this.time.push(res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10))
          if(res.data.data.status === "版权注册失败"){
            this.workInfo.status = "作品审核状态 ：未通过"
            this.statusArray.push({
              status: 1,
              title: "发起版权注册",
              time: res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 2,
              title: "审核：未通过",
              time: res.data.data.records[res.data.data.records.length-1].updateTime.substring(0, 10),
              content: [
                "违法状态：" + res.data.data.records[res.data.data.records.length-1].illegalStatus||"未知",
                "侵权状态：" + res.data.data.records[res.data.data.records.length-1].tortStatus||"未知",
                "人工审核：" + res.data.data.records[res.data.data.records.length-1].manualStatus||"未知"
              ]
            })
            this.statusArray.push({
              status: 0,
              title: "完成版权注册",
              time: "",
              content: []
            })
          }else if(res.data.data.status === "版权注册成功"){
            this.workInfo.status = "作品审核状态 ：已完成"
            this.statusArray.push({
              status: 1,
              title: "发起版权注册",
              time: res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10),
              content: []
            })
            let date = new Date(res.data.data.content.saveTimeStamp)
            this.statusArray.push({
              status: 1,
              title: "审核：已完成",
              time: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
              content: [
                "违法状态：" + res.data.data.records[res.data.data.records.length-1].illegalStatus||"合法",
                "侵权状态：" + res.data.data.records[res.data.data.records.length-1].tortStatus||"不存在侵权",
                "人工审核：" + res.data.data.records[res.data.data.records.length-1].manualStatus||"通过"
              ]
            })
            this.statusArray.push({
              status: 1,
              title: "完成版权注册",
              time: "",
              content: []
            })
          }else if(res.data.data.status === "版权注册审核中"){
            this.workInfo.status = "作品审核状态 ：审核中"
            this.statusArray.push({
              status: 1,
              title: "发起版权注册",
              time: res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 1,
              title: "审核：审核中",
              time: res.data.data.records[res.data.data.records.length-1].updateTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 0,
              title: "完成版权注册",
              time: "",
              content: []
            })
          }

          // 版权注册
          let copyrightLimit = res.data.data.content.copyrightLimit
          this.workInfo.copyright.content[0].copyrightGetType = this.makeWay[res.data.data.content.copyrightGetType]
          switch (copyrightLimit){
            case 0: {
              this.workInfo.copyright.content[1].content[0].rights[0].res = "可授权"
              this.workInfo.copyright.content[1].content[0].rights[1].res = "可转让"
              break
            }
            case 1:{
              this.workInfo.copyright.content[1].content[0].rights[0].res = "不可授权"
              this.workInfo.copyright.content[1].content[0].rights[1].res = "可转让"
              break
            }
            case 2:{
              this.workInfo.copyright.content[1].content[0].rights[0].res = "可授权"
              this.workInfo.copyright.content[1].content[0].rights[1].res = "不可转让"
              break
            }
            case 3:{
              this.workInfo.copyright.content[1].content[0].rights[0].res = "不可授权"
              this.workInfo.copyright.content[1].content[0].rights[1].res = "不可转让"
              break
            }
          }
          let appr = res.data.data.content.appr
          this.workInfo.copyright.content[1].content[1].rights[0].res = this.channel[appr.constraintChannel]
          this.workInfo.copyright.content[1].content[1].rights[1].res = this.area[appr.constraintArea]
          this.workInfo.copyright.content[1].content[1].rights[2].res = this.limitTime[appr.constraintTime]
          this.workInfo.copyright.content[1].content[1].rights[3].res = this.transferType[appr.constraintTransferType]
          this.workInfo.copyright.content[1].content[1].rights[4].res = this.reAuthor[appr.constraintReapproveType]

          let op = res.data.data.content.op
          let typeStr = op.constraintType.substring(1,op.constraintType.length-1)
          let typeList = typeStr.split(",")
          let typeRes = ""
          for(let i = 0; i < typeList.length; i++){
            typeRes += (this.constraintTypes[Number(typeList[i])] + " ")
          }
          this.workInfo.copyright.content[1].content[2].rights[0].res = typeRes
          this.workInfo.copyright.content[1].content[2].rights[1].res = this.area[op.constraintArea]
          this.workInfo.copyright.content[1].content[2].rights[2].res = this.limitTime[op.constraintTime]

          let publish = res.data.data.content.publish  // 发表
          if(publish.status === 0){
            this.workInfo.copyright.content[2].content[0].group[0].res = "未发表"
          }else{
            this.workInfo.copyright.content[2].content[0].group[0].res = "已发表"
            this.workInfo.copyright.content[2].content[0].group[1].res = CodeToText[publish.city]
            this.workInfo.copyright.content[2].content[0].group[2].res = "中国"
            let date = new Date(publish.date)
            this.workInfo.copyright.content[2].content[0].group[3].res = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
          }

          let comeout = res.data.data.content.comeout
          if(comeout.status === 0){
            this.workInfo.copyright.content[2].content[1].group[0].res = "未出版"
          }else{
            this.workInfo.copyright.content[2].content[1].group[0].res = "已出版"
            this.workInfo.copyright.content[2].content[1].group[1].res = CodeToText[publish.city]
            this.workInfo.copyright.content[2].content[1].group[2].res = "中国"
            let date = new Date(publish.date)
            this.workInfo.copyright.content[2].content[1].group[3].res = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
          }

          let issue = res.data.data.content.issue  // 发行
          if(issue.status === 0){
            this.workInfo.copyright.content[2].content[2].group[0].res = "未发行"
          }else{
            this.workInfo.copyright.content[2].content[2].group[0].res = "已发行"
            this.workInfo.copyright.content[2].content[2].group[1].res = CodeToText[publish.city]
            this.workInfo.copyright.content[2].content[2].group[2].res = "中国"
            let date = new Date(publish.date)
            this.workInfo.copyright.content[2].content[2].group[3].res = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
          }
          // constraintType
          copyrights = res.data.data.content.copyrights
        }
      })
      // 一个单元的结构
      // let unit = {
      //   userId: 0,
      //   username: "",
      //   realName: "",
      //   number: "",
      //   isShow: false,  // 是否显示信息权利
      //   unit: [
      //     {
      //       name: "",  // 权利的名字
      //       proportion: "",
      //       copyrightExplain: ""
      //     }
      //   ]
      // }
      for(let i = 0; i < copyrights.length; i++){
        for(let j = 0; j < copyrights[i].userInfos.length; j++){  // 找每一个人
          let flag = -1  // 用户是否已存在的标志
          for(let k = 0; k < this.workInfo.copyright.content[0].unit.length; k++){
            if(copyrights[i].userInfos[j].userId === this.workInfo.copyright.content[0].unit[k].userId){  // 如果出现相等 说明已存在
              flag = k
              break
            }
          }
          if(flag!==-1){
            // 如果用户已存在 直接添加unit信息
            this.workInfo.copyright.content[0].unit[flag].unit.push({
              name: this.copyUnit[copyrights[i].type - 4].name,
              proportion: copyrights[i].userInfos[j].proportion,
              copyrightExplain: copyrights[i].userInfos[j].copyrightExplain
            })
          }else {  // 如果不存在 需要添加这个用户的单元
            await getUserById(copyrights[i].userInfos[j].userId).then(res=>{
              if(res.data.code === 200){
                this.workInfo.copyright.content[0].unit.push({
                  userId: copyrights[i].userInfos[j].userId,
                  username: res.data.data.username,
                  realName: "**" + res.data.data.name,
                  number: "**************" + res.data.data.identificationNumber,
                  isShow: "显示权利信息",
                  unit: [
                    {
                      name: this.copyUnit[copyrights[i].type - 4].name,
                      proportion: copyrights[i].userInfos[j].proportion,
                      copyrightExplain: copyrights[i].userInfos[j].copyrightExplain
                    }
                  ]
                })
              }
            })
          }
        }
      }
    }
    let objUserId = []
    let fileId = []
    if(this.workStatus.indexOf("登记确权")!==-1){
      await getRegisterRes(this.workId).then(res=>{
        if(res.data.code === 200){
          // 登记确权信息
          this.time.push(res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10))
          this.workInfo.right.licenseUrl = res.data.data.content.licenseUrl
          console.log(res.data)
          if(this.workStatus === "登记确权失败"){
            this.workInfo.status = "作品审核状态 ：未通过"
            this.statusArray.push({
              status: 1,
              title: "发起登记确权",
              time: res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 2,
              title: "审核：未通过",
              time: res.data.data.records[res.data.data.records.length-1].updateTime.substring(0, 10),
              content: [
                "违法状态：" + res.data.data.records[res.data.data.records.length-1].illegalStatus||"未知",
                "侵权状态：" + res.data.data.records[res.data.data.records.length-1].tortStatus||"未知",
                "人工审核：" + res.data.data.records[res.data.data.records.length-1].manualStatus||"未知"
              ]
            })
            this.statusArray.push({
              status: 0,
              title: "完成登记确权",
              time: "",
              content: []
            })
          }else if(this.workStatus === "登记确权成功"){
            this.workInfo.status = "作品审核状态 ：已完成"
            this.statusArray.push({
              status: 1,
              title: "发起登记确权",
              time: res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10),
              content: []
            })
            // let date = new Date(res.data.data.content.saveTimeStamp)
            this.statusArray.push({
              status: 1,
              title: "审核：已完成",
              time: res.data.data.records[res.data.data.records.length-1].updateTime.substring(0, 10),
              content: [
                "违法状态：" + res.data.data.records[res.data.data.records.length-1].illegalStatus||"合法",
                "侵权状态：" + res.data.data.records[res.data.data.records.length-1].tortStatus||"不存在侵权",
                "人工审核：" + res.data.data.records[res.data.data.records.length-1].manualStatus||"通过"
              ]
            })
            this.statusArray.push({
              status: 1,
              title: "完成登记确权",
              time: "",
              content: []
            })
          }else if(this.workStatus === "登记确权审核中"){
            this.workInfo.status = "作品审核状态 ：审核中"
            this.statusArray.push({
              status: 1,
              title: "发起登记确权",
              time: res.data.data.records[res.data.data.records.length-1].createTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 1,
              title: "审核：审核中",
              time: res.data.data.records[res.data.data.records.length-1].updateTime.substring(0, 10),
              content: []
            })
            this.statusArray.push({
              status: 0,
              title: "完成登记确权",
              time: "",
              content: []
            })
          }

          for(let i = 0; i < res.data.data.content.subjects.length; i++){
            let rights = ""
            for(let j = 0; j < res.data.data.content.subjects[i].rights.length; j++){
              let num = Number(res.data.data.content.subjects[i].rights[j].category)
              switch (num) {
                case 0: {
                  rights += "发表权  "
                  break
                }
                case 1: {
                  rights += "署名权  "
                  break
                }
                case 2: {
                  rights += "修改权  "
                  break
                }
                case 3: {
                  rights += "保护作品完整权  "
                }
              }
            }
            this.workInfo.right.content[0].content.push({
              userId: res.data.data.content.subjects[i].userId,
              username: "",
              realName: "",
              rights: rights
            })
          }
          for(let i = 0; i < res.data.data.content.object.authors.length; i++){
            let status = ""
            switch (res.data.data.content.object.authors[i].signStatus){
              case "1":{
                status = "本名"
                break
              }
              case "2":{
                status = "别名"
                break
              }
              case "3":{
                status = "不具名"
                break
              }
            }
            this.workInfo.right.content[1].content.push({
              userId: res.data.data.content.object.authors[i].userId,
              username: "",
              realName: "",
              signName: res.data.data.content.object.authors[i].signName,
              signStatus: status
            })
          }
          for (let i = 0; i < res.data.data.content.materials.length; i++){
            for(let j = 0; j < res.data.data.content.materials[i].fileId.length; j++){
              fileId.push({id: res.data.data.content.materials[i].fileId[j], type: res.data.data.content.materials[i].type})
              this.workInfo.right.content[2].content.push({
                fileId: res.data.data.content.materials[i].fileId[j],
                fileUrl: "",
                fileName: "",
                type: res.data.data.content.materials[i].type
              })
            }
          }
        }
      })
      for(let i = 0; i < this.workInfo.right.content[0].content.length; i++){  // 主体列表和客体列表的用户信息
        await getUserById(this.workInfo.right.content[0].content[i].userId, {}).then(res=>{
          if(res.data.code === 200){
            this.workInfo.right.content[0].content[i].username = res.data.data.username
            this.workInfo.right.content[0].content[i].realName = "**" + res.data.data.name
            for(let j = 0; j < this.workInfo.right.content[1].content.length; j++){
              if(this.workInfo.right.content[1].content[j].userId === this.workInfo.right.content[0].content[i].userId){
                this.workInfo.right.content[1].content[i].username = res.data.data.username
                this.workInfo.right.content[1].content[i].realName = "**" + res.data.data.name
              }
            }
          }
        })
      }
      for(let i = 0; i < fileId.length; i++){
        await getFileInfo(fileId[i].id).then(res=>{
          if(res.data.code === 200){
            console.log(res.data)
            this.workInfo.right.content[2].content[i].fileUrl = res.data.data.fileUrl
            for(let j = 0; j < this.files.length; j++){
              if(this.files[j].type === this.workInfo.right.content[2].content[i].type){
                this.workInfo.right.content[2].content[i].fileName = this.files[j].name
              }
            }
          }
        })
      }
    }
    console.log(this.workStatus)
    // console.log(this.workInfo.right.content[2])
  },
  methods: {
    changeDisplayStatus(index){
      // console.log(this.workInfo.copyright.content[0].unit[index].isShow)
      if(this.workInfo.copyright.content[0].unit[index].isShow === "显示权利信息"){
        this.workInfo.copyright.content[0].unit[index].isShow = "收起权利信息"
      }else this.workInfo.copyright.content[0].unit[index].isShow = "显示权利信息"
    },
    checkRights(workId){
      this.$router.push({path:"/workRights", query: {workId: this.workId}})
    },
    changePage(current){
      this.$router.push({path: this.btnArray[this.currentBtn].url})
    },
    async deleteWork(){
      this.$message({
        message: "暂不支持该功能",
        type: "warning"
      })
      // await deleteWork({workId:this.workId}).then(res=>{
      //   if(res.data.code === 200){
      //     this.$message({
      //       message: "删除作品成功",
      //       type: "success"
      //     })
      //     this.$router.push("/userProfile/userInfo/worksManager")
      //   }else {
      //     this.$message({
      //       message: "删除作品失败",
      //       type: "error"
      //     })
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.background{
  background-color: #F6F6F6;
  width: 100%;
  height: 100%;
  min-width: 1440px;
  top: 80px;
  position: absolute;
  display: flex;
}
.pageLeft{
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pageRight{
  width: 20%;
  background-color: #fff;
  border-left: 1px solid #BFBFBF;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.link{
  color: #326CC2;
  cursor: pointer;
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  margin-top: 10px;
}
.link:hover{
  text-decoration: underline;
}
.downloadBtn{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 19px;
  color: #326CC2;
  margin-left: 40px;
  text-decoration: none;
  cursor: pointer;
  margin-top: 10px;
}
.downloadBtn:hover{
  text-decoration: underline;
}
.subTitle{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #959595;
}
#authorsInfo div{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
}
.copyrightInfo div{
  font-family: 'PingFang HK',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height */


  color: #B3B3B3;
}
.displayBtn{
  font-family: 'Inter',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  color: #326CC2;
}
.statusTitle{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
}
.line{
  width: 250px;
  height: 1px;
  background-color: #D5D5D5;
  margin-left: -20px;
}
.time{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #D7D7D7;
  margin-top: 10px;
  margin-left: 15px;
}
.btn{
  width: 217px;
  height: 45px;
  background: #FFFFFF;
  border: 1px solid #326CC2;
  border-radius: 7px;
  color: #326CC2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.downloadFileBtn{
  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-decoration: none;
  color: #326CC2;
}
.downloadFileBtn:hover{
  text-decoration: underline;
}
</style>