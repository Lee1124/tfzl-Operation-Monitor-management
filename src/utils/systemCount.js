//关于该系统的计算或方法

import store from '@/store'

/**
* 添加合计
* @param {Array} data list json数据[{}]
* @param {Array} figureOutArr 要计算的字段数组["fee", "refundFee"]
*/
export function figureOut(data, figureOutArr) {
    let obj = {};
    obj.totalNumber = "合计：";
    figureOutArr.forEach(item => {
        obj[item] = dataReduce(data, item);
    });
    data.push(obj);
}
//数据累加形成合计
function dataReduce(data, reduceStr) {
    const sum = data.reduce((pre, item) => {
        return pre + item[reduceStr];
    }, 0);
    return sum.toFixed(store.getters['parameter/toFixed']);
}
/**
 * 小计
 * @param {Object} that 执行域
 * @param {Array} data list json数据[{}]
 * @param {Array} sumStr 要根据哪个字段进行小计 eg:'dept'
 * @param {Array} countArr 要计算的字段数组["fee", "refundFee"]
 */
export function subTotal(that, data, sumStr, countArr) {
    countArr.forEach(item => {
        that.subtotal[item] = 0;
    });
    for (let i = 0; i <= data.length; i++) {
        if (data[i - 1]) {
            countArr.forEach(item => {
                that.subtotal[item] += data[i - 1][item];
            });
        }
        if (data[i - 1] && data[i] && data[i - 1][sumStr] != data[i][sumStr]) {
            let obj = {};
            obj.totalNumber = "小计：";
            countArr.forEach(item => {
                obj[item] = that.subtotal[item].toFixed(store.getters['parameter/toFixed']);
            });
            data.splice(i, 0, obj);
            i++;
            countArr.forEach(item => {
                that.subtotal[item] = 0;
            });
        }
    }
}