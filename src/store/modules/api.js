//系统请求参数
const api = {
    namespaced: true,
    state: {
        abnormalOnlineContent:"api/abnormal/onlineContent",
        notApproved: 'api/financialManagement/noApprove',
        approved: 'api/financialManagement/Approved',
    },
    getters: {
        abnormalOnlineContent: state => state.abnormalOnlineContent,//异常事件监控-在线问诊订单
        notApproved: state => state.notApproved,//财务管理-退款审批-未审批
        approved: state => state.approved,//财务管理-退款审批-已审批
    },
    mutations: {
    },
    actions: {
    }
}
export default api;