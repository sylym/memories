<template>
  <div style="position: absolute; width: 100%;min-width: 1400px;display: flex;flex-direction: column">
    <div class="fengran">
      <div class="up">
        <div class="up-left">
          <img class="fengpic" v-bind:src="this.workUrl" :alt="workType"/>
        </div>
        <div class="up-right">
          <p class="fengup1">{{ this.workType }}</p>
          <p class="fengup2">地域分布：{{ this.workProvince }}</p>
          <p class="fengup3">简介：{{ this.workBrief }}</p>
        </div>
      </div>
      <div class="center">
        <div class="name">
          <el-row style="display: flex;align-items: center;justify-content: space-between;width: 300px">
            <p class="leftP" @click="changeWorks(0)" :style="{color: type===0?'#143094':''}">作品展</p>
            <!--<el-col :span="14"
              ><div><p class="leftP">作品展</p></div></el-col
            >-->
            <p class="rightP" @click="changeWorks(1)" :style="{color: type===1?'#143094':''}">系列展</p>
            <!--<el-col :span="14"
              ><div><p class="rightP">系列展</p></div></el-col
            >-->
          </el-row>
        </div>
        <div class="line"></div>
      </div>
      <div style="display: flex;align-items: center">
        <div class="downList" style="margin-top: 40px">
          <div v-for="(item, index) in displayList" :key="item.workId" style="margin-left: 20px">
            <img :src="item.imgUrls[0]" alt="作品" class="displayImg" @click="clickImg(index)">
            <p class="workName">{{item.workName}}</p>
            <p class="date">{{item.date}}</p>
          </div>
        </div>
      </div>
      <p v-if="displayList.length === 0" class="noneWork">暂时没有作品哦~</p>
      <div style="margin-top: 80px"></div>
    </div>
  </div>
</template>


