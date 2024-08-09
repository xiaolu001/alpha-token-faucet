<template>
    <u-layout class="username">
        <template #header>
            <u-header :title="$t('profileItem.title')" url="/profile"> </u-header>
        </template>
        <div class="upload">
            <van-uploader :after-read="afterRead" >
             
                <img v-if="url==''"  src="@/assets/images/user.png"/>
                <img v-else :src="url" />
            </van-uploader>
        </div>
        <div class="taptochange">{{ $t('system.actions.Taptochange') }} <van-icon name="edit" /></div>
        <div class="bnt">
            <van-button type="primary" size="large" @click="updata" round="" :loading="loading"> {{ $t('system.actions.Update') }}</van-button>
        </div>
    </u-layout>
</template>
<script setup>
import uHeader from "@/components/header/index.vue"
import uLayout from "@/components/layout/index.vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { upload,profile } from "@/api"
import { showToast,showLoadingToast,showSuccessToast,closeToast } from "vant";
const { t } = useI18n();
const url = ref(localStorage.getItem('avatar')||'');
const loading  = ref(false);
const afterRead = (file) => {
    // 此时可以自行将文件上传至服务器

    showLoadingToast({
        message: t('loading'),
        forbidClick: true,
        duration:0
    });
    upload(file).then(res=>{
        url.value = res.fullurl

    }).finally(()=>{
        closeToast();
     
    })
};
const updata =()=>{
    if(loading.value){
        return
    }
   
    loading.value = true;
    profile({
        avatar:url.value
    }).then(res=>{
        localStorage.setItem('avatar',url.value);
        showSuccessToast(t('msg.response.success'));
    }).catch(err=>{
        showToast({
            message: err.msg,
            wordBreak: 'break-word',
        });
    }).finally(()=>{
       
        loading.value = false
    })
}
</script>
<style lang="less">
.username {
    .upload{
        display: flex;
        justify-content: center;
        .van-uploader{
            
            overflow: hidden;
            img{
                width: 5rem;
                height: 5rem;
                padding: .5rem;
                border-radius: 50%;
            }
        }
    }
    .taptochange{
        text-align: center;
        
        font-size: .875rem;
        line-height: 1.25rem;
        .van-icon-edit{
            margin-left: .25rem;
        }
    }
    .bnt{
        margin-top: 1.5rem;
    }
}
</style>