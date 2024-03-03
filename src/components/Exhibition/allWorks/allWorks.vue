<template>
  <!--作品总览-->
  <div style="position: absolute; width: 100%">
    <!-- <jy-tab-bar :path-title="pathTitle"></jy-tab-bar> -->
    <div style="margin-top: 30px" class="displayAllContent" id="displayWorks">
      <div ref="map" style="height: 644px; width: 100%;min-width: 1400px;"></div>
      <!--调用map-->

      <!-- 筛选列表 -->
      <div class="middle">
        <el-row style="display: flex;justify-content: center;">
          <el-col :span="18"
            ><filter-manager
              class="creation-list-filter"
              :filterOptions="filterOptions"
              :filterSelected="filterSelected"
              @clickOption="clickFilterOptionHandle"
              select-color="#C71010"
            ></filter-manager
          ></el-col>
          <el-col :span="3">
            <div>
              <el-input placeholder="请输入" class="input">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input></div
          ></el-col>
        </el-row>
      </div>

      <div class="bottom">
        <div style="width: 1300px;display: flex;align-items: center;flex-wrap: wrap">
          <div v-for="(item, index) in exhibitionList" style="width: 325px;margin-top: 10px" :key="'work'+index">
            <div class="everyItem" @click="clickImg(item.id)">
              <img class="exImg" :src="(item.workUrl===''||item.workUrl===null)?$store.state.imgBaseUrl+'/typeImg.png':item.workUrl" alt="非遗"/>
              <div style="background-color: #000;width: 315px;height: 315px;position: absolute;opacity: 0.5">
              </div>
              <div style="display: flex; align-items: center; position: absolute;width: 300px;justify-content: center"><div v-for="(text, pos) in item.workType" :key="text+'-'+index+'-'+pos" class="allP">{{text}}</div></div>
            </div>
          </div>
        </div>
        <!-- <button @click="test">111</button> -->
<!--        <el-row :gutter="20" class="row1" style="display: flex;justify-content: center;">-->
<!--          <el-col :span="4" v-for="(item, index) in [9,1,2,3,4]"  style="width: 325px"-->
<!--          ><div style="display: flex;flex-direction: column;align-items: center;justify-content: center;" @click="clickImg(item)">-->
<!--            <img class="exImg" :src="workUrls[item]" alt="非遗"/>-->
<!--            <div style="background-color: #000;width: 315px;height: 315px;position: absolute;opacity: 0.5">-->
<!--            </div>-->
<!--            <p class="allP">{{ workTypes[item]}}</p>-->
<!--          </div></el-col-->
<!--          >-->
<!--        </el-row>-->
<!--        <el-row :gutter="20" style="display: flex;justify-content: center;margin-top: -20px">-->
<!--          <el-col :span="4" v-for="(item, index) in [5,6,7,8,0]" style="width: 325px;height: 325px"-->
<!--          ><div style="display: flex;flex-direction: column;align-items: center;justify-content: center;" @click="clickImg(item)">-->
<!--            <img class="exImg" :src="workUrls[item]" alt="非遗"/>-->
<!--            <div style="background-color: #000;width: 315px;height: 315px;position: absolute;opacity: 0.5">-->
<!--            </div>-->
<!--            <p class="allP">{{ workTypes[item]}}</p>-->
<!--          </div></el-col-->
<!--          >-->
<!--        </el-row>-->
      </div>
      <div style="margin-top: 15px">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage3"
            :page-size="1"
            layout="prev, pager, next, jumper"
            :total="totalPage">
        </el-pagination>
      </div>
      <div style="margin-top: 50px;"></div>
    </div>
  </div>
</template>

