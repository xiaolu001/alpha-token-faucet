<template>
    <div class="login">
        <div class="menu">
            <u-service class="mr-4" />
            <!-- <u-lang /> -->
        </div>
        <img class="bg" src="@/assets/images/backgroundImage.png" />
        <div class="main">
            <img class="logo" :src="store.state.white_logo" />
            <div>
                <van-form class="form" @submit="onSubmit">
                    <van-field :placeholder="$t('login.login.form.label[0]')" v-model="state.username"
                        :rules="[{ required: true, message: $t('system.rules.require', { name: $t('login.login.form.label[0]') }) }]" />
                    <div class="mt-6">
                        <van-field :type="state.show ? 'text' : 'password'" v-model="state.password"
                            :placeholder="$t('login.login.form.label[1]')" @click-right-icon="open"
                            :rules="[{ required: true, message: $t('system.rules.require', { name: $t('login.login.form.label[1]') }) }]">
                            <template #right-icon>
                                <img class="eye" v-show="!state.show" src="@/assets/images/eye.png" />
                                <img class="eye" v-show="state.show" src="@/assets/images/eye2.png" />
                            </template>

                        </van-field>

                    </div>
                    <div class="btns">
                        <van-button type="primary" size="large" round native-type="submit">
                            {{ $t('router.login') }}
                        </van-button>
                        <van-button type="default" size="large" round @click="goTo('/register')">
                            {{ $t('router.register') }}
                        </van-button>
                    </div>
                </van-form>

                <div class="bottom">
                    {{ $t('login.login.forgotPassword') }} <a> {{ $t('login.login.contactSupport') }}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import uService from "./components/service.vue";
import uLang from "./components/lang.vue";
import { reactive } from 'vue';
import { useRouter } from "vue-router"
import { showLoadingToast,closeToast, showToast, showSuccessToast } from 'vant';
import { login } from "@/api"
import { useI18n } from "vue-i18n"
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const { t } = useI18n();
const state = reactive({
    show: false,
    password: '',
    username: ''
})
const open = () => {
    state.show = !state.show;
}
const goTo = (url) => {
    router.push(url);
}
const onSubmit = () => {
    showLoadingToast({
        message: t('loading'),
        forbidClick: true,
        duration:0
    });
    login({
        username: state.username,
        password: state.password
    }).then(res => {
        store.state.token =res.userinfo.token;
        localStorage.setItem('token', res.userinfo.token);
        localStorage.setItem('userinfo',JSON.stringify(res.userinfo));
        closeToast();
        showSuccessToast(t('msg.response.success'));
        setTimeout(()=>{
            router.push('/');
        });
        // if (res.code == 200) {
        //     localStorage.setItem('token', res.data.token);
        //     router.push('/home');
        // }
    }).catch(err=>{
        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });
    }).finally(()=>{
        
    })

}
</script>

<style lang="less">
.login {
    width: 100%;
    height: 100%;
    position: relative;

    .bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .menu {
        top: .5rem;
        right: 1.25rem;
        position: fixed;
        display: flex;
        z-index: 99;
    }

    .mr-4 {
        margin-right: 1rem;
    }

    .main {
        padding-top: 8rem;
        z-index: 9;
        position: relative;
        box-sizing: border-box;

        .logo {
            max-width: 20rem;
            width: 50%;
            display: block;
            margin: auto;
        }

        .mt-6 {
            margin-top: 1.5rem;
        }

        .form {
            margin-top: .5rem;
            width: 91.666667%;
            margin: auto;
            padding: 1.5rem 0;

            .van-cell {
                background: transparent;
                border-radius: 0;
                padding: 14px 0;
                border-bottom: 1px solid #52545b;

                &::after {
                    content: '';
                    display: none;
                }

                .van-field__control {

                    color: #fff;
                    margin-left: 8px;
                }

                .van-field__control::placeholder {
                    color: #fff;
                }

                .van-field__right-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .eye {
                    width: 24px;
                }
            }
        }

        .btns {
            margin-top: 1.5rem;

            .van-button--primary {
                box-shadow: 0 1px 6px 1px #0000001a;
                color: #fff;
                background: #8e62dd;
                border: 1px solid #8e62dd;
                font-weight: 700;
            }

            .van-button--default {
                color: white;
                background: rgba(142, 98, 221, 0.4);
                border: none;
                font-weight: 700;
                margin-top: 1rem;

                &::before {
                    display: none;
                }
            }
        }

        .bottom {
            margin-top: 1rem;
            text-align: center;
            font-size: 1.125rem;
            line-height: 1.75rem;
            color: #fff;

            a {
                color: #8e62dd;
            }
        }

    }
}
</style>