import request from '@/utils/request'
//获取院区/科室/医生
export function message() {
    return request({
        url: 'api/home/homeRemind',
        method: 'get'
    })
}
