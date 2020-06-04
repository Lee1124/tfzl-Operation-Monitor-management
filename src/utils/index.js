/**
 * 
 * @param {*} that 
 * @param {*} type 
 * @param {*} msg 
 */
export function notify(that, type, title, msg) {
    that.$notify({
        title: title,
        message: msg,
        type: type
    });
}

/**
 * 多个数组对应相加返回新的数组 
 * @param {*} allArr 所有数组的组合 let arr1=[1,2,3,4,5]... [arr1,arr2,arr3]
 * @param {*} key 关键词
 */
export function moreArrayAdd(allArr, key) {
    let result = [];
    for (let i = 0; i < allArr.length; i++) {
        allArr[i][key].forEach((item, index) => {
            if (!result[index]) {
                result[index] = 0;
            }
            result[index] += item;
        })
    }
    return result;
}

/**
 * 根据值选出目标数组中的对应的值item
 * @param {*} targetArr 数组
 * @param {*} value 值
 */
export function filterItem(targetArr, value) {
    let arr = targetArr.filter(item => item.value === value);
    return arr.length > 0 ? arr[0] : "";
}

/**
 * 根据数据字段筛选出来形成数组
 * @param {*} data 数据
 * @param {*} key 关键词
 */
export function getArrary(data, key) {
    let arr = [];
    data.forEach(item => {
        arr.push(item[key]);
    });
    return arr;
}

/**
 * 根据数组字段与自定义字段相等筛选出来形成数组
 * @param {*} data 数组
 * @param {*} key1 数组中的字段
 * @param {*} key2 自定义名称
 */
export function getFilterArrary(data, key1, key2) {
    return data.filter(item => item[key1] === key2);
}


/**
 * 根据json数据中的关键词判断是否该值都相等
 * @param {*} array json数据
 * @param {*} key 关键词
 */
export function isAllEqual(array, key) {
    if (array.length > 0) {
        return !array.some(item => {
            return item[key] !== array[0][key];
        });
    } else {
        return true;
    }
}

/**
* 秒级别倒计时
* @param {time} 倒计时的总时间
* @param {interval} 倒计时的间隔时间
* @param {pending} 进行中的回调
* @param {callback} 倒计时结束回调
*/
export function clock(time = 60, interval = 1000, pending, callback) {
    let timeID = setInterval(() => {
        if (time <= 0) {
            clearInterval(timeID);
            callback && callback()
        } else {
            time--;
            pending && pending(time)
        }
    }, interval);
}

/**
 * 使用递归的方式实现数组、对象的深拷贝
* @obj {string} object 拷贝的对象
*/
export function deepClone(obj) {
    //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

/**
 * 打印功能，由于是vue+element所以插件print.js则用不了，否则打印会空白
 * 所以根据原生方法自己做处理
 * 如果要设置打印范围中的某些元素的样式可以用媒体查询
 * '@media' print{}去设置
 * 
 * @param {*} idName id选择器名字
 */
export function doPrint(idName) {
    let printbox = document.querySelector(idName).innerHTML;
    document.querySelector("body").innerHTML = printbox;
    window.print();
    window.location.reload();
}

/**
 * 跳转页面打印功能 
 * @param {*} that 执行域
 * @param {*} idName 打印要展示的内容
 * @param {*} title 网页标题
 */
export function openPrint(that, idName, title = '打印') {
    let printHTML = document.querySelector(idName).innerHTML;
    let routeData = that.$router.resolve({
        path: "/print",
        query: { HTML: JSON.stringify(printHTML), title: title }
    });
    window.open(routeData.href, "_blank");
}



/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }
}

/**
 * 选取时间区间，根据天数来确定范围
 * @param {*} val 天数
 */
export function timeFrame(val = 7) {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * val);
    const startTime = start.getFullYear() + '-' + ((start.getMonth() + 1) < 10 ? "0" + (start.getMonth() + 1) : (start.getMonth() + 1)) + '-' + (start.getDate() < 10 ? "0" + start.getDate() : start.getDate());
    const endTime = end.getFullYear() + '-' + ((end.getMonth() + 1) < 10 ? "0" + (end.getMonth() + 1) : (end.getMonth() + 1)) + '-' + (end.getDate() < 10 ? "0" + end.getDate() : end.getDate());
    return [startTime, endTime];
}

/**
 * 时间转换(年月日时分秒)
 * @param {*} time 时间
 * @param {*} str 隔开符号
 */
export function getY_M_D_H_M_S(time, str = '-', hfm = true) {
    const d = new Date(time);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
    const day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
    const hour = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours();
    const minute = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes();
    const second = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds();
    if (hfm) {
        const ts = year + str + month + str + day + ' ' + hour + ':' + minute + ':' + second;
        return ts;
    } else {
        const ts = year + str + month + str + day;
        return ts;
    }
}

