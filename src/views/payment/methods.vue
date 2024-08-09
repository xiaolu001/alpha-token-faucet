<template>
    <u-layout class="methods">
        <template #header>
            <u-header :title="$t('paymentMethods.title')" url="/my"> </u-header>
        </template>
        <div class="row">
            <div class="type">{{ $t('paymentMethods.type') }}</div>
            <van-dropdown-menu>
                <van-dropdown-item :options="state.options" v-model="state.type"></van-dropdown-item>

            </van-dropdown-menu>
        </div>
        <div class="row">
            <div class="type">{{ $t('paymentMethods.default') }}</div>
            <van-switch v-model="state.default" />
        </div>
        <div class="label">{{ $t('paymentMethods.form.Address') }}</div>
        <van-form @submit="onSubmit">
            <div class="textarea">

                <van-field v-model="state.address" type="textarea" rows="3"
                    :placeholder="$t('paymentMethods.form.Address')" :rules="[
                        { required: true, message: $t('system.rules.require', { name: $t('paymentMethods.form.Address') }) },

                    ]" />
            </div>
            <div class="bnt">
                <van-button type="primary" round block native-type="submit" :loading="state.loading">{{ $t('system.actions.Submit') }}</van-button>
            </div>
        </van-form>

    </u-layout>
</template>
<script setup>
import { reactive,onMounted } from "vue"
import { useRouter,useRoute } from "vue-router"
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import {  showToast, showSuccessToast } from 'vant';
import { createAddress,getWithdrawAccount } from "@/api"
import { useI18n } from "vue-i18n"
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const state = reactive({
    options: [
        {
            text: 'ETH',
            value: '1'
        },
        {
            text: 'ERC20-USDT',
            value: '2'
        },
        {
            text: 'ERC20-USDC',
            value: '3'
        },
    ],
    type: '1',
    default: false,
    address: '',
    loading:false
})
onMounted(()=>{
    if(route.query.id!==''){
        init();
    }
})
const init =()=>{
    getWithdrawAccount().then(res=>{
        if(res.length==0){
            return
        }
        const data = res.find(item=>item.id==route.query.id);
        state.type = data.type;
        state.default = data.is_default==2;
        state.address = data.address;
    })
}
const onSubmit =()=>{
    if(state.loading){
        return
    }
    state.loading = true;
    createAddress({
        id:route.query.id||'',
        type:state.type,
        is_default:state.default?2:1,
        address:state.address
    }).then(res=>{
        showSuccessToast(t('msg.response.success'));
        router.push('/payment')
    }).catch(err=>{
        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });
    }).finally(()=>{
        state.loading = false;
    })
   
}
// const goTo = () => {
//     router.push('/payment/methods')
// }
</script>
<style lang="less">
.methods {
    .bnt {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px 20px;
        background-color: #f5f5f5;
    }

    .row {
        display: flex;
        justify-content: space-between;
        height: 48px;
        align-items: center;
        background-color: #fff;
        padding: 0 1.5rem 0 .5rem;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        margin-bottom: 1rem;

        .van-dropdown-menu__bar {
            background-color: transparent;
            box-shadow: none;
        }

        .type {}
    }

    .label {
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5rem;
        color: rgb(102 102 102);

    }

    .textarea {
        margin-top: .5rem;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
    }
}
</style>