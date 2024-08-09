<template>
    <u-layout class="notice">
        <template #header>
            <u-header :title="$t('my.Other.menu[1]')"> </u-header>
        </template>
        <van-list v-model:loading="loading" :loading-text="$t('loading')" :finished="finished"
            :finished-text="$t('msg.request.NoMoreData')" @load="onLoad">
            <div  class="item" v-for="item in list" :key="item.id" @click="readClick(item, index)">
                <div class="round" v-if="item.is_read == 1"></div>
                <div class="title">{{ item.message }}</div>
                <div class="time">{{ formatTime(item.createtime) }}</div>
            </div>
        </van-list>
    </u-layout>
</template>
<script setup>
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { getMsg, read } from "@/api"
import { ref, reactive } from "vue"
import { formatTime } from "@/utils"
import { useRouter } from "vue-router"
const router = useRouter();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const state = reactive({
    page: 0,
})

const onLoad = () => {

    getMsg({
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
const readClick = (item, index) => {
    localStorage.setItem('notice', JSON.stringify(item));
    router.push(`/notice/${item.id}`)
    if (item.is_read == 2) {
        return
    }
    read({
        id: item.id
    }).then(res => {
        item.is_read = 2
    })
}

</script>
<style lang="less">
.notice {
    .item {
        padding: .75rem;
        background-color: #fff;
        border-radius: .75rem;
        position: relative;
        display: block;
        margin-bottom: 1rem;

        .title {
            font-weight: 600;
            font-size: 1rem;
            line-height: 1.5rem;
            color: #000;
            margin-bottom: 1rem;
        }

        .time {
            font-size: 1rem;
            line-height: 1.5rem;
            font-weight: 600;
            padding-right: 1rem;
            text-align: right;
        }

        .round {
            position: absolute;
            width: .5rem;
            top: .5rem;
            right: .5rem;
            height: .5rem;
            background-color: rgb(238 10 36);
            border-radius: 50%;
        }
    }
}
</style>