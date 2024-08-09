<template>
    <u-layout class="payment">
        <template #header>
            <u-header :title="$t('paymentMethods.title')" url="/my"> </u-header>
        </template>
        <div class="item" v-for="item in list" :key="item.id" @click="jump(item)">
            <div class="row">
                <div class="left">
                    <span class="text">{{item.typemean}}</span><van-tag  v-if="item.is_default==2" type="primary"
                        round>{{ $t('paymentMethods.default') }}</van-tag>
                </div>
                <van-icon name="edit" size="20px" />
            </div>
            <div class="address">
                {{ $t('paymentMethods.form.Address') }}: {{item.address}}
            </div>
        </div>
        <div class="bnt">
            <van-button type="primary" block @click="goTo('/payment/methods')">{{ $t('paymentMethods.create') }}</van-button>
        </div>
    </u-layout>
</template>
<script setup>
import {  onMounted,ref } from "vue"
import { useRouter,useRoute } from "vue-router"
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { getWithdrawAccount } from "@/api"
import { useStore } from "vuex"
const router = useRouter();
const route = useRoute();
const list = ref([]);
const store = useStore();
onMounted(()=>{
   init();
})
const goTo = (url) => {
    router.push(url)
}
const init = ()=>{
    getWithdrawAccount().then(res=>{
 
        list.value = res;
    })
}
const jump = (item)=>{
    if(route.query.type=='withdraw'){
        store.state.address =item.address;
        store.state.addressId = item.id;
        router.back();
        return 
    }
    goTo(`/payment/methods?id=${item.id}`)
   
}
</script>
<style lang="less">
.payment {
    .item {
        padding: 1rem;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        background-color: #fff;
        margin-bottom: 1rem;

        .row {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                display: flex;
                align-items: center;

                .text {
                    color: #8e62dd;
                    margin-right: .5rem;
                }
            }
        }

        .address {
            font-size: .875rem;
            line-height: 1.25rem;
            padding: .5rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            word-break: break-all;
        }
    }

    .bnt {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px 20px;
        background-color: #f5f5f5;
    }
}
</style>