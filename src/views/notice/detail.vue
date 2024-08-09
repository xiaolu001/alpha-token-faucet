<template>
    <u-layout class="detail">
        <template #header>
            <u-header :title="$t('my.Other.menu[1]')"> </u-header>
        </template>
        <div class="message">{{ state.context }}</div>
        <div class="time">{{ state.time != '' && formatTime(state.time) }}</div>
    </u-layout>
</template>
<script setup>
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { onMounted, reactive } from "vue"
import { formatTime } from "@/utils"
const state = reactive({
    context: '',
    time: ''
})
onMounted(() => {
    const notice = JSON.parse(localStorage.getItem('notice'));
    console.log(notice)
    state.context = notice.message;
    state.time = notice.createtime;
})
</script>
<style lang="less">
.detail {
    .message {
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

}
</style>