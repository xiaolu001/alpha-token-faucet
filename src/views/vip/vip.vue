<template>
    <u-layout class="vip">
        <template #header>
            <u-header :title="$t('vip.title')"> </u-header>
        </template>
        <div class="item" v-for="item in state.list" :key="item.id">
            <div class="img">
                <img :src="item.image" />
            </div>
            <div class="info">
                <p>{{item.name}}</p>
                <p>{{item.price}} USDC</p>
                <div v-html="item.description">
             
                </div>
            </div>
        </div>
    </u-layout>
</template>
<script setup>
import { onMounted,reactive } from "vue"
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { getVip } from "@/api"
const state = reactive({
    list:[]
})
onMounted(()=>{
    init();
})
const init =()=>{
    getVip().then(res=>{
        state.list = res;
    })
}

</script>
<style lang="less">
.vip {
    .item {
        padding: .75rem;
        border-radius: .75rem;
        display: flex;
        background-color: #fff;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        margin-bottom: 1rem;
        .img {
            width: 4rem;
           
            img{
                width: 100%;
            }
        }
        .info{
            flex: 1;
            padding-left: 1rem;
            box-sizing: border-box;
        }
        p {
            &:first-child {
                font-weight: 600;
                font-size: 1rem;
                line-height: 1.5rem;
                color: rgb(51 51 51);
            }

            &:nth-child(2) {
                font-size: .875rem;
                line-height: 1.25rem;
                color: #8e62dd;
                margin-top: .5rem;
            }
        }

        ul {
            font-size: .75rem;
            line-height: 1rem;
            margin-top: .5rem;

            li {
                line-height: 2;
                color: #3598db;
            }
        }
    }
}
</style>