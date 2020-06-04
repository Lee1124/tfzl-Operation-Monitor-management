module.exports = {
   title: '运营监管系统',
   /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
   tokenCookieExpires: 1,
   /**
      * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天s
      */
   passCookieExpires: 0.3,//1
   //   /**
   //      * @description 是否只保持一个子菜单的展开
   //      */
   //   uniqueOpened: true,
   /**
      * @description token key
      */
   TokenKey: 'YSHOP-TOEKN',
   /**
    * @description 请求超时时间，毫秒（默认2分钟）
    */
   timeout: 1200000
   // timeout: 5000
}