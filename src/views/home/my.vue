<template>
    <u-layout class="my">
        <u-header></u-header>
        <div class="info">
            <van-image class="avatar" round :src="store.state.avatar" />
            <div class="flex">
                <div class="row">
                    <div class="name">{{ store.state.nickname }}</div>
                    <div class="vip">VIP {{ store.state.member_level }}</div>
                </div>
                <div class="code" @click="copy">
                    {{ $t('my.InvitationCode') }}: {{ store.state.invite_code }}
                </div>
                <div class="code"> {{ $t('my.SignSeq') }}:{{ store.state.check_day }}</div>
                <img class="vipImg" round :src="store.state.memberLevelImg" @click="goTo('/vip')" />
            </div>
        </div>
        <div class="pross">
            <div class="label">
                {{ $t('my.CreditScore') }}:
            </div>
            <div class="row">
                <van-progress :percentage="store.state.credit_value" color="#000" :show-pivot="false"
                    :stroke-width="8" />
            </div>
            <div class="value">{{ store.state.credit_value }}%</div>
        </div>
        <div class="menus">
            <div class="menu">
                <div class="label">
                    {{ $t('starting.WalletBalance.title') }}
                </div>
                <div class="value">
                    <span>{{ store.state.money }}</span> <span>{{ store.state.currency }}</span>
                </div>
            </div>
            <div class="border"></div>
            <div class="menu">
                <div class="label">
                    {{ $t('starting.TodaysProfit.title') }}
                </div>
                <div class="value">
                    <span>{{ store.state.today_profit }}</span> <span>{{ store.state.currency }}</span>
                </div>
            </div>
        </div>
        <div class="detail">
            <div class="title">
                {{ $t('my.MyDetail.title') }}
            </div>
            <div class="row">
                <div class="column" @click="goTo('/profile')">
                    <img src="@/assets/images/Personal1.png" />
                    <p>{{ $t('my.MyDetail.menu[0]') }}</p>
                </div>
                <div class="column" @click="state.show = true">
                    <img src="@/assets/images/Payment1.png" />
                    <p>{{ $t('my.MyDetail.menu[1]') }}</p>
                </div>
            </div>
        </div>
        <div class="financial">
            <div class="title">
                {{ $t('my.MyFinancial.title') }}
            </div>
            <div class="grids">
                <div class="grid" @click="goTo('/deposit')">
                    <img src="@/assets/images/deposit.png" />
                    <p>
                        {{ $t('my.MyFinancial.menu[0]') }}
                    </p>
                </div>
                <div class="grid" @click="goTo('/withdrawal')">
                    <img src="@/assets/images/withdrawal.png" />
                    <p>
                        {{ $t('my.MyFinancial.menu[1]') }}
                    </p>
                </div>
                <div class="grid" @click="goTo('/transaction')">
                    <img src="@/assets/images/transaction.png" />
                    <p>
                        {{ $t('my.MyFinancial.menu[2]') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="other">
            <div class="title">{{ $t('my.Other.title') }}</div>
            <ul>
                <li @click="contact">
                    <img src="@/assets/images/contactUs.png" />
                    <p>{{ $t('my.Other.menu[0]') }}</p>
                </li>
                <li @click="goTo('/notice')">
                    <img src="@/assets/images/Notifications1.png" />
                    <p>{{ $t('my.Other.menu[1]') }}</p>
                </li>
                <!-- <li @click="open">
                    <img src="@/assets/images/ChangeLanguage.png" />
                    <p>{{ $t('my.Other.menu[2]') }}</p>
                </li> -->
            </ul>
        </div>
        <div class="bnts">
            <van-button type="primary" round block @click="logoutHandle">{{ $t('my.Logout.title') }}</van-button>
        </div>
        <u-lang ref="lang"></u-lang>
        <u-service ref="service"></u-service>
        <van-popup v-model:show="state.show" position="bottom" closeable>
            <div class="transaction">
                <div class="title">{{ $t('paymentMethods.form.TransactionPassword') }}</div>
                <van-form class="form" @submit="pay">
                    <div class="input">
                        <van-field type="password" v-model="state.transaction_password"
                            :placeholder="$t('paymentMethods.form.TransactionPassword')" :rules="[
                                { required: true, message: $t('system.rules.require', { name: $t('paymentMethods.form.TransactionPassword') }) },
                                {
                                    validator: () => {
                                        if (state.transaction_password.length < 6) {
                                            return $t('login.register.form.rule.TradingPassword');
                                        }
                                        return true
                                    }
                                }
                            ]" />
                    </div>
                    <div class="bnt">
                        <van-button :loading="state.loading" native-type="submit" type="primary" round block>{{
                            $t('system.actions.Submit')
                        }}</van-button>
                    </div>
                </van-form>
            </div>
        </van-popup>

        <!-- <van-dialog v-model:show="state.logout" :title="$t('my.Logout.title')" show-cancel-button>
           {{ $t('my.Logout.content') }}
        </van-dialog> -->
    </u-layout>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { showDialog, showToast } from 'vant';
import { useStore } from "vuex";
import useClipboard from 'vue-clipboard3'
import uHeader from "./components/header.vue"
import uLayout from "./components/layout.vue"
import uLang from "@/components/lang/index.vue"
import uService from "@/components/service/index.vue"
import { logout, validatetrpassword } from "@/api"
const store = useStore();
const lang = ref();
const service = ref();
const router = useRouter();
const { t } = useI18n();
const { toClipboard } = useClipboard()
const state = reactive({
    show: false,
    logout: true,
    loading: false,
    transaction_password: ''
});



const goTo = (url) => {
    router.push(url);
}
const open = () => {
    lang.value.open();
}
const contact = () => {
    service.value.open();
}
const pay = () => {
    if (state.loading) return;
    state.loading = true;
    validatetrpassword({
        transaction_password: state.transaction_password
    }).then(() => {
        goTo('/payment')
    }).catch(err => {

        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });
    }).finally(() => {
        setTimeout(() => {
            state.loading = false;
        }, 800)
    })

}
const logoutHandle = () => {
    showDialog({
        message: t('my.Logout.content'),
        title: t('my.Logout.title'),
        confirmButtonText: t('confirm'),
        cancelButtonText: t('cancel'),
        showCancelButton: true
    }).then((e) => {
        console.log(e)
        // on close
        logout().then(res => {

            store.state.then = '';
            localStorage.removeItem('token');
            localStorage.removeItem('userinfo');
        }).catch(err => {

        })

        goTo('/login')
    }).catch(() => {

    });
}
const copy = async () => {
    try {
        await toClipboard(store.state.invite_code);

        showToast('Copy Sucess')
    } catch (e) {
        console.error(e)
    }
}
</script>
<style lang="less">
.my {
    .info {
        width: 91.666667%;
        margin: auto;
        display: flex;

        .avatar {
            width: 3.5rem;
            margin-top: .5rem;
            margin-right: 1rem;
            height: 3.5rem;
        }

        .flex {
            flex: 1;
            position: relative;

            .row {
                display: flex;
                align-items: center;

                .name {
                    font-weight: 600;
                    font-size: 1.5rem;
                    line-height: 2rem;
                    color: #000;
                }

                .vip {
                    line-height: 18px;
                    font-weight: 700;
                    font-size: 8px;
                    padding-left: .5rem;
                    padding-right: .5rem;
                    background-color: #000;
                    margin-left: .5rem;
                    border-radius: 9999px;
                    color: #fff;
                    box-sizing: border-box;
                    display: inline-block;
                    height: 18px;
                }
            }

            .code {
                color: #000c;
                font-size: .75rem;
                line-height: 1rem;
                margin-top: .125rem;
            }

            .vipImg {
                width: 5rem;
                right: 1rem;
                top: .5rem;
                position: absolute;

            }
        }

    }

    .pross {

        width: 91.666667%;
        margin: 1rem auto 0 auto;
        display: flex;
        align-items: center;

        .row {
            margin: 0 1rem;
            flex: 1;
        }

        .value {
            font-size: .75rem;
            line-height: 1rem;
            color: #000;
        }
    }

    .menus {
        display: flex;
        padding: 1rem;
        background-color: #fff6;
        border-radius: .75rem;
        margin: .5rem auto 0 auto;
        box-sizing: border-box;
        width: 91.666667%;

        .menu {
            flex: 1;
            display: flex;
            flex: 1 1 0%;
            flex-direction: column;
            justify-content: space-between;

            .label {
                font-weight: 600;
                font-size: .875rem;
                line-height: 1.25rem;
                color: #000;
            }

            .value {
                margin-top: .5rem;
                display: flex;
                align-items: flex-end;

                span {
                    &:first-child {
                        font-size: 1.25rem;
                        line-height: 1.75rem;
                        font-weight: 600;
                        color: #fea40c;
                    }

                    &:last-child {
                        line-height: 1.25rem;
                        margin-left: .5rem;
                        font-size: .75rem;
                        color: #000;
                    }
                }
            }
        }

        .border {
            height: 3.5rem;
            margin: 0 1.5rem;
            width: 1px;
            background-color: #0003;
        }
    }

    .detail {
        width: 91.666667%;
        margin: 1rem auto 0 auto;

        .title {
            font-weight: 600;
            font-size: 1.125rem;
            line-height: 1.75rem;
            margin-bottom: .5rem;
            color: #000;
        }

        .row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 1rem;

            .column {
                padding: 1rem;
                align-items: center;
                display: flex;
                background: url('@/assets/images/bg-my.png') center center no-repeat;
                background-size: 100% 100%;
                border-radius: .75rem;
                align-items: center;
                display: flex;
                overflow: hidden;

                img {
                    width: 3rem;
                    display: block;
                }

                p {
                    font-weight: 600;
                    color: #fff;
                    padding-right: .5rem;
                    margin-left: 1rem;
                    font-size: .875rem;
                    line-height: 1.25rem;
                }
            }
        }
    }

    .financial {
        margin: 2rem auto 0 auto;
        width: 91.666667%;
        border-radius: .75rem;
        background-color: #fff;
        padding: 1rem;
        box-sizing: border-box;

        .title {
            font-weight: 600;
            font-size: 1.125rem;
            line-height: 1.75rem;
            color: #000;
        }

        .grids {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1rem;
            display: grid;
            margin-top: .5rem;

            .grid {
                img {
                    width: 3rem;
                    display: block;
                    margin: auto;
                }

                p {
                    font-weight: 500;
                    font-size: .875rem;
                    line-height: 1.25rem;
                    margin-top: .5rem;
                    text-align: center;
                }

                &:nth-child(2) {
                    border-left: 1px solid rgb(226 226 226);
                    border-right: 1px solid rgb(226 226 226);
                }
            }
        }
    }

    .other {

        margin: 1rem auto 0 auto;
        width: 91.666667%;

        .title {
            font-weight: 600;
            font-size: 1.125rem;
            line-height: 1.75rem;
            color: #000;
        }

        ul {
            border-radius: .75rem;
            margin-top: 1rem;
            background-color: #fff;

            li {
                padding: .5rem;
                align-items: center;
                display: flex;

                img {
                    width: 2.5rem;
                }

                p {
                    flex: 1;
                    padding: 1rem 0;
                    border-bottom: 1px solid #0000001a;
                    margin-left: 1rem;
                }

                &:last-child {
                    p {
                        border-bottom: 0;
                    }
                }
            }
        }
    }

    .bnts {
        width: 91.666667%;
        margin: 1.5rem auto;
        box-sizing: border-box;
        padding: 0 2rem;
    }

    .transaction {
        padding: 1rem;

        .title {
            margin-top: 2rem;
            font-weight: 600;
            font-size: 1rem;
            line-height: 1.5rem;
        }

        .input {
            margin-top: .5rem;
            box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);
        }

        .bnt {
            margin-top: 1.5rem;
        }
    }
}
</style>