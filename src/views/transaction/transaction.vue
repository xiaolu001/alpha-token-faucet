<template>
    <u-layout class="transaction">
        <template #header>
            <u-header :title="$t('my.MyFinancial.menu[2]')"> </u-header>
        </template>
        <van-list v-model:loading="loading" :loading-text="$t('loading')" :finished="finished"
            :finished-text="$t('msg.request.NoMoreData')" @load="onLoad">
            <div class="item" v-for="(item, index) in list" :key="index">
                <div class="name">{{ item.typemean }}</div>
                <div class="row">
                    <div class="left">
                        {{ formatTime(item.createtime ) }}
                    </div>
                    <div class="right">
                        {{item.money}} {{store.state.currency}}
                    </div>
                </div>
            </div>
        </van-list>
    </u-layout>
</template>
<script setup>
import { reactive, ref } from "vue";
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { getTransaction } from "@/api";
import { formatTime } from "@/utils"
import { useStore } from "vuex";
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const store = useStore();
const state = reactive({
    page: 0,
})
const onLoad = () => {

    getTransaction({
        page: state.page,

    }).then(res => {
        loading.value = false;
        state.page += 1;
        list.value = list.value.concat(res.data)
        if (list.value.length >= res.total) {
            finished.value = true;
        }
    })
    // 异步更新数据
   
};
</script>
<style lang="less">
.transaction {
    .item {
        padding: 1rem;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        border-radius: .75rem;
        margin-bottom: 1rem;
        background-color: #fff;

        .name {
            font-weight: 700;
            font-size: 1rem;
            line-height: 1.5rem;
        }

        .row {

            margin-top: .25rem;
            display: flex;
            justify-content: space-between;

            .left {
                font-size: .875rem;
                line-height: 1.25rem;
                font-weight: 400;
            }

            .right {
                font-weight: 600;
                font-size: 1rem;
                line-height: 1.5rem;
                color: rgb(34 197 94);

                &.red {
                    color: rgb(255 77 79);
                }
            }
        }
    }
}
</style>