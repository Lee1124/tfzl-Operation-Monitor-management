import request from '@/utils/request'
//获取院区/科室/医生
export function updateValue(data) {
    return request({
        url: 'api/systemConfig/updateValue',
        method: 'post',
        data
    })
}
