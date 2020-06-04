//财务管理
import request from '@/utils/request'
//财务管理-审批操作
export function approve(data) {
    return request({
        url: 'api/financialManagement/approve',
        method: 'post',
        data
    })
}

