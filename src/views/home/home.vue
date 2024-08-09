<template>
    <u-layout class="home">
        <u-header :right="true"></u-header>
        <div class="notice">
            <van-notice-bar background="rgba(255, 255, 255, 0.4)" color="#000" left-icon="volume-o">
                <template #left-icon>
                    <img class="img" src="@/assets/images/notice.png" />
                </template>
                <router-link :to="`/bulletin/${item.id}`" v-for="item in state.broadcasts" :key="item.id">{{ item.title
                    }}</router-link>
            </van-notice-bar>
        </div>
        <div class="swiper">
            <van-swipe class="my-swipe" :show-indicators="false">
                <van-swipe-item v-for="item in state.banners" :key="item.id" @click="open(item.url)">
                    <!-- <video preload="auto" disablepictureinpicture autoplay="true" loop ref="video" playsinline="true"
                        webkit-playsinline="true" x5-playsinline="true"
                        src="https://wotlkoss.oss-ap-southeast-1.aliyuncs.com/7bebb38a33df6fb92cb0da5c3c821f0b.mp4"></video> -->
                    <img :src="item.image" />
                </van-swipe-item>

            </van-swipe>
        </div>
        <div class="menus">
            <div class="menu" @click="openService">
                <img src="@/assets/images/service.png" />
                <p>{{ $t('home.service[0]') }}</p>
            </div>
            <div class="menu" @click="goTo('/introduce?type=1')">
                <img src="@/assets/images/event.png" />
                <p>{{ $t('home.service[1]') }}</p>
            </div>
            <div class="menu" @click="goTo('/withdrawal')">
                <img src="@/assets/images/withdrawal.png" />
                <p>{{ $t('home.service[2]') }}</p>
            </div>
            <div class="menu" @click="goTo('/deposit')">
                <img src="@/assets/images/deposit.png" />
                <p>{{ $t('home.service[3]') }}</p>
            </div>
            <div class="menu" @click="goTo('/introduce?type=4')">
                <img src="@/assets/images/TC.png" />
                <p>{{ $t('home.service[4]') }}</p>
            </div>
            <div class="menu" @click="goTo('/introduce?type=5')">
                <img src="@/assets/images/certificate.png" />
                <p>{{ $t('home.service[5]') }}</p>
            </div>
            <div class="menu" @click="goTo('/introduce?type=6')">
                <img src="@/assets/images/FAQs.png" />
                <p>{{ $t('home.service[6]') }}</p>
            </div>
            <div class="menu" @click="goTo('/introduce?type=7')">
                <img src="@/assets/images/About.png" />
                <p>{{ $t('home.service[7]') }}</p>
            </div>
        </div>
        <div class="box">
            <div class="head">
                <div class="left">{{ $t('home.Popularhotels') }}</div>
                <div class="right" @click="goTo('/brand')">{{ $t('home.vip.more') }} >> </div>
            </div>
            <div class="scrollX">
                <div class="item" v-for="item in state.brands" :key="item.id">
                    <img :src="item.image" />
                    <p>{{ item.title }}</p>
                    <p>{{ item.u_title }}</p>
                    <p> {{ store.state.currency }} {{ item.price }}</p>
                </div>

            </div>
        </div>
        <div class="box">
            <div class="head">
                <div class="left">{{ $t('vip.title') }}</div>
                <div class="right" @click="goTo('/vip')">{{ $t('home.vip.more') }} >> </div>
            </div>
            <div class="scrollX">
                <div class="vip" v-for="(item, i) in state.vips" :key="item.id">
                    <div class="title">
                        <div class="left">{{ item.name }}</div>
                        <div class="right">
                            <img :src="item.image" />
                        </div>
                    </div>
                    <div class="content" v-html="item.description">

                    </div>
                </div>

            </div>
        </div>
        <div class="bottom"></div>
        <u-service ref="service"></u-service>
    </u-layout>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router"
