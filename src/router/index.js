import router from './routers'
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
// import { buildMenus } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'
const whiteList = ['/login']// ,','/set/systemParme' /operate/feedback' no redirect whitelist ,,', '/print','/quality/comment' /quality/comment' '/statistical/inquiry','/operate/inquiry'
let flag = true;//测试用 
router.beforeEach((to, form, next) => {
    // next()
    // return
    // console.log(getToken())
    if (to.meta.title) {
        document.title = to.meta.title + ' - ' + Config.title
    }
    NProgress.start();
    if (getToken()) {
        // console.log('进来路由守卫',store.getters.roles,to.path,store.getters.loadMenus)
        if (store.getters.roles.length === 0) {
            store.dispatch('GetInfo').then(res => {
                loadMenus(next, to);
            }).catch(err => {
                console.error('GetInfo接口报错',err)
                // store.dispatch('LogOut').then(() => {
                //     location.reload() // 为了重新实例化vue-router对象 避免bug
                // })
            });
        } else if (store.getters.roles.length != 0 && store.getters.async_routers.length != 0 && (to.path === '/login' || to.path === '/home')) {
            toDefault(next);
        } else if (store.getters.loadMenus) {
            // 修改成false，防止死循环
            store.dispatch('updateLoadMenus').then(res => { })
            loadMenus(next, to);
        } else {
            next()
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            // if(flag){//测试用
            //     flag=false;
            //     loadMenus(next, to);
            // }else{
            //     next()
            // }
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }
    // console.log(store.getters.roles)
    // if (store.getters.roles.length === 0 && to.path !== '/login') {
    //     // 动态路由，拉取菜单
    //     //   loadMenus(next, to)
    //     store.commit('SET_ROLES', ['abnormal', 'behavior', 'quality', 'operate', 'finance', 'statistical', 'set', 'hh']);
    //     store.dispatch('permission/createAsyncRouter', store.getters.roles).then(res => {
    //         // const addRouters = store.getters['permission/addRouters'];
    //         // const allRouters = store.getters['permission/allRouters'];
    //         // router.addRoutes(addRouters) // 添加动态路由
    //         //更新路由
    //         // router.options.routes=allRouters;
    //         next({ ...to, replace: true });//跳转后不会有历史记录
    //     })
    //     // console.log(asyncRouter)
    //     // // asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    //     // store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
    //     //     // router.addRoutes(asyncRouter) // 动态添加可访问路由表
    //     //     // // next({ ...to, replace: true })
    //     //     // next()
    //     // })
    // } else if (store.getters.loadMenus) {
    //     store.dispatch('updateLoadMenus').then(res => { })
    //     next()
    // } else {
    //     next()
    // }
})

// router.beforeEach((to, form, next) => {
//     if (to.meta.title) {
//         document.title = to.meta.title + ' - ' + Config.title
//     }
//     NProgress.start();
//     let f = false;
//     if (f) {//getToken()
//         // 已登录且要跳转的页面是登录页
//         if (to.path === '/login') {
//             next({ path: '/' })
//             NProgress.done()
//         }
//     } else {
//         if (store.getters.roles.length === 0) {// 判断当前用户是否已拉取完user_info信息
//             store.dispatch('GetInfo').then(res => { // 拉取user_info
//                 // 动态路由，拉取菜单
//                 loadMenus(next, to)
//             }).catch((err) => {
//                 console.log(err)
//                 store.dispatch('LogOut').then(() => {
//                     location.reload() // 为了重新实例化vue-router对象 避免bug
//                 })
//             })
//         } else if (store.getters.loadMenus) {// 登录时未拉取 菜单，在此处拉取
//             // 修改成false，防止死循环
//             store.dispatch('updateLoadMenus').then(res => { })
//             loadMenus(next, to)
//         } else {
//             next()
//         }
//     }
// })

// export const loadMenus = (next, to) => {
//     buildMenus().then(res => {
//         const asyncRouter = filterAsyncRouter(res)
//         asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
//         store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
//             router.addRoutes(asyncRouter) // 动态添加可访问路由表
//             next({ ...to, replace: true })
//         })
//     })
// }

export const loadMenus = (next, to) => {

    // buildMenus().then(res => {
    //假设是拉取的菜单
    let menuList = ['abnormal', 'behavior', 'quality', 'operate', 'finance', 'statistical', 'set', 'hh'];

    store.dispatch('permission/createAsyncRouter', menuList).then(res => {
        const addRouters = store.getters['permission/addRouters'];
        const allRouters = store.getters['permission/allRouters'];
        router.addRoutes(addRouters) // 添加动态路由
        //更新路由
        // router.options.routes=allRouters;
        if (to.path === '/login' || to.path === '/home') {
            toDefault(next);
        } else {
            next({ ...to, replace: true });//跳转后不会有历史记录
        }
    })
    // })
}

function toDefault(next) {
    let async_routers = store.getters.async_routers;
    // console.log('toDefault', async_routers)
    next({ path: '/home/' + async_routers[0].name });//默认跳转第一个
    NProgress.done();
}

router.afterEach(() => {
    NProgress.done() // finish progress bar
})