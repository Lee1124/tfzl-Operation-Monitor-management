import request from '@/utils/request'
//获取评分
export function getComments(data) {
    return request({
        url: 'api/onlineMedicalOrder/comments',
        method: 'get',
        data
    })
}
//退费申请
export function returnFee(data){
    return request({
        url: 'api/onlineMedicalOrder/onlineRefund',
        method: 'post',
        data
    })
}
