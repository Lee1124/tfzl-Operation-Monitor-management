import Layout from "../../layout/index.vue"
import menuBoard from "../../layout/menuBoard/index.vue"
import itemBoard from "../../layout/itemBoard/index.vue"
export default [
    {
        path: '/404',
        component: () => import('@/views/features/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/features/401'),
        hidden: true
    },
    {
        path: '/login',
        hidden: true,
        meta: { title: '登录' },
        component: () => import('@/views/login')
    },
    {
        path: '/print',
        hidden: true,
        meta: { title: '打印' },
        component: () => import('@/views/print/index')
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/features/redirect')
            }
        ]
    },
    {
        path: "/",
        component: Layout,
        // redirect: "/home",
        hidden: true,
        children: [
            {
                path: '',
                name: 'menuBoard',
                redirect: "/home",
                component: menuBoard,
            },
            {
                path: '/home',
                hidden: true,
                component: menuBoard,
                children: [
                    {
                        path: "*",
                        meta: { title: '菜单页面' },
                        name: 'menuView',
                        component: () => import("@/views/homePage/menuView/index.vue")
                    }
                ]
            },
            {
                path: '/itemBoard',
                name: 'itemBoard',
                hidden: true,
                component: itemBoard,
                meta: { title: '详情页面' },
            },
            {
                path: '/user/*',
                name: 'user',
                hidden: true,
                component: () => import("@/views/system/user/index.vue"),
                meta: { title: '用户页面' },
            },
        ]
    },
    // {
    //     path: '/user',
    //     name: 'user',
    //     hidden: true,
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'change',
    //             name: 'menuBoard',
    //              component: () => import("@/views/system/user/changePwd.vue"),
    //             // children: [
    //             //     {
    //             //         path: "",
    //             //         meta: { title: '菜单页面' },
    //             //         name: 'menuView',
    //             //         component: () => import("@/views/system/user/changePwd.vue")
    //             //     }
    //             // ]
    //         },
    //     ]
    // }
]