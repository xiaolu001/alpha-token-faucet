<template>
    <van-dialog v-model:show="state.show" title="" show-cancel-button :showConfirmButton="false"
        :cancelButtonText="$t('cancel')">
        <div class="service1">
            <div class="item" v-for="item in state.list" :key="item.id" @click="href(item.url)">
                <div class="left">
                    <img src="@/assets/images/service.jpg" />
                    <span>{{item.name}}</span>
                </div>
                <van-icon name="arrow" />
            </div>
           
        </div>
    </van-dialog>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import  { getCustomer } from "@/api"
const state = reactive({
    show: false,
    list:[]
})

onMounted(()=>{
    init();
})
const open =()=>{
    state.show = true;
}
const init =()=>{
    getCustomer().then(res=>{

        state.list = res;
    }).catch()
}
const href =(url)=>{
    window.location.href = url;
}
defineExpose({
    open
})
</script>
<style lang="less">
.service1 {
    width: 100%;
    .item {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            img {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: .75rem;
            }

            span {
                font-weight: 500;
                font-size: .875rem;
                line-height: 1.25rem;
                color: rgb(59 74 72);
            }
        }
    }
}
</style>