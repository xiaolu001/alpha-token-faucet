<template>
    <div class="withdraw">
        <div class="info">
            <div class="account">{{ $t('withdraw.AccountAmount') }}</div>
            <div class="price">
                {{ store.state.money }}<span>{{ store.state.currency }}</span>
            </div>
            <div class="tips">{{ $t('withdraw.tips') }}</div>
        </div>
        <van-form class="from" @submit="onSubmit">
            <div class="fromItem">
                <div class="label">
                    {{ $t('paymentMethods.form.Address') }}
                </div>
                <div class="input">
                    <van-field v-model="state.address" :placeholder="$t('paymentMethods.form.Address')" :rules="[
                        { required: true, message: $t('system.rules.require', { name: $t('paymentMethods.form.Address') }) },

                    ]">
                        <template #right-icon>
                            <van-icon name="arrow" />
                        </template>
                    </van-field>
                    <div class="click" @click="goTo('/payment?type=withdraw')"></div>
                </div>
            </div>
            <div class="fromItem">
                <div class="label">
                    {{ $t('withdraw.WithdrawAccount') }}
                </div>
                <div class="input">
                    <van-field type="number" v-model="state.amount" :placeholder="$t('withdraw.WithdrawAccount')"
                        :rules="[
                            { required: true, message: $t('system.rules.require', { name: $t('withdraw.WithdrawAccount') }) },

                        ]">
                        <template #right-icon>
                            <van-button type="primary" size="small" @click="all">{{ $t('withdraw.form.ALL')
                                }}</van-button>
                        </template>
                    </van-field>
                </div>
            </div>
            <div class="fromItem">
                <div class="label">
                    {{ $t('withdraw.form.label[1]') }}
                </div>
                <div class="input">
                    <van-field type="password" v-model="state.transaction_password"
                        :placeholder="$t('withdraw.form.label[1]')" :rules="[
                            { required: true, message: $t('system.rules.require', { name: $t('withdraw.form.label[1]') }) },
                            {
                                validator: () => {
                                    if (state.transaction_password.length < 6) {
                                        return $t(`login.register.form.rule.TradingPassword`);
                                    }
                                    return true
                                }
                            }
                        ]">

                    </van-field>
                </div>
            </div>
            <div class="bnt">
                <van-button type="primary" native-type="submit" round="" block :loading="state.loading">{{
                    $t('withdraw.form.Withdraw') }}</van-button>
            </div>
        </van-form>
    </div>
</template>


<script setup>
import { reactive, watch, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { withdraw, getUserInfo } from "@/api"
import { showSuccessToast, showToast } from "vant";

import { useI18n } from "vue-i18n";
const store = useStore();
const router = useRouter();
const { t } = useI18n();
const state = reactive({
    address: '',
    amount: '',
    transaction_password: '',
    loading: false
})
onMounted(() => {
    state.address = store.state.address;
    store.state.address = '';

})

const goTo = (url) => {
    router.push(url)
}
const all = () => {
    state.amount = store.state.money;
}
const onSubmit = () => {
    store.state.refresh += 1;
    if (state.loading) {
        return
    }
    state.loading = true;
    withdraw({
        id: store.state.addressId,
        amount: state.amount,
        transaction_password: state.transaction_password
    }).then(res => {
        store.state.refresh += 1;
        initUserInfo();
        showSuccessToast(t('msg.response.success'));
    }).catch(err => {
        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });

    }).finally(() => {
        state.loading = false;
    })
}
const initUserInfo = () => {
    getUserInfo().then(res => {
        store.state.nickname = res.nickname;
        store.state.avatar = res.avatar;
        store.state.invite_code = res.invite_code;
        store.state.credit_value = res.credit_value;
        store.state.member_level = res.member_level;
        store.state.credit_value = res.credit_value;
        store.state.today_profit = res.today_profit;
        store.state.check_day = res.check_day;
        store.state.money = res.money;
        store.state.memberLevelImg = res.member_level_info.image;

    })
}
</script>

<style lang="less">
.withdraw {
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;

    .info {
        padding: 1rem;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        border-radius: .75rem;
        background-image: url('@/assets/images/bg-home.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-bottom: 1rem;

        .account {
            font-weight: 600;
            color: #000c;
            font-size: .875rem;
            line-height: 1.25rem;
        }

        .price {
            margin: 1rem 0;
            font-weight: 700;
            font-size: 1.875rem;
            line-height: 2.25rem;
            display: flex;
            align-items: flex-end;

            span {
                font-weight: 700;
                font-size: .875rem;
                line-height: 1.25rem;
                margin-left: .5rem;
            }
        }

        .tips {
            font-weight: 600;
            color: #000c;
            font-size: .75rem;
            line-height: 1rem;
        }
    }

    .from {
        padding-top: 1rem;

        .fromItem {
            margin-top: .5rem;

            .label {
                font-weight: 600;
                font-size: 1rem;
                line-height: 1.5rem;
                color: rgb(102 102 102);
                margin-bottom: .5rem;
            }

            .input {
                box-shadow: 0 0 #0000, 0 0 #000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
                position: relative;

                .van-field__control:disabled {
                    -webkit-text-fill-color: #000
                }

                input {
                    color: #000;

                }

                .click {
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    bottom: 0;
                }
            }
        }

        .bnt {
            margin-top: 1.5rem;
        }
    }
}
</style>