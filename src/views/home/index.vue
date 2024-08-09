<template>
    <div class="container">
        <main>
            <router-view />
        </main>

        <footer>
            <van-tabbar v-model="active" :before-change="change">
                <van-tabbar-item>
                    <template #icon="props">
                        <img class="img" v-if="props.active" src="@/assets/images/tab1_active.png" />
                        <img class="img" v-else src="@/assets/images/tab1.png" />
                    </template>
                    <span>{{ $t('router.home') }}</span>
                </van-tabbar-item>
                <van-tabbar-item>
                    <template #icon="props">
                        <img class="img" v-if="props.active" src="@/assets/images/tab2.png" />
                        <img class="img" v-else src="@/assets/images/tab2.png" />
                    </template>
                    <span>{{ $t('router.service') }}</span>
                </van-tabbar-item>
                <van-tabbar-item>
                    <template #icon="props">
                        <img class="img" v-if="props.active" src="@/assets/images/tab3_active.png" />
                        <img class="img" v-else src="@/assets/images/tab3.png" />
                    </template>
                    <span>{{ $t('router.starting') }}</span>
                </van-tabbar-item>
                <van-tabbar-item>
                    <template #icon="props">
                        <img class="img" v-if="props.active" src="@/assets/images/tab4_active.png" />
                        <img class="img" v-else src="@/assets/images/tab4.png" />
                    </template>
                    <span>{{ $t('router.records') }}</span>
                </van-tabbar-item>
                <van-tabbar-item>
                    <template #icon="props">
                        <img class="img" v-if="props.active" src="@/assets/images/tab5_active.png" />
                        <img class="img" v-else src="@/assets/images/tab5.png" />
                    </template>
                    <span>{{ $t('router.my') }}</span>
                </van-tabbar-item>
            </van-tabbar>
        </footer>
        <u-service ref="service"></u-service>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import uService from "@/components/service/index.vue"


const route = useRoute();
const router = useRouter();
const active = ref(2);
const service = ref();
const urls = ['/', '', '/work', '/records', '/my'];


onMounted(() => {
  
})

const init = ()=>{
    const index = urls.findIndex(url => route.path == url);
    active.value = index;
}

watch(()=>route.path, ()=>{
    init();
},{
    immediate:true
})
const change = (i) => {

    if (i == 1) {
        service.value.open();
        return false;
    }
    router.push(urls[i]);
    return true;
}
</script>
<style lang="less">
.container {
    height: 100vh;
    display: flex;
    flex-direction: column;

    main {
        flex: 1;
        overflow-y: auto;
    }

    footer {
        display: flex;
        height: 88px;

        .van-tabbar {
            height: 88px;
            padding-top: 14px;
            box-sizing: border-box;
            box-shadow: 0 1px 6px #0003;
            align-items: flex-end;

            left: 50% !important;
            transform: translate(-50%);
        }

        .van-tabbar-item {
            padding: 13px 0;

            .img {
                width: 2rem !important;
                height: 2rem !important;
            }

            &:nth-child(3) {
                padding-top: 0;

                img {
                    width: 3rem !important;
                    height: 3rem !important;
                    margin-bottom: 5px;
                }
            }
        }


    }
}
</style>