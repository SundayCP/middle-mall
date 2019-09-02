import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/page/ShopName'
import Home from '@/page/MyStore'
import Detail from '@/page/ShopName'
import Confirm from '@/page/Confirm'
import ConfirmCar from '@/page/ConfirmCar'
import AddAddr from '@/page/AddAddr'
import SelectAddr from '@/page/SelectAddr'
import ManageAddr from '@/page/ManageAddr'
import NewGoods from '@/page/NewGoods'
import Center from '@/page/Center'   
import MyTb from '@/page/MyTb'
import Cart from '@/page/Cart'
import OrderList from '@/page/OrderList'
import Invoice from '@/page/Invoice'
import Refund from '@/page/Refund'
import RefundNew from '@/page/Refund_new'//新增待发货申请退款页
import CustomerServices from '@/page/CustomerServices'
import Find from '@/page/Find'
import EditShop from '@/page/EditShop'
import LoadMore from '@/page/LoadMore'//test
import SuccessPay from '@/page/SuccessPay'
import MoreGoods from '@/page/MoreGoods'
import SelectPay from '@/page/SelectPay'
import RefundDetail from '@/page/RefundDetail'
import EntryOrder from '@/page/EntryOrder'
import SubmitSuccess from '@/page/SubmitSuccess'
import OrderDetail from '@/page/OrderDetail'
import ApplyRefund from '@/page/ApplyRefund'
import Strategy from '@/page/StrategyIndex'
import RulePage from '@/page/RulePage'
import CompanyIntro from '@/page/CompanyIntro'


import Notfound from '@/page/Notfound'

Vue.use(Router)
let ShopName = window.CONFIG.storeName ?  window.CONFIG.storeName : window.sessionStorage.getItem("shopName");  
//let ShopName = window.sessionStorage.getItem("shopName")
//alert(ShopName)

const routes = [
    {path: '/index', name: 'Home', component: Home , meta: {pageTitle: ShopName}},
    {path: '/shop/detail/:sku/:mechantId', name: 'Detail', component: Detail , meta: {pageTitle: '商品详情'}},
    
//  {path: '/confirm/:sku/:mechantId', name: 'Confirm', component: Confirm , meta: {pageTitle: '订单确认'}},
//  {path: '/confirm/car/:idStr/:mechantId', name: 'ConfirmCar', component: ConfirmCar , meta: {pageTitle: '购物车订单确认'}},
	{path: '/confirm', name: 'Confirm', component: Confirm , meta: {pageTitle: '订单确认'}},
	{path: '/confirm/car', name: 'ConfirmCar', component: ConfirmCar , meta: {pageTitle: '购物车订单确认'}},
	
    {path: '/add/:idStr/:mechantId/:car', name: 'AddAddr', component: AddAddr , meta: {pageTitle: '添加地址'}},
    {path: '/select/:idStr/:mechantId/:car', name: 'SelectAddr', component: SelectAddr , meta: {pageTitle: '地址选择'}},
    {path: '/manage/:idStr/:mechantId/:car', name: 'ManageAddr', component: ManageAddr , meta: {pageTitle: '地址管理'}},
    {path: '/center/:merchantId', name: 'Center', component: Center , meta: {pageTitle: '个人中心'}},
    {path: '/cart/:mechantId', name: 'Cart', component: Cart , meta: {pageTitle: '购物车'}},
    {path: '/orderList/:status',name: 'OrderList',component: OrderList ,meta: {pageTitle: '订单列表'}},
    {path: '/invoice', name: 'Invoice', component: Invoice , meta: {pageTitle: '按订单开发票'}},
    {path: '/refund/:id/:amount/:status', name: 'Refund', component: Refund , meta: {pageTitle: '申请退款'}},
    {path: '/refundNew/:id', name: 'RefundNew', component: RefundNew , meta: {pageTitle: '待发货申请退款'}},
    {path: '/services', name: 'CustomerServices', component: CustomerServices , meta: {pageTitle: '客服'}},
    {path: '/find', name: 'Find', component: Find , meta: {pageTitle: '发现'}},
    {path: '/editShop', name: 'EditShop', component: EditShop , meta: {pageTitle: '编辑店铺'}},
    {path: '/new', name: 'NewGoods', component: NewGoods , meta: {pageTitle: '新品速递'}},
    {path: '/mytb', name: 'MyTb', component: MyTb , meta: {pageTitle: '我的通宝'}},
    {path: '/load', name: 'LoadMore', component: LoadMore , meta: {pageTitle: '加载更多'}},//test 
    {path: '/success', name: 'SuccessPay',component: SuccessPay,meta:{pageTitle: '支付成功'}},
    {path: '/more', name: 'MoreGoods',component: MoreGoods,meta:{pageTitle: '更多商品'}},
    {path: '/selectPay/:id/:amount',   name: 'SelectPay', component: SelectPay, meta: {pageTitle: '选择退款'}},
    {path: '/refundDetail/:id',   name: 'RefundDetail', component: RefundDetail, meta: {pageTitle: '退款详情'}},
    {path: '/submitSuccess/:id/:status',   name: 'SubmitSuccess', component: SubmitSuccess, meta: {pageTitle: '提交成功'}},
    {path: '/entryOrder/:id',   name: 'EntryOrder', component: EntryOrder, meta: {pageTitle: '输入订单'}},
    {path: '/orderDetail/:id',   name: 'OrderDetail', component: OrderDetail, meta: {pageTitle: '订单详情'}},
    {path: '/applyRefund/:idStr/:amount',   name: 'ApplyRefund', component: ApplyRefund, meta: {pageTitle: '发票'}},
    {path: '/strategy',   name: 'Strategy', component: Strategy, meta: {pageTitle: '攻略'}},
    {path: '/rulePage',   name: 'RulePage', component: RulePage, meta: {pageTitle: '规则'}},   
    {path: '/companyIntro',   name: 'CompanyIntro', component: CompanyIntro, meta: {pageTitle: '公司介绍'}},   
    
    
    {path:'*', name: '404', component: Notfound }
  ]

export default new Router({
  mode: 'history',
  base: '/plas',
  routes
})

