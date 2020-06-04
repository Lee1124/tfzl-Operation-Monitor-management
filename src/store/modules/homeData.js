import { abnormalInquiryMenu } from "@/api/abnormal";

//获取首页的数据
const homeData = {
    namespaced: true,
    state: {
        homeMenuData: [
            {
                route: '/home/abnormal',
                path: "/abnormal/inquiry",
                title: "在线问诊监控",
                data: [
                    {
                        span: 0,
                        key: "userCancel",
                        name: "用户取消",
                        value: 0,
                        icon: "user"
                    },
                    {
                        span: 0,
                        key: "systemCancel",
                        name: "系统自动取消",
                        value: 0,
                        icon: "behavior"
                    },
                    {
                        span: 0,
                        key: "acceptTimeOut",
                        name: "接诊超时",
                        value: 0,
                        icon: "user"
                    },
                    {
                        span: 0,
                        key: "unFinish",
                        name: "审核处方超时",
                        value: 0,
                        icon: "user"
                    },
                    {
                        span: 0,
                        key: "auditTimeOut",
                        name: "未完成诊疗自动结束",
                        value: 0,
                        icon: "user"
                    },
                    {
                        span: 0,
                        key: "prescriptionTime",
                        name: "处方失效",
                        value: 0,
                        icon: "user"
                    }
                ]
            },
        ]
    },
    getters:{
        homeMenuData: state => state.homeMenuData
    },
    mutations: {
        //处理数据
        DEAL_DATA: (state, res) => {
            let key = res.key;
            let data = res.data;
            state.homeMenuData.forEach(item => {
                if (item.path === key) {
                    item.data.forEach(item2 => {
                        if (data[item2.key])
                            item2.value = data[item2.key];
                    })
                }
            })
        },
    },
    actions: {
        // 获取异常菜单信息
        getAbnormalMenu({ commit }) {
            return new Promise((resolve, reject) => {
                abnormalInquiryMenu().then(res => {
                    if (res.status === 0)
                        commit('DEAL_DATA', { key: "/abnormal/inquiry", data: res.data })
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default homeData;