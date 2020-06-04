//混合的表格请求数据
import { initData } from '@/api/data'
import { Notification } from 'element-ui'
export default {
    data() {
        return {
            //表格数据
            tableData: [
                {
                    beginTime: null,
                    createTime: "2020-05-20T07:43:39.000+0000",
                    deptName: "内科1",
                    doctorName: "wz",
                    eventType: 5,
                    exremindId: null,
                    id: 1,
                    occurrenceTime: "2020-05-20T07:42:38.000+0000",
                    orderNumber: "asdiuasgdiuashdias",
                    orderPayState: -1,
                    orderState: -1,
                    orderTime: "2020-05-20T05:43:03.000+0000",
                    orderType: 2,
                    orderUpddateTime: null,
                    preUpdateTime: null,
                    prescriptionId: "",
                    prescriptionState: null,
                    prescriptionTime: "2020-05-20T08:40:08.000+0000",
                    remindContent: '',
                    remindState: 1,
                    timeOut: "2小时"
                }
            ],
            //数据总条数
            total: 0,
            //当前页
            currentPage: 1,
            //每页数据条数
            pageSize: 10,
            //请求数据的url
            url: '',
            // 查询数据的参数
            searchParams: {},
            // 待查询的对象
            // query: {},
            // 表格 Loading 属性
            loading: false,
        }
    },
    methods: {
        //初始化数据
        async init() {
            if (!await this.beforeInit()) {
                return
            }
            return new Promise((resolve, reject) => {
                this.loading = true
                // 请求数据
                console.log('请求所传的值：', this.getQueryParame())
                initData(this.url, this.getQueryParame()).then(res => {
                    if (res.status != 0) {
                        Notification.error({
                            title: res.msg
                        })
                    } else {
                        // console.log(res)
                        if (res.data && res.data.total) this.total = res.data.total;
                        this.tableData = res.data.list;
                        // console.log('this.tableData',this.tableData)
                    }
                    // time 毫秒后显示表格
                    setTimeout(() => {
                        this.loading = false
                    }, this.time)
                    resolve(res)
                }).catch(err => {
                    this.loading = false
                    reject(err)
                })
            })
            console.log(this.url)
        },
        //改变每页多少条数据
        changeSize(val) {
            // console.log('changeSize', val)
            this.pageSize = val;
            this.init();
        },
        //改变当前页
        changePage(val) {
            console.log('changePage', val)
            this.currentPage = val;
            this.init();
        },
        getQueryParame() {
            return {
                // ...this.query,
                ...this.searchParams
            }
        },
    },
}