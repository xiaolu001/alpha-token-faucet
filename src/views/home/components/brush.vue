<template>
    <van-popup v-model:show="show" round closeable>
        <div class="brush">
            <div class="title">{{ $t('starting.TaskDialog.title') }}</div>
            <div class="info">
                <div class="img">
                    <img :src="detail.goods_image" />
                </div>
                <div class="flex">
                    <div class="name">
                        {{ detail.goods_title }}</div>
                    <div class="price">{{ store.state.currency }} {{ detail.amount }}</div>
                    <ul>
                        <li v-for="item in detail.star" :key="item">
                            <van-icon name="star" color="rgb(255, 210, 30)" />
                        </li>

                        <!-- <li><van-icon name="star-o" color="#ddd"/></li> -->
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="colunm">
                    <p class="name">{{ $t('starting.TaskDialog.TotalAmount') }}</p>
                    <p class="value"><span>{{ store.state.currency }}</span>{{ detail.amount }}</p>
                </div>
                <div class="border"></div>
                <div class="colunm">
                    <p class="name">{{ $t('starting.TaskDialog.Profit') }}</p>
                    <p class="value"><span>{{ store.state.currency }}</span>{{ detail.fanyong_amount }}</p>
                </div>
            </div>
            <div class="item">
                <div class="label">{{ $t('starting.TaskDialog.TaskCode') }}</div>
                <div>{{ detail.order_no }}</div>
            </div>
            <div class="item">
                <div class="label">{{ $t('starting.TaskDialog.CreatedAt') }}</div>
                <div>{{ detail.createtime && formatTime(detail.createtime) }}</div>
            </div>
            <div class="bnt">
                <van-button block round type="primary" :loading="loading" @click="submit">{{ $t('system.actions.Submit')
                    }}</van-button>
            </div>
        </div>
    </van-popup>

</template>

<script setup>
import { ref } from "vue"
import { useStore } from "vuex"
import { formatTime } from "@/utils"
import { submitWork, getOrder } from "@/api"
import { showToast, showSuccessToast } from "vant";
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router";
const emits = defineEmits(['change'])
const { t } = useI18n();
const store = useStore();
const router = useRouter();
const props = defineProps({
    detail: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const show = ref(false)
const loading = ref(false)

const open = () => {
    show.value = true
}

const submit = () => {
    if (loading.value) {
        return
    }
    loading.value = true
    submitWork({
        id: props.detail.order_id,
    }).then(res => {
        show.value = false;
        showSuccessToast(t('msg.response.success'));
        setTimeout(() => {
            emits('change', res.status);
        }, 1000)
       
    }).catch(err => {

        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });
        if (err.code == -1000) {
            router.push('/deposit');
        }
    }).finally(() => {
        loading.value = false;
    })
}
defineExpose({
    open
})
</script>

<style lang="less">
.brush {
    width: 80vw;
    padding: 0 1rem;

    .title {
        padding: 1.5rem 0;
        text-align: center;
        font-size: 1rem;
        font-weight: 700;
    }

    .info {
        display: flex;
        border-bottom: 1px solid #eee;
        padding-bottom: 0.6rem;

        .img {
            width: 6rem;
            height: 6rem;
            background-color: #eee;
            border-radius: 4px;
            overflow: hidden;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .flex {
            flex: 1;
            padding-left: 0.8rem;
            box-sizing: border-box;

            .name {
                font-size: 14px;
                font-weight: bold;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                line-height: 1.5;
            }

            .price {

                font-size: 14px;
                font-weight: bold;
                line-height: 1.5;
            }

            ul {


                li {
                    margin-right: 4px;
                    display: inline-block;
                }
            }
        }

    }

    .row {
        padding: 1rem 0;
        display: flex;
        border-bottom: 1px solid #eee;

        .border {
            width: 1px;
            background: #ddd;
        }

        .colunm {
            flex: 1;
            text-align: center;

            .name {
                font-size: 1rem;
                font-weight: 900;

            }

            .value {
                margin-top: 4px;
                font-size: 14px;

                span {
                    color: #aaa;
                    margin-right: 3px;
                }
            }
        }
    }

    .item {
        display: flex;
        justify-content: space-between;
        height: 50px;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid #eee;
    }

    .bnt {
        padding: 1rem 0;
    }
}
</style>