<script>
import jyTabBar from "@/components/tabbar/jyTabbar/jyTabBar";
import { WorkTypeLabelMap } from "@/types/LabelMap";
import FilterManager from "@/components/fitler-manager.vue";
import { getList } from "@/api";
import {} from "vue";
export default {
  name: "allWorks",
  components: {
    jyTabBar,
    FilterManager,
  },
  data() {
    return {
      currentPage3: this.$route.query.page,
      pathTitle: [
        { name: "数字展馆", url: "/exhibition/home" },
        { name: "作品总览", url: "" },
      ],
      filterOptions: [
        {
          key: "area",
          label: "地域",
          value: [
            { key: "all", label: "全部" },
            { key: "dongbei", label: "东北" },
            { key: "huabei", label: "华北" },
            { key: "huazhong", label: "华中" },
            { key: "huadong", label: "华东" },
            { key: "huanan", label: "华南" },
            { key: "xibei", label: "西北" },
            { key: "xinan", label: "西南" },
          ],
        },
        {
          key: "createDate",
          label: "发布时间",
          value: [
            { key: "all", label: "全部" },
            { key: "yizhou", label: "一周内" },
            { key: "yiyue", label: "一月内" },
            { key: "yinian", label: "一年内" },
            { key: "sannian", label: "三年内" },
          ],
        },
        {
          key: "workType",
          label: "非遗类型",
          value: [
            { key: "all", label: "全部" },
            ...Object.entries(WorkTypeLabelMap).map(([key, value]) => ({
              key,
              label: value,
            })),
          ],
        },
      ],
      filterSelected: {
        area: "all",
        createDate: "all",
        workType: "all",
      },
      exhibitionList: [],
      workUrls: [],
      workTypes: [],
      totalPage: 0
    };
  },
  async created() {
    console.log("created");
    // let page = 0
    // if(this.$route.query.page===undefined||this.$route.query.page===null){
    //   this.$router.push({path: "/exhibition/allWorks/worksDisplay", query: {page: 1}})
    // }else {
    //   this.currentPage3 = this.$route.query.page
    //   page = this.$route.query.page
    // }
    await getList(1).then((res) => {
      if(res.data.code === 200){
        this.totalPage = res.data.data.pages
        for (let i = 0; i < res.data.data.records.length; i++) {
          let types = []
          if(res.data.data.records[i].workType.length > 5){
            let type = res.data.data.records[i].workType
            let resStr = res.data.data.records[i].workType
            if(type.indexOf("（")!==-1){
              console.log(type.indexOf("）"))
              // resStr = type.substr(0, type.indexOf("（")) + "—" + type.substr(type.indexOf("（")+1, type.indexOf("）")-type.indexOf("（")-1)
              resStr = resStr.replace("（", "—")
              resStr = resStr.replace("）", "")
              // console.log(type.substr(type.indexOf("（")+1, type.length-1))
              // resStr.replace("）","")
              console.log(resStr)
            }
            for(let j = 0;; j++){
              if ((4*j + 4) > resStr.length){
                types.push(resStr.slice(4*j, resStr.length))
                break
              }else {
                types.push(resStr.slice(4*j, 4*j+4))
                if((4*j + 4) === resStr.length){
                  break
                }
              }
            }
          }else {
            types = [res.data.data.records[i].workType]
          }
          this.exhibitionList.push({
            id: res.data.data.records[i].id,
            workUrl: res.data.data.records[i].workUrl,
            // workType: res.data.data.records[i].workType
            workType: types
          })
          // let e=this.exhibitionList[i].workUrl;
          // // e=e.slice(1,e.length-1);
          // this.workUrls.push(e);
          // this.workTypes.push(this.exhibitionList[i].workType);
        }
        console.log(this.exhibitionList)
        // const body = res.data;
        // console.log("枫香染", res.data);
        // this.exhibitionList = res.data.data;
        // console.log(this.exhibitionList);
        // for (let i = 0; i < this.exhibitionList.length; i++) {
        //   let e=this.exhibitionList[i].workUrl;
        //   // e=e.slice(1,e.length-1);
        //   this.workUrls.push(e);
        //   this.workTypes.push(this.exhibitionList[i].workType);
        // }
        // console.log(this.workUrls);
        // console.log(this.workTypes);
      }
    });
  },
  methods: {
    handleSizeChange(val){

    },
    async handleCurrentChange(val){
      // this.$router.push({path: "/exhibition/allWorks/worksDisplay", query: {page: val}})
      await getList(val).then((res) => {
        if(res.data.code === 200){
          // this.totalPage = res.data.data.pages
          let len = this.exhibitionList.length
          console.log(this.exhibitionList)
          for(let i = 0; i < len; i++){
            this.exhibitionList.splice(0,1)
          }
          // this.exhibitionList = []
          for (let i = 0; i < res.data.data.records.length; i++) {
            let types = []
            if(res.data.data.records[i].workType.length > 5){
              let type = res.data.data.records[i].workType
              let resStr = res.data.data.records[i].workType
              if(type.indexOf("（")!==-1){
                // resStr = type.substr(0, type.indexOf("（")) + "—" + type.substr(type.indexOf("（")+1, type.indexOf("）")-type.indexOf("（")-1)
                resStr = resStr.replace("（", "—")
                resStr = resStr.replace("）", "")
              }
              for(let j = 0;; j++){
                if ((4*j + 4) > resStr.length){
                  types.push(resStr.slice(4*j, resStr.length))
                  break
                }else {
                  types.push(resStr.slice(4*j, 4*j+4))
                  if((4*j + 4) === resStr.length){
                    break
                  }
                }
              }
            }else {
              types = [res.data.data.records[i].workType]
            }
            this.exhibitionList.push({
              id: res.data.data.records[i].id,
              workUrl: res.data.data.records[i].workUrl,
              workType: types
            })
          }
          console.log(this.exhibitionList)
          window.scrollTo(0,0)
        }
      })
    },
    clickFilterOptionHandle() {
      console.log(this.filterSelected);
    },
    clickImg(whichImg){
      console.log(whichImg);
      //this.$router.push('fengxiangranWorks');
      this.$router.push({
        path: "fengxiangranWorks",
        query: {
          num: whichImg,
          name: this.workTypes[whichImg]
        },
      });
    },
    test() {},
    getmap() {
      // 基于准备好的dom(myEchartPillar)，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.map);
      var mapName = "china";
      var data = [
        { name: "北京", value: 27 }, //省份数据
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 66 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 154 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
        { name: "台湾", value: 11},
        { name: "南海诸岛", value: 112}
      ];

      var geoCoordMap = {};
      var toolTipData = [
        { name: "北京", value: [{ name: "记录量", value: 95 }] },
        { name: "天津", value: [{ name: "记录量", value: 22 }] },
        { name: "河北", value: [{ name: "记录量", value: 60 }] },
        { name: "山西", value: [{ name: "记录量", value: 40 }] },
        { name: "内蒙古", value: [{ name: "记录量", value: 23 }] },
        { name: "辽宁", value: [{ name: "记录量", value: 39 }] },
        { name: "吉林", value: [{ name: "记录量", value: 41 }] },
        { name: "黑龙江", value: [{ name: "记录量", value: 35 }] },
        { name: "上海", value: [{ name: "记录量", value: 12 }] },
        { name: "江苏", value: [{ name: "记录量", value: 47 }] },
        { name: "浙江", value: [{ name: "记录量", value: 57 }] },
        { name: "安徽", value: [{ name: "记录量", value: 57 }] },
        { name: "福建", value: [{ name: "记录量", value: 59 }] },
        { name: "江西", value: [{ name: "记录量", value: 49 }] },
        { name: "山东", value: [{ name: "记录量", value: 67 }] },
        { name: "河南", value: [{ name: "记录量", value: 69 }] },
        { name: "湖北", value: [{ name: "记录量", value: 60 }] },
        { name: "湖南", value: [{ name: "记录量", value: 62 }] },
        { name: "重庆", value: [{ name: "记录量", value: 47 }] },
        { name: "四川", value: [{ name: "记录量", value: 65 }] },
        {
          name: "贵州",
          value: [
            { name: "记录量", value: 32 },
            { name: "记录量", value: 30 },
          ],
        },
        { name: "云南", value: [{ name: "文科", value: 42 }] },
        { name: "西藏", value: [{ name: "文科", value: 5 }] },
        { name: "陕西", value: [{ name: "文科", value: 38 }] },
        { name: "甘肃", value: [{ name: "文科", value: 28 }] },
        { name: "青海", value: [{ name: "文科", value: 5 }] },
        { name: "宁夏", value: [{ name: "文科", value: 10 }] },
        { name: "新疆", value: [{ name: "文科", value: 36 }] },
        { name: "广东", value: [{ name: "文科", value: 63 }] },
        { name: "广西", value: [{ name: "文科", value: 29 }] },
        { name: "海南", value: [{ name: "文科", value: 8 }] },
        { name: "台湾", value: [{ name: "文科", value: 10}]},
        { name: "南海诸岛", value: [{ name: "文科", value: 0}]}
      ];
      /*获取地图数据*/
      myChart.showLoading();
      var mapFeatures = this.$echarts.getMap(mapName).geoJson.features;
      myChart.hideLoading();
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      var convertData = function (data) {
        //进行数据处理
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      //指定图表的配置项和数据，绘制图表
      myChart.setOption({
        tooltip: {
          show: false,
          extraCssText: "z-index: 2",
          trigger: "item",
          formatter: function (params) {
            var toolTiphtml = "";
            if (typeof params.value[2] == "undefined") {
              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name === toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
              console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            } else {
              for (let i = 0; i < toolTipData.length; i++) {
                if (params.name === toolTipData[i].name) {
                  toolTiphtml += toolTipData[i].name + ":<br>";
                  for (let j = 0; j < toolTipData[i].value.length; j++) {
                    toolTiphtml +=
                      toolTipData[i].value[j].name +
                      ":" +
                      toolTipData[i].value[j].value +
                      "<br>";
                  }
                }
              }
              console.log(toolTiphtml);
              // console.log(convertData(data))
              return toolTiphtml;
            }
          },
        },
        // legend: {
        //     orient: 'vertical',
        //     y: 'bottom',
        //     x: 'right',
        //     data: ['credit_pm2.5'],
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        
        visualMap: {
          show: false,
          min: 0,
          max: 200,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#fff"]
            // color: ["#ffe3ac", "#fc655e", "#8c110b"], // 蓝绿
          },
        },

        geo: {
          roam: false,
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: "#f2e4cc",
              // borderColor: "#611a10",
              borderColor: "#000",
            },
            emphasis: {
              areaColor: "#fff",
              borderColor: "#C71010"
            },
          },
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            // data: convertData(data),
            data: convertData(
                data
                    .sort(function (a, b) {
                      return b.value - a.value;
                    })
                    .slice(5)
            ),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              normal: {  // 省份
                formatter: "{b}",
                position: "center",
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#000",
              },
            },
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#000",
                borderColor: "#000",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: data,
          },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin", //气泡
            data: convertData(
                data
                    .sort(function (a, b) {
                      return b.value - a.value;
                    })
                    .slice(0, 5)
            ),
            symbolSize: function (val) {
              return val[2] / 5;
            },
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: "#fff",
                  fontSize: 9,
                },
              },
            },
            itemStyle: {
              normal: {
                color: "#C71010", //标志颜色
              },
            },
            zlevel: 6,
            // data: convertData(data),
          },
          // {
          //   name: "Top 5",
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   data: convertData(
          //     data
          //       .sort(function (a, b) {
          //         return b.value - a.value;
          //       })
          //       .slice(0, 5)
          //   ),
          //   symbolSize: function (val) {
          //     return val[2] / 10;
          //   },
          //   showEffectOn: "render",
          //   rippleEffect: {
          //     brushType: "stroke",
          //   },
          //   hoverAnimation: true,
          //   label: {
          //     normal: {
          //       formatter: "{b}",
          //       position: "right",
          //       show: false,
          //     },
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: "#C71010",
          //       shadowBlur: 10,
          //       shadowColor: "#C71010",
          //     },
          //   },
          //   zlevel: 1,
          // },
        ],
      });

      //解决自适应
      setTimeout(function () {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 500);
    },
  },
  mounted() {
    this.getmap();
  },
};
</script>

