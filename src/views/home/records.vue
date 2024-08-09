<template>
    <div class="records">
        <u-header></u-header>
        <div class="tabs">
            <van-tabs @click-tab="change">
                <van-tab :title="$t('records.status.All')"></van-tab>
                <van-tab :title="$t('records.status.Undone')"></van-tab>
                <van-tab :title="$t('records.status.Completed')"></van-tab>
                <van-tab :title="$t('records.status.Frozen')"></van-tab>
            </van-tabs>
        </div>
        <div class="scroll">

            <van-list v-model:loading="loading" :loading-text="$t('loading')" :finished="finished"
                :finished-text="$t('msg.request.NoMoreData')" @load="onLoad">
                <div v-for="(item, index) in list" :key="index" :class="item.liandan_id > 0 ? 'middle' : 'item'">
                    <template class="" v-if="item.liandan_id == 0">
                        <div class="title">
                            <div class="time">{{ formatTime(item.createtime) }} </div>
                            <div class="status green" v-if="item.status == 1">
                                {{ $t('records.status.Undone') }}
                            </div>
                            <div class="status " v-if="item.status == 2">
                                {{ $t('records.status.Completed') }}
                            </div>
                            <div class="status red" v-if="item.status == 3">
                                {{ $t('records.status.Frozen') }}
                            </div>
                        </div>
                        <div class="content">
                            <div class="row">
                                <van-image width="6rem" height="6rem" :src="item.goods[0].goods_image" radius="10px" />
                                <div class="flex">
                                    <div>
                                        <div class="name">{{ item.goods[0].goods_title }}</div>
                                        <div class="price">{{ item.amount }} * {{ item.count }} {{ store.state.currency
                                            }}
                                        </div>
                                    </div>
                                    <ul class="stars">
                                        <li v-for="i in item.star" :key="i"> <van-icon name="star"
                                                color="rgb(255, 210, 30)" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="grids">
                                <div class="grid">
                                    <div class="label">
                                        {{ $t('records.TotalAmount') }}
                                    </div>
                                    <div class="value">
                                        {{ item.amount * item.count }} {{ store.state.currency }}
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="label">
                                        {{ $t('records.Profit') }}
                                    </div>
                                    <div class="value">
                                        {{ item.sj_fanyong_amount }} {{ store.state.currency }}
                                    </div>
                                </div>

                            </div>
                            <div class="bnt" v-if="item.status == 1">
                                <van-button round block type="primary" :loading="state.submitLoading"
                                    @click="submit(item.id, index)">{{ $t('system.actions.Submit') }}</van-button>
                            </div>
                        </div>
                    </template>
                    <template v-else v-for="(good, index) in item.goods">
                        <div class="title">
                            <div class="time">{{ formatTime(good.createtime) }} </div>
                            <div class="status green" v-if="good.status == 1 || good.status == 3 && good.is_fushu == 2">
                                {{ $t('records.status.Undone') }}
                            </div>
                            <div class="status " v-else-if="good.status == 2">
                                {{ $t('records.status.Completed') }}
                            </div>
                            <div class="status red" v-else-if="good.status == 3 && good.is_fushu != 2">
                                {{ $t('records.status.Frozen') }}
                            </div>
                        </div>
                        <div class="content">
                            <div class="row">
                                <van-image width="6rem" height="6rem" :src="good.goods_image" radius="10px" />
                                <div class="flex">
                                    <div>
                                        <div class="name">{{ good.goods_title }}</div>
                                        <div class="price">{{ good.price }} * 1 {{ store.state.currency
                                            }}
                                        </div>
                                    </div>
                                    <ul class="stars">
                                        <li v-for="i in good.star" :key="i"> <van-icon name="star"
                                                color="rgb(255, 210, 30)" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="grids">
                                <div class="grid">
                                    <div class="label">
                                        {{ $t('records.TotalAmount') }}
                                    </div>
                                    <div class="value">
                                        {{ good.price }} {{ store.state.currency }}
                                    </div>
                                </div>
                                <div class="grid">
                                    <div class="label">
                                        {{ $t('records.Profit') }}
                                    </div>
                                    <div class="value">
                                        {{ good.fanyong_amount }} {{ store.state.currency }}
                                    </div>
                                </div>

                            </div>
                            <div class="bnt" v-if="good.status == 1">
                                <van-button round block type="primary" :loading="state.submitLoading"
                                    @click="submit(good.order_id, index)">{{ $t('system.actions.Submit') }}</van-button>
                            </div>
                        </div>
                    </template>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useI18n } from "vue-i18n"