<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import {getList, getWorkInfo_para, getWorksDisplay, searchWork} from "@/api";
export default {
  name: "fengxiangranWorks",
  components: {
    jyTabBar,
  },
  data() {
    return {
      pathTitle: [
        { name: "数字展馆", url: "/exhibition/exhibitionHome" },
        { name: "作品总览", url: "/exhibition/allWorks/allworks" },
        { name: this.$route.query.name, url: "" }
      ],
      type: 0, // 作品展还是系列展
      result: "",
      searchResult: [],
      workType: "",
      workUrl: "",
      workBrief: "",
      workProvince: "",
      exhibitionList: [],
      workList: [],
      urlList: [],
      nameList: [],
      widList: [],
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSYWluc29uMDEiLCJpYXQiOjE2NjQxMzgxODMsImV4cCI6MTY2NDU3MDE4M30.ZI3i7GYqiEeXoMDTdOHh98ZFG2JVFZRLneNFik-eQV8",
      },
      sendData: {
        visible: true,
        showorkId: -1,
      },
      displayList: [],
      testData: [
        {
          author: "周佳瑞",
          imgUrl1: "https://s1.ax1x.com/2023/01/31/pSwooY8.jpg",
          imgUrl2: "",
          imgUrl3: "",
          workName: "枫香之韵",
          workType: "美术作品",
          createTime: "2022-10-10",
          para1: "周佳瑞，北京邮电大学国际学院2021级电子商务及法律学生，热爱美术、设计。爱好中国传统文化，参观过陕西、西藏、四川、贵州的多个非遗文化发源地。2022年接触枫香染，结合当地特色进行了创作。",
          para2: "枫香染技艺是第二批国家级非物质文化遗产名录，其颜色古朴，花纹雅致，寓意吉祥，独具风格，具有丰富的民族文化内涵，枫香染在民族传承与历史发展中面临着机遇和挑战。现如今，只有深入剖析其存在现状的影响因素，加强非物质文化遗产传承与发展的意识，才能够促使其发展，使之焕发生机，增添活力。此美术作品与枫香染相结合，更好的传承与发展非物质文化遗产，同时，我们也需要持久地关注与研究非遗的传承道路。在创作此作品的时候，同学查阅了很多不同的资料，希望创作出的作品能够吸引更多人关注枫香染这一传统技艺，为其扩大影响力。作品灵感源于枫香树，在主体枫香树的周围，围绕着几只美丽的蝴蝶，枫香树香气四溢，沁人心脾，将作者对枫香树的喜爱体现地淋漓尽致。作者使用iPad绘制而成融合枫香染基本元素，进行了二次创作，创作从10月9日开始，10月10日结束；途中经过1稿成型。本人承诺，该美术作品为本人原创，全部著作权归本人所有，无侵犯第三著作人的情况。",
          para3: "枫香之韵为对称结构，符合中国传统美，具有整齐庄严感。图案的主体是一棵盛开的枫香树，周围有蝴蝶环绕，展现了枫香染气韵飘渺、香气四溢，体现了人们对美好事物的期许与热爱之情。",
        },
        {
          author: "陈静如",
          imgUrl1: "https://s1.ax1x.com/2023/01/31/pSwoqyj.jpg",
          imgUrl2: "",
          imgUrl3: "",
          workName: "凤凰涅槃",
          workType: "美术作品",
          createTime: "2022-10-10",
          para1: "陈静如，就读于北京邮电大学电信工程及管理专业，2016年开始自学绘画，对传统绘画工艺、现代数字绘画均有一定了解与掌握。2021年开始接触枫香染，学习枫香染制作工艺，结合当地特色和时代风貌进行枫香染花纹创作。",
          para2: "枫香染中具有丰富的民族文化内涵，为促使其发展，使之焕发生机，增添活力。我们仍需要深层次、多地区、多方面的对比调研，关注非遗传承的优秀案例，并有针对性地去为枫香染的发展做出调研与贡献，此美术作品与枫香染相结合，更好的传承与发展非物质文化遗产，而我们也需要持久地关注与研究非遗的传承道路。在创作此作品的时候，作者查阅了很多资料，希望创作出的作品不仅能够寄托自己对MU5735的哀思，也能够让人们关注枫香染这一传统技能。作品主旨为纪念2022年3月21日中国东方航空失事航班MU5735，图案最外围的橄榄枝和树叶图案，象征着和平和生的希望。向内一圈有祥云以及“5735”数字变形图案，表达了对事故中逝者的怀念。再向内是一圈祥云象征着蓝天。创作从10月10日开始，10月10日结束；途中经过1稿成型。本人承诺，_该美术作品为本人原创，全部著作权归本人所有，无侵犯第三著作人的情況。",
          para3: "凤凰涅槃为径向对称结构，符合中国人的传统审美。图案中心是一只凤凰怀中拥抱着一架民航客机，一是象征着失事飞机（注册号B1791）为中国东方航空机队中孔雀涂装的客机，二是表达逝者安息生者坚强的愿景。同时也是对失事飞机依依不舍的告别。再见了,B1791,蓝天再无你那五彩的翅膀。",
        },
        {
          author: "吕溢含",
          imgUrl1: "https://s1.ax1x.com/2023/01/31/pSwTSYT.jpg",
          imgUrl2: "",
          imgUrl3: "",
          workName: "蓝染布依",
          workType: "美术作品",
          createTime: "2022-10-15",
          para1: "吕溢含，就读于北京邮电大学数字媒体艺术专业，2012年开始学习绘画，对西方美术和数字绘画均有一定了解与掌握，曾获\"互联网+\"北京邮电大学赛区的优秀奖。2021年开始接触枫香染，学习枫香染制作工艺，深入研究非遗枫香染的艺术风格，结合当地自然风光和人文特色进行有关枫香染的美术创作。",
          para2: "枫香染，是一个具有诗情画意的民间印染技术，因其绘图精湛、古朴典雅，具有浓厚的民族风情，所用的主要原料是枫香树产的枫香油，因此取名枫香染，在贵州的布依族中就有悠久的传承历史。作者因为对布依族的枫香染十分感兴趣，重点研究了贵州省长顺县的枫香染，最终根据当地的自然景色和风土人情创作该美术作品，希望能更好地将长顺银杏的自然之美和枫香染的艺术之美向大众传播。创作从10月8日开始，10月15日结束；途中经过1稿成型。本人承诺，该美术作品为本人原创，全部著作权归本人所有，无侵犯第三著作人的情况。",
          para3: "画面整体颜色借鉴枫香染的传统配色，内层照射暖光，具有强烈的氛围感和立体感。图中以布依族女孩为画面中心人物，表达对擅长枫香染技艺的布依族人民的赞美。富有层次感的银杏体现布依族的生活特色，其寓意是勤劳智慧的布依族人民能够通过自然美景制作出独具特色的枫香染。",
        },
        {
          author: "韩宗桓",
          imgUrl1: "https://s1.ax1x.com/2023/01/31/pSwTpfU.jpg",
          imgUrl2: "",
          imgUrl3: "",
          workName: "蔓生",
          workType: "美术作品",
          createTime: "2022-10-10",
          para1: "韩宗桓，就读于北京邮电大学电子商务及法律专业，接触学习过国画、素描、速写、卡通画等多种绘画类型，掌有一定绘画基础。爱好美术与设计，生活之余乐在自学马克笔、彩铅等传统纸质作画以及平板等现代数字绘画方式。大学期间加入发热体工作室进行创意设计工作，坚持发展爱好。2022年接触传统技艺“枫香染”，旨在感受深厚文化底蕴的同时进行相关创作与传承。",
          para2: "枫香染中具有丰富的民族文化内涵，被称为“画在布上的青花瓷”，枫香染在民族传承与历史发展中面临着机遇和挑战。此美术作品与枫香染相结合，传承了民族传统文化，并且发展了非物质文化遗产，我们知道非遗的传承于发扬需要不断地关注与研究传承道路。在创作此作品的时候，该同学希望创作出的作品不仅能够表达自己美好的祝福，同时也带着自己设计的独特性。该作品采用最古朴经典的青蓝底色、白线条，以藤蔓、枝叶等植物元素为主体构画出由中心向四周蔓延生长的场景；纹理顺应线条，尽量使不同元素间的连接柔和自然；同时加以花瓣形状的纸条、枫叶银杏叶等元素补充画面使其饱满。最后进行细节精修，使画面干净整洁美观，完成作品。创作从10月8日开始，10月10日结束；途中经过1稿成型。本人承诺，该美术作品为本人原创，全部著作权归本人所有，无侵犯第三著作人的情况。",
          para3: "蔓生为对称结构，符合中国传统审美，其在延续枫香染传统图案华丽柔美、自然饱满的基础上，将藤蔓、枝叶作为构图主体，从中心向四周绽放生长开来。作品本身正如创作过程中心情似春季万物复苏般漫生，重在自然和谐、精细优美。",
        }
      ]
    };
  },
  methods: {
    // handle() {
    //   // this.$router.push("detailsWorks");
    //   this.$router.push({
    //     name: "作品详情",
    //     params: {
    //       wid: this.sendData,
    //     },
    //   });
    // },
    clickImg(whichImg) {
      console.log(whichImg);
      //this.$router.push('fengxiangranWorks');
      this.$router.push({
        path: "/exhibition/allWorks/detailsWorks",
        query: {
          workId: this.displayList[whichImg].workId
        },
      });
    },
    changeWorks(type) {
      if(type === 0){
        this.type = 0
      }else {
        this.$message({
          message: "暂未开放",
          type: "warning"
        })
      }
    }
  },

  async created() {
    console.log("created");
    console.log(this.$route.query.num);
    let lt = this.$route.query.num;
    let that = this
    await searchWork(lt).then((res) => {
      if(res.data.code === 200){
        const body = res.data;
        const data = res.data.data
        console.log(res);
        // this.exhibitionList = res.data.data;
        // console.log(this.exhibitionList);
        this.workUrl = (data.workUrl===''||data.workUrl===null)?'https://fxr-1312386734.cos.ap-beijing.myqcloud.com/typeImg.png':data.workUrl
        this.workType = data.workType
        this.workBrief = data.workBrief
        this.workProvince = data.workProvince

        // console.log(this.workUrl);
        // console.log(this.workType);
        // console.log(this.workBrief);
        // console.log(this.workProvince);
      }
    });
    this.sendData.showorkId = lt + 1;
    // await getWorkInfo_para(this.sendData, this.headers).then((res) => {
    //   if(res.data.code === 200){
    //     const body = res.data;
    //     // console.log(res);
    //     // console.log(res);
    //     console.log(res);
    //     console.log(res.data);
    //     console.log(res.data.data);
    //     // console.log(res.data.data.content);
    //     // let t=JSON.parse(res.data.data);
    //     // console.log(t);
    //     this.workList = res.data.data;
    //     console.log(this.workList[0]);
    //     for (let i = 0; i < this.workList.length; i++) {
    //       this.urlList.push(this.workList[i].content.fileUrl);
    //       this.nameList.push(this.workList[i].content.workName);
    //       this.widList.push(this.workList[i].workId);
    //     }
    //     console.log(this.urlList);
    //   }
    // })
    // 先忽略吧
    await getWorksDisplay(false, true).then(res=>{
      if(res.data.code === 200){
        for(let i = 0; i < res.data.data.length; i++){
          if(res.data.data[i].content.showorkId === (Number(that.$route.query.num)+1)){  // 要类型对应先
            this.workList.push(res.data.data[i])
            console.log(res.data.data[i].content.collectionTextList)
            let urlStr = res.data.data[i].content.collectionPicList
            let textStr = res.data.data[i].content.collectionTextList
            let date = new Date(res.data.data[i].content.createDate)
            let dateRes = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()  // 获取日期
            // let textList = [textStr.substring(1, textStr.length-2)]
            // console.log(dateRes)

            let temp1 = textStr.substring(1, textStr.length - 1)
            temp1 = temp1.split(',')  // 文字段落
            // console.log(temp)
            console.log(temp1)

            let temp2 = urlStr.substring(1, urlStr.length - 1)
            temp2 = temp2.split(',')  // 对应图片
            console.log(temp2)

            this.displayList.push({
              imgUrls: temp2,
              workName: res.data.data[i].content.workName,
              date: dateRes,
              textList: temp1,
              workId: res.data.data[i].workId
            })
          }
        }
      }
    })
  },
};
</script>



