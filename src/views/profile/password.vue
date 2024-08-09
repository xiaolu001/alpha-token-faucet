<template>
    <u-layout class="password">
        <template #header>
            <u-header :title="state.title" url="/profile"> </u-header>
        </template>
        <van-form class="form" @submit="onSubmit">
            <div class="item">
                <div class="label">{{ $t('profileItem.updatePassword.form.label[0]') }}</div>
                <van-field v-model="state.old_password" type="password"
                    :placeholder="$t('profileItem.updatePassword.form.label[0]')" :rules="[
                        { required: true, message: $t('system.rules.require', { name: $t('profileItem.updatePassword.form.label[0]') }) },
                        {
                            validator: () => {
                                if (state.old_password.length < 6) {
                                    return $t(`login.register.form.rule.${route.query.type=='username'?'LoginPassword':'TradingPassword'}`);
                                }
                                return true
                            }
                        }
                    ]" />


            </div>
            <div class="item">
                <div class="label">{{ $t('profileItem.updatePassword.form.label[1]') }}</div>
                <van-field v-model="state.new_password" :placeholder="$t('profileItem.updatePassword.form.label[1]')"  type="password"
                    :rules="[
                        { required: true, message: $t('system.rules.require', { name: $t('profileItem.updatePassword.form.label[1]') }) },
                        {
                            validator: () => {
                                if (state.new_password.length < 6) {
                                    return $t(`login.register.form.rule.${route.query.type=='username'?'LoginPassword':'TradingPassword'}`);
                                }
                                return true
                            }
                        }
                    ]" />
            </div>
            <div class="item">
                <div class="label">{{ $t('profileItem.updatePassword.form.label[2]') }}</div>
                <van-field v-model="state.c_password" :placeholder="$t('profileItem.updatePassword.form.label[2]')"  type="password"
                    :rules="[
                        { required: true, message: $t('system.rules.require', { name: $t('profileItem.updatePassword.form.label[2]') }) },
                        {
                            validator: () => {
                                if (state.new_password !== state.c_password) {
                                    return $t('login.register.form.rule.ConfirmLoginPassword');
                                }
                                return state.new_password === state.c_password;
                            }
                        }
                    ]" />
            </div>
            <div class="bnt">
                <van-button type="primary" :loading="state.loading" size="large" native-type="submit" round=""> {{
                    $t('system.actions.Update')
                }}</van-button>
            </div>
        </van-form>

    </u-layout>
</template>
<script setup>
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { editpassword } from "@/api"
import { showToast, showSuccessToast } from "vant"
const route = useRoute();
const { t } = useI18n();
const state = reactive({
    title: '',
    new_password: '',
    old_password: '',
    c_password: '',
    loading: false
})
onMounted(() => {
    if (route.params.type == 'username') {
        state.title = t('profileItem.menu[2]')
    } else {
        state.title = t('profileItem.menu[3]')
    }

})
const onSubmit = () => {
    if (state.loading) {
        return
    }
    state.loading = true
    editpassword({
        old_password: state.old_password,
        new_password: state.new_password,
        type: route.params.type
    }).then(res => {
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
</script>
<style lang="less">
.password {
    .form {
        margin-top: 1.5rem;

        .item {
            margin-top: 1rem;

            .label {
                font-weight: 600;
                font-size: 1rem;
                line-height: 1.5rem;
                color: #000;
                margin-bottom: .5rem;
            }
        }
    }


    .bnt {
        margin-top: 1.5rem;
    }
}
</style>