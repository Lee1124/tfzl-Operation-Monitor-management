import request from '@/utils/request'
//获取院区/科室/医生
export function getHospitals() {
    return request({
        url: 'auth/organizationPerson/getAll',
        method: 'get'
    })
}
