import { getHospitals } from "@/api/common.js";
import { abnormalInquiryEventType } from "@/api/abnormal.js";
import { deepClone, getCurrentDay, timeFrame } from "@/utils/index.js";
//系统配置参数
const parameter = {
    namespaced: true,
    state: {
        //保留几位小数
        toFixed: 2,
        //查询处默认区间（30天）
        defaultTimeRegion: 300,
        //查询处默认显示当天的数据getCurrentDay()
        defaultTodayTimeRegion: timeFrame(200),
        //有无院区
        isHavehospitals: false,
        //院区/科室/医生
        hospitals: [],
        //科室
        departments: [],
        //系统异常订单类型
        systemAbnormalTypes: [
            { label1: '在线问诊订单', label2: '接诊超时', path: '/abnormal/inquiry', value: 1 },
            { label1: '在线问诊订单', label2: '审核处方超时', path: '/abnormal/inquiry', value: 2 },
            { label1: '护理服务订单', label2: '接单超时', path: '/abnormal/nurse', value: 3 },
            { label1: '护理服务订单', label2: '接收超时', path: '/abnormal/nurse', value: 4 },
            { label1: '护理服务订单', label2: '超时未上门', path: '/abnormal/nurse', value: 5 },
        ],
        //在线问诊订单-订单类型
        inquiry_orderTypes: [
            { label: "在线问诊", value: 1 },
            { label: "处方", value: 2 }
        ],
        //在线问诊监控-提醒状态
        inquiry_reminds: [
            { label: "未提醒", value: 0 },
            { label: "已提醒", value: 1 }
        ],
        //在线问诊监控-在线问诊事件类型
        inquiry_eventTypes: [
            { count: 0, key: 'userCancel', label: '用户取消', value: 1 },
            { count: 0, key: 'systemCancel', label: '系统自动取消', value: 2 },
            { count: 0, key: 'acceptTimeOut', label: '接诊超时', value: 3 },
            { count: 0, key: 'unFinish', label: '未完成诊疗自动结束', value: 4 },
            { count: 0, key: 'auditTimeOut', label: '审核处方超时', value: 5 },
            { count: 0, key: 'prescriptionTime', label: '处方失效', value: 6 },
        ],
        //在线问诊监控-订单状态
        inquiry_orderState: [
            { label: '退单', value: -1 },
            { label: '返回修改', value: -2 },
            { label: '待支付', value: 0 },
            { label: '待接单', value: 1 },
            { label: '问诊中', value: 2 },
            { label: '审核不通过', value: 3 },
            { label: '待转诊确认', value: 4 },
            { label: '医生发起结束问诊', value: 5 },
            { label: '开处方中', value: 6 },
            { label: '换诊确认', value: 7 },
            { label: '待评价', value: 8 },
            { label: '已完成', value: 9 },
        ],
        //在线问诊监控-处方状态
        inquiry_prescriptionState: [
            { label: '未审核', value: -1 },
            { label: '退回', value: 0 },
            { label: '通过', value: 1 },
            { label: '自取', value: 2 },
            { label: '已配送', value: 3 },
            { label: '过期', value: 4 },
        ],
        //在线问诊监控-护理监控事件类型
        nurse_eventTypes: [
            { count: 0, key: 'userCancel', label: '未服务用户取消', value: 1 },
            { count: 0, key: 'systemCancel', label: '服务后取消', value: 2 },
            { count: 0, key: 'acceptTimeOut', label: '接单超时', value: 3 },
            { count: 0, key: 'unFinish', label: '接收超时', value: 4 },
            { count: 0, key: 'auditTimeOut', label: '超时未上门', value: 5 },
        ],
        //在线问诊监控-预约体检事件类型
        test_eventTypes: [{ count: 0, key: 'userCancel', label: '用户取消', value: 1 }],
        //期间类型（图表处用的多）
        periodTypes: [
            { label: "日", value: 0 },
            { label: "月", value: 1 },
            { label: "季", value: 2 },
            { label: "年", value: 3 }
        ],
        //民族
        nations: [
            { label: "汉族", value: 0 },
            { label: "其它", value: 1 },
        ],
        //年龄段
        ageRanges: [
            { label: "儿童(5～11)", value: 0 },
            { label: "青年(19～35)", value: 1 },
            { label: "中年(36～59)", value: 2 },
            { label: "老年(60以上)", value: 3 }
        ],
        //性别
        sexs: [
            { label: "男", value: 0 },
            { label: "女", value: 1 },
        ],
        //门诊缴费汇总-费用项目
        expenseItem: [
            { label: "在线问诊", value: 0 },
            { label: "护理服务", value: 1 },
            { label: "预约体检", value: 2 },
        ],
        //工作量统计-角色
        roles: [
            { label: "医生", value: 0 },
            { label: "护士", value: 1 },
            { label: "药师", value: 2 },
        ],
        //工作量统计-服务项目
        serviceItems: [
            { label: "在线问诊", value: 0 },
            { label: "护理服务", value: 1 },
            { label: "处方审核", value: 2 },
        ],
        //退款审批-订单类型
        refund_orderTypes: [
            { label: "在线问诊", value: 1 },
            { label: "护理服务", value: 2 },
        ],
        //退款审批-退款审批结果
        approved_result: [
            { label: "通过", value: 1 },
            { label: "不通过", value: 2 },
        ],
        //退款审批-退款状态
        refund_status: [
            { label: "已退款", value: 1 },
            { label: "未退款", value: 2 },
        ],
    },
    getters: {
        toFixed: state => state.toFixed,
        systemAbnormalTypes: state => state.systemAbnormalTypes,
        defaultTimeRegion: state => state.defaultTimeRegion,
        defaultTodayTimeRegion: state => state.defaultTodayTimeRegion,
        isHavehospitals: state => state.isHavehospitals,
        hospitals: state => state.hospitals,
        departments: state => state.departments,
        inquiry_eventTypes: state => state.inquiry_eventTypes,
        inquiry_orderState: state => state.inquiry_orderState,
        inquiry_prescriptionState: state => state.inquiry_prescriptionState,
        inquiry_reminds: state => state.inquiry_reminds,
        inquiry_orderTypes: state => state.inquiry_orderTypes,
        nurse_eventTypes: state => state.nurse_eventTypes,
        test_eventTypes: state => state.test_eventTypes,
        periodTypes: state => state.periodTypes,
        nations: state => state.nations,
        ageRanges: state => state.ageRanges,
        sexs: state => state.sexs,
        expenseItem: state => state.expenseItem,
        roles: state => state.roles,
        serviceItems: state => state.serviceItems,
        refund_orderTypes: state => state.refund_orderTypes,
        approved_result: state => state.approved_result,
        refund_status: state => state.refund_status,
    },
    mutations: {
        //有无院区
        SET_ISHAVEHOS: (state, bool) => {
            state.isHavehospitals = bool;
        },
        //获取院区/科室/医生赋值
        SET_HOSPITALS: (state, data) => {
            state.hospitals = data;
        },
        //设置科室
        SET_DEPARTMENTS: (state, data) => {
            state.departments = data;
        },
        //设置在线问诊监控-事件类型
        SET_INEVENTTYPES: (state, data) => {
            state.inquiry_eventTypes = data;
        }
    },
    actions: {
        //获取在线问诊监控的事件类型
        getInquiryEventTypes({ commit, state }) {
            return new Promise((resolve, reject) => {
                abnormalInquiryEventType().then(res => {
                    dealInquiryEventTypesData(res, commit, state);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //获取院区/科室/医生
        getHospitals({ commit }) {
            return new Promise((resolve, reject) => {
                getHospitals().then(res => {
                    dealHospitalsData(res, commit);
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //获取全部科室
        getDepartments({ commit, state }) {
            let hospitals = state.hospitals;
            let arr = [];
            hospitals.forEach(item => {
                arr = arr.concat(item.data);
            })
            commit('SET_DEPARTMENTS', arr);
        }
    }
}

//处理数据
const dealHospitalsData = (res, commit) => {
    let isHaveArea = res.data.isHaveArea === 1 ? true : false;
    commit('SET_ISHAVEHOS', isHaveArea);//isHaveArea
    let list = res.data.list;
    if (isHaveArea) {//有院区
        let hospitals = list.map(item => {
            return {
                label: item.name,
                value: item.id,
                data: item.depts.map(item2 => {
                    return {
                        label: item2.name,
                        value: item2.id,
                        data: item2.users.map(item3 => {
                            return {
                                label: item3.name,
                                value: item3.id,
                                role: item3.role,
                                dept: item3.dept,
                            }
                        })
                    }
                })
            }
        })
        commit('SET_HOSPITALS', hospitals);
    } else {//无院区
        let departments = list.map(item2 => {
            return {
                label: item2.name,
                value: item2.id,
                data: item2.users.map(item3 => {
                    return {
                        label: item3.name,
                        value: item3.id,
                        role: item3.role,
                        dept: item3.dept,
                    }
                })
            }
        })
        commit('SET_DEPARTMENTS', departments);
    }
}
//处理在线问诊监控的事件类型数据
const dealInquiryEventTypesData = (res, commit, state) => {
    let data = deepClone(state.inquiry_eventTypes);
    let newArr = data.map(item => {
        if (res.data[item.key] || res.data[item.key] == 0)
            item.count = res.data[item.key];
        return item
    })
    //  console.log('处理在线问诊监控的事件类型数据', newArr)
    commit('SET_INEVENTTYPES', newArr);
}
export default parameter;