import uHeader from "./components/header.vue"

import { getRecords, submitWork, getOrder } from "@/api"
import { useStore } from "vuex";
import { formatTime } from "@/utils"
import { showToast, showSuccessToast } from "vant";
import { useRouter } from "vue-router";
const { t } = useI18n();
const router = useRouter();
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const store = useStore();
const state = reactive({
    page: 0,
    status: 0,
    submitLoading: false,

})
const change = (i) => {

    state.page = 0;
    state.status = i.name;
    list.value = [];
    onLoad();
}
const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    getRecords({
        page: state.page,
        status: state.status
    }).then(res => {
        loading.value = false;
        state.page += 1;
        list.value = list.value.concat(res.data)
        if (list.value.length >= res.total) {
            finished.value = true;
        }
    })

};


const submit = (id, index) => {
    if (state.submitLoading) {
        return
    }
    state.submitLoading = true;
    submitWork({ id }).then(res => {
        if (state.status == 1) {
            list.value.splice(index, 1);
        } else {
         
            change({name:state.status});
        }

        showSuccessToast(t('msg.response.success'));

    }).catch((err) => {

        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });
        if (err.code == -1000) {
            router.push('/deposit');
        }
    }).finally(() => {
        state.submitLoading = false;
    })
}

</script>

<style lang="less">
.records {
    height: 100%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    background-color: rgb(245 245 245);

    .van-tabs__nav {
        background-color: rgb(245 245 245);
    }

    .scroll {
        flex: 1;
        overflow-y: auto;
        padding: 1rem 1rem 0 1rem;

        .item {
            .content {
                box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 6px 1px rgba(0, 0, 0, .1);
                border-radius: .75rem;
            }
        }

        .item,
        .middle {
            margin-top: .5rem;
            margin-bottom: 1rem;

            .title {
                padding: .5rem 0 .5rem 0;
                display: flex;
                justify-content: space-between;

                .time {
                    color: #000c;
                    font-weight: 500;
                    font-size: .875rem;
                    line-height: 1.25rem;
                }

                .status {
                    font-size: .75rem;
                    line-height: 1rem;
                    font-weight: 500;
                    padding: 0.25rem 8px;
                    color: #fff;
                    background-color: #8e62dd;
                    border-radius: 9999px;

                    &.green {
                        background-color: #07c160;
                    }

                    &.red {
                        background-color: #ee0a24;
                    }
                }
            }

            .content {
                padding: .75rem;
                background-color: #fff;


                .row {
                    display: flex;

                    .flex {
                        flex: 1;
                        padding-left: 1rem;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        color: #000;

                        .name {
                            font-size: 1rem;
                            line-height: 1.5rem;
                            font-weight: 600;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            width: 52vw;
                        }

                        .price {
                            font-size: .875rem;
                            line-height: 1.25rem;
                            margin-top: .125rem;
                        }

                        .stars {
                            display: flex;

                            li {
                                margin-right: 4px;
                            }
                        }
                    }
                }

                .grids {
                    gap: .5rem;
                    grid-template-columns: repeat(5, minmax(0, 1fr));
                    display: grid;
                    margin-top: 1.25rem;

                    .grid {
                        grid-column: span 2 / span 2;
                        flex-direction: column;
                        display: flex;
                    }

                    .name {
                        font-size: .75rem;
                        line-height: 1rem;
                        font-weight: 500;
                    }

                    .value {
                        font-weight: 600;
                        color: rgb(244 61 107);
                        font-size: .875rem;
                        line-height: 1.25rem;
                        margin-top: .5rem;
                    }
                }
            }


        }

        .middle {
            padding-top: .75rem;
            background-color: #fff;
            box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 6px 1px rgba(0, 0, 0, .1);
            border-radius: .75rem;

            .title {
                padding: 0 .75rem;
            }
        }

        .bnt {
            margin-top: .5rem;
        }
    }
}
</style>