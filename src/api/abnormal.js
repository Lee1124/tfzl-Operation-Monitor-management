import request from '@/utils/request'
//获取异常事件-在线问诊监控菜单内容
export function abnormalInquiryMenu() {
    return request({
        url: 'api/home/abnormalevent',
        method: 'get'
    })
}

//获取异常事件-在线问诊监控事件类型内容
export function abnormalInquiryEventType() {
    return request({
        url: 'api/abnormal/onlineTable', 
        method: 'get'
    })
}

//提醒-发送
export function remind(data) {
    return request({
        url: 'api/abnormal/onlineRemind',
        method: 'post',
        data
    })
}

//批量提醒
export function moreRemind(data){
    return request({
        url: 'api/abnormal/onlineBatchRemind',
        method: 'post',
        data
    })
}
