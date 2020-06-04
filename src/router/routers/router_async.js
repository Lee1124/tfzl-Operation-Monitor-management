import Layout from "../../layout/index.vue"
import itemBoard from "../../layout/itemBoard/index.vue"
export default [
    {
        path: "/abnormal/inquiry",
        name: 'abnormal',
        redirect: "noredirect",
        meta: {
            system: 'abnormal',
            icon: 'abnormal',
            isShow: false,
            isSelected: false,
            title: '异常事件监控'
        },
        component: Layout,
        children: [
            {
                path: '/abnormal',
                name: '在线问诊监控',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '在线问诊监控',
                },
                children: [
                    {
                        path: 'inquiry',
                        name: 'abnormal.inquiry',
                        component: () => import("@/views/abnormal/inquiry/index.vue"),
                        hidden: false,
                        meta: {
                            title: '在线问诊监控'
                        },
                    }
                ]
            },
            {
                path: '/abnormal',
                name: '护理服务监控',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '护理服务监控',
                },
                children: [
                    {
                        path: 'nurse',
                        name: 'abnormal.nurse',
                        component: () => import("@/views/abnormal/nurse/index.vue"),
                        hidden: false,
                        meta: {
                            title: '护理服务监控'
                        },
                    }
                ]
            },
            {
                path: '/abnormal',
                name: '预约体检监控',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '预约体检监控',
                },
                children: [
                    {
                        path: 'test',
                        name: 'abnormal.test',
                        component: () => import("@/views/abnormal/test/index.vue"),
                        hidden: false,
                        meta: {
                            title: '预约体检监控'
                        },
                    }
                ]
            }
        ]
    },

    {
        path: "/behavior/useRate",
        name: 'behavior',
        meta: {
            system: 'behavior',
            icon: 'behavior',
            isShow: false,
            isSelected: false,
            title: '诊疗行为监控'
        },
        component: Layout,
        children: [
            {
                path: '/behavior',
                name: '抗菌药物使用率',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '抗菌药物使用率',
                },
                children: [
                    {
                        path: 'useRate',
                        name: 'behavior.useRate',
                        component: () => import("@/views/behavior/useRate/index.vue"),
                        hidden: false,
                        meta: {
                            title: '抗菌药物使用率'
                        },
                    }
                ]
            },
            {
                path: '/behavior',
                name: '不合理处方',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '不合理处方',
                },
                children: [
                    {
                        path: 'unPrescription',
                        name: 'behavior.unPrescription',
                        component: () => import("@/views/behavior/unPrescription/index.vue"),
                        hidden: false,
                        meta: {
                            title: '不合理处方'
                        },
                    }
                ]
            },
            {
                path: '/behavior',
                name: '次均就诊费用',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '次均就诊费用',
                },
                children: [
                    {
                        path: 'visitPay',
                        name: 'behavior.visitPay',
                        component: () => import("@/views/behavior/visitPay/index.vue"),
                        hidden: false,
                        meta: {
                            title: '次均就诊费用'
                        },
                    }
                ]
            },
        ]
    },
    {
        path: "/quality/satisfaction",
        name: 'quality',
        meta: {
            system: 'quality',
            icon: 'quality',
            isShow: false,
            isSelected: false,
            title: '医疗质量监控'
        },
        component: Layout,
        children: [
            {
                path: '/quality',
                name: '服务满意度',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '服务满意度',
                },
                children: [
                    {
                        path: 'satisfaction',
                        name: 'quality.satisfaction',
                        component: () => import("@/views/quality/satisfaction/index.vue"),
                        hidden: false,
                        meta: {
                            title: '服务满意度'
                        },
                    }
                ]
            },
            {
                path: '/quality',
                name: '处方合格率',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '处方合格率',
                },
                children: [
                    {
                        path: 'passRate',
                        name: 'quality.passRate',
                        component: () => import("@/views/quality/passRate/index.vue"),
                        hidden: false,
                        meta: {
                            title: '处方合格率'
                        },
                    }
                ]
            },
            {
                path: '/quality',
                name: '处方点评',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '处方点评',
                },
                children: [
                    {
                        path: 'comment',
                        name: 'quality.comment.comment',
                        component: () => import("@/views/quality/comment/comment/index.vue"),
                        hidden: false,
                        meta: {
                            title: '处方点评'
                        },
                    },
                    {
                        path: 'commentReview',
                        name: 'quality.comment.commentReview',
                        component: () => import("@/views/quality/comment/commentReview/index.vue"),
                        hidden: false,
                        meta: {
                            title: '处方点评审核'
                        },
                    }
                ]
            },
        ]
    },
    {
        path: "/operate/inquiry",
        name: 'operate',
        meta: {
            system: 'operate',
            icon: 'operate',
            isShow: false,
            isSelected: false,
            title: '运营管理'
        },
        component: Layout,
        children: [
            {
                path: '/operate',
                name: '订单管理',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '订单管理',
                },
                children: [
                    {
                        path: 'inquiry',
                        name: 'operate.inquiry',
                        hidden: false,
                        meta: {
                            title: '在线问诊订单'
                        },
                        component: () => import("@/views/operate/order/inquiry/index.vue"),
                    },
                    {
                        path: 'nurse',
                        name: 'operate.nurse',
                        hidden: false,
                        meta: {
                            title: '护理服务订单'
                        },
                        component: () => import("@/views/operate/order/nurse/index.vue"),
                    },
                    {
                        path: 'register',
                        name: 'operate.register',
                        hidden: false,
                        meta: {
                            title: '预约挂号订单'
                        },
                        component: () => import("@/views/operate/order/register/index.vue"),
                    },
                    {
                        path: 'test',
                        name: 'operate.test',
                        hidden: false,
                        meta: {
                            title: '预约体检订单'
                        },
                        component: () => import("@/views/operate/order/test/index.vue"),
                    },
                ]
            },
            {
                path: '/operate',
                name: '用户管理',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '用户管理',
                },
                children: [
                    {
                        path: 'user',
                        name: 'operate.user',
                        hidden: false,
                        meta: {
                            title: '用户管理'
                        },
                        component: () => import("@/views/operate/user/index.vue"),
                    },
                ]
            },
            {
                path: '/operate',
                name: '用户反馈',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '用户反馈',
                },
                children: [
                    {
                        path: 'feedback',
                        name: 'operate.feedback',
                        hidden: false,
                        meta: {
                            title: '用户反馈'
                        },
                        component: () => import("@/views/operate/feedback/index.vue"),
                    },
                ]
            }
        ]
    },
    {
        path: "/finance/refund",
        name: 'finance',
        meta: {
            system: 'finance',
            icon: 'finance',
            isShow: false,
            isSelected: false,
            title: '财务管理'
        },
        component: Layout,
        children: [
            {
                path: '/finance',
                name: '退款申请',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '退款申请',
                },
                children: [
                    {
                        path: 'refund',
                        name: 'finance.refund',
                        hidden: false,
                        meta: {
                            title: '退款申请'
                        },
                        component: () => import("@/views/finance/refund/index.vue"),
                    },
                ]
            }
        ]
    },

    {
        path: "/statistical/inquiry",
        name: 'statistical',
        redirect: "noredirect",
        meta: {
            system: 'statistical',
            icon: 'statistical',
            isShow: false,
            isSelected: false,
            title: '运营统计分析'
        },
        component: Layout,
        children: [
            {
                path: '/statistical',
                name: '在线订单统计',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '在线订单统计',
                },
                children: [
                    {
                        path: 'inquiry',
                        name: 'statistical.inquiry',
                        hidden: false,
                        meta: {
                            title: '在线问诊订单统计'
                        },
                        component: () => import("@/views/statistical/order/inquiry/index.vue"),
                    },
                    {
                        path: 'nurseOrder',
                        name: 'statistical.nurseOrder',
                        hidden: false,
                        meta: {
                            title: '护理服务订单统计'
                        },
                        component: () => import("@/views/statistical/order/nurse/index.vue"),
                    },
                    {
                        path: 'registerOrder',
                        name: 'statistical.registerOrder',
                        hidden: false,
                        meta: {
                            title: '预约挂号订单统计'
                        },
                        component: () => import("@/views/statistical/order/register/index.vue"),
                    }
                ]
            },
            {
                path: '/statistical',
                name: '门诊缴费统计',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '门诊缴费统计',
                },
                children: [
                    {
                        path: 'pay',
                        name: 'statistical.pay',
                        component: () => import("@/views/statistical/pay/index.vue"),
                        hidden: false,
                        meta: {
                            title: '门诊缴费统计'
                        },
                    }
                ]
            },
            {
                path: '/statistical',
                name: '工作量统计',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '工作量统计',
                },
                children: [
                    {
                        path: 'workload',
                        name: 'statistical.workload',
                        component: () => import("@/views/statistical/workload/index.vue"),
                        hidden: false,
                        meta: {
                            title: '工作量统计'
                        },
                    }
                ]
            },
            {
                path: '/statistical',
                name: '注册用户统计',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '注册用户统计',
                },
                children: [
                    {
                        path: 'registerUsers',
                        name: 'statistical.registerUsers',
                        component: () => import("@/views/statistical/registerUsers/index.vue"),
                        hidden: false,
                        meta: {
                            title: '注册用户统计'
                        },
                    }
                ]
            },
        ]
    },
    {
        path: "/set/systemParme",
        name: 'set',
        meta: {
            system: 'set',
            icon: 'set',
            isShow: false,
            isSelected: false,
            title: '设置'
        },
        component: Layout,
        children: [
            {
                path: '/set',
                name: '系统参数',
                redirect: "noredirect",
                component: itemBoard,
                hidden: false,
                alwaysShow: true,
                meta: {
                    title: '系统参数',
                },
                children: [
                    {
                        path: 'systemParme',
                        name: 'set.systemParme',
                        hidden: false,
                        meta: {
                            title: '系统参数'
                        },
                        component: () => import("@/views/set/systemParme/index.vue"),
                    },
                ]
            }
        ]
    },
    // {
    //     path: "",
    //     name: 'hh',
    //     meta: {
    //         system: 'hh',
    //         icon:'set',
    //         isShow:false,
    //         isSelected:false,
    //         title: '设置2'
    //     },
    //     component: Layout,
    // },
]