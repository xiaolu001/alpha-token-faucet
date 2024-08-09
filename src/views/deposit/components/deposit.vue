<template>
    <div class="deposit">
        <div class="info">
            <div class="account">{{ $t('deposit.AccountAmount') }}</div>
            <div class="price">
                {{state.money}}<span>{{state.currency}}</span>
            </div>

        </div>
        <div class="bnt">
            <van-button type="primary" @click="open" round="" block>{{ $t('deposit.ContactCustomerService')
                }}</van-button>
        </div>
        <u-service ref="service"></u-service>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import uService from "@/components/service/index.vue"
import { useStore } from "vuex"
const { state } = useStore();
const service = ref();
const open = () => {
    service.value.open();
}
</script>

<style lang="less" scoped>
.deposit {
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;

    .info {
        padding: 1rem;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        border-radius: .75rem;
        background-image: url('@/assets/images/bg-home.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-bottom: 1rem;

        .account {
            font-weight: 600;
            color: #000c;
            font-size: .875rem;
            line-height: 1.25rem;
        }

        .price {
            margin: 1rem 0;
            font-weight: 700;
            font-size: 1.875rem;
            line-height: 2.25rem;
            display: flex;
            align-items: flex-end;

            span {
                font-weight: 700;
                font-size: .875rem;
                line-height: 1.25rem;
                margin-left: .5rem;
            }
        }

        .tips {
            font-weight: 600;
            color: #000c;
            font-size: .75rem;
            line-height: 1rem;
        }
    }

    .bnt {
        margin-top: 1.5rem;
    }

}
</style>