import uHeader from "./components/header.vue"
import uLayout from "./components/layout.vue"
import uService from "@/components/service/index.vue"
import { getBanner, getBrand, getBroadcast, getVip } from "@/api"
import { useStore } from "vuex"
const store = useStore();
const router = useRouter()
const service = ref();
const state = reactive({
    banners: [],
    brands: [],
    broadcasts: [],
    vips: []
})
onMounted(() => {
    initBanner();
    initBroadcast();
    initBrand();
    initVip();
})

const initBanner = () => {
    getBanner().then(res => {
        state.banners = res;
    }).catch()
}
const initBroadcast = () => {
    getBroadcast().then(res => {
        state.broadcasts = res;
    }).catch()
}
const initBrand = () => {
    getBrand().then(res => {
        state.brands = res;
    }).catch()
}
const initVip = () => {
    getVip().then(res => {
        state.vips = res;
    }).catch()
}
const goTo = (url) => {
    router.push(url);
}
const open = (url) => {
    if (url == '') {
        return
    }
    location.href = url;

}
const openService = () => {
    service.value.open();
}
</script>
<style lang="less">
.home {



    .notice {
        margin-bottom: 1rem;

        img {
            width: 1.25rem;
            margin-right: .5rem;
        }

        a {
            color: #000;
        }
    }

    .swiper {
        width: 91.666667%;
        margin: 0 auto;
        min-height: 200px;

        video {
            width: 100%;
            object-fit: cover;
            border-radius: 1rem;
        }

        img {
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 1rem;
        }
    }

    .menus {
        margin: 1rem 0;
        padding: 1.5rem;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1rem;
        font-weight: 300;
        background-color: #fff;

        .menu {

            img {
                width: 3rem;
                height: 3rem;
                display: block;
                margin: auto;
            }

            p {
                font-size: .75rem;
                line-height: 1rem;
                margin-top: .25rem;
                white-space: nowrap;
                text-align: center;
            }
        }
    }

    .box {
        width: 91.666667%;
        margin: 1rem auto 0 auto;

        .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 1.25rem;

            .left {
                color: #000000e6;
                font-weight: 600;
                font-size: 1.25rem;
                line-height: 1.75rem;
            }

            .right {
                line-height: .75rem;
                font-size: .75rem;
                text-decoration-line: underline;
                padding: .375rem .5rem;
            }
        }

        .scrollX {
            scrollbar-width: none;
            overflow-x: auto;
            flex-wrap: nowrap;
            display: flex;

            .item {
                width: 120px;
                flex-shrink: 0;
                margin-right: .875rem;

                img {
                    width: 100%;
                    height: 80px;
                    display: block;
                    border-radius: 8px;
                }

                p {
                    font-weight: 600;

                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;

                    &:nth-child(2) {
                        font-size: .875rem;
                        line-height: 1;
                        margin-top: .375rem;
                        color: #000;
                    }

                    &:nth-child(3) {
                        color: #666;
                        font-size: 12px;
                        margin-top: 0.2rem;
                        line-height: 1;
                    }

                    &:nth-child(4) {
                        font-weight: 600;
                        color: #f43d6b;
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                        margin-top: 0.1rem;
                    }
                }
            }

            .vip {
                width: 91.666667%;

                border-radius: .75rem;
                flex-direction: column;
                flex-shrink: 0;
                max-width: 20rem;
                display: flex;
                margin-right: .625rem;
                background-image: url('@/assets/images/vip-bg.png');
                background-size: 100% 100%;

                .title {
                    padding: 1rem;
                    align-items: center;
                    display: flex;
                    justify-content: space-between;

                    .left {
                        font-weight: 600;
                        font-size: 1.875rem;
                        line-height: 2.25rem;
                        color: #fff;
                    }

                    .right {
                        img {
                            width: 3rem;
                        }
                    }
                }

                .content {
                    background-color: #fffc;
                    margin: 0 .5rem .5rem .5rem;
                    padding: 1rem;
                    border-radius: .75rem;

                    ul {
                        li {
                            line-height: 2;
                            color: #3598db;
                            font-size: .875rem;
                        }

                    }
                }
            }
        }
    }

    .bottom {
        padding-bottom: 1rem;
    }
}
</style>