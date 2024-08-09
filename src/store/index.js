import { createStore } from "vuex";

export default createStore({
  state: {
    currency:"",
    token:localStorage.getItem('token')||'',
    nickname:'',
    avatar:'',
    invite_code:'',
    credit_value:'',
    member_level:'',
    credit_value:'',
    today_profit:'',
    money:'',
    memberLevelImg:'',
    address:'',
    addressId:"",
    check_day:0,
    favicon:'',
    black_logo:'',
    white_logo:''
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  
});
