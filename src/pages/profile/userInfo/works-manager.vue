<template>
    <div class="works-manager">
        <!-- 筛选器 -->
        <filter-manager class="filter-manager" 
        :filterOptions="filterOptions" 
        :filterSelected="filterSelected" 
        @clickOption="getOption" 
        :data="galleryData" 
        :selectType="selectType" 
        :isSelectWork="true" 
        :displayStatus="displayStatus"></filter-manager>

        <!-- gallery -->
        <gallery-manager class="gallery-manager" :data="galleryData" :selectType="selectType" :displayStatus="displayStatus"></gallery-manager>
    </div>
</template>

<script>
    import FilterManager from '@/components/fitler-manager.vue'
    import GalleryManager from './components/gallery-manager.vue'
    import { WorkTypeLabelMap } from '@/types/LabelMap'
    import { getWork } from '../../../api'
    export default {
        name: 'works-manager',
        components: {
            FilterManager,
            GalleryManager
        },
        data() {
            return {
                displayStatus: [],
                selectType: [{type: "全部"},{type: "全部"},{type: "全部"}],
                filterOptions: [
                    {
                        key: 'reviewStatus',
                        label: '作品状态',
                        value: [
                            { key: '全部', label: '全部' },
                            { key: '上传作品', label: '上传作品' },
                            { key: '作品存证', label: '作品存证' },
                            { key: '版权注册', label: '版权注册' },
                            { key: '登记确权', label: '登记确权' },
                        ]
                    },
                    {
                        key: 'approvalStatus',
                        label: '审核状态',
                        value: [
                            { key: '全部', label: '全部' },
                            { key: '已完成', label: '已完成' },
                            { key: '审核中', label: '审核中' },
                            { key: '未通过', label: '未通过' },
                            { key: '草稿', label: '草稿' },
                        ]
                    },
                    {
                        key: 'workType',
                        label: '作品类型',
                        value: [
                            { key: '全部', label: '全部' },
                            ...Object.entries(WorkTypeLabelMap).map(([key, value]) => ({key, label: value}))
                        ]
                    },
                ],
                filterSelected: {
                    reviewStatus: '全部',
                    approvalStatus: '全部',
                    workType: '全部',
                },
                galleryData: [
                    // {
                    //     imageSrc: 'https://fxr-1312386734.cos.ap-beijing.myqcloud.com/%E4%BD%9C%E5%93%81%E7%AE%A1%E7%90%86/logo.png',
                    //     title: '作品名称',
                    //     labels: ['上传作品', '已完成', '文学']
                    // }
                ]
            }
        },
        created() {
            let that = this
            getWork().then((res)=>{
                if(res.data.data !== null) {
                  console.log(res.data.data)
                    for(let i = 0; i < res.data.data.length; i++) {
                        let tag1
                        let Tag2
                        let tag2
                        let tag3
                        if(res.data.data[i].status !== null) {
                            Tag2 = res.data.data[i].status.substring(4)
                            tag1 = res.data.data[i].status.substring(0,4)
                            console.log(Tag2.length)
                            if(Tag2.indexOf("中") !== -1) {
                                tag2 = "审核中"
                            }else if(Tag2.indexOf("成功") !== -1) {
                                tag2 = "已完成"
                            }else if(Tag2.indexOf("失败") !== -1) {
                                tag2 = "未通过"
                            }else if(Tag2.indexOf("草稿") !== -1) {
                                tag2 = "草稿"
                            }
                            // // 临时加的
                            // if(res.data.data[i].workId === 97){
                            //   tag2 = "已完成"
                            // }
                        }else{
                            tag1 = "上传作品"
                            tag2 = "已完成"
                        }
                        tag3 = WorkTypeLabelMap[res.data.data[i].content.workType]
                        that.galleryData.push({
                            imageSrc: res.data.data[i].content.fileUrl,
                            title: res.data.data[i].content.workName,
                            labels: [tag1, tag2, tag3],
                            workId: res.data.data[i].workId
                        })
                        this.displayStatus.push({status: true})
                    }
                }
            })
        },
        methods: {
            getType(type) {
                return WorkTypeLabelMap[type]
            },
            getOption(optionArr) {
                let pos = 0
                if(optionArr[0] === "reviewStatus") {
                    pos = 0
                }else if(optionArr[0] === "approvalStatus") {
                    pos = 1
                }else {
                    pos = 2
                }
                this.selectType.splice(pos, 1, {type: this.filterOptions[pos].value[optionArr[1]].label})
            }
        }
    }
</script>
<style lang="less" scoped>
    .works-manager {
        padding: 60px;

        .filter-manager {
            padding-bottom: 50px;
        }
    }
</style>