<style scoped lang="less">
.allPP {
  margin-left: 100px;
}
.fengran {
  position: relative;
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .up {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    .up-left {
      position: relative;
      width: 600px;
      height: 300px;

      .fengpic {
        padding-left: 0;
        width: 540px;
        height: 360px;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .up-right {
      position: relative;
      // width: 70%;
      padding-right: 0;
      .fengup1 {
        padding-left: 0;
        padding-top: 10px;
        font-size: 32px;
        text-align: left;
      }
      .fengup2 {
        padding-left: 0;
        padding-top: 30px;
        font-size: 18px;
        text-align: left;
        line-height: 27px;

        font-family: 'Hind Vadodara',serif;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.01em;
      }
      .fengup3 {
        padding-left: 0;
        padding-top: 5px;
        font-size: 18px;
        text-align: left;
        max-width: 800px;
        line-height: 27px;
        font-family: 'Hind Vadodara',serif;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0.01em;
      }
    }
  }
  .center {
    position: relative;
    width: 100%;
    padding-top: 0;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      .leftP {
        font-size: 25px;
        cursor: pointer;
      }
      .rightP {
        font-size: 25px;
        cursor: pointer;
      }
    }
    .line {
      position: relative;
      width: 900px;
      height: 1px;
      background-color: #a5a5a5;
      margin-top: 20px;
      margin-left: 0;
    }
  }
  .down {
    position: relative;
    width: 100%;
    margin-top: 50px;
    .down-up {
      position: relative;
      width: 100%;
      .down-upl {
        position: relative;
        width: 30%;
        padding-left: 150px;
        .ran1 {
          padding-left: 20px;
          width: 65%;
          height: 30%;
          z-index: 9999;
        }
        .word11 {
          margin-left: 20px;
          padding-left: 20px;
          font-size: 15px;
          text-align: left;
        }
      }
      .down-upc {
        position: relative;
        width: 30%;
        padding-left: 500px;
        .ran2 {
          padding-left: 20px;
          width: 65%;
          height: 30%;
          z-index: 9999;
        }
        .word21 {
          padding-left: 20px;
          font-size: 15px;
          text-align: left;
        }
      }
      .down-upr {
        position: relative;
        width: 30%;
        padding-left: 850px;
        .ran3 {
          padding-left: 20px;
          width: 65%;
          height: 30%;
          z-index: 9999;
        }
        .word31 {
          padding-left: 20px;
          font-size: 15px;
          text-align: left;
        }
      }
    }
    .down-down {
      position: relative;
      width: 100%;
      height: 300px;
      .down-downl {
        position: relative;
        width: 30%;
        padding-left: 150px;
        .ran4 {
          padding-left: 20px;
          width: 65%;
          height: 30%;
          z-index: 9999;
        }
        .word41 {
          padding-left: 20px;
          font-size: 15px;
          text-align: left;
        }
      }
      .down-downc {
        position: absolute;
        width: 30%;
        padding-left: 500px;
        .ran5 {
          padding-left: 20px;
          width: 65%;
          height: 30%;
          z-index: 9999;
        }
        .word51 {
          padding-left: 20px;
          font-size: 15px;
          text-align: left;
        }
      }
      .down-downr {
        position: absolute;
        width: 30%;
        padding-left: 850px;
        .ran6 {
          padding-left: 20px;
          width: 65%;
          height: 30%;
          z-index: 9999;
        }
        .word61 {
          padding-left: 20px;
          font-size: 15px;
          text-align: left;
        }
      }
    }
  }
}
.downList{
  display: flex;
  flex-wrap: wrap;
  min-width: 1200px;
}
.displayImg{
  width: 368px;
  height: 282px;
  object-fit: cover;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 10px;
}
.workName{
  font-family: 'Hind Vadodara',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  /* identical to box height */

  letter-spacing: 0.01em;
}
.date{
  font-family: 'Hind Vadodara',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: 0.01em;

  color: #686868;
}
.noneWork{
  color: #b0b0b0;
  font-family: 'Hind Vadodara',serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.01em;
}
</style>
