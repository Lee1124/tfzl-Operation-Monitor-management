import { constantRouterMap, asyncRoutersMap } from '@/router/routers'
// import Layout from '@/layout/index'

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    allRouters: [],
    addRouters: [],
    sideBarRouters: [],//侧边栏
  },
  getters: {
    allRouters: state => state.allRouters,//所有的
    addRouters: state => state.addRouters,//匹配的
    sideBarRouters: state => state.sideBarRouters,//当前详情页面的侧边导航的数据
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.allRouters = constantRouterMap.concat(routers);
    },
    SET_SIDEBARROUTERS(state, routers) {
      state.sideBarRouters = routers
    }
  },
  actions: {
    // GenerateRoutes({ commit }, asyncRouter) {
    //   commit('SET_ROUTERS', asyncRouter)
    // },
    // 创建动态路由
    createAsyncRouter({ commit }, routers) {
      return new Promise((reslove, reject) => {
        const addRouters = asyncRoutersMap.filter(item => routers.includes(item.meta.system));
        addRouters.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTERS', addRouters)
        reslove();
      })
    },
    //动态设置当前页面的侧边导航栏路由表
    setSideBarRouters({ commit, state }, route) {
      let allRouters = state.allRouters;
      allRouters.forEach(item => {
        if (item.path.length > 0 && route.path.indexOf(item.path) != -1) {
          let pageRouters = item.children ? item.children : [];
          commit('SET_SIDEBARROUTERS', pageRouters)
        }
      });
    }
  }
}


export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    // console.log(router)
    if (router.component) {
      if (router.component === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = (view) => {
  return () => import(`@/views/${view}`)
}

export default permission
