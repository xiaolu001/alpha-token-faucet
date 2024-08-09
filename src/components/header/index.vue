<template>
    <van-sticky>
        <van-nav-bar :title="title" left-arrow @click-left="back"/>
    </van-sticky>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter();
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    url:{
        type: String,
        default: ''
    }
});
const back =()=>{
    if(props.url==''){
        router.back();
        return 
    }
    router.push(props.url);
}
</script>
<style lang="less">

.van-nav-bar {
    background-color: #8e62dd;

    .van-icon,
    .van-nav-bar__title {
        color: #fff;

    }
    &::after{
        display: none;
    }
}
</style>