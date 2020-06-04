//静态资源路径
const resources={
    namespaced:true,
    state:{
        loginBg:require("@/assets/images/login/bg.jpg"),
        logo:require("@/assets/images/logo.png"),
        defaultHead:require("@/assets/images/defaultHead.png"),
    },
    getters:{
        loginBg:state=>state.loginBg,
        logo:state=>state.logo,
        defaultHead:state=>state.defaultHead
    }
}

export default resources;