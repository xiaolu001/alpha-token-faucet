<template>
    <div class="dhistory">
        <div class="scroll">
            <van-list v-model:loading="loading" :loading-text="$t('loading')" :finished="finished"
                :finished-text="$t('msg.request.NoMoreData')" @load="onLoad">
                <div class="item" v-for="(item, index) in list" :key="index">
                    <div class="name">{{$t('deposit.tabs[0]')}}</div>
                    <div class="row">
                        <div class="left">
                            {{ formatTime(item.createtime) }}
                        </div>
                        <div class="right">
                            {{item.money}} {{store.state.currency}}
                        </div>
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { depositlog } from "@/api";
import { useStore } from "vuex"
import { formatTime } from "@/utils"
const store = useStore();
const state = reactive({
    page: 0
})
const list = ref([]);
const loading = ref(false);
const finished = ref(false);



const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    depositlog({
        page: state.page,
    }).then(res => {
        loading.value = false;
        state.page+=1;
        list.value = list.value.concat(res.data)
        if (list.value.length >= res.total) {
            finished.value = true;
        }
    })
};
</script>
<style lang="less" >
.dhistory {
    padding-top: .0rem;
    height: 100%;
    overflow-y: auto;


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

            .name {
                font-weight: 700;
                font-size: 1rem;
                line-height: 1.5rem;
            }

            .row {
      
                margin-top: .25rem;
                display: flex;
                justify-content: space-between;

                .left {
                    font-size: .875rem;
                    line-height: 1.25rem;
                    font-weight: 400;
                }

                .right {
                    font-weight: 600;
                    font-size: 1rem;
                    line-height: 1.5rem;
                    color: rgb(34 197 94);
                }
            }
        }
    }
}
</style>