<style scoped>
.displayAllContent {
  width: 100%;
  min-width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.down {
  width: 100%;
  display: flex;
}
.input {
  width: 200px;
}
.middle {
  margin-top: 30px;
  margin-bottom: 30px;
}
.bottom{
  max-width: 1400px;
}
.exImg{
  width: 315px;
  height: 315px;
  object-fit: cover;
}
.row1{
  margin-bottom: 30px;
}
.allP{
  /*position: absolute;*/
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  font-size: 45px;
  width: 50px;
  height: 300px;
  font-family: 'Songti SC',fangsong;
  font-style: normal;
  font-weight: 900;
  line-height: 60px;
  /*background: #C71010;*/
  /*overflow: hidden;*/
  align-items: center;
  justify-content: center;
}
.everyItem{
  width: 315px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  cursor: pointer;
}
.everyItem:hover{
  box-shadow: 2px 2px 8px #9b9b9b;
  transform: translateY(-3px);
}
#displayWorks>>>.el-input__inner{
  border: 1px solid #9E9E9E;
}
#displayWorks>>>.el-input__inner:focus{
  border: 1px solid #C71010;
}
#displayWorks>>>.el-input__inner:hover{
  border: 1px solid #C71010;
}
#displayWorks>>>.el-pagination button{
  transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
}
#displayWorks>>>.el-pagination button:hover{
  color: #C71010;
}
#displayWorks>>>.el-pager li{
  transition-duration: 0.2s;
  -moz-transition-duration: 0.2s;
  -webkit-transition-duration: 0.2s;
  -o-transition-duration: 0.2s;
}
#displayWorks>>>.el-pager li.active{
  color: #C71010;
}
#displayWorks>>>.el-pager li:hover{
  color: #C71010;
}
</style>