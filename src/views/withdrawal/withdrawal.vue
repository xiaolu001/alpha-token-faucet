<template>
    <div class="withdrawal">
        <u-header :title="$t('home.service[2]')"> </u-header>
        <van-tabs v-model:active="active">
            <van-tab :title="$t('withdraw.tabs[0]')">
                <u-withdraw></u-withdraw>
            </van-tab>
            <van-tab :title="$t('withdraw.tabs[1]')">
                <u-history></u-history>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script setup>
import uHeader from "@/components/header/index.vue"
import uHistory from "./components/history.vue"
import uWithdraw from "./components/withdraw.vue"
import { ref } from "vue";
const active  = ref(0);
</script>
<style lang="less">
.withdrawal {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: rgb(245 245 245);
    .van-tabs,  .van-tabs__content{
        flex:1;
        display: flex;
        flex-direction: column;
        overflow:hidden;
    }
    
    .van-tab__panel{
        height: 100%;
    }
}
</style>