<template>
    <u-layout class="brand">
        <template #header>
            <u-header :title="$t('home.Popularhotels')"></u-header>
        </template>
        <div class="scroll">

            <van-list v-model:loading="loading" :loading-text="$t('loading')" :finished="finished"
                :finished-text="$t('msg.request.NoMoreData')" @load="onLoad">
                <div class="item" v-for="item in list">
                    <div class="img">
                        <img :src="item.image" />
                    </div>
                    <div class="info">
                        <div class="name">{{ item.title }}</div>
                        <div class="subheading">{{ item.u_title }}</div>
                        <ul>
                            <li v-for="i in Number(item.star)"><van-icon name="star" color="rgb(255, 180, 65)"
                                    size="14" /></li>
                            <li>{{ item.star }}</li>
                        </ul>
                        <div class="price">{{ store.state.currency }}{{ item.price }}</div>
                    </div>
                </div>
            </van-list>
        </div>
    </u-layout>
</template>
<script setup>
import { ref } from "vue";
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { brandpage } from "@/api";
import { useStore } from "vuex"
const store = useStore();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(0);
const onLoad = () => {

    brandpage({
        page: page.value
    }).then(res => {

        list.value = list.value.concat(res.data);
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= res.total) {
            finished.value = true;
        }
    })

};
</script>
<style lang="less">
.brand {
    .item {
        padding: 1rem .5rem;
        background-color: #fff;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 6px 1px rgba(0, 0, 0, .1);
        display: flex;
        border-radius: .75rem;
        margin-bottom: 1rem;

        .img {

            width: 150px;
            height: 100px;

            img {
                object-fit: cover;
                max-width: 100%;
                max-height: 100%;
                display: block;
                height: auto;
                margin: auto;
            }
        }

        .info {
            flex: 1;
            margin-left: .625rem;

            .name {
                font-weight: 600;
                font-size: .875rem;
                line-height: 1.25rem;
                margin-top: .375rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }

            .subheading {
                font-weight: 600;
                font-size: .675rem;
                line-height: 0.8rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                color: #666;
            }

            ul {

                padding-top: .375rem;
          
                display: flex;
                align-items: center;

                li {
                    display: flex;
                    align-items: center;

                    padding-right: 4px;

                    &:last-child {
                        color: rgb(255 180 65);
                        font-weight: 500;
                        font-size: .75rem;
                        margin-left: .5rem;
                    }
                }
            }

            .price {
                font-weight: 600;
                color: #f43d6b;
                font-size: 0.875rem;
                line-height: 1.25rem;
                margin-top: 0.1rem;
            }
        }
    }
}
</style>