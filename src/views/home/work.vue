<template>
    <u-layout class="work">
        <u-header></u-header>
        <div class="back">
            {{ $t('starting.Hi') }} <span> {{ store.state.nickname }}</span>{{ $t('starting.WelcomeBack') }} 👋
        </div>
        <div class="box">
            <div class="content">
                <div class="row">
                    <img src="@/assets/images/qianbao.png" />
                    <div class="flex border">
                        <div class="left">
                            <div class="label">
                                {{ $t('starting.WalletBalance.title') }}
                            </div>
                            <div class="tips">
                                {{ $t('starting.WalletBalance.tips') }}
                            </div>
                        </div>
                        <div class="right">
                            <div class="price">
                                {{ store.state.money }}
                            </div>
                            <div class="unit">
                                {{ store.state.currency }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mar">
                    <img src="@/assets/images/usdt.png" />
                    <div class="flex">
                        <div class="left">
                            <div class="label">
                                {{ $t('starting.TodaysProfit.title') }}
                            </div>
                            <div class="tips">
                                {{ $t('starting.TodaysProfit.tips') }}
                            </div>
                        </div>
                        <div class="right">
                            <div class="price">
                                {{ store.state.today_profit }}
                            </div>
                            <div class="unit">
                                {{ store.state.currency }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="start">
            <div class="title">{{ $t('starting.StartOptimization') }}</div>
            <div>
                <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false" width="340">
                    <van-swipe-item class="swipeItem" v-for="(item, index) in state.list" :key="index">
                        <!-- <div class="grids">
                            <div class="grid" v-for="i in 6" :key="i"></div>
                        </div> -->
                        <img :src="item.image" />
                    </van-swipe-item>

                </van-swipe>
            </div>
            <div class="bnt">
                <van-button type="primary" :loading="state.loading" round block @click="start"> {{
                    $t('starting.Start')
                    }} <span>({{ state.taskCompleteNumber }} /
                        {{ state.total_task }})</span></van-button>
            </div>
        </div>
        <div class="notice">
            <div class="row">
                <p>{{ $t('starting.Notice.title') }}</p>
                <img src="@/assets/images/Notifications1.png" />
            </div>
            <div class="text">
                {{ $t('starting.Notice.date', [state.open_hour?.start_time, state.open_hour?.end_time]) }}
            </div>
            <div class="text">
                {{ $t('starting.Notice.tips') }}
            </div>
        </div>
        <u-brush ref="brush" :detail="state.detail" @change="change"></u-brush>
    </u-layout>
</template>
<script setup>
import uHeader from "./components/header.vue"
import uLayout from "./components/layout.vue"
import uBrush from "./components/brush.vue"
import { ref, onMounted, reactive } from "vue"
import { useStore } from "vuex"
import { getWorkInfo, getOrder } from "@/api"
import { showDialog } from "vant"
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const brush = ref()
const state = reactive({
    list: [],
    open_hour: {},
    loading: false,
    total_task: 0,
    taskCompleteNumber: 0,
    detail: {},
    status: 0
})
onMounted(() => {
    init();
})
const start = () => {
    if (state.loading) {
        return
    }
    state.loading = true;
    getOrder().then(res => {

        state.detail = res;
        state.taskCompleteNumber += 1;
        change();
        brush.value.open();

    }).finally(() => {
        state.loading = false;
        state.status = 0;
    }).catch(err => {

        showDialog({
            message: err.msg,
            confirmButtonText: t('confirm')
        }).then(() => {
            // on close
        });
    })
    // brush.value.open();
}
const change = (status) => {
    init();
    if (status == 3) {
        start();
       
    }
}
const init = () => {
    getWorkInfo().then(res => {
        state.list = res.work_banner;
        state.open_hour = res.open_hour;
        store.state.money = res.money;
        store.state.today_profit = res.today_profit;
        state.taskCompleteNumber = res.taskCompleteNumber;
        state.total_task = res.total_task;
    })
}
</script>

<style lang="less">
.work {
    background-size: 100% 290px;
    padding-bottom: 1rem;

    .back {

        width: 91.666667%;
        margin: auto;
        font-weight: 700;
        font-size: 1.5rem;
        line-height: 2rem;
        color: #000;

        span {
            color: #8e62dd;
        }
    }

    .box {
        width: 91.666667%;
        margin: 1rem auto 0 auto;
        background-color: #fff;
        border-radius: .75rem;

        .content {


            width: 91.666667%;
            margin: 0 auto;
            padding-top: .5rem;

            .row {
                display: flex;
                align-items: center;

                &.mar {
                    padding-top: .5rem;
                    padding-bottom: 1rem;
                }

                img {
                    width: 2.5rem;
                    display: block;
                }

                .border {
                    border-bottom: 1px solid rgb(221 223 224);
                }

                .flex {
                    flex: 1;
                    padding-left: 1.5rem;
                    padding-bottom: .5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .label {
                        font-weight: 700;
                        font-size: 1rem;
                        line-height: 1.5rem;
                    }

                    .tips {
                        margin-top: .25rem;

                        font-size: .75rem;
                        line-height: 1rem;
                        color: #000c;
                    }

                    .right {
                        text-align: right;

                        .price {
                            font-weight: 700;
                            font-size: 1.5rem;
                            line-height: 2rem;
                            color: #fea40c;
                        }

                        .unit {
                            font-size: 1rem;
                            line-height: 1.5rem;
                        }
                    }
                }
            }
        }
    }

    .start {
        width: 91.666667%;
        padding-top: 1rem;
        margin: 0 auto;

        .title {
            font-weight: 700;
            font-size: 1.25rem;
            line-height: 1.75rem;
            margin: 1.25rem 0 1rem 0;
        }

        .swipeItem {
            padding-right: 1rem;
            width: 340px;
            box-sizing: border-box;

            img {
                width: 100%;
                display: block;
            }

            .grids {
                padding: 1rem;
                background: url('@/assets/images/bg-1-44f83d9a.png') center center no-repeat;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                gap: .5rem;
                min-height: 14rem;
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                box-sizing: border-box;

                .grid {
                    border-radius: .75rem;
                    padding: 1rem;
                    background-color: #fff;
                }
            }


        }

        .bnt {
            margin-top: 1.5rem;

            .van-button__text {
                font-weight: 600 !important;
                font-size: 1.125rem !important;
            }

            span {
                margin-left: .5rem;
            }
        }
    }

    .notice {
        width: 91.666667%;

        margin: 1.5rem auto 0 auto;
        padding: 1rem;
        background-color: #fff;
        border-radius: .75rem;
        box-sizing: border-box;

        .row {
            display: flex;
            margin-bottom: 1rem;

            p {
                font-weight: 700;
                font-size: 1.25rem;
                line-height: 1.75rem;
                flex: 1;
            }

            img {
                width: 1.5rem;
                height: 1.5rem;
            }
        }

        .text {
            margin-bottom: .5rem;
            color: #000000b3;
            font-weight: 600;
            font-size: .875rem;
            line-height: 1.25rem;
        }
    }
}
</style>