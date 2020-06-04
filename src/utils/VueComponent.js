
/**
 * 注册全局公用组件
 */
import Vue from 'vue'
import logo from '../layout/components/Logo/logo.vue'
import btn from '../components/btn/btn.vue'
import breadcrumb from '../components/Breadcrumb/index.vue'
import headTable from '../components/HeadTable/index.vue'
import selectOne from '../components/SelectOne/index.vue'
import myInput from '../components/MyInput/index.vue'
import datePicker from '../components/DatePicker/index.vue'
import tablePagination from '../components/Pagination/index.vue'
import yearPicker from '../components/YearPicker/index.vue'
import radioButton from '../components/RadioButton/index.vue'
import titleView from '../components/TitleView/index.vue'

Vue.component('btn',btn);//自定义按钮
Vue.component('logo',logo);//logo
Vue.component('breadcrumb',breadcrumb);//面包屑
Vue.component('headTable',headTable);//头部表格  比如在线问诊监控 今日取消用户/今日系统自动取消...
Vue.component('selectOne',selectOne);//单选
Vue.component('myInput',myInput);//input
Vue.component('datePicker',datePicker);//日期选择器
Vue.component('yearPicker',yearPicker);//日期选择器
Vue.component('tablePagination',tablePagination);//分页器
Vue.component('radioButton',radioButton);//单选按钮 
Vue.component('titleView',titleView);//标题框 