<h1 style="text-align: center">互联网医院运营监管系统</h1>

#### 项目简介

tfzl-Operation-Monitor-management(天赋智链--运营监管系统)基于当前流行技术组合的前后端分离商城系统: Vue+element-UI+springboot集成极验+JAVA等前后端分离系统，包含异常事件监控、诊疗行为监控、医疗质量监控、运营管理、财务管理、运营统计分析、设置等模块，适合互联网医院的运营统计分析；

#### 项目源码 

|     |  后台系统前端源码  |
|---  |--- |
|   github   | http://47.108.74.8:9999/operation-monitor-platform/tfzl-Operation-Monitor-management.git|

## 系统功能

* 一：异常事件监控模块：在线问诊监控、护理服务监控，预约体检监控等
* 二：医疗行为监控模块：抗菌药物使用率、不合理处方、次均就诊费用等
* 三：医疗质量监控模块：服务满意度、处方合格率、处方点评、处方点评审核等
* 四：运营管理模块：在线问诊订单、护理服务订单、预约挂号订单、预约体检订单、用户管理、用户反馈等
* 五：财务管理模块：退款审批等
* 六：运营统计分析模块：在线问诊订单统计、护理服务订单统计、预约挂号订单统计、门诊缴费统计、工作量统计、注册用户统计等
* 七：设置模块：系统参数等
* 八：其他等

#### 项目结构

项目采用分模块开发方式：

* api            API模块
* components     公用组件模块
* layout         登录后页面的布局模块（菜单展示/详情）
* mixins         混入模块
* router         路由模块
* store          状态管理模块（参数管理）
* utils          第三方模块
* views/login    登录模块
* views/homePage 菜单展示和消息模块
* views/abnormalMonitor 异常事件监控
* views/behavior 诊疗行为监控模块
* views/quality 医疗质量监控模块
* views/operate 运营管理模块
* views/finance 财务管理模块
* views/statistical 运营统计分析模块
* views/set 设置模块

## 技术选型

* 前端使用技术
    - 2.1 Vue 全家桶
    - 2.2 Element
