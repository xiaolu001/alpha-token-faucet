import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/login.vue";
import Register from "@/views/register/register.vue";
import Agreement from "@/views/register/agreement.vue";
import Tabbar from "@/views/home/index.vue";
import Home from "@/views/home/home.vue";
import Work from "@/views/home/work.vue";
import Records from "@/views/home/records.vue";
import My from "@/views/home/my.vue"
import Withdrawal from "@/views/withdrawal/withdrawal.vue"
import Deposit from "@/views/deposit/deposit.vue"
import Introduce from "@/views/introduce/introduce.vue"

import About from "@/views/about/about.vue"
import Brand from "@/views/brand/brand.vue"
import Vip from "@/views/vip/vip.vue"
import Transaction from "@/views/transaction/transaction.vue"
import Notice from "@/views/notice/notice.vue"
import NoticeDetail from "@/views/notice/detail.vue"
import Bulletin from "@/views/bulletin/bulletin.vue"
import Profile from "@/views/profile/profile.vue"
import Username from "@/views/profile/username.vue";
import Password from "@/views/profile/password.vue";
import Payment from "@/views/payment/index.vue"
import Methods from "@/views/payment/methods.vue"
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  
  {
    path: "/register/agreement",
    name: "Agreement",
    component: Agreement
  },
 
  {
    path: "/withdrawal",
    name: "Withdrawal",
    component: Withdrawal
  },
  {
    path: "/deposit",
    name: "Deposit",
    component: Deposit
  },
  {
    path: "/introduce",
    name: "Introduce",
    component: Introduce
  },
 

  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/brand",
    name: "Brand",
    component: Brand
  },
  {
    path: "/vip",
    name: "Vip",
    component: Vip
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice
  },
  {
    path: "/bulletin",
    name: "Bulletin",
    component: Bulletin
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
  {
    path: "/username",
    name: "Username",
    component:Username
  },
  {
    path: "/password/:type",
    name: "Password",
    component:Password
  },
  {
    path:'/notice/:id',
    name:"NoticeDetail",
    component:NoticeDetail
  },
  {
    path:'/payment',
    name:"Payment",
    component:Payment
  },
  {
    path:'/payment/methods',
    name:"Methods",
    component:Methods
  },
  {
    path: "/",
    component: Tabbar,
    children:[
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      {
        path: "/work",
        name: "Work",
        component: Work,
      },
      {
        path: "/records",
        name: "Records",
        component: Records,
      },
      {
        path: "/my",
        name: "my",
        component: My,
      }
    ]
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to)=>{
  const token=localStorage.getItem('token');
  if(!['/register','/login','/register/agreement'].includes(to.path)&&!token){
    return '/login'
  }
})
export default router;
