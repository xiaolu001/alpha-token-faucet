<template>
    <div class="whistory">
        <div class="tabs">
            <div class="tab" :class="state.index == 1 ? 'active' : ''" @click="chose(1)">{{
                $t('withdraw.History.tabs[0]') }}
            </div>
            <div class="tab" :class="state.index == 2 ? 'active' : ''" @click="chose(2)">
                {{
                    $t('withdraw.History.tabs[1]') }}
            </div>
            <div class="tab" :class="state.index == 3 ? 'active' : ''" @click="chose(3)">{{
                $t('withdraw.History.tabs[2]') }}
            </div>
        </div>
        <div class="main">
            <div class="scroll">
                <van-list v-model:loading="loading" :loading-text="$t('loading')" :finished="finished"
                    :finished-text="$t('msg.request.NoMoreData')" @load="onLoad">
                    <div class="item" v-for="(item, index) in list" :key="index">
                        <div class="no">{{ item.serial_number }}</div>
                        <div class="content">
                            <div class="row">
                                <div class="label">{{ $t('withdraw.Withdraw.label[3]') }}</div>
                                <div>: {{ item.amount }}</div>
                            </div>
                            <div class="row">
                                <div class="label">{{ $t('withdraw.Withdraw.label[4]') }}</div>
                                <div>: {{ item.withdrawal_fee }}</div>
                            </div>
                            <div class="row">
                                <div class="label">{{ $t('withdraw.Withdraw.label[5]') }}</div>
                                <div>: {{ formatTime(item.createtime) }}</div>
                            </div>
                            <div class="row">
                                <div class="label">{{ $t('withdraw.Withdraw.label[6]') }}</div>
                                <div class="active" v-if="item.status == 1">: {{ $t('withdraw.History.tabs[0]') }}</div>
                                <div class="green" v-if="item.status == 2">: {{ $t('withdraw.History.tabs[1]') }}</div>
                                <div class="red" v-if="item.status == 3">: {{ $t('withdraw.History.tabs[2]') }}</div>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { withdrawlog } from "@/api"
import { formatTime } from "@/utils"
const state = reactive({
    index: 1,
    page: 0,

})
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const chose = (i) => {
    state.index = i;
    list.value = [];
    state.page = 0;
    onLoad();
}

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    withdrawlog({
        page: state.page,
        status: state.index
    }).then(res => {
        loading.value = false;
        state.page += 1;
        list.value = list.value.concat(res.data)
        if (list.value.length >= res.total) {
            finished.value = true;
        }
    })
};
</script>
<style lang="less" scoped>
.whistory {
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;

    .tabs {
        display: flex;
        align-items: center;
        margin: 0 16px 0.75rem 16px;
        border: 1px solid #8e62dd;

        .tab {
            height: 40px;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid #8e62dd;
            color: #8e62dd;

            &:first-child {
                border-left: none;
            }

            &.active {
                color: #fff;
                background-color: #8e62dd;
            }
        }
    }

    .main {
        flex: 1;
        overflow-y: auto;
    }

    .scroll {
        height: 100%;
        box-sizing: border-box;
        padding: 0 1rem 0 1rem;
        overflow-y: auto;

        .item {
            padding: .75rem;
            box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
            border-radius: .75rem;
            margin-top: 1rem;
            background-color: #fff;

            .no {
                font-weight: 500;
                font-size: .875rem;
                line-height: 1.25rem;
                padding-bottom: .5rem;
                border-bottom: 1px solid rgb(235 235 235);
            }

            .row {
                display: flex;
                margin-top: .25rem;
                font-size: .875rem;
                line-height: 1.25rem;
                font-weight: 500;

                .label {
                    width: 35%;
                }

                .active {

                    color: #8e62dd;
                }

                .green {
                    color: #07c160;
                }

                .red {
                    color: #ee0a24;
                }
            }
        }
    }
}
</style>