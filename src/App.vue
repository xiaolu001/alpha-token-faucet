<template>

  <router-view />
</template>
<script setup>
import { onMounted,watch } from "vue"
import { getConfig ,getUserInfo} from "@/api"
import { useStore } from "vuex";
import { useRoute } from "vue-router"
const { state } = useStore();
const route = useRoute();
onMounted(() => {
  init();
})

const init = () => {

  getConfig().then(res => {
    document.title = res.webname;
    var link = document.querySelector("link[type='image/x-icon']");
    link.href = res.favicon;
    state.white_logo = res.white_logo;
    state.black_logo = res.black_logo;
    state.favicon = res.favicon;
    state.currency = res.currency;
  }).catch(err=>{
   
  })
}



const initUserInfo = () => {
    getUserInfo().then(res => {
        state.nickname = res.nickname;
        state.avatar = res.avatar;
        state.invite_code = res.invite_code;
        state.credit_value = res.credit_value;
        state.member_level = res.member_level;
        state.credit_value = res.credit_value;
        state.today_profit = res.today_profit;
        state.check_day = res.check_day;
        state.money = res.money;
        state.memberLevelImg = res.member_level_info.image;

    })
}


watch(()=>route.path,(value)=>{
  if (state.token&&value=='/my') {
      initUserInfo();
    }
})
watch(() => state.token, (token) => {
  // console.log(token)
    if (token) {
      initUserInfo();
    }
}, {
    immediate: true
})
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  font-family: "Segoe UI", "Roboto", "Ubuntu",
    "Cantarell", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
}

:root {
  --van-nav-bar-background: #8e62dd !important;
  --van-nav-bar-icon-color: #fff !important;
  --van-primary-color: #8e62dd !important;
  // --van-field-input-text-color:#fff!important;
  --van-tabbar-item-icon-size: 32px !important;
}
</style>
