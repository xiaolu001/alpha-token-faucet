<template>
    <div class="register">
        <u-header :title="$t('router.register')" url="/login" />

        <div class="main">
            <img class="logo" :src="store.state.white_logo" />
            <van-form class="form" @submit="onSubmit">
                <van-field :placeholder="$t('login.register.form.label[0]')" v-model="state.username"
                    :rules="[{ required: true, message: $t('system.rules.require', { name: $t('login.register.form.label[0]') }) }]" />
                <div class="mt-6">
                    <van-field :placeholder="$t('login.register.form.label[1]')" v-model="state.mobile" :rules="[
                        { required: true, message: $t('system.rules.require', { name: $t('login.register.form.label[1]') }) },
                        {
                            validator: () => {
                                if (state.mobile.length < 6) {
                                    return $t('login.register.form.rule.Phone');
                                }
                                return true
                            }
                        }
                    ]" />
                </div>
                <div class="mt-6">
                    <van-field type="password" v-model="state.transaction_password"
                        :placeholder="$t('login.register.form.label[2]')" :rules="[
                            { required: true, message: $t('system.rules.require', { name: $t('login.register.form.label[2]') }) },

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
                <div class="mt-6">
                    <van-field :placeholder="$t('login.register.form.label[3]')" type="password"
                        v-model="state.password" :rules="[
                            { required: true, message: $t('system.rules.require', { name: $t('login.register.form.label[3]') }) },
                            {
                                validator: () => {
                                    if (state.password.length < 6) {
                                        return $t('login.register.form.rule.LoginPassword');
                                    }
                                    return true
                                }
                            }
                        ]" />
                </div>
                <div class="mt-6">
                    <van-field :placeholder="$t('login.register.form.label[4]')" type="password"
                        v-model="state.cpassword" :rules="[
                            { required: true, message: $t('system.rules.require', { name: $t('login.register.form.label[4]') }) },
                            {
                                validator: () => {
                                    if (state.password !== state.cpassword) {
                                        return $t('login.register.form.rule.ConfirmLoginPassword');
                                    }
                                    return state.password === state.cpassword;
                                }
                            }
                        ]" />
                </div>
                <div class="mt-6 row">
                    <div class="label">{{ $t('login.register.form.label[5]') }}</div>
                    <div class="right">
                        <van-radio-group v-model="state.gender" direction="horizontal">
                            <van-radio name="1">{{ $t('system.options.gender[0]') }}</van-radio>
                            <van-radio name="2">{{ $t('system.options.gender[1]') }}</van-radio>
                        </van-radio-group>
                    </div>
                </div>
                <div class="mt-6">
                    <van-field :placeholder="$t('login.register.form.label[6]')" v-model="state.invite_code"
                        :rules="[{ required: true, message: $t('system.rules.require', { name: $t('login.register.form.label[6]') }) }]" />
                </div>
                <div class="agree">
                    <van-checkbox v-model="state.agree">
                        <span>{{ $t('login.register.agree') }}</span>
                        <router-link to="/register/agreement">{{ $t('system.terms') }}</router-link>
                    </van-checkbox>
                </div>
                <div class="btn">
                    <van-button type="primary" size="large" round native-type="submit">
                        {{ $t('router.register') }}
                    </van-button>

                </div>
            </van-form>


        </div>
    </div>
</template>


<script setup>
import { reactive } from "vue"
import uHeader from "@/components/header/index.vue"
import { register } from "@/api"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { showLoadingToast, closeToast, showToast, showSuccessToast } from 'vant';
import { useI18n } from "vue-i18n"
const router = useRouter();
const { t } = useI18n();
const store = useStore();
const state = reactive({
    agree: true,
    gender: '1',
    username: '',
    mobile: '',
    transaction_password: '',
    password: '',
    cpassword: '',
    invite_code: ''
})
const onSubmit = () => {
    showLoadingToast({
        message: t('loading'),
        forbidClick: true,
        duration: 0
    });
    register({
        username: state.username,
        mobile: state.mobile,
        transaction_password: state.transaction_password,
        password: state.password,
        invite_code: state.invite_code,
        gender: state.gender,
    }).then(res => {
        closeToast();
        showSuccessToast(t('msg.response.success'));
        setTimeout(() => {
            router.push('/login');
        });
    }).catch(err => {

        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });
    })
}
</script>
<style lang="less">
.register {
    background: url('@/assets/images/backgroundImage.png') center center no-repeat;
    background-size: 100% 100%;


    .main {
        position: relative;
        z-index: 10;
        margin-top: 1.5rem;

        .logo {
            max-width: 20rem;
            width: 50%;
            margin: auto;
            display: block;
        }

        .form {
            padding: 2rem 1rem;

            .van-cell {
                background: #fff;
                border-radius: 8px;
                padding: 14px;
            }

            .van-field__control::-webkit-input-placeholder {
                color: #000;
                margin-left: 8px;
            }

            .mt-6 {
                margin-top: 1.5rem;
            }

            .row {
                display: flex;
                background: #fff;
                justify-content: space-between;
                align-items: center;
                border-radius: .5rem;

                .label {
                    background-color: #fff;

                    padding: 0 1rem;

                }

                .right {
                    padding: 14px;
                }

            }
        }

        .agree {
            margin: 1rem 0;

            span {
                font-weight: 600;
                font-size: .875rem;
                line-height: 1.25rem;
                color: #fff;
            }

            a {
                color: #8e62dd;
                font-weight: 600;
                font-size: .875rem;
                line-height: 1.25rem;
                margin-left: .5rem;
            }
        }
    }
}
</style>