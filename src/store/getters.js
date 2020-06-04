const getters={
    user: state => state.user.user,
    showNav:state => state.user.showNav,
    roles:state=>state.user.roles,
    loadMenus: state => state.user.loadMenus,
    permission_routers: state => state.permission.allRouters,
    async_routers:state => state.permission.addRouters,
}

export default getters;