/**
 * 获取当天时间段 ["2020-05-20 00:00:00", "2020-5-20 23:59:59"]
 */
export function getCurrentDay() {
    var date1 = new Date(new Date(new Date().toLocaleDateString()).getTime());
    var date2 = new Date();//+ 24 * 60 * 60 * 1000 - 1
    var startTime = date1.getFullYear() + "-" + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + "-" + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate()) + " " + (date1.getHours() < 10 ? "0" + date1.getHours() : date1.getHours()) + ":" + (date1.getMinutes() < 10 ? "0" + date1.getMinutes() : date1.getMinutes()) + ":" + (date1.getSeconds() < 10 ? "0" + date1.getSeconds() : date1.getSeconds());
    var endTime = date2.getFullYear() + '-' + ((date2.getMonth() + 1) < 10 ? "0" + (date2.getMonth() + 1) : (date2.getMonth() + 1)) + '-' + (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate()) + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds();
    return [startTime, endTime]
}

/**
 * 根据value获取相应的label
 * @param {*} arr 数据
 */
export function findName(arr, val) {
    let name = arr.filter(item => item.value === val);
    name = name.length > 0 ? name[0].label : "";
    return name;
}

/**
 * 清空该组件中对象所有键对应的值
 * @param {*} obj 对象
 */
export function clearObjectVal(obj) {
    Object.keys(obj).map(key => obj[key] = '')
    return obj;
}

/**
 * 重置select子组件选择的值
 * @param {*} that 执行域
 * @param {*} arr ["departments", "doctors"]
 */
export function clearRefValue(that, arr) {
    arr.forEach(item => {
        if (that.$refs[item]) that.$refs[item].value = "";
    });
}

/**
 * 清除查询条件中的值
 * @param {*} that 执行域
 * @param {*} arr 数组 ["dept", "doctor"]
 */
export function clearSearchValue(that, arr) {
    arr.forEach(key => {
        if (that.searchQuery[key])
            that.searchQuery[key] = "";
    });
}

/**
 * 设置查询条件中的值
 * @param {*} that 执行域
 * @param {*} obj 数组 ["dept", "doctor"]
 * @param {*} valArr 值的数组 [arr1,arr2]
 */
export function setSearchValue(that, obj, valArr) {
    if (Array.isArray(obj)) {
        obj.forEach((key, index) => {
            that.searchQuery[key] = valArr ? valArr[index] ? valArr[index] : "" : "";
        });
    } else {
        Object.keys(obj).map((key, index) => obj[key] = valArr ? valArr[index] ? valArr[index] : "" : "")
    }
}

/**
 * 设置子组件的值
 * @param {*} that 执行域
 * @param {*} arr ["departments", "doctors"]
 * @param {*} valArr 值的数组 [val1,val2]
 */
export function setRefValue(that, arr, valArr) {
    arr.forEach((item, index) => {
        if (that.$refs[item]) that.$refs[item].value = valArr ? valArr[index] ? valArr[index] : "" : "";
    });
}

/**
 * 设置当前组件的值
 * @param {*} that 执行域
 * @param {*} arr ["departments", "doctors"]
 * @param {*} valArr 值的数组 [val1,val2]
 * @param {*} defaultVal 默认的值  "" , []
 */
export function setThisValue(that, arr, valArr, defaultVal = "") {
    arr.forEach((item, index) => {
        that[item] = valArr ? valArr[index] || valArr[index] == 0 ? valArr[index] : defaultVal : defaultVal;
    });
}

/**
 * 清除当前组件中的数组的值
 * @param {*} that 执行域
 * @param {*} arr 数组 ["doctors"]
 */
export function clearArr(that, arr) {
    arr.forEach(item => {
        if (that[item])
            that[item] = [];
    });
}


/* [过滤对象]
* @param  obj [过滤前数据]
* @param  arr [过滤条件，要求为数组]
*/
export function filterObj(obj, arr) {
    if (typeof (obj) !== "object" || !Array.isArray(arr)) {
        throw new Error("参数格式不正确")
    }
    const result = {}
    Object.keys(obj).filter((key) => arr.includes(key)).forEach((key) => {
        result[key] = obj[key]
    })
    return result
}

/**
 * 合并对象
 * @param {*} obj1 {id:0}
 * @param {*} obj2 {id2:0}
 */
export function concatObj(obj1, obj2) {
    if (typeof (obj1) !== "object" || typeof (obj2) !== "object") {
        throw new Error("参数格式不正确")
    }
    const result = Object.assign(obj1, obj2);
    return result
}